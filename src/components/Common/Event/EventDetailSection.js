import React from 'react'

export default function EventDetailSection(props) {
    const { eventDetails } = props;
    return (
        <>
            <div className='event-name'>
                <h1 className='event-name-content'>{eventDetails.name}</h1>
            </div>
            <div className='event-description'>
                <div className='event-description-content'>
                    <div className='event-description-key'>Date</div>
                    <div className='event-description-value'>{eventDetails.date}</div>
                </div>
                <div className='event-description-content'>
                    <div className='event-description-key'>Time</div>
                    <div className='event-description-value'>{eventDetails.time}</div>
                </div>
                <div className='event-description-content'>
                    <div className='event-description-key'>Duration</div>
                    <div className='event-description-value'>{eventDetails.duration}</div>
                </div>
                <div className='event-description-content'>
                    <div className='event-description-key'>Players per slot</div>
                    <div className='event-description-value'>{eventDetails.playersPerSlot}</div>
                </div>
                <div className='event-description-content'>
                    <div className='event-description-key'>Total Slots</div>
                    <div className='event-description-value'>{eventDetails.slotCount}</div>
                </div>
                <div className='event-description-content'>
                    <div className='event-description-key'>Event type</div>
                    <div className='event-description-value'>{eventDetails.type}</div>
                </div>
                {
                    eventDetails.prizePool && <div className='event-description-content'>
                        <div className='event-description-key'>Prize pool</div>
                        <div className='event-description-value'>{eventDetails.prizePool}</div>
                    </div>
                }
            </div>
            <div className='event-rules'>
                <div style={{ fontSize: '30px', marginBottom: '3%' }}>Rules</div>
                <ul className='event-rules-content'>
                    {
                        eventDetails.rules && eventDetails.rules.map((rule, index) => (
                            <li className='rule-list' key={index}>{rule.description}</li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}
