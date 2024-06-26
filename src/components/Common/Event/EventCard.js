import React from 'react'
import './eventcard.css'
import { useSetAtom, useAtomValue, useAtom } from 'jotai'
import { eventDetailsAtom, eventDetailsAtomCopy, eventOrganizerDetailsAtomCopy, eventOrganizerDetailsAtom } from '../../../atoms/eventAtom'
import backendService from '../../../services/backendService'
import { useCopyValueAtom } from '../../../atoms/loginDataAtom';
import { USERS, loggedInUserAtom, loggedInUserAtomCopy } from '../../../atoms/loginDataAtom';

export default function EventCard(props) {

    // ESA-058-START
    const useCopyAtom = useAtomValue(useCopyValueAtom);
    let eventDetailsAtomResult;
    let loggedInUserAtomResult;
    let eventOrganizerDetailsAtomResult;
    if (useCopyAtom) {
        eventDetailsAtomResult = eventDetailsAtomCopy;
        loggedInUserAtomResult = loggedInUserAtomCopy;
        eventOrganizerDetailsAtomResult = eventOrganizerDetailsAtomCopy;
    } else {
        eventDetailsAtomResult = eventDetailsAtom;
        loggedInUserAtomResult = loggedInUserAtom;
        eventOrganizerDetailsAtomResult = eventOrganizerDetailsAtom;
    }
    // ESA-058-END
    const setEventDetails = useSetAtom(eventDetailsAtom);
    const setEventOrganizerDetails = useSetAtom(eventOrganizerDetailsAtom);
    const loggedInUser = useAtomValue(loggedInUserAtomResult);

    const handleParticipate = async (eventName) => {
        const response = await backendService.getEventDetails(eventName);
        // ESA-058: Uncomment below code
        setEventDetails(response);
        // setEventDetails(eventDetailsAtomResult);
    }
    const handleShow = async (eventName) => {
        const response = await backendService.getEventDetails(eventName);
        // ESA-058: Uncomment below code
        setEventOrganizerDetails(response);
        // setEventOrganizerDetails({
        //     name: "PUBG-EVENT",
        //     date: "12-12-2012",
        //     time: "1:10:00",
        //     duration: "1:00",
        //     status: 'COMPLETED',
        //     playersPerSlot: 4,
        //     slotCount: 10,
        //     remainingSlots: 8,
        //     type: "PAID",
        //     prizePool: 30000,
        //     rules: [
        //         {
        //             description: "rule-1"
        //         },
        //         {
        //             description: "rule-2"
        //         }
        //     ]
        // });
    }
    return (
        <div className='event-card'>
            <div>{props.eventName}</div>
            {
                loggedInUser.userType === USERS.PARTICIPANT &&
                <button type="button" className='btn btn-outline-light button_event' onClick={() => handleParticipate(props.eventName)}>
                    PARTICIPATE
                </button>
            }
            {
                loggedInUser.userType === USERS.ORGANIZER &&
                <button type="button" className='btn btn-outline-light button_event' onClick={() => handleShow(props.eventName)}>
                    SHOW
                </button>
            }
        </div>
    )
}
