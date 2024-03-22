import { atom } from "jotai";

export const activeParticipantTabsAtom = atom([true, false, false, false]);

export const activeOrganizerTabsAtom = atom([true, false, false, false]);

export const activeAdminTabsAtom = atom([true, false]);