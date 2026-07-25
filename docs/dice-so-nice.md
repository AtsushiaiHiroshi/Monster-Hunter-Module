# Dice So Nice integration

This document is the implementation contract for Monster Hunter dice.

## Current implementation

The module registers:

- Dice system ID: `monster-hunter`
- Colorset ID: `monster-hunter-guild`
- Full-color image labels using `source-over` composition
- Private Rathian/Rathalos presets for d2, d4, d6, d8, d10, d12, d20 and d100

Private artwork is loaded only when both expected WebP files are installed.
Missing private files never prevent the public module from loading.

## Face convention

| Type | Low face | High face |
| --- | --- | --- |
| d2 | Rathian (`1`) | Rathalos (`2`) |
| d4 | Rathian (`1`) | Rathalos (`4`) |
| d6 | Rathian (`1`) | Rathalos (`6`) |
| d8 | Rathian (`1`) | Rathalos (`8`) |
| d10 | Rathian (`1`) | Rathalos (`0` / `10`) |
| d12 | Rathian (`1`) | Rathalos (`12`) |
| d20 | Rathian (`1`) | Rathalos (`20`) |
| d100 | normal tens | Rathalos (`00` / `100`) |

Labels are 256×256 lossless WebP images with transparency. Full color is
preserved deliberately; `labelComposite` must remain `source-over`.

## Normal Foundry rolls

Dice So Nice detects chat messages with a non-empty `rolls` array. Standard
D&D 5e rolls should therefore use normal Foundry `Roll` and `ChatMessage`
workflows instead of calling the animation API manually.

For future Monster Hunter action cards:

1. Put all `Roll` objects in the primary chat message.
2. Use `roll.options.rollOrder` when attack and damage must animate in groups.
3. Add `roll.data.actorId` when a message contains rolls from several actors.
4. Use companion-message flags for separate result or action cards.

## Suggested private effects

Dice So Nice v6 effects can be configured with advanced trigger formulas:

- `d20 == 20` — successful hunt critical
- `d20 == 1` — catastrophic miss
- `d20 == 1,20` — either special monster face
- `total == 100` — percentile maximum

Effects are user preferences, so the module should provide recommended profiles
or macros without silently replacing a player's Dice So Nice configuration.

## Custom 3D model phase

The current image-label approach uses Dice So Nice's optimized built-in meshes.
Future physical Monster Hunter dice may instead supply `modelFile` in each
DicePreset.

Requirements:

- Export as glTF/GLB; Draco compression is supported.
- Use low-poly geometry suitable for WebGL.
- Use Principled BSDF materials only.
- Keep textures at 1024px or below.
- Match Dice So Nice face positions and opposite-face conventions.
- Align and scale against the official template without modifying the template.
- Apply every object transform before export.
- Exclude cameras, lights and template objects from the export.
- Set the `glow` userData value when a non-root mesh should receive Dice So
  Nice glow/darkness effects.

Example:

```js
dice3d.addDicePreset({
  type: "d20",
  modelFile: "modules/monster-hunter-module/assets/dice/models/d20.glb",
  system: "monster-hunter"
});
```

## Performance and packaging

- Keep the built-in-mesh image preset as the default lightweight option.
- Offer GLB models as an opt-in high-detail system.
- Combine larger face collections into a TexturePacker atlas when many monster
  themes are installed.
- Never require Dice So Nice for the main Monster Hunter rules module.

## Official references

- https://riccisi.gitlab.io/foundryvtt-dice-so-nice/api/integration/
- https://riccisi.gitlab.io/foundryvtt-dice-so-nice/api/hooks/
- https://riccisi.gitlab.io/foundryvtt-dice-so-nice/api/roll/
- https://riccisi.gitlab.io/foundryvtt-dice-so-nice/api/customization/
- https://riccisi.gitlab.io/foundryvtt-dice-so-nice/api/3d-models/
- https://riccisi.gitlab.io/foundryvtt-dice-so-nice/api/texturepacker/
- https://riccisi.gitlab.io/foundryvtt-dice-so-nice/api/system-settings/
- https://riccisi.gitlab.io/foundryvtt-dice-so-nice/api/shaders/
- https://riccisi.gitlab.io/foundryvtt-dice-so-nice/api/events/
- https://riccisi.gitlab.io/foundryvtt-dice-so-nice/guide/special-effects/
