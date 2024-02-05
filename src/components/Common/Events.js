import React, { useEffect, useState } from 'react'
import './event.css'
import EventCard from './EventCard';
import GetStartedEvent from './GetStartedEvent';
import { useAtom, useAtomValue } from 'jotai';
import { activeEventsAtom, eventDetailsAtom } from '../../atoms/eventAtom';
import EventDetails from './EventDetails';
import { loggedInUserAtom } from '../../atoms/loginDataAtom';
import backendService from '../../services/backendService'

// need to refactor while working on organizer-event so that this component will be used for both.
export default function Events() {
    const eventDetails = useAtomValue(eventDetailsAtom);
    const [activeEvents, setActiveEvents] = useAtom(activeEventsAtom);
    const loggedInUser = useAtomValue(loggedInUserAtom);

    const getActiveEventsWrtIntGames = async () => {
        const response = await backendService.getActiveEventsWrtInterestedGamesData(loggedInUser.email);
        setActiveEvents(response);
    }

    useEffect(() => {
        // call API to get active eventNames wrt interested games.
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
