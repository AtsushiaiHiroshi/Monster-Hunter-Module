import { MODULE_ID } from "./constants.js";
import { diceApi, registerDiceSoNice } from "./dice.js";
import { classifyForbiddenContent, registerMagicPolicyHooks } from "./magic-policy.js";
import { mountsApi } from "./mounts.js";
import { registerSettings } from "./settings.js";

Hooks.once("init", () => {
  registerSettings();
  registerMagicPolicyHooks();

  const module = game.modules.get(MODULE_ID);
  module.api = Object.freeze({
    classifyForbiddenContent,
    dice: diceApi,
    mounts: mountsApi
  });
});

registerDiceSoNice();

Hooks.once("ready", () => {
  if (game.system.id !== "dnd5e") {
    ui.notifications.error(game.i18n.localize("MHM.Errors.RequiresDnd5e"));
  }
});
