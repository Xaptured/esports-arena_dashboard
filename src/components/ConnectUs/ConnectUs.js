import { useSetAtom } from 'jotai';
import backendService from '../../services/backendService';
import './connectus.css'
import React, { useState } from 'react'
import { USERS, loggedInUserAtom } from '../../atoms/loginDataAtom';

export default function ConnectUs() {

    const setLoginData = useSetAtom(loggedInUserAtom);

    const initialCredentials = {
        email: '',
        password: '',
        role: 'PARTICIPANT',
        verified: false,
        message: '',
    };

    const initialComments = {
        email: '',
        comments: '',
        replied: false,
        message: '',
    };

    const [isRegistration, setRegistration] = useState(false);
    const [credentials, setCredentials] = useState(initialCredentials);
    const [comments, setComments] = useState(initialComments);
    const [isLoading, setLoading] = useState(false);
    const [isLoadingComments, setLoadingComments] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [disabledComments, setDisabledComments] = useState(false);
    const [registerMessage, setRegisterMessage] = useState('Join our community for the exciting journey');
    const [loginMessage, setLoginMessage] = useState('Login for the exciting jopurney');
    const [commentsMessage, setCommentsMessage] = useState('Reach out to us for any concerns');

    // used to do transitions from login to registration page
    const switchToRegistration = () => {
        setRegistration(true);
        const spanLogin = document.querySelector('.login');
        const spanLoginButton = document.querySelector('.login-button');
        const spanForgot = document.querySelector('.forgot');
        const spanRegister = document.querySelector('.register');
        const spanRegisterButton = document.querySelector('.register-button');
        const spanAcknowledge = document.querySelector('.acknowledge');
        spanLogin.classList.add('fade-out');
        spanLoginButton.classList.add('fade-out');
        spanForgot.classList.add('fade-out');
        setTimeout(() => {
            spanRegister.classList.add('fade-in');
            spanRegisterButton.classList.add('fade-in');
            spanAcknowledge.classList.add('fade-in');
        }, 500);
    }

    // used to do transitions from registration to login page
    const switchToLogin = () => {
        setRegistration(false);
        const spanLogin = document.querySelector('.login');
        const spanLoginButton = document.querySelector('.login-button');
        const spanForgot = document.querySelector('.forgot');
        const spanRegister = document.querySelector('.register');
        const spanRegisterButton = document.querySelector('.register-button');
        const spanAcknowledge = document.querySelector('.acknowledge');
        spanRegister.classList.remove('fade-in');
        spanRegisterButton.classList.remove('fade-in');
        spanAcknowledge.classList.remove('fade-in');
        setTimeout(() => {
            spanLogin.classList.remove('fade-out');
            spanLoginButton.classList.remove('fade-out');
            spanForgot.classList.remove('fade-out');
        }, 500);
    }

    const handleSubmit = (event) => {
        if (isRegistration) {
            handleRegister(event);
        } else {
            handleLogin(event);
        }
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        setLoading(true);
        setDisabled(true);
        const result = await backendService.saveCredentials(credentials);
        if (result.message === 'Request Processed') {
            const emailRequest = {
                clientEmail: result.email,
            }
            const emailResult = await backendService.sendVerificationEmail(emailRequest);
            setLoading(false);
            const newCredentialObject = {
                email: '',
                password: '',
                role: 'PARTICIPANT',
                verified: false,
                message: '',
            }
            setCredentials(newCredentialObject);
            setDisabled(false);
            if (emailResult.message === 'Mail Sent Successfully') {
                setRegisterMessage('Email Sent! Please verify your email');
                setTimeout(() => {
                    setRegisterMessage('Thanks for joining our community');
                }, 3000);
            } else {
                setRegisterMessage('Error occurred. Please try again later!');
                setTimeout(() => {
                    setRegisterMessage('Join our community for the exciting journey');
                }, 5000);
            }
        } else {
            setRegisterMessage('Error occurred. Please try again later!');
            setTimeout(() => {
                setRegisterMessage('Join our community for the exciting journey');
            }, 5000);
        }
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        const result = await backendService.validateCredentials(credentials);
        if (result.message === 'Please verify your account') {
            setLoginMessage('Please verify your account');
        } else if (result.message === 'Invalid access') {
            setLoginMessage('Invalid access');
        } else {
            if (result.role === 'PARTICIPANT') {
                setLoginMessage('Logged in as PARTICIPANT');
                const loginData = {
                    userType: USERS.PARTICIPANT,
                    email: credentials.email
                }
                setLoginData(loginData);
            }
            else if (result.role === 'ORGANIZER') {
                setLoginMessage('Logged in as ORGANIZER');
                const loginData = {
                    userType: USERS.ORGANIZER,
                    email: credentials.email
                }
                setLoginData(loginData);
            }
            else {
                setLoginMessage('Logged in as ADMIN');
                const loginData = {
                    userType: USERS.ADMIN,
                    email: credentials.email
                }
                setLoginData(loginData);
            }
        }
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

    const handleInputChangeEmail = (e) => {
        const newCredentialObject = { ...credentials };
        newCredentialObject.email = e.target.value;
        setCredentials(newCredentialObject);
    };

    const handleInputChangePassword = (e) => {
        const newCredentialObject = { ...credentials };
        newCredentialObject.password = e.target.value;
        setCredentials(newCredentialObject);
    };

    const handleOptionChange = (e) => {
        const newCredentialObject = { ...credentials };
        newCredentialObject.role = e.target.value;
        setCredentials(newCredentialObject);
    };

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

    return (
        <div className='container connectus-container'>
            {/* Forms Container -> Login/Registration Form and Contact Us Form*/}
            <div className="forms-container-flex">
                {/* Wrapper for login/registration form */}
                <div className="wrapper">
                    <div className="form-box">
                        <form onSubmit={handleSubmit}>
                            <h1 className='login-register-container'>
                                <span className='register'>Register</span>
                                <span className='login'>Login</span>
                            </h1>
                            <div className='mb-3 input-box'>
                                <input
                                    type="email"
                                    placeholder="email"
                                    value={credentials.email}
                                    onChange={handleInputChangeEmail}
                                    required />
                                <i className='bx bxs-user'></i>
                            </div>
                            <div className='mb-3 input-box'>
                                <input
                                    type="password"
                                    placeholder="password"
                                    value={credentials.password}
                                    onChange={handleInputChangePassword}
                                    required />
                                <i className='bx bxs-user'></i>
                            </div>
                            <div>
                                <span>
                                    <div className="acknowledge">
                                        <label>
                                            <input
                                                type="radio"
                                                name='client-role'
                                                id='organizer'
                                                value='ORGANIZER'
                                                checked={credentials.role === 'ORGANIZER'}
                                                onChange={handleOptionChange}
                                                required />
                                            <label htmlFor='organizer'>ORGANIZER</label>
                                            <input
                                                type="radio"
                                                name='client-role'
                                                id='participant'
                                                value='PARTICIPANT'
                                                checked={credentials.role === 'PARTICIPANT'}
                                                onChange={handleOptionChange}
                                                required
                                            />
                                            <label htmlFor='participant'>PARTICIPANT</label>
                                        </label>
                                    </div>
                                </span>
                                <span>
                                    <div className='forgot'>
                                        <a href="/">Forgot Password</a>
                                    </div>
                                </span>
                            </div>
                            {
                                isLoading ?
                                    <div>Loading...</div>
                                    :
                                    <button type="submit" className='btn btn-outline-light button_login' disabled={disabled}>
                                        <span className='register-button'>Register</span>
                                        <span className='login-button'>Login</span>
                                    </button>
                            }
                            <div className="register-link">
                                {
                                    isRegistration ?
                                        <p>Already have an account? <label onClick={switchToLogin}>Login</label></p>
                                        :
                                        <p>Dont have an account? <label onClick={switchToRegistration}>Register</label></p>
                                }
                            </div>
                            {
                                isRegistration ?
                                    <div className='message'>{registerMessage}</div>
                                    :
                                    <div className='message'>{loginMessage}</div>
                            }

                        </form>
                    </div>
                </div>
                {/* Wrapper for contact us form */}
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
    )
}
