import { MODULE_ID, SETTINGS } from "./constants.js";

const FLAG = "mountLink";

async function resolveActor(reference) {
  if (!reference) return null;
  if (reference.documentName === "Actor") return reference;
  if (reference.actor?.documentName === "Actor") return reference.actor;
  if (typeof reference === "string") {
    const document = await fromUuid(reference);
    return document?.documentName === "Actor" ? document : document?.actor ?? null;
  }
  return null;
}

function assertMountsEnabled() {
  if (!game.settings.get(MODULE_ID, SETTINGS.ENABLE_MOUNTS)) {
    throw new Error(game.i18n.localize("MHM.Mounts.Disabled"));
  }
}

function assertOwner(actor) {
  if (!actor?.isOwner && !game.user.isGM) {
    throw new Error(game.i18n.localize("MHM.Mounts.NotOwner"));
  }
}

export async function mount(riderReference, mountReference) {
  assertMountsEnabled();
  const [rider, mountActor] = await Promise.all([
    resolveActor(riderReference),
    resolveActor(mountReference)
  ]);

  if (!rider || !mountActor) throw new Error(game.i18n.localize("MHM.Mounts.ActorMissing"));
  if (rider.id === mountActor.id) throw new Error(game.i18n.localize("MHM.Mounts.SameActor"));
  assertOwner(rider);

  await Promise.all([
    rider.setFlag(MODULE_ID, FLAG, { role: "rider", partnerUuid: mountActor.uuid }),
    mountActor.setFlag(MODULE_ID, FLAG, { role: "mount", partnerUuid: rider.uuid })
  ]);

  Hooks.callAll("monsterHunterMount", { rider, mount: mountActor });
  ui.notifications.info(game.i18n.format("MHM.Mounts.Linked", {
    rider: rider.name,
    mount: mountActor.name
  }));
  return { rider, mount: mountActor };
}

export async function dismount(reference) {
  assertMountsEnabled();
  const actor = await resolveActor(reference);
  if (!actor) throw new Error(game.i18n.localize("MHM.Mounts.ActorMissing"));
  assertOwner(actor);

  const link = actor.getFlag(MODULE_ID, FLAG);
  const partner = await resolveActor(link?.partnerUuid);
  await actor.unsetFlag(MODULE_ID, FLAG);
  if (partner?.getFlag(MODULE_ID, FLAG)?.partnerUuid === actor.uuid) {
    await partner.unsetFlag(MODULE_ID, FLAG);
  }

  Hooks.callAll("monsterHunterDismount", { actor, partner });
  return { actor, partner };
}

export function getMountLink(reference) {
  const actor = reference?.documentName === "Actor" ? reference : reference?.actor;
  return actor?.getFlag(MODULE_ID, FLAG) ?? null;
}

export const mountsApi = Object.freeze({ mount, dismount, getMountLink });
