const SYSTEM_ID = "monster-hunter";
const COLORSET_ID = "monster-hunter-guild";
const PRIVATE_ASSET_ROOT = "modules/monster-hunter-module/assets/dice/private";
const PRIVATE_FACES = Object.freeze({
  low: `${PRIVATE_ASSET_ROOT}/rathian.webp`,
  high: `${PRIVATE_ASSET_ROOT}/rathalos.webp`
});

async function registerSystem(dice3d) {
  try {
    const { DiceSystem } = await import("/modules/dice-so-nice/api.js");
    dice3d.addSystem(new DiceSystem(SYSTEM_ID, "Monster Hunter", "default", "Monster Hunter"));
  } catch {
    dice3d.addSystem({ id: SYSTEM_ID, name: "Monster Hunter" }, false);
  }
}

function numberedLabels(sides) {
  const labels = Array.from({ length: sides }, (_value, index) => String(index + 1));
  labels[0] = PRIVATE_FACES.low;
  labels[labels.length - 1] = PRIVATE_FACES.high;
  return labels;
}

function registerPrivatePresets(dice3d) {
  for (const sides of [2, 4, 6, 8, 12, 20]) {
    dice3d.addDicePreset({
      type: `d${sides}`,
      labels: numberedLabels(sides),
      system: SYSTEM_ID,
      colorset: COLORSET_ID,
      labelScale: 0.92
    });
  }

  dice3d.addDicePreset({
    type: "d10",
    labels: [
      PRIVATE_FACES.low,
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      PRIVATE_FACES.high
    ],
    system: SYSTEM_ID,
    colorset: COLORSET_ID,
    labelScale: 0.92
  });

  dice3d.addDicePreset({
    type: "d100",
    labels: [
      PRIVATE_FACES.high,
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
    system: SYSTEM_ID,
    colorset: COLORSET_ID,
    labelScale: 0.92
  });
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
    await registerSystem(dice3d);

    dice3d.addColorset(
      {
        name: COLORSET_ID,
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

    if (await privateFacesAreInstalled()) registerPrivatePresets(dice3d);
  });
}

export const diceApi = Object.freeze({
  system: SYSTEM_ID,
  colorset: COLORSET_ID,
  privateFaces: PRIVATE_FACES
});
