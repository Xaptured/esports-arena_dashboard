import React, { useEffect } from 'react'
import GetStartedLeaderboard from './GetStartedLeaderboard'
import './leaderboard.css'
import { useCopyValueAtom } from '../../../atoms/loginDataAtom';
import { useAtom, useAtomValue } from 'jotai';
import { inactiveEventsAtom, eventDetailsAtom, inactiveEventsAtomCopy, eventDetailsAtomCopy, inactiveOrganizerEventsCopy, inactiveOrganizerEvents, eventOrganizerDetailsAtom } from '../../../atoms/eventAtom';
import { USERS, loggedInUserAtom, loggedInUserAtomCopy } from '../../../atoms/loginDataAtom';
import LeaderboardEventCard from './LeaderboardEventCard';
import LeaderboardEventDetails from './LeaderboardEventDetails';
import backendService from '../../../services/backendService'


export default function Leaderboards() {

    // ESA-058-START
    const useCopyAtom = useAtomValue(useCopyValueAtom);
    let inactiveEventsAtomResult;
    let loggedInUserAtomResult;
    let inactiveOrganizerEventsResult;
    if (useCopyAtom) {
        inactiveEventsAtomResult = inactiveEventsAtomCopy;
        loggedInUserAtomResult = loggedInUserAtomCopy;
        inactiveOrganizerEventsResult = inactiveOrganizerEventsCopy;
    } else {
        inactiveEventsAtomResult = inactiveEventsAtom;
        loggedInUserAtomResult = loggedInUserAtom;
        inactiveOrganizerEventsResult = inactiveOrganizerEvents;
    }
    // ESA-058-END
    const loggedInUser = useAtomValue(loggedInUserAtomResult);
    const eventDetails = useAtomValue(eventDetailsAtom);
    const eventOrganizerDetails = useAtomValue(eventOrganizerDetailsAtom);
    const [inctiveEvents, setInActiveEvents] = useAtom(inactiveEventsAtomResult);
    const [inactiveOrgEvents, setInActiveOrgEvents] = useAtom(inactiveOrganizerEventsResult);

    const findAllLeaderboardCompleteParticipantEvents = async () => {
        const response = await backendService.findAllLeaderboardCompleteParticipantEvents(loggedInUser.email);
        // ESA-058: should be uncommented
        // setInActiveEvents(response);
    }

    const findAllLeaderboardCompleteOrganizerEvents = async () => {
        const response = await backendService.findAllLeaderboardCompleteOrganizerEvents(loggedInUser.email);
        // ESA-058: should be uncommented
        // setInActiveOrgEvents(response);
    }
    useEffect(() => {
        if (loggedInUser.userType === USERS.PARTICIPANT) {
            findAllLeaderboardCompleteParticipantEvents();
        } else {
            findAllLeaderboardCompleteOrganizerEvents();
        }
    }, []);
    return (
        <div className='container leaderboard-tab-container'>
            <div className='leaaderboard-content'>
                <div className='leaderboard-content-left'>
                    <div className="scrollable-container">
                        {
                            loggedInUser.userType === USERS.PARTICIPANT && inctiveEvents && inctiveEvents.map((inactiveEvent) => (
                                <LeaderboardEventCard eventName={inactiveEvent.name} key={inactiveEvent.name} />
                            ))
                        }
                        {
                            loggedInUser.userType === USERS.ORGANIZER && inactiveOrgEvents && inactiveOrgEvents.map((inactiveOrgEvent) => (
                                <LeaderboardEventCard eventName={inactiveOrgEvent.name} key={inactiveOrgEvent.name} />
                            ))
                        }
                    </div>
                </div>
                <div className='leaderboard-content-right'>
                    {
                        loggedInUser.userType === USERS.PARTICIPANT && (eventDetails ?
                            <LeaderboardEventDetails />
                            :
                            <GetStartedLeaderboard userType='participant' />
                        )
                    }
                    {
                        loggedInUser.userType === USERS.ORGANIZER && (eventOrganizerDetails ?
                            <LeaderboardEventDetails />
                            :
                            <GetStartedLeaderboard userType='organizer' />
                        )
                    }
                </div>
            </div>
        </div>
    )
}
