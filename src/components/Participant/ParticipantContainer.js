import React, { useEffect } from 'react'
import './participantcontainer.css'
import NavigationBar from '../NavBar/NavigationBar'
import Events from '../Common/Events'
import News from '../Common/News'
import Schedule from '../Common/Schedule'
import Coins from '../Common/Coins'
import Help from '../Common/Help'
import { useAtomValue, useAtom } from 'jotai'
import { activeParticipantTabsAtom } from '../../atoms/activeTabsAtom'
import { profileStatusAtom } from '../../atoms/loginDataAtom'
import Profile from '../Common/Profile'
import backendService from '../../services/backendService'
import { loggedInUserAtom } from '../../atoms/loginDataAtom'

export default function ParticipantContainer() {
    const participantTabs = useAtomValue(activeParticipantTabsAtom);

    // need to add an API call to check the profile is completed or not inside useeffect.
    const [isProfileComplete, setProfileComplete] = useAtom(profileStatusAtom);
    const loggedInUser = useAtomValue(loggedInUserAtom);

    const isProfileCompleted = async () => {
        const response = await backendService.isProfileComplete(loggedInUser.email);
        // setProfileComplete(response.isProfileComplete);
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
                            {participantTabs[1] && <News />}
                            {participantTabs[2] && <Schedule />}
                            {participantTabs[3] && <Coins />}
                            {participantTabs[4] && <Help />}
                        </>
                    )
            }

        </div>
    )
}
