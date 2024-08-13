import './yourplacepage.css'
import React from 'react'
import MainContent from '../ContentHolder/MainContent'

export default function YourPlacePage(props) {
    return (
        <div className='container yourplace-page'>
            <div className='yourplace-container'>
                <MainContent
                    leftHeading='Participants'
                    rightHeading='Organizers'
                    leftBody='Participants are the heart of the competition, signing up to showcase their gaming skills in various events. They engage in intense matches, aiming for victory and the glory of being the best.'
                    rightBody='Organizers are the masterminds behind the action, creating and managing exciting gaming events. They set the rules, manage participants, and ensure a thrilling experience for everyone involved.'
                    isLeftAlignForLeft={true}
                    isButtonVisible={true}
                    button='Contact Us'
                    refProp={props.connectUsRefProp}
                    isVerticalContent={true}
                />
            </div>
        </div>
    )
}
