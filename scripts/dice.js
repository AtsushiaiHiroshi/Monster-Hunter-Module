const SYSTEMS = Object.freeze({
  GUILD: Object.freeze({ id: "monster-hunter", name: "Monster Hunter — Guild Pair" }),
  RATHALOS: Object.freeze({ id: "monster-hunter-rathalos", name: "Monster Hunter — Rathalos" })
});
const COLORSETS = Object.freeze({
  GUILD: "monster-hunter-guild",
  RATHALOS_EMBER: "monster-hunter-rathalos-ember",
  RATHALOS_IVORY: "monster-hunter-rathalos-ivory",
  RATHALOS_AZURE: "monster-hunter-rathalos-azure"
});
const PRIVATE_ASSET_ROOT = "modules/monster-hunter-module/assets/dice/private";
const TEXTURE_ASSET_ROOT = "modules/monster-hunter-module/assets/dice/textures";
const PRIVATE_FACES = Object.freeze({
  low: `${PRIVATE_ASSET_ROOT}/rathian.webp`,
  high: `${PRIVATE_ASSET_ROOT}/rathalos.webp`
});
const STANDARD_DICE_SIDES = Object.freeze([2, 4, 6, 8, 12, 14, 16, 20, 24, 30]);

async function registerSystems(dice3d) {
  try {
    const { DiceSystem } = await import("/modules/dice-so-nice/api.js");
    for (const system of Object.values(SYSTEMS)) {
      dice3d.addSystem(new DiceSystem(system.id, system.name, "default", "Monster Hunter"));
    }
  } catch {
    for (const system of Object.values(SYSTEMS)) {
      dice3d.addSystem({ id: system.id, name: system.name }, false);
    }
  }
}

function numberedLabels(sides, faces) {
  const labels = Array.from({ length: sides }, (_value, index) => String(index + 1));
  labels[0] = faces.low;
  labels[labels.length - 1] = faces.high;
  return labels;
}

function registerPresetCollection(dice3d, { system, faces, colorset }) {
  for (const sides of STANDARD_DICE_SIDES) {
    dice3d.addDicePreset({
      type: `d${sides}`,
      labels: numberedLabels(sides, faces),
      system,
      ...(colorset ? { colorset } : {}),
      labelScale: 0.92
    });
  }

  dice3d.addDicePreset({
    type: "d10",
    labels: [
      faces.low,
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      faces.high
    ],
    system,
    ...(colorset ? { colorset } : {}),
    labelScale: 0.92
  });

  dice3d.addDicePreset({
    type: "d100",
    labels: [
      faces.high,
      "10",
      "20",
      "30",
      "40",
      "50",
      "60",
      "70",
      "80",
      "90"
    ],
    system,
    ...(colorset ? { colorset } : {}),
    labelScale: 0.92
  });
}

async function registerRathalosTextures(dice3d) {
  await Promise.all([
    dice3d.addTexture("mhm-rathalos-veins-blue", {
      name: "Rathalos — Blue Veins",
      composite: "source-over",
      source: `${TEXTURE_ASSET_ROOT}/rathalos-veins-blue.webp`
    }),
    dice3d.addTexture("mhm-rathalos-veins-cream", {
      name: "Rathalos — Cream Veins",
      composite: "source-over",
      source: `${TEXTURE_ASSET_ROOT}/rathalos-veins-cream.webp`
    })
  ]);
}

function registerColorsets(dice3d) {
  const shared = {
    category: "Monster Hunter — Rathalos",
    outline: "#24130e",
    material: "metal",
    font: "Signika",
    labelComposite: "source-over",
    visibility: "visible"
  };

  dice3d.addColorset({
    name: COLORSETS.RATHALOS_EMBER,
    description: "Rathalos — Ember",
    foreground: "#f3dfb5",
    background: "#bd4b20",
    edge: "#245e96",
    texture: "mhm-rathalos-veins-blue",
    ...shared
  }, "default");

  dice3d.addColorset({
    name: COLORSETS.RATHALOS_IVORY,
    description: "Rathalos — Ivory",
    foreground: "#d95b24",
    background: "#ead6aa",
    edge: "#245e96",
    texture: "mhm-rathalos-veins-blue",
    ...shared
  }, "default");

  dice3d.addColorset({
    name: COLORSETS.RATHALOS_AZURE,
    description: "Rathalos — Azure Script",
    foreground: "#2769a2",
    background: "#bd4b20",
    edge: "#ead6aa",
    texture: "mhm-rathalos-veins-cream",
    ...shared
  }, "default");
}

async function privateFacesAreInstalled() {
  const checks = await Promise.all(
    Object.values(PRIVATE_FACES).map(async (source) => {
      try {
        const response = await fetch(source, { method: "HEAD", cache: "no-store" });
        return response.ok;
      } catch {
        return false;
      }
    })
  );
  return checks.every(Boolean);
}

export function registerDiceSoNice() {
  Hooks.once("diceSoNiceReady", async (dice3d) => {
    await registerSystems(dice3d);
    await registerRathalosTextures(dice3d);

    dice3d.addColorset(
      {
        name: COLORSETS.GUILD,
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
      },
      "default"
    );

    registerColorsets(dice3d);

    if (await privateFacesAreInstalled()) {
      registerPresetCollection(dice3d, {
        system: SYSTEMS.GUILD.id,
        faces: PRIVATE_FACES,
        colorset: COLORSETS.GUILD
      });
      registerPresetCollection(dice3d, {
        system: SYSTEMS.RATHALOS.id,
        faces: { low: PRIVATE_FACES.high, high: PRIVATE_FACES.high }
      });
    }
  });
}

export const diceApi = Object.freeze({
  systems: SYSTEMS,
  colorsets: COLORSETS,
  privateFaces: PRIVATE_FACES,
  supportedTypes: Object.freeze([
    ...STANDARD_DICE_SIDES.map((sides) => `d${sides}`),
    "d10",
    "d100"
  ])
});
