import assert from "node:assert/strict";

import { MODULE_ID } from "../scripts/constants.js";
import { canCraft } from "../scripts/hunting.js";
import { classifyForbiddenContent } from "../scripts/magic-policy.js";
import { modifyDamageForPart, partDamageCategory, resetPartData } from "../scripts/parts.js";
import {
  MATERIALS,
  RECIPES,
  greatJagrasSource,
  hunterSource,
  materialItem
} from "../scripts/starter-content.js";

function inventoryActor(quantities) {
  return {
    items: Object.entries(quantities).map(([id, quantity]) => ({
      system: { quantity },
      getFlag(moduleId, key) {
        assert.equal(moduleId, MODULE_ID);
        assert.equal(key, "id");
        return id;
      }
    }))
  };
}

assert.equal(Object.keys(MATERIALS).length, 5);
assert.equal(greatJagrasSource().system.attributes.hp.max, 85);
assert.equal(greatJagrasSource().items.length, 2);
assert.equal(greatJagrasSource().flags[MODULE_ID].parts.length, 6);
assert.equal(hunterSource().items[0].type, "weapon");
assert.equal(materialItem("scale", 2).system.quantity, 2);
assert.deepEqual(
  RECIPES["jagras-blade"].output.system.activities["jagras-blade-atk"].damage.parts[0].types,
  ["water"]
);

const bladeMaterials = inventoryActor({
  "great-jagras-claw": 2,
  "great-jagras-scale": 2,
  "monster-bone-plus": 1
});
assert.equal(canCraft(bladeMaterials, "jagras-blade"), true);
assert.equal(canCraft(inventoryActor({ "great-jagras-claw": 1 }), "jagras-blade"), false);
assert.equal(canCraft(bladeMaterials, "jagras-mail"), false);

const parts = greatJagrasSource().flags[MODULE_ID].parts;
const headDamage = modifyDamageForPart(parts, "head", [
  { type: "slashing", value: 10 },
  { type: "water", value: 10 },
  { type: "fire", value: 10 }
]);
assert.deepEqual(headDamage.damages.map(damage => damage.value), [8, 0, 3]);
assert.equal(headDamage.amount, 11);
assert.equal(partDamageCategory("cold"), "ice");
assert.equal(partDamageCategory("force"), null);

const damagedParts = structuredClone(parts);
damagedParts[0].hp.value = 0;
damagedParts[0].broken = true;
assert.equal(resetPartData(damagedParts)[0].hp.value, damagedParts[0].hp.max);
assert.equal(resetPartData(damagedParts)[0].broken, false);

assert.equal(classifyForbiddenContent({ type: "class", name: "Fighter", system: {} }), null);
assert.equal(classifyForbiddenContent({ type: "class", name: "Monk", system: {} }), "class:monk");
assert.equal(classifyForbiddenContent({ type: "class", name: "Ranger", system: {} }), "class:ranger");
assert.equal(classifyForbiddenContent({
  type: "class",
  name: "Rider",
  system: { identifier: "ranger" },
  flags: { [MODULE_ID]: { allowNonMagical: true } }
}), null);
assert.equal(classifyForbiddenContent({
  type: "subclass",
  name: "Drakewarden",
  system: {}
}), "subclass:drakewarden");
assert.equal(classifyForbiddenContent({
  type: "race",
  name: "High Elf",
  system: { description: { value: "A race with magic in its original rules." } }
}), null);
assert.equal(classifyForbiddenContent({
  type: "spell",
  flags: { [MODULE_ID]: { allowNonMagical: true } }
}), "spell");

for (const recipe of Object.values(RECIPES)) {
  assert.ok(recipe.name);
  assert.ok(Object.keys(recipe.requires).length >= 3);
  assert.ok(["weapon", "equipment"].includes(recipe.output.type));
  assert.equal(recipe.output.system.attunement, "");
  assert.equal(recipe.output.system.attuned, false);
  assert.ok(!recipe.output.system.properties.includes("mgc"));
}

console.log(JSON.stringify({
  materials: Object.keys(MATERIALS).length,
  recipes: Object.keys(RECIPES).length,
  monsterActions: greatJagrasSource().items.length,
  monsterParts: parts.length
}));
