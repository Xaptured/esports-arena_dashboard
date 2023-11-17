import AboutUs from './AboutUs'
import './landingpage.css'
import NavigationBar from './NavigationBar'
import React from 'react'

export default function LandingPage(props) {

    const { yourPlaceRefProp, partnersRefProp, connectUsRefProp } = props;

    return (
        <div className='container landingpage-container'>
            <NavigationBar yourPlaceRefProp={yourPlaceRefProp} partnersRefProp={partnersRefProp} connectUsRefProp={connectUsRefProp} />
            <AboutUs refProp={connectUsRefProp} />
        </div>
    )
}
