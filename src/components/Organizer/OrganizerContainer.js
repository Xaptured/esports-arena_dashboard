import React, { useEffect } from 'react'
import './organizercontainer.css'
import NavigationBar from '../NavBar/NavigationBar'
import Events from '../Common/Event/Events'
import Leaderboards from '../Common/Leaderboards/Leaderboards'
import Schedule from '../Common/Schedules/Schedules'
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
        // FIX
        // setProfileComplete(response.profileComplete);
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
                        {organizerTabs[1] && <Leaderboards />}
                        {organizerTabs[2] && <Schedule />}
                        {organizerTabs[3] && <Help />}
                    </>
            }

        </div>
    )
}
