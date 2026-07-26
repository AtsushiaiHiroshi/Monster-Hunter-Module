import { MODULE_ID } from "./constants.js";

const PARTS_FLAG = "parts";
const TARGET_FLAG = "targetPart";
const damageCategories = Object.freeze({
  slashing: "slash",
  bludgeoning: "blunt",
  piercing: "pierce",
  fire: "fire",
  water: "water",
  lightning: "thunder",
  cold: "ice",
  dragon: "dragon"
});

const updateQueues = new Map();

export function registerMonsterHunterDamageTypes() {
  CONFIG.DND5E.damageTypes.water ??= {
    label: "MHM.Damage.Water",
    icon: "icons/svg/waterfall.svg",
    isPhysical: false
  };
  CONFIG.DND5E.damageTypes.dragon ??= {
    label: "MHM.Damage.Dragon",
    icon: "icons/svg/wing.svg",
    isPhysical: false
  };
}

export function partDamageCategory(damageType) {
  return damageCategories[damageType] ?? null;
}

export function getParts(actor) {
  return foundry.utils.deepClone(actor?.getFlag(MODULE_ID, PARTS_FLAG) ?? []);
}

export function resetPartData(parts) {
  return parts.map(part => ({
    ...part,
    hp: { ...part.hp, value: part.hp.max },
    broken: false,
    rewardClaimed: false
  }));
}

export function modifyDamageForPart(parts, partId, damages) {
  const part = parts.find(entry => entry.id === partId);
  if (!part) return { damages, part: null, amount: 0, reductions: [] };
  const zones = part.broken && part.brokenHitzones ? part.brokenHitzones : part.hitzones;
  const reductions = [];
  let amount = 0;
  const modified = damages.map(damage => {
    const category = partDamageCategory(damage.type);
    const hitzone = category ? (zones?.[category] ?? 100) : 100;
    const original = Number(damage.value ?? 0);
    const value = original > 0 ? Math.floor(original * hitzone / 100) : original;
    if (original > 0) amount += value;
    reductions.push({ type: damage.type, category, hitzone, original, value });
    return { ...damage, value };
  });
  return { damages: modified, part, amount, reductions };
}

function targetData(message) {
  return message?.getFlag(MODULE_ID, TARGET_FLAG) ?? null;
}

function targetedMonster() {
  return [...(game.user.targets ?? [])]
    .map(token => token.actor)
    .find(actor => getParts(actor).length) ?? null;
}

function partsSelector(message, actor) {
  const selected = targetData(message)?.partId ?? getParts(actor)[0]?.id;
  const section = document.createElement("section");
  section.className = "mhm-part-target";
  const label = document.createElement("label");
  const labelText = document.createElement("span");
  labelText.textContent = game.i18n.localize("MHM.Parts.Target");
  const select = document.createElement("select");
  for (const part of getParts(actor)) {
    const option = document.createElement("option");
    option.value = part.id;
    option.selected = part.id === selected;
    const suffix = part.broken ? ` - ${game.i18n.localize("MHM.Parts.Broken")}` : "";
    option.textContent = `${part.label}${suffix}`;
    select.append(option);
  }
  label.append(labelText, select);
  section.append(label);
  select.addEventListener("change", async () => {
    await message.setFlag(MODULE_ID, TARGET_FLAG, { actorUuid: actor.uuid, partId: select.value });
  });
  return section;
}

function partsPanel(actor) {
  const section = document.createElement("section");
  section.className = "mhm-parts-panel";
  section.dataset.mhmParts = actor.id;
  const heading = document.createElement("h3");
  heading.textContent = game.i18n.localize("MHM.Parts.Title");
  section.append(heading);
  const list = document.createElement("ul");
  for (const part of getParts(actor)) {
    const item = document.createElement("li");
    if (part.broken) item.classList.add("is-broken");
    const label = document.createElement("span");
    label.textContent = `${part.label}${part.broken ? ` - ${game.i18n.localize("MHM.Parts.Broken")}` : ""}`;
    const progress = document.createElement("progress");
    progress.max = part.hp.max;
    progress.value = part.hp.value;
    progress.setAttribute("aria-label", part.label);
    const value = document.createElement("span");
    value.textContent = `${part.hp.value}/${part.hp.max}`;
    item.append(label, progress, value);
    list.append(item);
  }
  section.append(list);
  return section;
}

function enqueuePartDamage(actor, callback) {
  const previous = updateQueues.get(actor.uuid) ?? Promise.resolve();
  const next = previous.then(callback).catch(error => {
    console.error(`${MODULE_ID} | Part damage failed`, error);
    ui.notifications.error(error.message);
  }).finally(() => {
    if (updateQueues.get(actor.uuid) === next) updateQueues.delete(actor.uuid);
  });
  updateQueues.set(actor.uuid, next);
  return next;
}

async function applyPartDamage(actor, partId, amount) {
  if (amount <= 0) return;
  const parts = getParts(actor);
  const part = parts.find(entry => entry.id === partId);
  if (!part || part.broken) return;
  part.hp.value = Math.max(0, part.hp.value - amount);
  const justBroken = part.breakable !== false && part.hp.value === 0;
  if (justBroken) part.broken = true;
  await actor.setFlag(MODULE_ID, PARTS_FLAG, parts);
  if (justBroken) {
    await ChatMessage.create({
      content: `<section class="mhm-part-break"><h3>${game.i18n.format("MHM.Parts.BreakMessage", {
        monster: foundry.utils.escapeHTML(actor.name),
        part: foundry.utils.escapeHTML(part.label)
      })}</h3></section>`
    });
  }
}

export function registerPartsHooks() {
  Hooks.on("dnd5e.calculateDamage", (actor, damages, options) => {
    const target = targetData(options.originatingMessage);
    if (!target || target.actorUuid !== actor.uuid || !getParts(actor).length) return;
    const originalAmount = damages.amount;
    const result = modifyDamageForPart(getParts(actor), target.partId, Array.from(damages));
    result.damages.forEach((damage, index) => {
      damages[index].value = damage.value;
      damages[index].active ??= {};
      damages[index].active[MODULE_ID] = result.reductions[index];
    });
    const originalPositive = Array.from(damages).reduce((sum, damage, index) =>
      sum + Math.max(0, result.reductions[index]?.original ?? damage.value), 0);
    damages.amount = Math.max(0, originalAmount - originalPositive + result.amount);
    options[MODULE_ID] = { partId: target.partId, partDamage: result.amount };
  });

  Hooks.on("dnd5e.applyDamage", (actor, _amount, options) => {
    const data = options[MODULE_ID];
    if (!data?.partId || !getParts(actor).length) return;
    enqueuePartDamage(actor, () => applyPartDamage(actor, data.partId, data.partDamage));
  });

  Hooks.on("dnd5e.preUseActivity", activity => {
    const requiredPart = activity.item?.getFlag(MODULE_ID, "requiresPart");
    const actor = activity.actor;
    if (!requiredPart || !actor) return;
    const part = getParts(actor).find(entry => entry.id === requiredPart);
    if (!part?.broken) return;
    ui.notifications.warn(game.i18n.format("MHM.Parts.ActionDisabled", {
      action: activity.item.name,
      part: part.label
    }));
    return false;
  });

  Hooks.on("renderChatMessageHTML", (message, element) => {
    if (!message.isAuthor || !message.flags.dnd5e?.roll || element.querySelector(".mhm-part-target")) return;
    const actor = targetedMonster();
    if (!actor) return;
    const content = element.querySelector(".message-content") ?? element;
    content.append(partsSelector(message, actor));
  });

  Hooks.on("renderActorSheetV2", (application, element) => {
    const actor = application.actor ?? application.document;
    if (!getParts(actor).length || element.querySelector("[data-mhm-parts]")) return;
    const content = element.querySelector(".window-content") ?? element;
    content.prepend(partsPanel(actor));
  });
}

export const partsApi = Object.freeze({
  getParts,
  modifyDamageForPart,
  partDamageCategory,
  registerMonsterHunterDamageTypes,
  resetPartData
});
