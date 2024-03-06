import React, { useEffect } from 'react'
import './organizercontainer.css'
import NavigationBar from '../NavBar/NavigationBar'
import Events from '../Common/Event/Events'
import News from '../Common/News'
import Schedule from '../Common/Schedule'
import Help from '../Common/Help'
import { activeOrganizerTabsAtom } from '../../atoms/activeTabsAtom'
import { loggedInUserAtom, loggedInUserAtomCopy } from '../../atoms/loginDataAtom'
import { useCopyValueAtom } from '../../atoms/loginDataAtom';
import { profileStatusAtom } from '../../atoms/loginDataAtom'
import Profile from '../Common/Profile/Profile'
import { useAtomValue, useAtom } from 'jotai'
import backendService from '../../services/backendService'

export default function OrganizerContainer() {
    const organizerTabs = useAtomValue(activeOrganizerTabsAtom);
    // ESA-058-START
    const useCopyAtom = useAtomValue(useCopyValueAtom);
    let loggedInUserAtomResult;
    if (useCopyAtom) {
        loggedInUserAtomResult = loggedInUserAtomCopy;
    } else {
        loggedInUserAtomResult = loggedInUserAtom;
    }
    // ESA-058-END
    const [isProfileComplete, setProfileComplete] = useAtom(profileStatusAtom);
    const loggedInUser = useAtomValue(loggedInUserAtomResult);

    const isProfileCompleted = async () => {
        const response = await backendService.isProfileComplete(loggedInUser.email);
        // ESA-058: Uncomment below code
        // setProfileComplete(response.isProfileComplete);
        setProfileComplete(true);
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        isProfileCompleted();
    }, [])

    return (
        <div className='container organizer-container'>
            <NavigationBar />
            {
                !isProfileComplete ?
                    <Profile />
                    :
                    <>
                        {organizerTabs[0] && <Events />}
                        {organizerTabs[1] && <News />}
                        {organizerTabs[2] && <Schedule />}
                        {organizerTabs[3] && <Help />}
                    </>
            }

        </div>
    )
}
