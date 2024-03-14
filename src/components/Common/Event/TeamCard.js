import React from 'react'
import './eventdetails.css'
import backendService from '../../../services/backendService'
import { useState } from 'react'

export default function TeamCard(props) {
    const [showButton, setShowButton] = useState(true);
    const handleApprove = async () => {
        const response = await backendService.updateTeamStatus('PAID', props.teamName);
        if (response === 'Request Processed') {
            setShowButton(false);
        }
    }
    return (
        <div className='join-team-card-container'>
            <div className='join-team-header'>
                <div className='team-name'>
                    <p>{props.teamName}</p>
                </div>
                {
                    props.count > 1 && (
                        <div className='join-team-slots-left'>
                            <p>{props.count} slots left</p>
                        </div>
                    )
                }
                {
                    props.count === 1 && (
                        <div className='join-team-slots-left'>
                            <p>{props.count} slot left</p>
                        </div>
                    )
                }
                {
                    props.count === 0 && (
                        <div className='join-team-slots-left'>
                            <p>No slots left</p>
                        </div>
                    )
                }
            </div>
            {
                props.type === 'PAID' && (
                    showButton ?
                        <div className="action-bar-leaderboard">
                            <button className='btn btn-outline-light button_event_form' onClick={handleApprove}>Approve</button>
                        </div>
                        :
                        <div className='confirm-message-space'>
                            Approved
                        </div>
                )

            }

        </div>
    )
}
