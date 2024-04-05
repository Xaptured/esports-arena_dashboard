import React, { useState } from 'react'
import './help.css';
import backendService from '../../services/backendService';

export default function Help() {
    const initialComments = {
        email: '',
        comments: '',
        replied: false,
        message: '',
    };
    const initialCredentials = {
        email: '',
        password: '',
        role: 'PARTICIPANT',
        verified: false,
        message: '',
    };

    const [comments, setComments] = useState(initialComments);
    const [isLoadingComments, setLoadingComments] = useState(false);
    const [disabledComments, setDisabledComments] = useState(false);
    const [commentsMessage, setCommentsMessage] = useState('Reach out to us for any concerns');
    const [credentials, setCredentials] = useState(initialCredentials);

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

    const handleInputChangeComments = (e) => {
        const newCommentsObject = { ...comments };
        newCommentsObject.comments = e.target.value;
        setComments(newCommentsObject);
    };

    const handleInputChangeEmailComments = (e) => {
        const newCommentsObject = { ...comments };
        newCommentsObject.email = e.target.value;
        setComments(newCommentsObject);
    };


    return (
        <div className='container help-container'>
            <div className='help-content'>
                <div className='help-content-left'></div>
                <div className='help-content-middle'>
                    <div className="wrapper">
                        <div className="form-box">
                            <h1>F A Q</h1>
                            {/* prepare questions and answers */}
                        </div>
                    </div>
                </div>
                <div className='help-content-right'>
                    <div className="wrapper">
                        <div className="form-box">
                            <form onSubmit={handleSubmitComments}>
                                <h1>Contact us</h1>
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
                                        required></textarea>
                                    <i className='bx bxs-user'></i>
                                </div>
                                {
                                    isLoadingComments ?
                                        <div>
                                            Loading...
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
                </div>
            </div>
        </div>
    )
}
