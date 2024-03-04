import React from 'react'
import './eventdetails.css'

export default function TeamCard(props) {
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


        </div>
    )
}
