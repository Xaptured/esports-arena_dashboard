import React, { useState } from 'react'
import '../../components/Common/help.css';
import { RxCross2 } from "react-icons/rx";
import ReactDOM from 'react-dom';
import SyncLoader from 'react-spinners/SyncLoader';
import backendService from '../../services/backendService';

export default function Modal({ toggleModal }) {
    const initialComments = {
        email: '',
        comments: '',
        replied: false,
        message: '',
    };
    const override = {
        marginTop: "36%",
        paddingLeft: "40%",
        marginBottom: "6%",
    };
    const [comments, setComments] = useState(initialComments);
    const [isLoadingComments, setLoadingComments] = useState(false);
    const [disabledComments, setDisabledComments] = useState(false);
    const [commentsMessage, setCommentsMessage] = useState('Reach out to us for any concerns');

    const handleSubmitComments = async (event) => {
        event.preventDefault();
        setLoadingComments(true);
        const result = await backendService.getCommentsData(comments);
        setLoadingComments(false);
        if (result.message === 'Request Processed') {
            const newCommentObject = {
                email: '',
                comments: ''
            };
            setComments(newCommentObject);
            setDisabledComments(true);
            setCommentsMessage('Email sent successfully');
            setTimeout(() => {
                setCommentsMessage('Thanks for reaching us');
                setDisabledComments(false);
            }, 3000);

        }
        else if (result.message === 'Error sending an email') {
            const newCommentObject = {
                email: '',
                comments: ''
            };
            setComments(newCommentObject);
            setDisabledComments(true);
            setCommentsMessage('Will send you an email shortly');
            setTimeout(() => {
                setCommentsMessage('Thanks for reaching us');
                setDisabledComments(false);
            }, 3000);

        }
        else {
            const newCommentObject = {
                email: '',
                comments: ''
            };
            setComments(newCommentObject);
            setDisabledComments(true);
            setCommentsMessage('Error occurred. Please try again later.');
            setTimeout(() => {
                setCommentsMessage('Thanks for your patience');
                setDisabledComments(false);
            }, 3000);
        }
    }

    const handleInputChangeEmailComments = (e) => {
        const newCommentsObject = { ...comments };
        newCommentsObject.email = e.target.value;
        setComments(newCommentsObject);
    };

    const handleInputChangeComments = (e) => {
        const newCommentsObject = { ...comments };
        newCommentsObject.comments = e.target.value;
        setComments(newCommentsObject);
    };


    return ReactDOM.createPortal(
        <>
            <div className="modal-wrapper" />
            <div className='modal-content'>
                <div className='modal-form'>
                    <form onSubmit={handleSubmitComments}>
                        <div className="close-icon-container">
                            <RxCross2 size={30} color="grey" onClick={toggleModal} />
                        </div>
                        <h1>Contact me</h1>
                        <div className='mb-3 input-box'>
                            <input
                                type="email"
                                placeholder="email"
                                value={comments.email}
                                onChange={handleInputChangeEmailComments}
                                required />
                            <i className='bx bxs-user'></i>
                        </div>
                        <div className='mb-3 input-box'>
                            <textarea
                                placeholder="write your comment"
                                value={comments.comments}
                                onChange={handleInputChangeComments}
                                required>
                            </textarea>
                            <i className='bx bxs-user'></i>
                        </div>
                        {
                            isLoadingComments ?
                                <div>
                                    <div className=''>
                                        <SyncLoader
                                            color={"#ffffff"}
                                            loading={isLoadingComments}
                                            cssOverride={override}
                                            size={15}
                                        />
                                    </div>
                                </div>
                                :
                                <div>
                                    <button type="submit" className='btn btn-outline-light button_submit' disabled={disabledComments}>
                                        Submit
                                    </button>
                                    <div className='message'>
                                        {
                                            commentsMessage
                                        }
                                    </div>
                                </div>
                        }
                    </form>
                </div>
            </div>


        </>, document.querySelector('.landing-modal')

    )
}
