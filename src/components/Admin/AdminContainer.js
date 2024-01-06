import React, { useState } from 'react'
import './admincontainer.css'
import NavigationBar from '../NavBar/NavigationBar'
import Events from '../Common/Events'
import News from '../Common/News'

export default function AdminContainer() {
    const [currentComponent, setCurrentComponent] = useState([true, false]);

    return (
        <div className='container admin-container'>
            <NavigationBar userType='admin' components={setCurrentComponent} currentComponent={currentComponent} />
            {currentComponent[0] && <Events />}
            {currentComponent[1] && <News />}
        </div>
    )
}
