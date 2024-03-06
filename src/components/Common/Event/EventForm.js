import React from 'react'

export default function EventForm(props) {
    const { showEventForm } = props;
    const showForm = () => {
        showEventForm();
    }
    return (
        <>
            Event Form
            <button type="button" className='btn btn-outline-light button_team' onClick={showForm}>
                Close
            </button>
        </>
    )
}
