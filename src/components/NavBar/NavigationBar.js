import React from 'react';
import './navigationbar.css';
import {
    participantNavElements, organizerNavElements, adminNavElements
} from '../../constants/NavBarConstants';

export default function NavigationBar(props) {

    const { userType, currentComponent, components } = props;

    const setCurrentComponent = (index) => {
        console.log(index)
        const arr = new Array(currentComponent.length);
        for (let i = 0; i < currentComponent.length; i++) {
            if (i === index) arr[i] = true;
            else arr[i] = false;
        }
        components(arr);
    }
    return (
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
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs-5 nav_elements">
                            {
                                userType === 'participant' ?
                                    (participantNavElements.map((element, index) =>
                                        <li key={index} className="nav-item ms-5 px-3" onClick={() => setCurrentComponent(index)}>
                                            {element}
                                        </li>)
                                    )
                                    :
                                    userType === 'organizer' ? (organizerNavElements.map((element, index) =>
                                        <li key={index} className="nav-item ms-5 px-3" onClick={() => setCurrentComponent(index)}>
                                            {element}
                                        </li>))
                                        :
                                        (adminNavElements.map((element, index) =>
                                            <li key={index} className="nav-item ms-5 px-3" onClick={() => setCurrentComponent(index)}>
                                                {element}
                                            </li>)
                                        )

                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
