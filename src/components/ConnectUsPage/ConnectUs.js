import backendService from '../../services/backendService';
import './connectus.css'
import React, { useState } from 'react'

export default function ConnectUs() {

    const initialCredentials = {
        email: '',
        password: '',
        role: 'PARTICIPANT',
        verified: false,
        message: '',
    }
    const [isRegistration, setRegistration] = useState(false);
    const [credentials, setCredentials] = useState(initialCredentials);
    const [isLoading, setLoading] = useState(false); // TODO: Utilitze this field while using loader
    const [disabled, setDisabled] = useState(false);
    // TODO: set message based on isRegistration flag - THINK
    const [registerMessage, setRegisterMessage] = useState('Join our community for the exciting journey');
    const [loginMessage, setLoginMessage] = useState('Login for the exciting jopurney');

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
        const credentialObject = {
            email: credentials.email,
            password: credentials.password,
            role: credentials.role,
            verified: credentials.verified,
            message: credentials.message,
        }
        const result = await backendService.saveCredentials(credentialObject);
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
        const credentialObject = {
            email: credentials.email,
            password: credentials.password,
            role: credentials.role,
            verified: credentials.verified,
            message: credentials.message,
        }
        const result = await backendService.validateCredentials(credentialObject);
        if (result.message === 'Please verify your account') {
            setLoginMessage('Please verify your account');
        } else if (result.message === 'Invalid access') {
            setLoginMessage('Invalid access');
        } else {
            if (result.role === 'PARTICIPANT') {
                setLoginMessage('Logged in as PARTICIPANT');
            }
            else if (result.role === 'ORGANIZER') {
                setLoginMessage('Logged in as ORGANIZER');
            }
            else {
                setLoginMessage('Logged in as ADMIN');
            }
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
                        <form>
                            <h1>Contact us</h1>
                            <div className='mb-3 input-box'>
                                <input type="email" placeholder="email" required />
                                <i className='bx bxs-user'></i>
                            </div>
                            <div className='mb-3 input-box'>
                                <textarea placeholder="write your comment" required></textarea>
                                <i className='bx bxs-user'></i>
                            </div>
                            <button type="button" className='btn btn-outline-light button_submit'>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
