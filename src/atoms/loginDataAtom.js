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
const userCopy = {
    userType: 'participant',
    email: 'jk19011999@gmail.com',
}

const profileStatus = false;

const useCopyValue = true;

export const loggedInUserAtom = atom(user);
export const loggedInUserAtomCopy = atom(userCopy);
export const profileStatusAtom = atom(profileStatus);
export const useCopyValueAtom = atom(useCopyValue);