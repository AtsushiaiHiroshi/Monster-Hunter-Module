const PRIVATE_ROOT = "modules/monster-hunter-module/assets/dice/private";
const TEXTURE_ROOT = "modules/monster-hunter-module/assets/dice/textures";
const STANDARD_SIDES = Object.freeze([2, 4, 6, 8, 12, 14, 16, 20, 24, 30]);

const COLLECTIONS = Object.freeze([
  { id: "monster-hunter", name: "Monster Hunter — Guild Pair", low: "rathian", high: "rathalos", colorset: "monster-hunter-guild" },
  { id: "monster-hunter-rathalos", name: "Monster Hunter — Rathalos", icon: "rathalos" },
  { id: "monster-hunter-dreadking-rathalos", name: "Monster Hunter — Rathalos Maldito", icon: "dreadking-rathalos" },
  { id: "monster-hunter-azure-rathalos", name: "Monster Hunter — Azure Rathalos", icon: "azure-rathalos" },
  { id: "monster-hunter-silver-rathalos", name: "Monster Hunter — Silver Rathalos", icon: "silver-rathalos" },
  { id: "monster-hunter-zinogre", name: "Monster Hunter — Zinogre", icon: "zinogre" },
  { id: "monster-hunter-stygian-zinogre", name: "Monster Hunter — Stygian Zinogre", icon: "stygian-zinogre" },
  { id: "monster-hunter-thunderlord-zinogre", name: "Monster Hunter — Thunderlord Zinogre", icon: "thunderlord-zinogre" },
  { id: "monster-hunter-anjanath", name: "Monster Hunter — Anjanath", icon: "anjanath" },
  { id: "monster-hunter-fulgur-anjanath", name: "Monster Hunter — Fulgur Anjanath", icon: "fulgur-anjanath" },
  { id: "monster-hunter-rathian", name: "Monster Hunter — Rathian", icon: "rathian" },
  { id: "monster-hunter-pink-rathian", name: "Monster Hunter — Pink Rathian", icon: "pink-rathian" },
  { id: "monster-hunter-gold-rathian", name: "Monster Hunter — Gold Rathian", icon: "gold-rathian" },
  { id: "monster-hunter-dreadqueen-rathian", name: "Monster Hunter — Rathian Maldita", icon: "dreadqueen-rathian" },
  { id: "monster-hunter-nargacuga", name: "Monster Hunter — Nargacuga", icon: "nargacuga" },
  { id: "monster-hunter-green-nargacuga", name: "Monster Hunter — Green Nargacuga", icon: "green-nargacuga" },
  { id: "monster-hunter-silverwind-nargacuga", name: "Monster Hunter — Silverwind Nargacuga", icon: "silverwind-nargacuga" },
  { id: "monster-hunter-tigrex", name: "Monster Hunter — Tigrex", icon: "tigrex" },
  { id: "monster-hunter-brute-tigrex", name: "Monster Hunter — Brute Tigrex", icon: "brute-tigrex" },
  { id: "monster-hunter-molten-tigrex", name: "Monster Hunter — Molten Tigrex", icon: "molten-tigrex" },
  { id: "monster-hunter-grimclaw-tigrex", name: "Monster Hunter — Grimclaw Tigrex", icon: "grimclaw-tigrex" },
  { id: "monster-hunter-lagiacrus", name: "Monster Hunter — Lagiacrus", icon: "lagiacrus" },
  { id: "monster-hunter-ivory-lagiacrus", name: "Monster Hunter — Ivory Lagiacrus", icon: "ivory-lagiacrus" }
  ,{ id: "monster-hunter-yian-kut-ku", name: "Monster Hunter — Yian Kut-Ku", icon: "yian-kut-ku" }
  ,{ id: "monster-hunter-blue-yian-kut-ku", name: "Monster Hunter — Blue Yian Kut-Ku", icon: "blue-yian-kut-ku" }
  ,{ id: "monster-hunter-yian-garuga", name: "Monster Hunter — Yian Garuga", icon: "yian-garuga" }
  ,{ id: "monster-hunter-deadeye-yian-garuga", name: "Monster Hunter — Deadeye Yian Garuga", icon: "deadeye-yian-garuga" }
  ,{ id: "monster-hunter-kushala-daora", name: "Monster Hunter — Kushala Daora", icon: "kushala-daora" }
  ,{ id: "monster-hunter-velkhana", name: "Monster Hunter — Velkhana", icon: "velkhana" }
  ,{ id: "monster-hunter-rajang", name: "Monster Hunter — Rajang", icon: "rajang" }
  ,{ id: "monster-hunter-teostra", name: "Monster Hunter — Teostra", icon: "teostra" }
  ,{ id: "monster-hunter-kirin", name: "Monster Hunter — Kirin", icon: "kirin" }
  ,{ id: "monster-hunter-oroshi-kirin", name: "Monster Hunter — Oroshi Kirin", icon: "oroshi-kirin" }
  ,{ id: "monster-hunter-namielle", name: "Monster Hunter — Namielle", icon: "namielle" }
  ,{ id: "monster-hunter-malzeno", name: "Monster Hunter — Malzeno", icon: "malzeno" }
  ,{ id: "monster-hunter-thunder-serpent-narwa", name: "Monster Hunter — Thunder Serpent Narwa", icon: "thunder-serpent-narwa" }
  ,{ id: "monster-hunter-wind-serpent-ibushi", name: "Monster Hunter — Wind Serpent Ibushi", icon: "wind-serpent-ibushi" }
  ,{ id: "monster-hunter-yama-tsukami", name: "Monster Hunter — Yama Tsukami", icon: "yama-tsukami" }
]);

const TEXTURES = Object.freeze([
  ["mhm-rathalos-blue", "Rathalos — Blue Veins", "rathalos-veins-blue.webp"],
  ["mhm-rathalos-cream", "Rathalos — Cream Veins", "rathalos-veins-cream.webp"],
  ["mhm-lightning", "Monster Hunter — Lightning", "veins-lightning-yellow.webp"],
  ["mhm-crimson", "Monster Hunter — Dragon Crimson", "veins-dragon-crimson.webp"],
  ["mhm-ice", "Monster Hunter — Ice Blue", "veins-ice-blue.webp"],
  ["mhm-charcoal", "Monster Hunter — Charcoal", "veins-charcoal.webp"],
  ["mhm-poison", "Monster Hunter — Poison Purple", "veins-poison-purple.webp"],
  ["mhm-venom", "Monster Hunter — Venom Green", "veins-venom-green.webp"],
  ["mhm-gold", "Monster Hunter — Royal Gold", "veins-royal-gold.webp"],
  ["mhm-obsidian", "Monster Hunter — Obsidian", "veins-obsidian.webp"],
  ["mhm-teal", "Monster Hunter — Storm Teal", "veins-storm-teal.webp"],
  ["mhm-lava", "Monster Hunter — Lava Orange", "veins-lava-orange.webp"],
  ["mhm-silver", "Monster Hunter — Silver", "veins-silver.webp"]
]);

const COLORSETS = Object.freeze([
  ["monster-hunter-rathalos-ember", "Rathalos — Ember", "Rathalos", "#f3dfb5", "#bd4b20", "#245e96", "mhm-rathalos-blue"],
  ["monster-hunter-rathalos-ivory", "Rathalos — Ivory", "Rathalos", "#d95b24", "#ead6aa", "#245e96", "mhm-rathalos-blue"],
  ["monster-hunter-rathalos-azure", "Rathalos — Azure Script", "Rathalos", "#2769a2", "#bd4b20", "#ead6aa", "mhm-rathalos-cream"],
  ["monster-hunter-dreadking-rathalos", "Rathalos Maldito — Black Flame", "Rathalos Maldito", "#f0d5ad", "#351417", "#ad2634", "mhm-lava"],
  ["monster-hunter-azure-rathalos", "Azure Rathalos — Blue Sky", "Rathalos", "#f1dfbc", "#32688f", "#d76432", "mhm-rathalos-cream"],
  ["monster-hunter-silver-rathalos", "Silver Rathalos — Silver Sun", "Rathalos", "#263342", "#c7ced1", "#a74332", "mhm-rathalos-blue"],
  ["monster-hunter-zinogre", "Zinogre — Thunder", "Zinogre", "#f6dc45", "#24598d", "#e6e0c4", "mhm-lightning"],
  ["monster-hunter-stygian-zinogre", "Stygian Zinogre — Dragon", "Zinogre", "#f0ddd0", "#211b25", "#ba263b", "mhm-crimson"],
  ["monster-hunter-thunderlord-zinogre", "Thunderlord Zinogre — Apex", "Zinogre", "#18263c", "#d8ae2f", "#66b8dd", "mhm-ice"],
  ["monster-hunter-anjanath", "Anjanath — Furnace", "Anjanath", "#f0d2b6", "#b95145", "#2d3039", "mhm-charcoal"],
  ["monster-hunter-fulgur-anjanath", "Fulgur Anjanath — Frostlight", "Anjanath", "#efc932", "#dbe5df", "#3d7ca6", "mhm-ice"],
  ["monster-hunter-rathian", "Rathian — Verdant", "Rathian", "#f1dfb4", "#557845", "#ad3135", "mhm-venom"],
  ["monster-hunter-pink-rathian", "Pink Rathian — Blossom", "Rathian", "#f5e4c3", "#c56f8e", "#6c354d", "mhm-poison"],
  ["monster-hunter-gold-rathian", "Gold Rathian — Sovereign", "Rathian", "#3c2718", "#c89b35", "#f0dfaf", "mhm-gold"],
  ["monster-hunter-dreadqueen-rathian", "Rathian Maldita — Venom Queen", "Rathian", "#d9d0b5", "#49243f", "#79a84e", "mhm-venom"],
  ["monster-hunter-nargacuga", "Nargacuga — Night", "Nargacuga", "#d5d7dc", "#20242e", "#a62d3b", "mhm-crimson"],
  ["monster-hunter-green-nargacuga", "Green Nargacuga — Canopy", "Nargacuga", "#e8dfba", "#4b6e46", "#d0a135", "mhm-gold"],
  ["monster-hunter-silverwind-nargacuga", "Silverwind Nargacuga — Mooncut", "Nargacuga", "#202733", "#c7d2da", "#6f8494", "mhm-charcoal"],
  ["monster-hunter-tigrex", "Tigrex — Rampage", "Tigrex", "#20242c", "#d59b35", "#4c73a5", "mhm-charcoal"],
  ["monster-hunter-brute-tigrex", "Brute Tigrex — Roar", "Tigrex", "#e2c9a6", "#4a352b", "#cb5a2e", "mhm-lava"],
  ["monster-hunter-molten-tigrex", "Molten Tigrex — Magma", "Tigrex", "#f2d2a0", "#63252a", "#ef6a22", "mhm-lava"],
  ["monster-hunter-grimclaw-tigrex", "Grimclaw Tigrex — Rending", "Tigrex", "#e2e5e7", "#2e3f55", "#bd472d", "mhm-crimson"],
  ["monster-hunter-lagiacrus", "Lagiacrus — Abyssal Current", "Lagiacrus", "#d5e7df", "#244b76", "#2e9b9b", "mhm-teal"],
  ["monster-hunter-ivory-lagiacrus", "Ivory Lagiacrus — Pearl Storm", "Lagiacrus", "#245e86", "#e5dfc8", "#d0ae38", "mhm-lightning"]
  ,["monster-hunter-yian-kut-ku", "Yian Kut-Ku — Mischief", "Yian Kut-Ku", "#f1dfb7", "#c66a58", "#d8aa3d", "mhm-charcoal"]
  ,["monster-hunter-blue-yian-kut-ku", "Blue Yian Kut-Ku — Azure Mischief", "Yian Kut-Ku", "#f1dfb7", "#477ea0", "#d06b38", "mhm-gold"]
  ,["monster-hunter-yian-garuga", "Yian Garuga — Venom", "Yian Garuga", "#e4d9bd", "#392d43", "#aa3544", "mhm-poison"]
  ,["monster-hunter-deadeye-yian-garuga", "Deadeye Yian Garuga — Survivor", "Yian Garuga", "#ded7c5", "#242a31", "#8f4058", "mhm-crimson"]
  ,["monster-hunter-kushala-daora", "Kushala Daora — Steel Tempest", "Elder Dragons", "#202b36", "#9ba9ad", "#8bc3dc", "mhm-silver"]
  ,["monster-hunter-velkhana", "Velkhana — Iceborne", "Elder Dragons", "#224d78", "#dce8e9", "#7dd4e4", "mhm-ice"]
  ,["monster-hunter-rajang", "Rajang — Golden Fury", "Apex Beasts", "#252126", "#d5a52b", "#715039", "mhm-lightning"]
  ,["monster-hunter-teostra", "Teostra — Solar Flame", "Elder Dragons", "#f0d7ad", "#a82f2e", "#d7a438", "mhm-lava"]
  ,["monster-hunter-kirin", "Kirin — Thunderhoof", "Elder Dragons", "#274c73", "#e8e5da", "#61b9df", "mhm-lightning"]
  ,["monster-hunter-oroshi-kirin", "Oroshi Kirin — Frozen Thunder", "Elder Dragons", "#26394f", "#b9d4df", "#f2f3eb", "mhm-ice"]
  ,["monster-hunter-namielle", "Namielle — Abyssal Light", "Elder Dragons", "#57d2d2", "#2d315d", "#b44483", "mhm-teal"]
  ,["monster-hunter-malzeno", "Malzeno — Blood Moon", "Elder Dragons", "#eee0c5", "#58243b", "#9e477f", "mhm-poison"]
  ,["monster-hunter-thunder-serpent-narwa", "Narwa — Thunder Serpent", "Elder Dragons", "#392a50", "#d3a941", "#ebe1b9", "mhm-lightning"]
  ,["monster-hunter-wind-serpent-ibushi", "Ibushi — Wind Serpent", "Elder Dragons", "#e8dfc1", "#477f83", "#c98643", "mhm-teal"]
  ,["monster-hunter-yama-tsukami", "Yama Tsukami — Ancient Canopy", "Elder Dragons", "#dfe2bd", "#506646", "#b7963d", "mhm-venom"]
]);

function asset(slug) {
  return `${PRIVATE_ROOT}/${slug}.webp`;
}

function facesFor(collection) {
  if (collection.icon) {
    const icon = asset(collection.icon);
    return { low: icon, high: icon };
  }
  return { low: asset(collection.low), high: asset(collection.high) };
}

async function registerSystems(dice3d) {
  try {
    const { DiceSystem } = await import("/modules/dice-so-nice/api.js");
    for (const collection of COLLECTIONS) {
      dice3d.addSystem(new DiceSystem(collection.id, collection.name, "default", "Monster Hunter"));
    }
  } catch {
    for (const collection of COLLECTIONS) {
      dice3d.addSystem({ id: collection.id, name: collection.name }, false);
    }
  }
}

async function registerTextures(dice3d) {
  await Promise.all(TEXTURES.map(([id, name, file]) => dice3d.addTexture(id, {
    name,
    composite: "source-over",
    source: `${TEXTURE_ROOT}/${file}`
  })));
}

function registerColorsets(dice3d) {
  dice3d.addColorset({
    name: "monster-hunter-guild",
    description: "Monster Hunter — Hunter's Guild",
    category: "Monster Hunter",
    foreground: "#f3e6c6",
    background: "#6e1f1f",
    outline: "#1a0d08",
    edge: "#b58a45",
    texture: "bronze01",
    material: "metal",
    font: "Signika",
    labelComposite: "source-over",
    visibility: "visible"
  }, "default");

  for (const [name, description, family, foreground, background, edge, texture] of COLORSETS) {
    dice3d.addColorset({
      name,
      description,
      category: `Monster Hunter — ${family}`,
      foreground,
      background,
      outline: "#1c1515",
      edge,
      texture,
      material: "metal",
      font: "Signika",
      labelComposite: "source-over",
      visibility: "visible"
    }, "default");
  }
}

function numberedLabels(sides, faces) {
  const labels = Array.from({ length: sides }, (_value, index) => String(index + 1));
  labels[0] = faces.low;
  labels[labels.length - 1] = faces.high;
  return labels;
}

function registerPresetCollection(dice3d, collection) {
  const faces = facesFor(collection);
  for (const sides of STANDARD_SIDES) {
    dice3d.addDicePreset({
      type: `d${sides}`,
      labels: numberedLabels(sides, faces),
      system: collection.id,
      ...(collection.colorset ? { colorset: collection.colorset } : {}),
      labelScale: 0.92
    });
  }

  dice3d.addDicePreset({
    type: "d10",
    labels: [faces.low, "2", "3", "4", "5", "6", "7", "8", "9", faces.high],
    system: collection.id,
    ...(collection.colorset ? { colorset: collection.colorset } : {}),
    labelScale: 0.92
  });

  dice3d.addDicePreset({
    type: "d100",
    labels: [faces.high, "10", "20", "30", "40", "50", "60", "70", "80", "90"],
    system: collection.id,
    ...(collection.colorset ? { colorset: collection.colorset } : {}),
    labelScale: 0.92
  });
}

async function collectionAssetsExist(collection) {
  const sources = [...new Set(Object.values(facesFor(collection)))];
  const checks = await Promise.all(sources.map(async (source) => {
    try {
      const response = await fetch(source, { method: "HEAD", cache: "no-store" });
      return response.ok;
    } catch {
      return false;
    }
  }));
  return checks.every(Boolean);
}

export function registerDiceSoNice() {
  Hooks.once("diceSoNiceReady", async (dice3d) => {
    await registerSystems(dice3d);
    await registerTextures(dice3d);
    registerColorsets(dice3d);

    for (const collection of COLLECTIONS) {
      if (await collectionAssetsExist(collection)) registerPresetCollection(dice3d, collection);
    }
  });
}

export const diceApi = Object.freeze({
  collections: COLLECTIONS,
  colorsets: COLORSETS.map(([id]) => id),
  supportedTypes: Object.freeze([
    ...STANDARD_SIDES.map((sides) => `d${sides}`),
    "d10",
    "d100"
  ])
});
