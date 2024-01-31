import React from 'react'
import './eventcard.css'
import { useSetAtom } from 'jotai'
import { eventDetailsAtom } from '../../atoms/eventAtom'

export default function EventCard() {

    const setEventDetails = useSetAtom(eventDetailsAtom);
    const handleParticipate = () => {
        setEventDetails("Present event details");
    }
    return (
        <div className='event-card'>
            <div>EVENT-NAME</div>
            <button type="button" className='btn btn-outline-light button_event' onClick={handleParticipate}>
                PARTICIPATE
            </button>
        </div>
    )
}
