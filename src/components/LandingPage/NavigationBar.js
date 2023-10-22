import './navigationbar.css'
import React from 'react'

export default function NavigationBar() {
    return (
        // TODO: Add Animations and go to sections
        <div>
            <nav className="navbar navbar-expand-lg sticky-top pt-4 pb-4">
                <div className="container-fluid">
                    <p className="logoName">
                        ESportsArena
                    </p>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs-5  navigation_elements">
                            <li className="nav-item ms-3 px-3">
                                Your Place
                            </li>
                            <li className="nav-item ms-3 px-3">
                                Partners
                            </li>
                            <li className="nav-item ms-3 px-3">
                                Join Us
                            </li>
                            <li className="nav-item ms-3 px-3">
                                Contact Us
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
