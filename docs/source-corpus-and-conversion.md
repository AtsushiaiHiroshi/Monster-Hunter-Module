# Source Corpus and No-Magic Conversion

This document records the source hierarchy and conversion rules for the
Monster Hunter module. PDF page references use the physical PDF page number,
not the printed page number.

## Corpus audit

| Source | Pages | Role in the module | Decision |
| --- | ---: | --- | --- |
| Amellwind's Guide to Monster Hunting.pdf | 210 | Campaign framework, character options, hunts, gathering, crafting and equipment effects | Primary rules source |
| Amellwind's Guide to Monster Hunting-2.pdf | 178 | Earlier edition of the same guide | Comparison and regression source |
| Amellwind's Guide to Monster Hunting-1.pdf | 153 | Earliest supplied edition of the same guide | Comparison and regression source |
| Monster Hunter Monster Manual.pdf | 636 | Monster stat blocks, conditions, carve/capture tables and material effects | Primary monster and material source |
| Monster Hunter Monster Loot Tables.pdf | 421 | Earlier monster-manual edition with 183 creatures | Comparison source; superseded where the 636-page manual has an entry |
| The Complete Monster Hunter Loot Tables - GM Binder.pdf | 113 | Early standalone loot tables | Legacy comparison source |
| MH: TTRPG Guidebook - GM Binder.pdf | 67 | Alternative action-point game with unfinished sections | Inspiration only; do not mix its core math with D&D5e |
| Monster hunter D&D Items - GM Binder.pdf | 2 | Small tool and consumable list | Secondary source, subject to rebalance |
| Monster Hunter Oils - GM Binder.pdf | 2 | Creature-category weapon oils | Non-canonical inspiration; convert only if it matches Monster Hunter coatings |
| Monster Hunter's Arsenal - GM Binder.pdf | 3 | Transforming weapon concepts and charge mechanics | Secondary weapon-design source |
| The Monster Request Manual - GM Binder.pdf | 252 | Cross-franchise and requested creatures, including some Monster Hunter hybrids | Optional bestiary inspiration, never core canon |
| The Complete Monster Hunter Monster Loot Tables.pdf | 0 | Empty file | Unavailable until replaced |

The 11 readable PDFs contain 2,037 pages. Every page was text-extracted with
its source and physical page number preserved. Pages without extractable text
were rendered and inspected. In the 113-page legacy loot-table PDF, the
apparently missing pages are decorative or empty. Pages 1-2 of Monster
Hunter's Arsenal contain image-backed weapon rules and were reviewed from
their rendered pages.

## Source precedence

When two supplied documents conflict, apply this order:

1. Explicit project decisions, especially the prohibition on player magic.
2. The 210-page Amellwind guide for campaign and hunter rules.
3. The 636-page Monster Hunter Monster Manual for monsters, loot and material
   effects.
4. MonsterBuddy for monsties, missing monsters, genes and information absent
   from the supplied manuals.
5. Earlier editions of Amellwind and the monster manual for regression checks
   or content omitted from a later edition.
6. The small GM Binder supplements as optional design references.
7. The Monster Request Manual only for explicitly approved non-canonical or
   hybrid creatures.

No imported rule becomes module content merely because it appears in a
source. It must pass the no-magic, balance, provenance and implementation
reviews.

## Findings that shape the conversion

The latest Amellwind guide explicitly describes Monster Hunter characters as
powerful warriors without magical ability (PDF p. 57), but it also permits
standard D&D classes and contains spell lists, spellcasting traits and magic
items. The guide therefore supplies a useful hunt framework, but is not itself
a magic-free ruleset.

The monster manuals combine each creature with:

- a D&D5e stat block;
- carve and capture chances;
- armor material effects;
- weapon material effects;
- other material and crafting effects.

This is the strongest foundation for the module. However, many material
effects are written as spells, magic reservoirs, attunement or generic D&D
magic. Those implementations must be converted while preserving the monster
fantasy and mechanical purpose.

The alternative 67-page TTRPG guide uses three action points, custom armor
progression and unfinished upgrade tables. Its opening pages visibly contain
to-do markers. It must not be combined wholesale with D&D5e action economy,
bounded accuracy or character progression.

The Arsenal supplement provides recognizable weapon-form mechanics for
longsword, lance, switch axe, charge blade, insect glaive and greatsword, but
describes them as magic weapons requiring attunement. The form, gauge, charge
and movement ideas are reusable; the magic-weapon and attunement framing is
not.

The Oils supplement follows broad D&D creature categories rather than Monster
Hunter's blade coatings and ammunition model. It is not a primary source for
the module.

## No-magic vocabulary

The following D&D concepts must not appear in player-facing module content:

- spell, cantrip, spell slot or spellcasting;
- magical, magic item or magic weapon;
- arcane, divine or pact power;
- ritual casting;
- attunement as a supernatural bond;
- class or subclass whose progression grants spells;
- material effects that reproduce a named spell by reference.

Monster stat blocks may retain extraordinary biological actions such as
breath, lightning discharge, wind pressure or dragon energy. These are
creature physiology and ecology, not a player spell system.

## Conversion taxonomy

Every imported supernatural-looking effect receives one of these sources:

| Source type | Examples | Foundry representation |
| --- | --- | --- |
| Biological | venom sac, roar, scales, regenerative tissue | equipment activity or passive effect sourced by a monster material |
| Elemental organ | flame sac, thunderbug charge, ice gland | elemental damage, resistance, buildup or discharge with limited uses |
| Mechanical | phials, shelling, wire mechanisms, bowgun ammunition | weapon activity, ammunition, gauge or recharge action |
| Alchemical | potions, bombs, coatings, powders and traps | consumable Item with quantity, uses and crafting recipe |
| Training | guard points, counters, evasive steps, hunting styles | hunter feature or weapon technique |
| Environmental | heat resistance, cold adaptation, aquatic mobility | conditional Active Effect or situational movement |

Named D&D spells are rewritten as self-contained mechanics. For example:

- "cast jump" becomes a temporary increase to jump distance caused by elastic
  monster fibers;
- "cast haste" becomes a stamina surge with explicit movement, action and
  fatigue rules;
- "water breathing" becomes respiration through an aquatic monster organ or
  crafted breathing apparatus;
- "magic weapon" becomes a masterwork weapon that counts as a monster-forged
  weapon for resistance rules;
- "attunement" becomes equipment activation, fitting or material-slot limits.

The rewrite must not silently preserve spell interactions, counterspell,
dispel, antimagic, concentration or spell-component rules.

## Equipment model

Hunters gain extraordinary capabilities from loadout choices rather than
spellcasting classes.

An equipment loadout consists of:

- one weapon family and its techniques;
- armor pieces or an armor set;
- monster-material skill slots;
- a talisman or charm;
- decorations when enabled by equipment rarity;
- carried consumables, ammunition and coatings;
- optional buddy or monstie equipment.

Material effects retain their source monster, source body part, rarity,
eligible equipment slots and carve/capture provenance. Duplicate effects from
multiple monsters use one canonical implementation with multiple recipes.

Armor and weapon skills must be data-driven. They are not hard-coded to a
specific Actor sheet and must be reusable by compendia, crafting and migration
tools.

## Character policy

The module remains dependent on D&D5e, but its curated campaign mode will:

- allow only approved non-spellcasting hunter progressions;
- reject spell Items and spellcasting advancement;
- replace class magic with weapon techniques, hunter training and equipment
  skills;
- retain D&D5e abilities, proficiency, saves, skills, actions, reactions,
  exhaustion and bounded accuracy where they remain compatible;
- avoid importing races or backgrounds that grant spells;
- make elemental and status mechanics explicit rather than treating them as
  spells.

The anti-magic policy must validate content during import, creation and
advancement. It must not destructively delete unrelated world content without
GM confirmation.

## Foundry content domains

The conversion will be implemented as separate, traceable domains:

1. rules and terminology;
2. hunter progression;
3. weapon families and techniques;
4. armor, charms and decorations;
5. materials, recipes and crafting;
6. consumables, traps, ammunition and coatings;
7. monsters and conditions;
8. carve, capture and quest rewards;
9. hunting, gathering and exploration;
10. buddies, monsties and mounted combat;
11. journals, tables and localization.

Each generated Actor, Item or RollTable must record a source identifier,
physical source page, conversion version and whether the result is canonical,
adapted or optional.

## Content excluded by default

- spell lists and spellcasting faction rewards from Amellwind;
- spell-granting races, feats, backgrounds and equipment;
- generic D&D magic-item bonuses without a Monster Hunter explanation;
- oils based only on unrelated D&D creature categories;
- unfinished rules from the alternative TTRPG guide;
- cross-franchise creatures from the Monster Request Manual;
- homebrew hybrids unless individually approved;
- any entry available only from the empty PDF.

## First implementation slice

The first playable slice should establish the shared data model before mass
import:

1. Monster material Item subtype and provenance fields.
2. Equipment skill Item subtype with biological, elemental, mechanical,
   alchemical, training or environmental origin.
3. Recipe and crafting data.
4. Carve/capture RollTables.
5. One complete vertical example: Great Jagras monster, loot table, materials,
   armor skills, weapon skills, crafting and a test hunter loadout.
6. Automated checks proving the slice contains no spells, spellcasting,
   magic-item types or named spell references.

Only after this slice is validated should the module generate the remaining
hundreds of monster and material entries.
