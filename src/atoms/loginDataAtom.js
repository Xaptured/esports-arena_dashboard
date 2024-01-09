import { atom } from "jotai";

export const USERS = {
    PARTICIPANT: 'participant',
    ORGANIZER: 'organizer',
    ADMIN: 'admin',
}

const user = {
    userType: '',
    email: ''
}

export const loggedInUserAtom = atom(user);