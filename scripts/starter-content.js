import { MODULE_ID } from "./constants.js";

const SOURCE = "Monster Hunter Monster Manual.pdf p. 304";
const FOLDER_NAME = "Monster Hunter - Starter";

export const MATERIALS = Object.freeze({
  scale: { id: "great-jagras-scale", name: "Great Jagras Scale", slot: "armor, weapon" },
  hide: { id: "great-jagras-hide", name: "Great Jagras Hide", slot: "armor, weapon" },
  mane: { id: "great-jagras-mane", name: "Great Jagras Mane", slot: "armor" },
  claw: { id: "great-jagras-claw", name: "Great Jagras Claw", slot: "armor, weapon" },
  bone: { id: "monster-bone-plus", name: "Monster Bone+", slot: "other" }
});

export const RECIPES = Object.freeze({
  "jagras-blade": {
    id: "jagras-blade",
    name: "Jagras Blade",
    requires: { "great-jagras-claw": 2, "great-jagras-scale": 2, "monster-bone-plus": 1 },
    output: {
      name: "Jagras Blade",
      type: "weapon",
      img: "icons/svg/sword.svg",
      system: {
        description: { value: "<p>A broad, non-magical hunting blade reinforced with Great Jagras claws.</p><p><strong>Palico Rally.</strong> NPC allies within 10 feet gain +1 AC and +1 to attack rolls while you wield this weapon.</p>" },
        type: { value: "martialM" },
        damage: {
          base: { number: 1, denomination: 10, bonus: "", types: ["slashing"] },
          versatile: { number: null, denomination: 0, bonus: "", types: [] }
        },
        properties: ["two", "hvy"],
        range: { reach: 5, units: "ft" },
        proficient: 1,
        equipped: true,
        attunement: "",
        attuned: false,
        quantity: 1,
        rarity: ""
      }
    }
  },
  "jagras-mail": {
    id: "jagras-mail",
    name: "Jagras Mail",
    requires: { "great-jagras-hide": 2, "great-jagras-scale": 2, "great-jagras-mane": 1 },
    output: {
      name: "Jagras Mail",
      type: "equipment",
      img: "icons/svg/shield.svg",
      system: {
        description: {
          value: [
            "<p><strong>Speed Eating.</strong> Once per turn, use a potion or food on yourself as a bonus action.</p>",
            "<p><strong>Free Meal.</strong> You do not need to eat or drink while wearing this armor.</p>",
            "<p><strong>Intimidating Scale.</strong> You gain a +2 bonus to Intimidation checks.</p>"
          ].join("")
        },
        type: { value: "medium" },
        armor: { value: 14, dex: 2, magicalBonus: "" },
        properties: [],
        proficient: 1,
        strength: 0,
        equipped: true,
        attunement: "",
        attuned: false,
        quantity: 1,
        rarity: ""
      }
    }
  }
});

function provenance(kind, id) {
  return {
    [MODULE_ID]: {
      kind,
      id,
      source: SOURCE,
      canonical: "adapted",
      conversionVersion: 1
    }
  };
}

export function materialItem(key, quantity = 1) {
  const material = MATERIALS[key];
  if (!material) throw new Error(`Unknown material: ${key}`);
  return {
    name: material.name,
    type: "loot",
    img: "icons/svg/item-bag.svg",
    system: {
      description: {
        value: `<p>A Great Jagras crafting material.</p><p><strong>Slots:</strong> ${material.slot}</p>`
      },
      quantity,
      price: { value: 0, denomination: "gp" },
      rarity: "",
      type: { value: "material" }
    },
    flags: provenance("material", material.id)
  };
}

function naturalWeapon(name, number, denomination, type, description, requiresPart, extraFlags = {}) {
  return {
    name,
    type: "weapon",
    img: "icons/svg/pawprint.svg",
    system: {
      description: { value: `<p>${description}</p>` },
      type: { value: "natural" },
      damage: {
        base: { number, denomination, bonus: "3", types: [type] },
        versatile: { number: null, denomination: 0, bonus: "", types: [] }
      },
      properties: [],
      range: { reach: 5, units: "ft" },
      proficient: 1,
      equipped: true,
      attunement: "",
      attuned: false,
      quantity: 1
    },
    flags: {
      [MODULE_ID]: {
        ...provenance("monster-action", name.toLocaleLowerCase())[MODULE_ID],
        requiresPart,
        ...extraFlags
      }
    }
  };
}

function monsterFeature(name, description, extraFlags = {}) {
  return {
    name,
    type: "feat",
    img: "icons/svg/aura.svg",
    system: {
      description: { value: `<p>${description}</p>` },
      type: { value: "monster" },
      activation: { type: "", cost: null, condition: "" },
      uses: { spent: 0, max: "", recovery: [] }
    },
    flags: {
      [MODULE_ID]: {
        ...provenance("monster-action", name.toLocaleLowerCase().replaceAll(" ", "-"))[MODULE_ID],
        ...extraFlags
      }
    }
  };
}

export function greatJagrasParts() {
  return [
    {
      id: "head",
      label: "Head",
      hp: { value: 12, max: 12 },
      breakable: true,
      broken: false,
      rawThreshold: 150,
      hitzones: { slash: 80, blunt: 85, pierce: 75, fire: 30, water: 0, thunder: 20, ice: 15, dragon: 10 },
      reward: { material: "mane", quantity: 1 }
    },
    {
      id: "neck",
      label: "Neck",
      hp: { value: 12, max: 12 },
      breakable: false,
      broken: false,
      hitzones: { slash: 65, blunt: 70, pierce: 60, fire: 20, water: 0, thunder: 10, ice: 5, dragon: 5 }
    },
    {
      id: "body",
      label: "Body",
      hp: { value: 24, max: 24 },
      breakable: false,
      broken: false,
      rawThreshold: 300,
      hitzones: { slash: 50, blunt: 45, pierce: 40, fire: 20, water: 0, thunder: 10, ice: 5, dragon: 0 }
    },
    {
      id: "back",
      label: "Back",
      hp: { value: 24, max: 24 },
      breakable: false,
      broken: false,
      hitzones: { slash: 45, blunt: 40, pierce: 35, fire: 15, water: 0, thunder: 5, ice: 5, dragon: 0 }
    },
    {
      id: "forelegs",
      label: "Forelegs",
      hp: { value: 17, max: 17 },
      breakable: true,
      broken: false,
      rawThreshold: 210,
      hitzones: { slash: 65, blunt: 60, pierce: 55, fire: 25, water: 0, thunder: 15, ice: 10, dragon: 5 },
      reward: { material: "claw", quantity: 1 }
    },
    {
      id: "hindlegs",
      label: "Hindlegs",
      hp: { value: 19, max: 19 },
      breakable: false,
      broken: false,
      rawThreshold: 240,
      hitzones: { slash: 45, blunt: 40, pierce: 35, fire: 15, water: 0, thunder: 5, ice: 0, dragon: 0 }
    },
    {
      id: "tail",
      label: "Tail",
      hp: { value: 21, max: 21 },
      breakable: false,
      severable: false,
      broken: false,
      rawThreshold: 270,
      hitzones: { slash: 45, blunt: 45, pierce: 40, fire: 15, water: 0, thunder: 5, ice: 0, dragon: 0 }
    },
    {
      id: "stomach",
      label: "Inflated Stomach",
      hp: { value: 10, max: 10 },
      breakable: true,
      broken: false,
      rawThreshold: 120,
      active: false,
      state: "fullBelly",
      hitzones: { slash: 90, blunt: 95, pierce: 85, fire: 30, water: 0, thunder: 20, ice: 15, dragon: 10 },
      brokenHitzones: { slash: 50, blunt: 45, pierce: 40, fire: 20, water: 0, thunder: 10, ice: 5, dragon: 0 },
      reward: { material: "hide", quantity: 2 }
    }
  ];
}

export function greatJagrasSource() {
  return {
    name: "Great Jagras",
    type: "npc",
    img: "icons/svg/pawprint.svg",
    prototypeToken: {
      name: "Great Jagras",
      disposition: -1,
      width: 2,
      height: 2,
      texture: { src: "icons/svg/pawprint.svg" }
    },
    system: {
      abilities: {
        str: { value: 16, proficient: 0 },
        dex: { value: 10, proficient: 0 },
        con: { value: 16, proficient: 0 },
        int: { value: 2, proficient: 0 },
        wis: { value: 12, proficient: 0 },
        cha: { value: 7, proficient: 0 }
      },
      attributes: {
        ac: { calc: "natural", flat: 14 },
        hp: { value: 85, max: 85, temp: 0, tempmax: 0, formula: "10d10 + 30" },
        movement: { walk: 40, units: "ft" }
      },
      details: {
        cr: 4,
        xp: { value: 1100 },
        type: { value: "custom", custom: "Fanged Wyvern" },
        alignment: "Unaligned",
        biography: { value: "<p>A pack leader with an expandable belly.</p>" }
      },
      traits: {
        dr: { value: ["cold", "necrotic"], bypasses: [], custom: "" },
        di: { value: ["poison"], bypasses: [], custom: "" }
      }
    },
    items: [
      naturalWeapon("Bite", 2, 6, "piercing",
        "On a hit, the target is grappled (escape DC 13). Great Jagras cannot bite another target until it ends.",
        "head"),
      naturalWeapon("Bite (Full Belly)", 3, 6, "piercing",
        "On a hit, the target is grappled (escape DC 13). Use only while Full Belly is active.",
        "head", { requiresState: "fullBelly" }),
      naturalWeapon("Claw", 3, 4, "slashing",
        "A sweeping claw attack.",
        "forelegs"),
      naturalWeapon("Claw (Full Belly)", 4, 4, "piercing",
        "Use only while Full Belly is active.",
        "forelegs", { requiresState: "fullBelly" }),
      monsterFeature("Full Belly",
        "After swallowing a creature or object, Great Jagras enters Full Belly for up to 1 hour. Its speed becomes 30 feet and its Strength-based attacks deal one additional damage die."),
      monsterFeature("Multiattack",
        "Great Jagras makes one Bite attack and one Claw attack."),
      monsterFeature("Swallow",
        "Great Jagras makes a Bite attack against a Medium or smaller creature it is grappling. On a hit, the creature is swallowed, blinded and restrained, has total cover from outside effects, and takes 3d6 acid damage at the start of each Great Jagras turn. Taking 15 damage from inside during one turn forces a DC 15 Constitution save or regurgitation.",
        { requiresPart: "head" }),
      monsterFeature("Rollover",
        "Full Belly only; recharge 5-6. Great Jagras moves up to half its speed through creatures without provoking opportunity attacks. Affected creatures make a DC 13 Dexterity save, taking 4d6 + 3 bludgeoning damage and falling prone on a failure, or half damage and being pushed 5 feet on a success.",
        { requiresState: "fullBelly", requiresPart: "stomach" })
    ],
    flags: {
      [MODULE_ID]: {
        ...provenance("monster", "great-jagras")[MODULE_ID],
        carves: 2,
        harvested: false,
        states: { fullBelly: false },
        parts: greatJagrasParts()
      }
    }
  };
}

export function hunterSource() {
  return {
    name: "Hunter Initiate",
    type: "character",
    img: "icons/svg/mystery-man.svg",
    prototypeToken: {
      name: "Hunter Initiate",
      disposition: 1,
      texture: { src: "icons/svg/mystery-man.svg" }
    },
    system: {
      abilities: {
        str: { value: 16, proficient: 1 },
        dex: { value: 14, proficient: 0 },
        con: { value: 16, proficient: 1 },
        int: { value: 10, proficient: 0 },
        wis: { value: 14, proficient: 0 },
        cha: { value: 10, proficient: 0 }
      },
      attributes: {
        hp: { value: 24, max: 24, temp: 0, tempmax: 0 },
        movement: { walk: 30, units: "ft" }
      },
      details: {
        level: 3,
        biography: { value: "<p>A non-magical guild hunter ready for a first assignment.</p>" }
      }
    },
    items: [{
      name: "Iron Great Sword",
      type: "weapon",
      img: "icons/svg/sword.svg",
      system: {
        description: { value: "<p>A dependable two-handed hunting weapon.</p>" },
        type: { value: "martialM" },
        damage: {
          base: { number: 2, denomination: 6, bonus: "", types: ["slashing"] },
          versatile: { number: null, denomination: 0, bonus: "", types: [] }
        },
        properties: ["two", "hvy"],
        range: { reach: 5, units: "ft" },
        proficient: 1,
        equipped: true,
        attunement: "",
        attuned: false,
        quantity: 1
      },
      flags: provenance("starter-weapon", "iron-great-sword")
    }],
    flags: provenance("hunter", "hunter-initiate")
  };
}

export async function starterFolder(type) {
  let folder = game.folders.find(entry => entry.name === FOLDER_NAME && entry.type === type);
  if (!folder && game.user.isGM) folder = await Folder.create({ name: FOLDER_NAME, type });
  return folder;
}
