import assert from "node:assert/strict";

import { MODULE_ID } from "../scripts/constants.js";
import { canCraft } from "../scripts/hunting.js";
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
assert.equal(hunterSource().items[0].type, "weapon");
assert.equal(materialItem("scale", 2).system.quantity, 2);

const bladeMaterials = inventoryActor({
  "great-jagras-claw": 2,
  "great-jagras-scale": 2,
  "monster-bone-plus": 1
});
assert.equal(canCraft(bladeMaterials, "jagras-blade"), true);
assert.equal(canCraft(inventoryActor({ "great-jagras-claw": 1 }), "jagras-blade"), false);
assert.equal(canCraft(bladeMaterials, "jagras-mail"), false);

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
  monsterActions: greatJagrasSource().items.length
}));
