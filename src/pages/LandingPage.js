import React, { useRef } from 'react'
import ConnectUsComponent from '../components/ConnectUs/ConnectUsComponent'
import LandingComponent from '../components/Landing/LandingComponent'
import PartnersComponent from '../components/Partners/PartnersComponent'
import YourPlaceComponent from '../components/YourPlace/YourPlaceComponent'

export default function LandingPage(props) {
    const yourPlaceRef = useRef(null);
    const partnersRef = useRef(null);
    const connectUsRef = useRef(null);
    return (
        <>
            <LandingComponent yourPlaceRefProp={yourPlaceRef} partnersRefProp={partnersRef} connectUsRefProp={connectUsRef} />
            <section ref={yourPlaceRef}>
                <YourPlaceComponent />
            </section>
            <section ref={partnersRef}>
                <PartnersComponent />
            </section>
            <section ref={connectUsRef}>
                <ConnectUsComponent loggedInProp={props.loggedInProp} />
            </section>
        </>
    )
}
