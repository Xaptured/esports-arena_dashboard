import React, { useEffect, useState } from 'react'
import './eventdetails.css'
import { useAtomValue } from 'jotai';
import { eventDetailsAtom, eventDetailsAtomCopy } from '../../atoms/eventAtom';
import { useCopyValueAtom } from '../../atoms/loginDataAtom';
import { RxCross2 } from "react-icons/rx";
import backendService from '../../services/backendService';
import { loggedInUserAtom, loggedInUserAtomCopy } from '../../atoms/loginDataAtom';

export default function EventDetails() {

    // ESA-058-START
    const useCopyAtom = useAtomValue(useCopyValueAtom);
    let eventDetailsAtomResult;
    let loggedInUserAtomResult;
    if (useCopyAtom) {
        eventDetailsAtomResult = eventDetailsAtomCopy;
        loggedInUserAtomResult = loggedInUserAtomCopy;
    } else {
        eventDetailsAtomResult = eventDetailsAtom;
        loggedInUserAtomResult = loggedInUserAtom;
    }
    // ESA-058-END
    const eventDetails = useAtomValue(eventDetailsAtomResult);
    const [showJoinForm, setShowJoinForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [inputFields, setInputFields] = useState(['']);
    const [errorMsg, setErrorMsg] = useState('');
    const [countPlayers, setCountPlayers] = useState(1);
    const [teamName, setTeamName] = useState(null);
    const [eventId, setEventId] = useState(null);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [isRegistered, setRegistered] = useState(false);
    const [message, setMessage] = useState(null);
    const loggedInUser = useAtomValue(loggedInUserAtomResult);

    const isFieldUnique = (value) => {
        const subarray = inputFields.slice(0, inputFields.length - 1);
        return subarray.includes(value);
    };

    const handleAddField = () => {
        const val = inputFields[inputFields.length - 1];
        if (val === '') {
            setErrorMsg("Please fill the email.");
        } else {
            if (!isFieldUnique(val)) {
                setErrorMsg('');
                let counter = countPlayers;
                setCountPlayers(++counter);
                setInputFields([...inputFields, '']);
            } else {
                setErrorMsg('Please enter a new email address.');
            }
        }
    };

    const handleCancelField = () => {
        if (inputFields.length > 1) {
            let counter = countPlayers;
            setCountPlayers(--counter);
            const updatedFields = [...inputFields];
            updatedFields.pop();
            setInputFields(updatedFields);
        }
    };

    const handleInputChangeTeamName = (e) => {
        setTeamName(e.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const val = inputFields[inputFields.length - 1];
        if (val === '') {
            setErrorMsg("Please fill the email.");
        } else {
            if (!isFieldUnique(val)) {
                setErrorMsg('');
                setDisableSubmit(true);
                const emailArr = inputFields.map((inputEmail) => ({ email: inputEmail, playerNumber: null }));
                const teamStatus = eventDetails.type === 'FREE' ? 'FREE' : 'PENDING';
                const payload = {
                    name: teamName,
                    eventId: eventId,
                    teamStatus: teamStatus,
                    detail: emailArr,
                    message: null
                };
                const result = await backendService.saveTeam(payload);
                if (result.message === 'Request Processed') {
                    const message = eventDetails.type === 'FREE' ? 'Team successfully registered' : 'Team successfully registered and it is in pending state. Once organizer approves it, you will receive an email of confirmation.';
                    setMessage(message);
                    setRegistered(true);
                } else {
                    setErrorMsg('Error occurred. Please try again later.');
                    setDisableSubmit(false);
                }

            } else {
                setErrorMsg('Please enter a new email address.');
            }
        }
    }

    const handleInputChange = (index, event) => {
        const values = [...inputFields];
        values[index] = event.target.value;
        setInputFields(values);
    };

    const handleJoinTeamClick = () => {
        setShowJoinForm(!showJoinForm);
    }

    const handleCreateTeamClick = () => {
        setShowCreateForm(!showCreateForm);
    }

    const getEventId = async () => {
        // ESA-058: change the team name to get from eventDetails atom
        const response = await backendService.getEventId('PUBG-EVENT');
        setEventId(response);
    }

    const isRegisteredInEvent = async () => {
        const response = await backendService.isRegistered(eventId, eventDetails.name, loggedInUser.email);
        if (response) {
            const message = eventDetails.type === 'FREE' ? 'Team successfully registered' : 'Team successfully registered and it is in pending state. Once organizer approves it, you will receive an email of confirmation.';
            setMessage(message);
        }
        setRegistered(response);
    }

    useEffect(() => {
        getEventId();
        isRegisteredInEvent();
    }, [])
    return (
        <>
            {
                eventDetails && <div className='event-content-scrollable'>
                    <div className='event-name'>
                        <h1 className='event-name-content'>{eventDetails.name}</h1>
                    </div>
                    <div className='event-description'>
                        <div className='event-description-content'>
                            <div className='event-description-key'>Date</div>
                            <div className='event-description-value'>{eventDetails.date}</div>
                        </div>
                        <div className='event-description-content'>
                            <div className='event-description-key'>Time</div>
                            <div className='event-description-value'>{eventDetails.time}</div>
                        </div>
                        <div className='event-description-content'>
                            <div className='event-description-key'>Duration</div>
                            <div className='event-description-value'>{eventDetails.duration}</div>
                        </div>
                        <div className='event-description-content'>
                            <div className='event-description-key'>Players per slot</div>
                            <div className='event-description-value'>{eventDetails.playersPerSlot}</div>
                        </div>
                        <div className='event-description-content'>
                            <div className='event-description-key'>Total Slots</div>
                            <div className='event-description-value'>{eventDetails.slotCount}</div>
                        </div>
                        <div className='event-description-content'>
                            <div className='event-description-key'>Event type</div>
                            <div className='event-description-value'>{eventDetails.type}</div>
                        </div>
                        {
                            eventDetails.prizePool && <div className='event-description-content'>
                                <div className='event-description-key'>Prize pool</div>
                                <div className='event-description-value'>{eventDetails.prizePool}</div>
                            </div>
                        }
                    </div>
                    <div className='event-rules'>
                        <div style={{ fontSize: '30px', marginBottom: '3%' }}>Rules</div>
                        <ul className='event-rules-content'>
                            {
                                eventDetails.rules && eventDetails.rules.map((rule, index) => (
                                    <li className='rule-list' key={index}>{rule.description}</li>
                                ))
                            }
                        </ul>
                    </div>
                    {
                        !isRegistered ?
                            <div className="event-forms">
                                {
                                    !showJoinForm ?
                                        <button type="button" className='btn btn-outline-light button_team' onClick={handleJoinTeamClick}>
                                            JOIN A TEAM
                                        </button>
                                        :
                                        <div>
                                            Join Form
                                        </div>
                                }
                                {
                                    !showCreateForm ?
                                        <button type="button" className='btn btn-outline-light button_team' onClick={handleCreateTeamClick}>
                                            CREATE A TEAM
                                        </button>
                                        :
                                        <div className='create-team-form'>
                                            <div className="form-box-create-team">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="close-icon-container">
                                                        <RxCross2 size={30} color="grey" onClick={handleCreateTeamClick} />
                                                    </div>

                                                    <h1>Create a team</h1>
                                                    <div className='mb-3 input-box'>
                                                        <input
                                                            type="text"
                                                            placeholder="Team name"
                                                            value={teamName}
                                                            onChange={handleInputChangeTeamName}
                                                            required />
                                                        <i className='bx bxs-user'></i>
                                                    </div>
                                                    <i className='bx bxs-user'></i>
                                                    {inputFields.map((inputField, index) => (
                                                        <div key={index} className='mb-3 input-box'>
                                                            <input
                                                                type="email"
                                                                placeholder="Email"
                                                                value={inputField}
                                                                onChange={(event) => handleInputChange(index, event)}
                                                                required
                                                            />
                                                            <i className='bx bxs-user'></i>
                                                        </div>
                                                    ))}
                                                    <div className="add-more">
                                                        {
                                                            countPlayers < eventDetails.playersPerSlot ?
                                                                <label onClick={handleAddField} style={{ marginRight: '4%' }}>+Add more</label>
                                                                :
                                                                ''
                                                        }
                                                        {
                                                            countPlayers > 1 ?
                                                                <label onClick={handleCancelField}>-Cancel</label>
                                                                :
                                                                ''
                                                        }
                                                    </div>
                                                    <div className="action-bar">
                                                        <button type="submit" className='btn btn-outline-light button_submit_create_team' disabled={disableSubmit}>
                                                            Submit
                                                        </button>
                                                    </div>
                                                    {/* Use this space to show error messages */}
                                                    <div className="message-space">{errorMsg}</div>
                                                </form>
                                            </div>
                                        </div>
                                }

                            </div>
                            :
                            <div>{message}</div>
                    }
                </div>
            }
        </>
    )
}
