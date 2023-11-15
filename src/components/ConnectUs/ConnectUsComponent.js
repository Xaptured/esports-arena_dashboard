import ConnectUs from './ConnectUs'
import Footer from './Footer'
import './connectuspage.css'
import React from 'react'

export default function ConnectUsPage(props) {
    return (
        <>
            <div className='connectuspage-container'>
                <ConnectUs loggedInProp={props.loggedInProp} />
            </div>
            <Footer />
        </>


    )
}
