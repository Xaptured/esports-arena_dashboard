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
import EventForm from './EventForm';

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
    const eventOrganizerDetails = useAtomValue(eventOrganizerDetailsAtom);
    const [activeEvents, setActiveEvents] = useAtom(activeEventsAtomResult);
    const [activeOrgEvents, setActiveOrgEvents] = useAtom(activeOrganizerEventsResult);
    const [isShowEventForm, setIsShowEventForm] = useState(false);

    const getActiveEventsWrtIntGames = async () => {
        const response = await backendService.getActiveEventsWrtInterestedGamesData(loggedInUser.email);
        // ESA-058: should be uncommented
        setActiveEvents(response);
    }

    const getAllUpcomingOrganizerEvents = async () => {
        const response = await backendService.getAllUpcomingOrganizerEvents(loggedInUser.email);
        // ESA-058: should be uncommented
        if (response.length > 0) {
            setActiveOrgEvents(response);
        }
    }

    const showEventForm = () => {
        setIsShowEventForm(!isShowEventForm);
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
                            <GetStartedEvent userType='participant' />
                        )
                    }
                    {
                        loggedInUser.userType === USERS.ORGANIZER &&
                        (isShowEventForm ?
                            <EventForm showEventForm={showEventForm} />
                            :
                            (
                                eventOrganizerDetails ?
                                    <EventOrganizerDetails />
                                    :
                                    <GetStartedEvent userType='organizer' showEventForm={showEventForm} />
                            )
                        )
                    }
                </div>
            </div>
        </div>
    )
}
