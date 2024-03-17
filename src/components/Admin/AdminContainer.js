import React, { useState } from 'react'
import './admincontainer.css'
import NavigationBar from '../NavBar/NavigationBar'
import Events from '../Common/Event/Events'
import Leaderboards from '../Common/Leaderboards/Leaderboards'

export default function AdminContainer() {
    const [currentComponent, setCurrentComponent] = useState([true, false]);

    return (
        <div className='container admin-container'>
            <NavigationBar userType='admin' components={setCurrentComponent} currentComponent={currentComponent} />
            {currentComponent[0] && <Events />}
            {currentComponent[1] && <Leaderboards />}
        </div>
    )
}
