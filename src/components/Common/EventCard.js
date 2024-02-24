import React from 'react'
import './eventcard.css'
import { useSetAtom, useAtomValue } from 'jotai'
import { eventDetailsAtom, eventDetailsAtomCopy } from '../../atoms/eventAtom'
import backendService from '../../services/backendService'
import { useCopyValueAtom } from '../../atoms/loginDataAtom';

export default function EventCard(props) {

    // ESA-058-START
    const useCopyAtom = useAtomValue(useCopyValueAtom);
    let eventDetailsAtomResult;
    if (useCopyAtom) {
        eventDetailsAtomResult = eventDetailsAtomCopy;
    } else {
        eventDetailsAtomResult = eventDetailsAtom;
    }
    // ESA-058-END
    const setEventDetails = useSetAtom(eventDetailsAtom);
    const handleParticipate = async (eventName) => {
        const response = await backendService.getEventDetails(eventName);
        // ESA-058: Uncomment below code
        // setEventDetails(response);
        setEventDetails(eventDetailsAtomResult);
    }
    return (
        <div className='event-card'>
            <div>{props.eventName}</div>
            <button type="button" className='btn btn-outline-light button_event' onClick={() => handleParticipate(props.eventName)}>
                PARTICIPATE
            </button>
        </div>
    )
}
