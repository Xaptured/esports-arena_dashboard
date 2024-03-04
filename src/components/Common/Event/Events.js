import React, { useEffect, useState } from 'react'
import './event.css'
import EventCard from './EventCard';
import GetStartedEvent from './GetStartedEvent';
import { useAtom, useAtomValue } from 'jotai';
import { activeEventsAtom, eventDetailsAtom, activeEventsAtomCopy, eventDetailsAtomCopy, activeOrganizerEventsCopy, activeOrganizerEvents, eventOrganizerDetailsAtom } from '../../../atoms/eventAtom';
import EventDetails from './EventDetails';
import { USERS, loggedInUserAtom, loggedInUserAtomCopy } from '../../../atoms/loginDataAtom';
import backendService from '../../../services/backendService'
import { useCopyValueAtom } from '../../../atoms/loginDataAtom';
import EventOrganizerDetails from './EventOrganizerDetails';

// need to refactor while working on organizer-event so that this component will be used for both.
export default function Events() {

    // ESA-058-START
    const useCopyAtom = useAtomValue(useCopyValueAtom);
    let activeEventsAtomResult;
    let loggedInUserAtomResult;
    let activeOrganizerEventsResult;
    if (useCopyAtom) {
        activeEventsAtomResult = activeEventsAtomCopy;
        loggedInUserAtomResult = loggedInUserAtomCopy;
        activeOrganizerEventsResult = activeOrganizerEventsCopy;
    } else {
        activeEventsAtomResult = activeEventsAtom;
        loggedInUserAtomResult = loggedInUserAtom;
        activeOrganizerEventsResult = activeOrganizerEvents;
    }
    // ESA-058-END
    const loggedInUser = useAtomValue(loggedInUserAtomResult);
    const eventDetails = useAtomValue(eventDetailsAtom);
    const [activeEvents, setActiveEvents] = useAtom(activeEventsAtomResult);
    const [activeOrgEvents, setActiveOrgEvents] = useAtom(activeOrganizerEventsResult);
    const eventOrganizerDetails = useAtomValue(eventOrganizerDetailsAtom);


    const getActiveEventsWrtIntGames = async () => {
        const response = await backendService.getActiveEventsWrtInterestedGamesData(loggedInUser.email);
        // ESA-058: should be uncommented
        // setActiveEvents(response);
    }

    const getAllUpcomingOrganizerEvents = async () => {
        const response = await backendService.getAllUpcomingOrganizerEvents(loggedInUser.email);
        // ESA-058: should be uncommented
        // setActiveOrgEvents(response);
    }

    useEffect(() => {
        if (loggedInUser.userType === USERS.PARTICIPANT) {
            getActiveEventsWrtIntGames();
        } else {
            getAllUpcomingOrganizerEvents();
        }
    }, []);
    return (
        <div className='container event-container'>
            <div className='event-content'>
                <div className='event-content-left'>
                    <div className="scrollable-container">
                        {
                            loggedInUser.userType === USERS.PARTICIPANT && activeEvents && activeEvents.map((activeEvent) => (
                                <EventCard eventName={activeEvent.name} key={activeEvent.name} />
                            ))
                        }
                        {
                            loggedInUser.userType === USERS.ORGANIZER && activeOrgEvents && activeOrgEvents.map((activeOrgEvent) => (
                                <EventCard eventName={activeOrgEvent.name} key={activeOrgEvent.name} />
                            ))
                        }
                    </div>
                </div>
                <div className='event-content-right'>
                    {
                        loggedInUser.userType === USERS.PARTICIPANT && (eventDetails ?
                            <EventDetails />
                            :
                            <GetStartedEvent />
                        )
                    }
                    {
                        loggedInUser.userType === USERS.ORGANIZER && (eventOrganizerDetails ?
                            <EventOrganizerDetails />
                            :
                            <GetStartedEvent />
                        )
                    }
                </div>
            </div>
        </div>
    )
}
