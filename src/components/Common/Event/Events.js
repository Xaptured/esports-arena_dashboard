import React, { useEffect, useState } from 'react'
import './event.css'
import EventCard from './EventCard';
import GetStartedEvent from './GetStartedEvent';
import { useAtom, useAtomValue } from 'jotai';
import { activeEventsAtom, eventDetailsAtom, activeEventsAtomCopy, eventDetailsAtomCopy } from '../../../atoms/eventAtom';
import EventDetails from './EventDetails';
import { loggedInUserAtom, loggedInUserAtomCopy } from '../../../atoms/loginDataAtom';
import backendService from '../../../services/backendService'
import { useCopyValueAtom } from '../../../atoms/loginDataAtom';

// need to refactor while working on organizer-event so that this component will be used for both.
export default function Events() {

    // ESA-058-START
    const useCopyAtom = useAtomValue(useCopyValueAtom);
    let activeEventsAtomResult;
    let loggedInUserAtomResult;
    if (useCopyAtom) {
        activeEventsAtomResult = activeEventsAtomCopy;
        loggedInUserAtomResult = loggedInUserAtomCopy;
    } else {
        activeEventsAtomResult = activeEventsAtom;
        loggedInUserAtomResult = loggedInUserAtom;
    }
    // ESA-058-END
    const eventDetails = useAtomValue(eventDetailsAtom);
    const [activeEvents, setActiveEvents] = useAtom(activeEventsAtomResult);
    const loggedInUser = useAtomValue(loggedInUserAtomResult);

    const getActiveEventsWrtIntGames = async () => {
        const response = await backendService.getActiveEventsWrtInterestedGamesData(loggedInUser.email);
        // ESA-058: should be uncommented
        // setActiveEvents(response);
    }

    useEffect(() => {
        getActiveEventsWrtIntGames();
    }, []);
    return (
        <div className='container event-container'>
            <div className='event-content'>
                <div className='event-content-left'>
                    <div className="scrollable-container">
                        {
                            activeEvents && activeEvents.map((activeEvent) => (
                                <EventCard eventName={activeEvent.name} key={activeEvent.name} />
                            ))
                        }
                    </div>
                </div>
                <div className='event-content-right'>
                    {
                        eventDetails ?
                            <EventDetails />
                            :
                            <GetStartedEvent />
                    }

                </div>
            </div>
        </div>
    )
}
