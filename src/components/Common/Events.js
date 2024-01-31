import React, { useEffect, useState } from 'react'
import './event.css'
import EventCard from './EventCard';
import GetStartedEvent from './GetStartedEvent';
import { useAtomValue } from 'jotai';
import { eventDetailsAtom } from '../../atoms/eventAtom';
import EventDetails from './EventDetails';
// need to refactor while working on organizer-event so that this component will be used for both.
export default function Events() {
    const eventDetails = useAtomValue(eventDetailsAtom);
    useEffect(() => {
        // call API to get active eventNames wrt interested games.
    }, []);
    return (
        <div className='container event-container'>
            <div className='event-content'>
                <div className='event-content-left'>
                    <div className="scrollable-container">
                        <EventCard />
                        <EventCard />
                        <EventCard />
                        <EventCard />
                        <EventCard />
                        <EventCard />
                        <EventCard />
                        <EventCard />
                        <EventCard />
                        <EventCard />
                        <EventCard />
                        <EventCard />
                        <EventCard />
                        <EventCard />
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
