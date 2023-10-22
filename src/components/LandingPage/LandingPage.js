import AboutUs from './AboutUs'
import './landingpage.css'
import NavigationBar from './NavigationBar'
import React from 'react'

export default function LandingPage() {
    return (
        <div className='container landingpage-container'>
            {/* TODO: Need to pass reference sections to the navigation bar */}
            <NavigationBar />
            <AboutUs />
        </div>
    )
}
