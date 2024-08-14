import React, { useEffect } from 'react'
import GetStartedSchedule from './GetStartedSchedule'
import './schedule.css'
import { useCopyValueAtom } from '../../../atoms/loginDataAtom';
import { useAtom, useAtomValue } from 'jotai';
import { eventDetailsAtom, eventDetailsAtomCopy, eventOrganizerDetailsAtom, futureEventsAtomCopy, futureOrganizerEventsCopy, futureEventsAtom, futureOrganizerEvents } from '../../../atoms/eventAtom';
import { USERS, loggedInUserAtom, loggedInUserAtomCopy } from '../../../atoms/loginDataAtom';
import ScheduleEventCard from './ScheduleEventCard';
import ScheduleEventDetails from './ScheduleEventDetails';
import backendService from '../../../services/backendService'
import "aos/dist/aos.css";
import Aos from 'aos';


export default function Leaderboards() {

    // ESA-058-START
    const useCopyAtom = useAtomValue(useCopyValueAtom);
    let futureEventsAtomResult;
    let loggedInUserAtomResult;
    let futureOrganizerEventsResult;
    if (useCopyAtom) {
        futureEventsAtomResult = futureEventsAtomCopy;
        loggedInUserAtomResult = loggedInUserAtomCopy;
        futureOrganizerEventsResult = futureOrganizerEventsCopy;
    } else {
        futureEventsAtomResult = futureEventsAtom;
        loggedInUserAtomResult = loggedInUserAtom;
        futureOrganizerEventsResult = futureOrganizerEvents;
    }
    // ESA-058-END
    const loggedInUser = useAtomValue(loggedInUserAtomResult);
    const [eventDetails, setEventDetails] = useAtom(eventDetailsAtom);
    const [eventOrganizerDetails, setEventOrganizerDetails] = useAtom(eventOrganizerDetailsAtom);
    const [futureEvents, setFutureEvents] = useAtom(futureEventsAtomResult);
    const [futureOrgEvents, setFutureOrgEvents] = useAtom(futureOrganizerEventsResult);

    const findAllScheduledParticipantEvents = async () => {
        const response = await backendService.findAllScheduledParticipantEvents(loggedInUser.email);
        // ESA-058: should be uncommented
        setFutureEvents(response);
    }

    const findAllScheduledeOrganizerEvents = async () => {
        const response = await backendService.findAllScheduledeOrganizerEvents(loggedInUser.email);
        // ESA-058: should be uncommented
        setFutureOrgEvents(response);
    }
    useEffect(() => {
        if (loggedInUser.userType === USERS.PARTICIPANT) {
            setEventDetails(undefined);
            findAllScheduledParticipantEvents();
        } else {
            setEventOrganizerDetails(undefined);
            findAllScheduledeOrganizerEvents();
        }
    }, []);
    useEffect(() => {
        Aos.init({ duration: 1500 });
    }, []);
    return (
        <div className='container leaderboard-tab-container'>
            <div className='leaaderboard-content'>
                <div className='leaderboard-content-left' data-aos="fade-right">
                    {
                        loggedInUser.userType === USERS.PARTICIPANT && futureEvents && futureEvents.length === 0 && (
                            <p className='event-content-left-no-content'>Currently there are no events to show up here.</p>
                        )
                    }
                    {
                        loggedInUser.userType === USERS.ORGANIZER && futureOrgEvents && futureOrgEvents.length === 0 && (
                            <p className='event-content-left-no-content'>Currently there are no events to show up here.</p>
                        )
                    }
                    {
                        (loggedInUser.userType === USERS.PARTICIPANT && futureEvents.length > 0 || loggedInUser.userType === USERS.ORGANIZER && futureOrgEvents.length > 0) && (
                            <div className="scrollable-container">
                                {
                                    loggedInUser.userType === USERS.PARTICIPANT && futureEvents && futureEvents.map((futureEvent) => (
                                        <ScheduleEventCard eventName={futureEvent.name} key={futureEvent.name} />
                                    ))
                                }
                                {
                                    loggedInUser.userType === USERS.ORGANIZER && futureOrgEvents && futureOrgEvents.map((futureOrgEvent) => (
                                        <ScheduleEventCard eventName={futureOrgEvent.name} key={futureOrgEvent.name} />
                                    ))
                                }
                            </div>
                        )
                    }

                </div>
                <div className='leaderboard-content-right' data-aos="fade-left">
                    {
                        loggedInUser.userType === USERS.PARTICIPANT && (eventDetails ?
                            <ScheduleEventDetails />
                            :
                            <GetStartedSchedule userType='participant' />
                        )
                    }
                    {
                        loggedInUser.userType === USERS.ORGANIZER && (eventOrganizerDetails ?
                            <ScheduleEventDetails />
                            :
                            <GetStartedSchedule userType='organizer' />
                        )
                    }
                </div>
            </div>
        </div>
    )
}
