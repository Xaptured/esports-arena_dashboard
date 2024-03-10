import React, { useEffect, useState } from 'react'
import './eventdetails.css'
import { eventOrganizerDetailsAtom } from '../../../atoms/eventAtom';
import EventDetailSection from './EventDetailSection';
import { useAtom } from 'jotai';
import TeamCard from './TeamCard';
import backendService from '../../../services/backendService'
import { RxCross2 } from "react-icons/rx";


export default function EventOrganizerDetails() {
    const [showTeams, setShowTeams] = useState(false);
    const [teamDetailsList, setTeamDetailsList] = useState(null);
    const [eventOrganizerDetails, setEventOrganizerDetails] = useAtom(eventOrganizerDetailsAtom);
    const handleShowTeamsClick = () => {
        setShowTeams(!showTeams);
    }
    const getTeamsWithCount = async () => {
        const eventId = await backendService.getEventId('PUBG-EVENT');
        const teamDetailsResponse = await backendService.getTeamsWithCount(eventId, eventOrganizerDetails.name);
        // ESA-058: Uncomment below code
        // setTeamDetailsList(teamDetailsResponse);
        setTeamDetailsList([
            {
                teamName: "TEAM-ONE",
                remainingPlayers: 2
            },
            {
                teamName: "TEAM-TWO",
                remainingPlayers: 0
            },
            {
                teamName: "TEAM-THREE",
                remainingPlayers: 1
            }
        ])
    }

    const closeEventOrganizerDetails = () => {
        setEventOrganizerDetails(null);
    }

    useEffect(() => {
        getTeamsWithCount();
    }, []);
    return (
        <>
            {
                eventOrganizerDetails && <div className='event-content-scrollable'>
                    <EventDetailSection eventDetails={eventOrganizerDetails} />
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
                    <button type="button" className='btn btn-outline-light button_team' onClick={closeEventOrganizerDetails}>
                        Close
                    </button>
                </div>
            }

        </>
    )
}
