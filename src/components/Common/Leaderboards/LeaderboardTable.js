import React, { useEffect, useState } from 'react';
import './leaderboard.css';
import backendService from '../../../services/backendService';

export default function LeaderboardTable(props) {
    const [teams, setTeams] = useState([
        {
            teamName: 'first-team',
            points: 30.0
        },
        {
            teamName: 'second-team',
            points: 20.0
        },
        {
            teamName: 'third-team',
            points: 10.0
        }
    ]);

    const fetchTeamsData = async () => {
        const response = await backendService.getTeamsWithPoints(props.eventId);
        // ESA-058: uncomment below code
        setTeams(response);
    }

    useEffect(() => {
        fetchTeamsData();
    }, []);
    return (
        <div className='leaderboard-table'>
            {
                teams && <>
                    <div className='table-heading'>
                        <h4>Team Names</h4>
                        <h4>Points</h4>
                    </div>
                    {
                        teams.map((team) => (
                            <div className='table-data'>
                                <div>{team.teamName}</div>
                                <div>{team.points}</div>
                            </div>
                        ))
                    }
                </>
            }
        </div>
    )
}
