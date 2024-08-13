import './partnerspage.css'
import React from 'react'
import MainContent from '../ContentHolder/MainContent'

export default function PartnersPage() {
    return (
        <div className='container partnerspage-container'>
            <div className='partners-container'>
                <MainContent
                    leftHeading='Partners'
                    rightHeading='Games'
                    leftBody='Partners collaborate with ESports-Arena by providing valuable materials, products, or services that enhance the app experience. Their contributions are featured as advertisements, helping to fuel the excitement and growth of the arena.'
                    rightBody="We’re committed to offering a diverse range of games for our community. If your favorite game isn’t listed, don’t worry! You can easily suggest it to us. Help us expand our lineup by adding your game, and we’ll work on bringing it into the arena for future events."
                    isLeftAlignForLeft={true}
                    isButtonVisible={false}
                    leftButton='Join us as Partner'
                    rightButton='Suggest more Games'
                    button='Contact Us'
                />
            </div>
        </div>
    )
}
