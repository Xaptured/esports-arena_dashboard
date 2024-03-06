import React from 'react'

export default function GetStartedEvent(props) {
    const { userType, showEventForm } = props;

    const showForm = () => {
        showEventForm();
    }
    return (
        <div style={{ marginTop: "18%" }}>
            {
                userType === "participant" ? 'Start your journey by participating in events.' : ''
            }
            <br />
            <p style={{ fontSize: '30px', color: 'grey', marginTop: '1%' }}>
                Click on any event to see description and rules.
            </p>
            {
                userType === "participant" ? ''
                    : <>
                        <p style={{ marginBottom: '5%' }}>or Create a new event</p>
                        <button type="button" className='btn btn-outline-light button_team' onClick={showForm}>
                            Create Event
                        </button>
                    </>
            }
        </div>
    )
}
