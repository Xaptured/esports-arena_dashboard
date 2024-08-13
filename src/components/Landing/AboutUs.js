import MainContent from '../ContentHolder/MainContent'
import './aboutus.css'
import React from 'react'

export default function AboutUs(props) {
    return (
        <div className='aboutus-container'>
            <MainContent
                leftHeading='who we are?'
                rightHeading='what we do?'
                leftBody='ESports-Arena is a dynamic platform dedicated to the world of competitive gaming. We bring together passionate gamers, visionary organizers, and innovative partners to create an engaging and thrilling esports experience.'
                rightBody='We empower organizers to create and host online events, connect participants to exciting opportunities, and offer a platform for partners to showcase their products. Our mission is to elevate the esports community by providing a seamless experince.'
                isLeftAlignForLeft={true}
                isButtonVisible={true}
                button='Join Us'
                refProp={props.refProp}
                isVerticalContent={true}
            />
        </div>
    )
}
