# Monster Hunter for D&D 5e

An open-source Foundry VTT v13+ module that reshapes D&D 5e into a non-magical
Monster Hunter campaign framework.

## Current foundation

- Strict world-level policy that blocks spell documents and heuristically
  detected magical classes, subclasses, feats and equipment.
- Spellbook UI suppression on ApplicationV2 actor sheets.
- Rider/monstie links stored as Foundry document flags.
- A public mount API for macros and future sheets.
- A Hunter's Guild colorset for Dice So Nice.
- English and Spanish localization.

## Install for development

Clone the repository into:

`{Foundry user data}/Data/modules/monster-hunter-module`

Enable the module in a world running D&D 5e on Foundry VTT v13.

Dice So Nice is recommended, but not required.

## Mount API

```js
const mh = game.modules.get("monster-hunter-module").api;

await mh.mounts.mount(riderActor, monstieActor);
await mh.mounts.dismount(riderActor);
mh.mounts.getMountLink(riderActor);
```

## Non-magical override

The strict policy intentionally fails closed. A mundane item caught by the
heuristic can be explicitly marked as safe by setting:

```js
flags["monster-hunter-module"].allowNonMagical = true
```

The module does not delete existing world data. Existing magical content should
be audited and removed deliberately before play.

## Data roadmap

The supplied homebrew PDFs and Monster Buddy are research sources, not bundled
assets. Data must be normalized, attributed, checked for redistribution rights,
and adapted into original Foundry compendia before release.

Monster Buddy is especially useful for monstie attack types, eggs, riding
actions, genes, habitats and weaknesses:

- https://monsterbuddy.app/2
- https://monsterbuddy.app/3

## Legal

This is an unofficial fan project. It is not affiliated with or endorsed by
Capcom, Wizards of the Coast, Foundry Gaming LLC, or Dice So Nice.
