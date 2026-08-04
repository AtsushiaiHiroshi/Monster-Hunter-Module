import { MODULE_ID, SETTINGS } from "./constants.js";
import {
  MATERIALS,
  RECIPES,
  greatJagrasParts,
  greatJagrasSource,
  hunterSource,
  materialItem,
  starterFolder
} from "./starter-content.js";

const CARD_FLAG = "guildBoard";
const HARVEST_TABLES = Object.freeze({
  carve: [[1, 6, "scale"], [7, 11, "hide"], [12, 15, "mane"], [16, 20, "claw"]],
  capture: [[1, 4, "scale"], [5, 10, "hide"], [11, 14, "mane"], [15, 16, "claw"], [17, 20, "bone"]]
});

function controlledActor() {
  return canvas?.tokens?.controlled?.[0]?.actor ?? game.user.character ?? null;
}

function targetedMonster() {
  return [...(game.user.targets ?? [])][0]?.actor
    ?? canvas?.tokens?.placeables?.find(token => token.actor?.getFlag(MODULE_ID, "id") === "great-jagras")?.actor
    ?? game.actors.find(actor => actor.getFlag(MODULE_ID, "id") === "great-jagras")
    ?? null;
}

function assertGm() {
  if (!game.user.isGM) throw new Error(game.i18n.localize("MHM.Hunting.GmOnly"));
}

function boardContent() {
  const actions = [
    ["create-hunter", "fa-user-plus", "MHM.Hunting.CreateHunter"],
    ["deploy", "fa-paw", "MHM.Hunting.Deploy"],
    ["carve", "fa-knife", "MHM.Hunting.Carve"],
    ["capture", "fa-box", "MHM.Hunting.Capture"],
    ["craft-blade", "fa-hammer", "MHM.Hunting.CraftBlade"],
    ["craft-mail", "fa-shield-halved", "MHM.Hunting.CraftMail"]
  ];
  const buttons = actions.map(([action, icon, label]) => `
    <button type="button" data-mhm-action="${action}">
      <i class="fa-solid ${icon}" aria-hidden="true"></i> ${game.i18n.localize(label)}
    </button>`).join("");
  return `
    <section class="mhm-board">
      <h2>${game.i18n.localize("MHM.Hunting.BoardTitle")}</h2>
      <p>${game.i18n.localize("MHM.Hunting.BoardHint")}</p>
      <div class="mhm-board-actions">${buttons}</div>
      <p class="notes">${game.i18n.localize("MHM.Hunting.SelectionHint")}</p>
    </section>`;
}

export async function showGuildBoard() {
  return ChatMessage.create({
    content: boardContent(),
    whisper: [game.user.id],
    flags: { [MODULE_ID]: { [CARD_FLAG]: true } }
  });
}

export async function createHunter() {
  assertGm();
  const folder = await starterFolder("Actor");
  const actor = await Actor.create({ ...hunterSource(), folder: folder?.id });
  actor.sheet.render(true);
  ui.notifications.info(game.i18n.format("MHM.Hunting.Created", { name: actor.name }));
  return actor;
}

export async function deployGreatJagras() {
  assertGm();
  if (!canvas?.scene) throw new Error(game.i18n.localize("MHM.Hunting.SceneRequired"));
  const folder = await starterFolder("Actor");
  let actor = game.actors.find(entry => entry.getFlag(MODULE_ID, "id") === "great-jagras");
  if (!actor) actor = await Actor.create({ ...greatJagrasSource(), folder: folder?.id });
  await actor.update({
    "system.attributes.hp.value": 85,
    "system.attributes.movement.walk": 40,
    [`flags.${MODULE_ID}.harvested`]: false,
    [`flags.${MODULE_ID}.states.fullBelly`]: false,
    [`flags.${MODULE_ID}.parts`]: greatJagrasParts()
  });
  const token = await actor.getTokenDocument({
    x: Math.max(0, Math.round((canvas.stage.pivot.x ?? 0) / canvas.grid.size) * canvas.grid.size),
    y: Math.max(0, Math.round((canvas.stage.pivot.y ?? 0) / canvas.grid.size) * canvas.grid.size)
  });
  const [created] = await canvas.scene.createEmbeddedDocuments("Token", [token.toObject()]);
  ui.notifications.info(game.i18n.localize("MHM.Hunting.Deployed"));
  return created;
}

async function addMaterial(actor, key, quantity = 1) {
  const id = MATERIALS[key].id;
  const existing = actor.items.find(item => item.getFlag(MODULE_ID, "id") === id);
  if (existing) {
    await existing.update({ "system.quantity": Number(existing.system.quantity ?? 0) + quantity });
    return existing;
  }
  const [created] = await actor.createEmbeddedDocuments("Item", [materialItem(key, quantity)]);
  return created;
}

export async function harvest({ hunter = controlledActor(), monster = targetedMonster(), mode = "carve" } = {}) {
  if (!hunter) throw new Error(game.i18n.localize("MHM.Hunting.HunterRequired"));
  if (!monster || monster.getFlag(MODULE_ID, "id") !== "great-jagras") {
    throw new Error(game.i18n.localize("MHM.Hunting.MonsterRequired"));
  }
  if (!hunter.isOwner && !game.user.isGM) throw new Error(game.i18n.localize("MHM.Mounts.NotOwner"));
  if (monster.getFlag(MODULE_ID, "harvested")) throw new Error(game.i18n.localize("MHM.Hunting.AlreadyHarvested"));
  if (!(mode in HARVEST_TABLES)) throw new Error(`Unknown harvest mode: ${mode}`);

  const results = [];
  for (let index = 0; index < 2; index += 1) {
    const roll = await new Roll("1d20").evaluate();
    const key = HARVEST_TABLES[mode].find(([low, high]) => roll.total >= low && roll.total <= high)?.[2] ?? "scale";
    await addMaterial(hunter, key);
    results.push({ total: roll.total, name: MATERIALS[key].name });
  }
  const parts = foundry.utils.deepClone(monster.getFlag(MODULE_ID, "parts") ?? []);
  for (const part of parts) {
    if (!part.broken || part.rewardClaimed || !part.reward) continue;
    await addMaterial(hunter, part.reward.material, part.reward.quantity);
    part.rewardClaimed = true;
    results.push({
      total: game.i18n.localize("MHM.Parts.Bonus"),
      name: `${MATERIALS[part.reward.material].name} x${part.reward.quantity}`
    });
  }
  await monster.setFlag(MODULE_ID, "parts", parts);
  await monster.setFlag(MODULE_ID, "harvested", true);
  const list = results.map(result =>
    `<li><strong>${result.total}</strong>: ${foundry.utils.escapeHTML(result.name)}</li>`).join("");
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: hunter }),
    content: `<section class="mhm-result"><h3>${foundry.utils.escapeHTML(hunter.name)}</h3><ol>${list}</ol></section>`
  });
  return results;
}

function materialInventory(actor) {
  const inventory = new Map();
  for (const item of actor.items) {
    const id = item.getFlag(MODULE_ID, "id");
    if (id) inventory.set(id, { item, quantity: Number(item.system.quantity ?? 0) });
  }
  return inventory;
}

export function canCraft(actor, recipeId) {
  const recipe = RECIPES[recipeId];
  if (!actor || !recipe) return false;
  const inventory = materialInventory(actor);
  return Object.entries(recipe.requires).every(([id, quantity]) => (inventory.get(id)?.quantity ?? 0) >= quantity);
}

export async function craft(recipeId, actor = controlledActor()) {
  if (!actor) throw new Error(game.i18n.localize("MHM.Hunting.HunterRequired"));
  if (!actor.isOwner && !game.user.isGM) throw new Error(game.i18n.localize("MHM.Mounts.NotOwner"));
  const recipe = RECIPES[recipeId];
  if (!recipe) throw new Error(`Unknown recipe: ${recipeId}`);
  if (!canCraft(actor, recipeId)) {
    throw new Error(game.i18n.format("MHM.Hunting.MaterialsMissing", { name: recipe.name }));
  }
  const inventory = materialInventory(actor);
  for (const [id, quantity] of Object.entries(recipe.requires)) {
    const entry = inventory.get(id);
    const remaining = entry.quantity - quantity;
    if (remaining > 0) await entry.item.update({ "system.quantity": remaining });
    else await entry.item.delete();
  }
  const output = foundry.utils.deepClone(recipe.output);
  output.flags = {
    [MODULE_ID]: {
      kind: "crafted-equipment",
      id: recipe.id,
      source: "Monster Hunter Monster Manual.pdf p. 304",
      canonical: "adapted",
      conversionVersion: 1,
      allowNonMagical: true
    }
  };
  const [item] = await actor.createEmbeddedDocuments("Item", [output]);
  ui.notifications.info(game.i18n.format("MHM.Hunting.Crafted", { name: recipe.name }));
  return item;
}

async function runAction(action) {
  if (action === "create-hunter") return createHunter();
  if (action === "deploy") return deployGreatJagras();
  if (action === "carve") return harvest({ mode: "carve" });
  if (action === "capture") return harvest({ mode: "capture" });
  if (action === "craft-blade") return craft("jagras-blade");
  if (action === "craft-mail") return craft("jagras-mail");
  return undefined;
}

export function registerHuntingHooks() {
  Hooks.on("chatMessage", (_log, message) => {
    if (message.trim().toLocaleLowerCase() !== "/mhm") return true;
    showGuildBoard();
    return false;
  });
  Hooks.on("renderChatMessageHTML", (message, element) => {
    if (!message.getFlag(MODULE_ID, CARD_FLAG)) return;
    element.querySelectorAll("[data-mhm-action]").forEach(button => {
      button.addEventListener("click", async event => {
        event.preventDefault();
        button.disabled = true;
        try {
          await runAction(button.dataset.mhmAction);
        } catch (error) {
          console.error(`${MODULE_ID} | Guild board action failed`, error);
          ui.notifications.error(error.message);
        } finally {
          button.disabled = false;
        }
      });
    });
  });
}

export async function showFirstRunNotice() {
  if (game.settings.get(MODULE_ID, SETTINGS.STARTER_NOTICE)) return;
  await game.settings.set(MODULE_ID, SETTINGS.STARTER_NOTICE, true);
  ui.notifications.info(game.i18n.localize("MHM.Hunting.FirstRun"), { permanent: true });
}

export const huntingApi = Object.freeze({
  canCraft,
  craft,
  createHunter,
  deployGreatJagras,
  harvest,
  showFirstRunNotice,
  showGuildBoard
});
