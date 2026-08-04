import {
  ALLOWED_BASE_CLASSES,
  ALLOWED_SUBCLASSES,
  MAGIC_ITEM_TYPES,
  MAGIC_TERMS,
  MODULE_ID,
  SETTINGS
} from "./constants.js";

function normalizedIdentifier(source) {
  return String(source.system?.identifier ?? source.name ?? "")
    .toLocaleLowerCase()
    .replaceAll("-", " ")
    .trim();
}

function flattenText(value) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(flattenText).join(" ");
  if (typeof value === "object") return Object.values(value).map(flattenText).join(" ");
  return String(value);
}

function hasMagicalProperty(source) {
  const properties = source?.system?.properties;
  if (properties instanceof Set) return properties.has("mgc");
  if (Array.isArray(properties)) return properties.includes("mgc");
  return Boolean(properties?.mgc);
}

export function classifyForbiddenContent(source = {}) {
  if (MAGIC_ITEM_TYPES.has(source.type)) return "spell";
  if (source.flags?.[MODULE_ID]?.allowNonMagical === true) return null;
  if (hasMagicalProperty(source)) return "magical-property";
  if (source.type === "class" && !ALLOWED_BASE_CLASSES.has(normalizedIdentifier(source))) {
    return `class:${normalizedIdentifier(source) || "unknown"}`;
  }
  if (source.type === "subclass" && !ALLOWED_SUBCLASSES.has(normalizedIdentifier(source))) {
    return `subclass:${normalizedIdentifier(source) || "unknown"}`;
  }

  if (["class", "subclass", "feat", "equipment", "weapon", "consumable"].includes(source.type)) {
    const searchable = `${source.name ?? ""} ${flattenText(source.system?.description)}`.toLocaleLowerCase();
    const term = MAGIC_TERMS.find((candidate) => searchable.includes(candidate));
    if (term) return `term:${term}`;
  }

  return null;
}

function rejectForbidden(document, source) {
  const policy = game.settings.get(MODULE_ID, SETTINGS.MAGIC_POLICY);
  if (policy === "off") return;

  const reason = classifyForbiddenContent(source);
  if (!reason) return;

  const name = source.name || document?.name || game.i18n.localize("MHM.Magic.Unnamed");
  const message = game.i18n.format("MHM.Magic.Blocked", { name, reason });
  if (policy === "warn") {
    ui.notifications.warn(message);
    return;
  }

  ui.notifications.error(message);
  return false;
}

export function registerMagicPolicyHooks() {
  Hooks.on("preCreateItem", rejectForbidden);

  Hooks.on("preUpdateItem", (document, changes) => {
    const merged = foundry.utils.mergeObject(document.toObject(), changes, {
      inplace: false,
      insertKeys: true,
      overwrite: true
    });
    return rejectForbidden(document, merged);
  });

  Hooks.on("renderActorSheetV2", (_application, element) => {
    if (!game.settings.get(MODULE_ID, SETTINGS.HIDE_MAGIC_UI)) return;
    const root = element instanceof HTMLElement ? element : element?.[0];
    root?.classList.add("mhm-no-magic");
  });
}
