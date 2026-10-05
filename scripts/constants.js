export const MODULE_ID = "monster-hunter-module";

export const SETTINGS = Object.freeze({
  MAGIC_POLICY: "magicPolicy",
  HIDE_MAGIC_UI: "hideMagicUi",
  ENABLE_MOUNTS: "enableMounts",
  STARTER_NOTICE: "starterNotice"
});

export const MAGIC_ITEM_TYPES = new Set(["spell"]);
export const MAGIC_ADVANCEMENT_TYPES = new Set(["ItemGrant", "ScaleValue"]);

export const ALLOWED_BASE_CLASSES = new Set([
  "barbarian",
  "fighter",
  "rogue"
]);

export const ALLOWED_SUBCLASSES = new Set([
  "assassin",
  "banneret",
  "battle master",
  "battlerager",
  "berserker",
  "cavalier",
  "champion",
  "inquisitive",
  "mastermind",
  "samurai",
  "scout",
  "swashbuckler",
  "thief"
]);

export const MAGIC_TERMS = Object.freeze([
  "arcane",
  "artificer",
  "bard",
  "cleric",
  "druid",
  "eldritch knight",
  "magic",
  "magical",
  "mago",
  "magia",
  "monk",
  "paladin",
  "ranger",
  "sorcerer",
  "warlock",
  "wizard"
]);
