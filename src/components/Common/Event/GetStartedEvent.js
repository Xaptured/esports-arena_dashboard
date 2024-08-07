import React from 'react'
import './event.css'

export default function GetStartedEvent(props) {
    const { userType, showEventForm } = props;

    const showForm = () => {
        showEventForm();
    }
    return (
        <div style={{ marginTop: "18%" }}>
            <br />
            {
                userType === "participant" && <div>
                    Start your journey by participating in events.
                    <p style={{ fontSize: '30px', color: 'grey', marginTop: '1%' }}>
                        Click on any event to see description and rules.
                    </p>
                </div>

            }

            {
                userType === "participant" ? ''
                    : <>
                        <p style={{ fontSize: '30px', color: 'grey', marginTop: '1%' }}>
                            Click on any event to see description and rules.
                        </p>
                        <p style={{ marginBottom: '5%' }}>or Create a new event</p>
                        <div className='wrapper-create-event'>
                            <button type="button" className='btn btn-outline-light button-create-event' onClick={showForm}>
                                Create Event
                            </button>
                        </div>
                    </>
            }
        </div>
    )
}
