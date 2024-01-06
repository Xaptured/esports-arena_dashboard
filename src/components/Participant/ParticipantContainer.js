import React, { useState } from 'react'
import './participantcontainer.css'
import NavigationBar from '../NavBar/NavigationBar'
import Events from '../Common/Events'
import News from '../Common/News'
import Schedule from '../Common/Schedule'
import Coins from '../Common/Coins'
import Help from '../Common/Help'

export default function ParticipantContainer() {
    const [currentComponent, setCurrentComponent] = useState([true, false, false, false, false]);

    return (
        <div className='container participant-container'>
            <NavigationBar userType='participant' components={setCurrentComponent} currentComponent={currentComponent} />
            {currentComponent[0] && <Events />}
            {currentComponent[1] && <News />}
            {currentComponent[2] && <Schedule />}
            {currentComponent[3] && <Coins />}
            {currentComponent[4] && <Help />}
        </div>
    )
}
