import React, { useState } from 'react'
import './organizercontainer.css'
import NavigationBar from '../NavBar/NavigationBar'
import Events from '../Common/Event/Events'
import News from '../Common/News'
import Schedule from '../Common/Schedule'
import Help from '../Common/Help'

export default function OrganizerContainer() {
    const [currentComponent, setCurrentComponent] = useState([true, false, false, false]);

    return (
        <div className='container organizer-container'>
            <NavigationBar userType='organizer' components={setCurrentComponent} currentComponent={currentComponent} />
            {currentComponent[0] && <Events />}
            {currentComponent[1] && <News />}
            {currentComponent[2] && <Schedule />}
            {currentComponent[3] && <Help />}
        </div>
    )
}
