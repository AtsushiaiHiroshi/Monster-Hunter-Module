# Monster Hunter for D&D 5e

An open-source Foundry VTT v13+ module that reshapes D&D 5e into a non-magical
Monster Hunter campaign framework.

## First playable contract

Version 0.3.0 includes a complete Great Jagras test loop:

1. Enable the module in a D&D5e world and reload it.
2. Type `/mhm` in chat.
3. As GM, create the Hunter Initiate and deploy Great Jagras.
4. Drag the hunter to the scene, control its token, and target Great Jagras.
5. Fight using the weapon activities on both actor sheets.
6. Use Carve or Capture Rewards from the guild board.
7. Gather enough materials to craft the Jagras Blade or Jagras Mail.

Deploying Great Jagras resets its hit points and harvest state. Each deployed
hunt grants two material rolls, matching its supplied carve/capture entry.

### Targetable monster parts

Great Jagras also provides synchronized part HP for its head, body, forelegs,
hindlegs, tail and inflated stomach. Target the monster before rolling an
attack, then choose the intended part on the attack message. When D&D5e applies
the damage, the module:

- applies the hitzone percentage for slashing, bludgeoning, piercing, fire,
  water, lightning, cold or dragon damage;
- subtracts the result from both the monster's body HP and the selected part;
- marks breakable parts as broken at 0 part HP;
- prevents actions that require a broken part;
- adds part-break rewards to the final carve or capture.

The supplied Great Jagras hitzones and break thresholds are adapted from
Monster Hunter: World data. Raw source thresholds remain stored in the Actor
flags while the playable part HP are scaled to the D&D5e stat block.

### Character policy

All races remain available. The strict no-magic policy permits the base
Barbarian, Fighter and Rogue plus explicitly approved non-casting subclasses.
Monk and all spellcasting classes are blocked. Ranger and Artificer will be
provided as module-owned non-casting revisions; Beast Master and Drakewarden
will become the Buddy and Rider paths rather than importing their original
spellcasting implementations.

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

The catalog includes Rathalos, Zinogre, Anjanath, Rathian, Nargacuga, Tigrex,
Lagiacrus, Yian Kut-Ku and Yian Garuga families with their principal variants.
It also includes Kushala Daora, Velkhana, Teostra, Kirin, Oroshi Kirin,
Namielle, Malzeno, Narwa, Ibushi, Yama Tsukami and Rajang. Each system supplies
all 12 numbered dice types, private full-color face art and an original public
color texture. Normal Rathalos additionally offers Ember, Ivory and Azure
Script arrangements.

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
