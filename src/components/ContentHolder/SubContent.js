import React from 'react'
import './subcontent.css'

export default function SubContent(props) {

    const { heading, body, isButtonVisible, isLeftAlign, button } = props;

    return (
        <div className='subcontent-container'>
            <div className='subcontent_heading'>
                {
                    isLeftAlign ?
                        <div style={{ textAlign: 'left' }}>
                            {heading}
                        </div>
                        :
                        <div style={{ textAlign: 'right' }}>
                            {heading}
                        </div>
                }
            </div>
            <div className='subcontent_body'>
                {
                    isLeftAlign ?
                        <div style={{ textAlign: 'left' }}>
                            {body}
                        </div>
                        :
                        <div style={{ textAlign: 'right' }}>
                            {body}
                        </div>
                }
            </div>
            {
                isButtonVisible ?
                    <button type="submit" className='btn btn-outline-light btn-lg subcontent_button'>
                        {button}
                    </button>
                    :
                    ''
            }
        </div>
    )
}
