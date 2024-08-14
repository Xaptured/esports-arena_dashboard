import React, { useEffect } from 'react'
import './subcontentvertical.css'
import "aos/dist/aos.css";
import Aos from 'aos';

export default function SubContentVertical(props) {

    const { heading, body, isButtonVisible, isLeftAlign, button } = props;
    useEffect(() => {
        Aos.init({ duration: 1500 });
    }, []);
    return (
        <>
            <div className='vertical-container' data-aos='zoom-in'>
                {
                    isLeftAlign ?
                        <div className='left_align_container'>
                            <div className='vertical-heading_left'>{heading}</div>
                            <div className='vertical-body_left'>{body}</div>
                        </div>
                        :
                        <div className='right_align_container'>
                            <div className='vertical-body_right'>{body}</div>
                            <div className='vertical-heading_right'>{heading}</div>
                        </div>

                }
                {
                    isButtonVisible ?
                        <div className='button-container'>
                            <button type="submit" className='btn btn-outline-light btn-lg vertical_button'>
                                {button}
                            </button>
                        </div>

                        :
                        ''
                }
            </div>

        </>
    )
}
