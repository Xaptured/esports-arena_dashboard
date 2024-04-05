import React, { useEffect } from 'react'
import './participantcontainer.css'
import NavigationBar from '../NavBar/NavigationBar'
import Events from '../Common/Event/Events'
import Leaderboards from '../Common/Leaderboards/Leaderboards'
import Schedule from '../Common/Schedules/Schedules'
import Coins from '../Common/Coins'
import Help from '../Common/Help'
import { useAtomValue, useAtom } from 'jotai'
import { activeParticipantTabsAtom } from '../../atoms/activeTabsAtom'
import { profileStatusAtom } from '../../atoms/loginDataAtom'
import Profile from '../Common/Profile/Profile'
import backendService from '../../services/backendService'
import { loggedInUserAtom, loggedInUserAtomCopy } from '../../atoms/loginDataAtom'
import { useCopyValueAtom } from '../../atoms/loginDataAtom';

export default function ParticipantContainer() {
    const participantTabs = useAtomValue(activeParticipantTabsAtom);
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
        <div className='container participant-container'>
            <NavigationBar />
            {
                !isProfileComplete ?
                    (
                        <Profile />
                    )
                    :
                    (
                        <>
                            {participantTabs[0] && <Events />}
                            {participantTabs[1] && <Leaderboards />}
                            {participantTabs[2] && <Schedule />}
                            {/* Need to think this coins: future scope */}
                            {/* {participantTabs[3] && <Coins />} */}
                            {participantTabs[3] && <Help />}
                        </>
                    )
            }

        </div>
    )
}
