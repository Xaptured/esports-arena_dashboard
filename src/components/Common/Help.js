import React, { useEffect, useState } from 'react'
import './help.css';
import backendService from '../../services/backendService';
import YoutubeCard from './YoutubeCard';
import { useAtom, useAtomValue } from 'jotai';
import { useCopyValueAtom } from '../../atoms/loginDataAtom';
import { loggedInUserAtom, loggedInUserAtomCopy } from '../../atoms/loginDataAtom';
import SyncLoader from 'react-spinners/SyncLoader';
import HashLoader from 'react-spinners/HashLoader';
import { FAQs } from '../../constants/FAQ';

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
    // ESA-058-START
    const useCopyAtom = useAtomValue(useCopyValueAtom);
    let loggedInUserAtomResult;
    if (useCopyAtom) {
        loggedInUserAtomResult = loggedInUserAtomCopy;
    } else {
        loggedInUserAtomResult = loggedInUserAtom;
    }
    // ESA-058-END
    const loggedInUser = useAtomValue(loggedInUserAtomResult);

    const [comments, setComments] = useState(initialComments);
    const [isLoadingComments, setLoadingComments] = useState(false);
    const [disabledComments, setDisabledComments] = useState(false);
    const [commentsMessage, setCommentsMessage] = useState('Reach out to us for any concerns');
    const [credentials, setCredentials] = useState(initialCredentials);
    const [videos, setVideos] = useState([]);
    const override = {
        marginTop: "36%",
        paddingLeft: "40%",
        marginBottom: "8%",
    };

    const youtubeOverride = {
        marginTop: "50%",
        paddingLeft: "70%",
        marginBottom: "8%",
    }

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

    const getVideoDetails = async (email) => {
        const response = await backendService.getVideoDetails(email);
        const data = response.youTubeResponse;
        setVideos(data.items);
    }

    useEffect(() => {
        getVideoDetails(loggedInUser.email);
    }, []);


    return (
        <div className='container help-container'>
            <div className='help-content'>
                <div className='help-content-left'>
                    {
                        videos.length === 0 && (
                            <div className=''>
                                <HashLoader
                                    color={"#ffffff"}
                                    loading={true}
                                    cssOverride={youtubeOverride}
                                    size={150}
                                />
                            </div>
                        )
                    }
                    {
                        videos.length > 0 && (
                            <div className='scrollable-container'>
                                {
                                    videos.map((video, index) => (
                                        <YoutubeCard key={index} video={video} />
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
                <div className='help-content-middle'>
                    <div className="wrapper">
                        <div className='scrollable-container form-box'>
                            <h1 className='faq-header'>F A Q</h1>
                            {
                                FAQs.map((faq) =>
                                (
                                    <div className='faq-content'>
                                        <p className='question'>{faq.question}</p>
                                        <p className='answer'>{faq.answer}</p>
                                    </div>
                                )
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className='help-content-right'>
                    <div className="wrapper">
                        <div className="form-box">
                            <form onSubmit={handleSubmitComments}>
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
                                        required></textarea>
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
                </div>
            </div>
        </div>
    )
}
