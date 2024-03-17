import React from 'react'
import { useAtomValue, useAtom } from 'jotai';
import { eventDetailsAtom, eventDetailsAtomCopy, eventOrganizerDetailsAtom } from '../../../atoms/eventAtom';
import { USERS, useCopyValueAtom } from '../../../atoms/loginDataAtom';
import { loggedInUserAtom, loggedInUserAtomCopy } from '../../../atoms/loginDataAtom';
import EventDetailSection from '../Event/EventDetailSection';

export default function LeaderboardEventDetails() {

    // ESA-058-START
    const useCopyAtom = useAtomValue(useCopyValueAtom);
    let eventDetailsAtomResult;
    let loggedInUserAtomResult;
    if (useCopyAtom) {
        eventDetailsAtomResult = eventDetailsAtomCopy;
        loggedInUserAtomResult = loggedInUserAtomCopy;
    } else {
        eventDetailsAtomResult = eventDetailsAtom;
        loggedInUserAtomResult = loggedInUserAtom;
    }
    // ESA-058-END
    const eventDetails = useAtomValue(eventDetailsAtomResult);
    const [eventOrganizerDetails, setEventOrganizerDetails] = useAtom(eventOrganizerDetailsAtom);
    const loggedInUser = useAtomValue(loggedInUserAtomResult);

    return (
        <>
            {
                loggedInUser.userType === USERS.PARTICIPANT && <EventDetailSection eventDetails={eventDetails} />
            }
            {
                loggedInUser.userType === USERS.ORGANIZER && <EventDetailSection eventDetails={eventOrganizerDetails} />
            }
            {/* Leaderboard button -> when clicked for participant it will show whether user won or not along with leaderboard data. */}
            {/* Leaderboard button -> when clicked for organizer it will only show leaderboard data. */}
        </>
    )
}
