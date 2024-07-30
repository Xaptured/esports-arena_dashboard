import './footer.css'
import React from 'react'
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube, FaCopyright } from 'react-icons/fa'

export default function Footer() {
    return (
        <div className='footerpage'>
            <div className='footer-overlay'>
                <div className="container footer-container">
                    <a href="https://github.com/Xaptured" target="_blank" rel="noreferrer">
                        <FaGithub className='icon' />
                    </a>
                    <span className="icon-space"></span>
                    <a href="https://github.com/Xaptured" target="_blank" rel="noreferrer">
                        <FaLinkedin className='icon' />
                    </a>
                    <span className="icon-space"></span>
                    <a href="https://www.instagram.com/xaptured__007/" target="_blank" rel="noreferrer">
                        <FaInstagram className='icon' />
                    </a>
                    <span className="icon-space"></span>
                    <a href="https://www.youtube.com/channel/UCDKMpLyKzruI-q_aXS5l_Uw" target="_blank" rel="noreferrer">
                        <FaYoutube className='icon' />
                    </a>
                </div>
                <div className='copyright_container'>
                    <FaCopyright className='copyright_icon' />
                    <span className='copyright_content'>Copyright 2024. All rights reserved by xaptured. Created by Jack with Love.</span>
                </div>
            </div>
        </div>
    )
}
