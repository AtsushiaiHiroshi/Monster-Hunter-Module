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

### Private full-color dice faces

Private-use artwork can be installed into `assets/dice/private`. These files are
ignored by Git and are not included in releases. When `rathian.webp` and
`rathalos.webp` are present, the module registers a complete Dice So Nice set
covering d2, d4, d6, d8, d10, d12, d14, d16, d20, d24, d30 and d100. Rathian
replaces the low face, Rathalos replaces the highest face, and Rathalos replaces
`00` on percentile dice.

See [the Dice So Nice implementation contract](docs/dice-so-nice.md) for face
mapping, performance rules, effects and the custom GLB roadmap.

The first dedicated monster collection is Rathalos, with Ember, Ivory and Azure
Script color variants. Additional monster systems can reuse the same preset
factory while supplying their own private face art and public color textures.

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
