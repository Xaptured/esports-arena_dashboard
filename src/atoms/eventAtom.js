import { atom } from "jotai";

export const eventDetailsAtom = atom(undefined);

export const activeEventsAtom = atom(undefined);

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