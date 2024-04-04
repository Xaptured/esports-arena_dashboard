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
    return (
        <div className='container leaderboard-tab-container'>
            <div className='leaaderboard-content'>
                <div className='leaderboard-content-left'>
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
                </div>
                <div className='leaderboard-content-right'>
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
