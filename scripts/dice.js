const SYSTEM_ID = "monster-hunter";
const COLORSET_ID = "monster-hunter-guild";

export function registerDiceSoNice() {
  Hooks.once("diceSoNiceReady", (dice3d) => {
    dice3d.addSystem(
      {
        id: SYSTEM_ID,
        name: "Monster Hunter"
      },
      false
    );

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
        visibility: "visible"
      },
      "default"
    );
  });
}

export const diceApi = Object.freeze({
  system: SYSTEM_ID,
  colorset: COLORSET_ID
});
