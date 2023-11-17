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
                    leftBody='Lorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturconsecteturLorem ipsum dolor sit amet, consecteturconsecteturLorem ipsum'
                    rightBody='Lorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturconsecteturLorem ipsum dolor sit amet, consecteturconsecteturLorem ipsum'
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
