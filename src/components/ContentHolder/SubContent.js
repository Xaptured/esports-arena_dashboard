import React, { useState } from 'react'
import './subcontent.css'
import Modal from './Modal';

export default function SubContent(props) {

    const { heading, body, isButtonVisible, isLeftAlign, button } = props;
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => setShowModal(!showModal);

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
                    <button type="submit" className='btn btn-outline-light btn-lg subcontent_button' onClick={toggleModal}>
                        {button}
                    </button>
                    :
                    ''
            }
            {
                showModal && <Modal toggleModal={toggleModal} />
            }
        </div>
    )
}
