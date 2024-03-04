import React, { useEffect, useState } from 'react'
import './eventdetails.css'
import { eventOrganizerDetailsAtom } from '../../../atoms/eventAtom';
import EventDetailSection from './EventDetailSection';
import { useAtomValue } from 'jotai';
import TeamCard from './TeamCard';
import backendService from '../../../services/backendService'
import { RxCross2 } from "react-icons/rx";


export default function EventOrganizerDetails() {
    const [showTeams, setShowTeams] = useState(false);
    const [teamDetailsList, setTeamDetailsList] = useState(null);
    const eventOrganizerDetails = useAtomValue(eventOrganizerDetailsAtom);
    const handleShowTeamsClick = () => {
        setShowTeams(!showTeams);
    }
    const getTeamsWithCount = async () => {
        const eventId = await backendService.getEventId('PUBG-EVENT');
        const teamDetailsResponse = await backendService.getTeamsWithCount(eventId, eventOrganizerDetails.name);
        setTeamDetailsList(teamDetailsResponse);
    }

    useEffect(() => {
        getTeamsWithCount();
    }, []);
    return (
        <>
            {
                eventOrganizerDetails && <div className='event-content-scrollable'>
                    <EventDetailSection eventDetails={eventOrganizerDetails} />
                </div>
            }
            {
                !showTeams ?
                    <button type="button" className='btn btn-outline-light button_team' onClick={handleShowTeamsClick}>
                        SHOW TEAMS
                    </button>
                    :
                    <div className='join-team-container'>
                        <div className="close-icon-container">
                            <RxCross2 size={30} color="grey" onClick={handleShowTeamsClick} />
                        </div>
                        <h1>Teams</h1>
                        {
                            teamDetailsList && teamDetailsList.map((teamDetails) => (
                                <TeamCard teamName={teamDetails.teamName} count={teamDetails.remainingPlayers} />
                            ))
                        }
                    </div>
            }
        </>
    )
}
