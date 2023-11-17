import React from 'react'
import './maincontent.css'
import SubContentVertical from './SubContentVertical';
import SubContent from './SubContent';

export default function MainContent(props) {

    const { isVerticalContent, leftHeading, rightHeading, leftBody, rightBody, isLeftAlignForLeft, leftButton, rightButton, isButtonVisible, button } = props;

    const scrollToSection = (ref) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className='maincontent-container'>
            {
                isVerticalContent ?
                    <>
                        <SubContentVertical heading={leftHeading} body={leftBody} button={leftButton} isLeftAlign={isLeftAlignForLeft} isButtonVisible={!isButtonVisible} />
                        <SubContentVertical heading={rightHeading} body={rightBody} button={rightButton} isLeftAlign={!isLeftAlignForLeft} isButtonVisible={!isButtonVisible} />
                    </>
                    :
                    <>
                        <SubContent heading={leftHeading} body={leftBody} isButtonVisible={!isButtonVisible} isLeftAlign={false} button={leftButton} />
                        <SubContent heading={rightHeading} body={rightBody} isButtonVisible={!isButtonVisible} isLeftAlign={true} button={rightButton} />
                    </>
            }
            {
                isButtonVisible ?
                    <button type="submit" className='btn btn-outline-light btn-lg maincontent_button'
                        onClick={() => { scrollToSection(props.refProp) }}>
                        {button}
                    </button>
                    :
                    ''
            }
        </div>
    )
}
