import React from 'react'
import './eventcard.css'
import { useSetAtom } from 'jotai'
import { eventDetailsAtom } from '../../atoms/eventAtom'
import backendService from '../../services/backendService'

export default function EventCard(props) {

    const setEventDetails = useSetAtom(eventDetailsAtom);
    const handleParticipate = async (eventName) => {
        // make API call to get event details according to the event name
        const response = await backendService.getEventDetails(eventName);
        console.log("Event details: ", response);
        setEventDetails(response);
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
