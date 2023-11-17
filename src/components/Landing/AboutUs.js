import MainContent from '../ContentHolder/MainContent'
import './aboutus.css'
import React from 'react'

export default function AboutUs(props) {
    return (
        <div className='aboutus-container'>
            <MainContent
                leftHeading='who we are?'
                rightHeading='what we do?'
                leftBody='Lorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consectetur'
                rightBody='Lorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consectetur'
                isLeftAlignForLeft={true}
                isButtonVisible={true}
                button='Join Us'
                refProp={props.refProp}
                isVerticalContent={true}
            />
        </div>
    )
}
