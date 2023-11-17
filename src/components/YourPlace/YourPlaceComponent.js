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
                    leftBody='Lorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consectetur'
                    rightBody='Lorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consectetur'
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
