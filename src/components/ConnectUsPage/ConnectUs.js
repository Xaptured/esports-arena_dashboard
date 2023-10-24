import './connectus.css'
import React, { useState } from 'react'

export default function ConnectUs() {

    const [isRegistration, setRegistration] = useState(false);

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

    return (
        <div className='container connectus-container'>
            {/* Forms Container -> Login/Registration Form and Contact Us Form*/}
            <div className="forms-container-flex">
                {/* Wrapper for login/registration form */}
                <div className="wrapper">
                    <div className="form-box">
                        <form>
                            <h1 className='login-register-container'>
                                <span className='register'>Register</span>
                                <span className='login'>Login</span>
                            </h1>
                            <div className='mb-3 input-box'>
                                <input type="text" placeholder="username" required />
                                <i className='bx bxs-user'></i>
                            </div>
                            <div className='mb-3 input-box'>
                                <input type="password" placeholder="password" required />
                                <i className='bx bxs-user'></i>
                            </div>
                            <div>
                                <span>
                                    <div className="acknowledge">
                                        <label>
                                            <input type="radio" name='client-role' id='organizer' />
                                            <label htmlFor='organizer'>ORGANIZER</label>
                                            <input type="radio" name='client-role' id='participant' />
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
                            <button type="button" className='btn btn-outline-light button_login'>
                                <span className='register-button'>Register</span>
                                <span className='login-button'>Login</span>
                            </button>
                            <div className="register-link">
                                {
                                    isRegistration ?
                                        <p>Already have an account? <label onClick={switchToLogin}>Login</label></p>
                                        :
                                        <p>Dont have an account? <label onClick={switchToRegistration}>Register</label></p>
                                }
                            </div>
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
