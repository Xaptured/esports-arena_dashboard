import { atom } from "jotai";

export const USERS = {
    PARTICIPANT: 'participant',
    ORGANIZER: 'organizer',
    ADMIN: 'admin',
}

const user = {
    userType: '',
    email: '',
}

const profileStatus = false;

export const loggedInUserAtom = atom(user);
export const profileStatusAtom = atom(profileStatus);