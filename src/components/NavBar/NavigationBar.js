import React from 'react';
import './navigationbar.css';
import {
    participantNavElements, organizerNavElements, adminNavElements
} from '../../constants/NavBarConstants';
import { useAtomValue, useAtom } from 'jotai';
import { activeAdminTabsAtom, activeOrganizerTabsAtom, activeParticipantTabsAtom } from '../../atoms/activeTabsAtom';
import { USERS, loggedInUserAtom, loggedInUserAtomCopy } from '../../atoms/loginDataAtom';
import { useCopyValueAtom } from '../../atoms/loginDataAtom';

export default function NavigationBar() {

    // ESA-058-START
    const useCopyAtom = useAtomValue(useCopyValueAtom);
    let loggedInUserAtomResult;
    if (useCopyAtom) {
        loggedInUserAtomResult = loggedInUserAtomCopy;
    } else {
        loggedInUserAtomResult = loggedInUserAtom;
    }
    // ESA-058-END
    const [participantTabs, setParticipantTabs] = useAtom(activeParticipantTabsAtom);
    const [organizerTabs, setOrganizerTabs] = useAtom(activeOrganizerTabsAtom);
    const [adminTabs, setAdminTabs] = useAtom(activeAdminTabsAtom);
    const loginData = useAtomValue(loggedInUserAtomResult);

    const createComponentsArray = (tabs, index) => {
        const arr = new Array(tabs.length);
        for (let i = 0; i < tabs.length; i++) {
            if (i === index) arr[i] = true;
            else arr[i] = false;
        }
        return arr;
    }

    const setCurrentComponent = (index) => {
        if (loginData.userType === USERS.PARTICIPANT) {
            const activeTabsArray = createComponentsArray(participantTabs, index);
            setParticipantTabs(activeTabsArray);
        } else if (loginData.userType === USERS.ORGANIZER) {
            const activeTabsArray = createComponentsArray(organizerTabs, index);
            setOrganizerTabs(activeTabsArray);
        } else {
            const activeTabsArray = createComponentsArray(adminTabs, index);
            setAdminTabs(activeTabsArray);
        }
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
                                loginData.userType === USERS.PARTICIPANT ?
                                    (participantNavElements.map((element, index) =>
                                        <li key={index} className="nav-item ms-5 px-3" onClick={() => setCurrentComponent(index)}>
                                            {element}
                                        </li>)
                                    )
                                    :
                                    loginData.userType === USERS.ORGANIZER ? (organizerNavElements.map((element, index) =>
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
