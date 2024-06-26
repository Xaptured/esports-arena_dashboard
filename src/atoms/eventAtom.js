import { atom } from "jotai";

export const eventDetailsAtom = atom(undefined);

export const activeEventsAtom = atom([]);
// FIX
export const activeOrganizerEvents = atom([]);

export const inactiveEventsAtom = atom([]);

export const inactiveOrganizerEvents = atom([]);

export const futureEventsAtom = atom([]);

export const futureOrganizerEvents = atom([]);

export const eventOrganizerDetailsAtom = atom(undefined);

export const eventDetailsAtomCopy = atom({
    name: "PUBG-EVENT",
    date: "12-12-2012",
    time: "1:10:00",
    duration: "1:00",
    playersPerSlot: 4,
    slotCount: 10,
    remainingSlots: 8,
    type: "FREE",
    prizePool: 30000,
    rules: [
        {
            description: "rule-1"
        },
        {
            description: "rule-2"
        }
    ]
});

export const eventOrganizerDetailsAtomCopy = atom({
    name: "PUBG-EVENT",
    date: "12-12-2012",
    time: "1:10:00",
    duration: "1:00",
    playersPerSlot: 4,
    slotCount: 10,
    remainingSlots: 8,
    type: "FREE",
    prizePool: 30000,
    rules: [
        {
            description: "rule-1"
        },
        {
            description: "rule-2"
        }
    ]
});

export const activeEventsAtomCopy = atom([
    {
        name: "PUBG-EVENT"
    },
    {
        name: "BGMI-EVENT"
    },
    {
        name: "PUBG-EVENT"
    },
    {
        name: "BGMI-EVENT"
    },
    {
        name: "PUBG-EVENT"
    },
    {
        name: "BGMI-EVENT"
    },
    {
        name: "PUBG-EVENT"
    },
    {
        name: "BGMI-EVENT"
    },
    {
        name: "PUBG-EVENT"
    },
    {
        name: "BGMI-EVENT"
    }
]);

export const activeOrganizerEventsCopy = atom([
    {
        name: "PUBG-EVENT"
    },
    {
        name: "BGMI-EVENT"
    },
    {
        name: "PUBG-EVENT"
    },
    {
        name: "BGMI-EVENT"
    },
    {
        name: "PUBG-EVENT"
    },
    {
        name: "BGMI-EVENT"
    },
    {
        name: "PUBG-EVENT"
    },
    {
        name: "BGMI-EVENT"
    },
    {
        name: "PUBG-EVENT"
    },
    {
        name: "BGMI-EVENT"
    }
]);

export const inactiveEventsAtomCopy = atom([
    {
        name: "PUBG-EVENT"
    },
    {
        name: "BGMI-EVENT"
    },
    {
        name: "PUBG-EVENT"
    },
    {
        name: "BGMI-EVENT"
    },
    {
        name: "PUBG-EVENT"
    },
    {
        name: "BGMI-EVENT"
    },
    {
        name: "PUBG-EVENT"
    },
    {
        name: "BGMI-EVENT"
    },
    {
        name: "PUBG-EVENT"
    },
    {
        name: "BGMI-EVENT"
    }
]);

export const futureEventsAtomCopy = atom([
    {
        name: "PUBG-EVENT"
    },
    {
        name: "BGMI-EVENT"
    },
    {
        name: "PUBG-EVENT"
    },
    {
        name: "BGMI-EVENT"
    },
    {
        name: "PUBG-EVENT"
    },
    {
        name: "BGMI-EVENT"
    },
    {
        name: "PUBG-EVENT"
    },
    {
        name: "BGMI-EVENT"
    },
    {
        name: "PUBG-EVENT"
    },
    {
        name: "BGMI-EVENT"
    }
]);

export const inactiveOrganizerEventsCopy = atom([
    {
        name: "PUBG-EVENT"
    },
    {
        name: "BGMI-EVENT"
    },
    {
        name: "PUBG-EVENT"
    },
    {
        name: "BGMI-EVENT"
    },
    {
        name: "PUBG-EVENT"
    },
    {
        name: "BGMI-EVENT"
    },
    {
        name: "PUBG-EVENT"
    },
    {
        name: "BGMI-EVENT"
    },
    {
        name: "PUBG-EVENT"
    },
    {
        name: "BGMI-EVENT"
    }
]);

export const futureOrganizerEventsCopy = atom([
    {
        name: "PUBG-EVENT"
    },
    {
        name: "BGMI-EVENT"
    },
    {
        name: "PUBG-EVENT"
    },
    {
        name: "BGMI-EVENT"
    },
    {
        name: "PUBG-EVENT"
    },
    {
        name: "BGMI-EVENT"
    },
    {
        name: "PUBG-EVENT"
    },
    {
        name: "BGMI-EVENT"
    },
    {
        name: "PUBG-EVENT"
    },
    {
        name: "BGMI-EVENT"
    }
]);