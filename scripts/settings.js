import { MODULE_ID, SETTINGS } from "./constants.js";

export function registerSettings() {
  game.settings.register(MODULE_ID, SETTINGS.MAGIC_POLICY, {
    name: "MHM.Settings.MagicPolicy.Name",
    hint: "MHM.Settings.MagicPolicy.Hint",
    scope: "world",
    config: true,
    type: String,
    choices: {
      strict: "MHM.Settings.MagicPolicy.Strict",
      warn: "MHM.Settings.MagicPolicy.Warn",
      off: "MHM.Settings.MagicPolicy.Off"
    },
    default: "strict"
  });

  game.settings.register(MODULE_ID, SETTINGS.HIDE_MAGIC_UI, {
    name: "MHM.Settings.HideMagicUi.Name",
    hint: "MHM.Settings.HideMagicUi.Hint",
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
    requiresReload: true
  });

  game.settings.register(MODULE_ID, SETTINGS.ENABLE_MOUNTS, {
    name: "MHM.Settings.EnableMounts.Name",
    hint: "MHM.Settings.EnableMounts.Hint",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });

  game.settings.register(MODULE_ID, SETTINGS.STARTER_NOTICE, {
    scope: "client",
    config: false,
    type: Boolean,
    default: false
  });
}
