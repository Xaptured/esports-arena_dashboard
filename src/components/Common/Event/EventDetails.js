import React, { useEffect, useState } from 'react'
import './eventdetails.css'
import { useAtomValue } from 'jotai';
import { eventDetailsAtom, eventDetailsAtomCopy } from '../../../atoms/eventAtom';
import { useCopyValueAtom } from '../../../atoms/loginDataAtom';
import { RxCross2 } from "react-icons/rx";
import backendService from '../../../services/backendService';
import { loggedInUserAtom, loggedInUserAtomCopy } from '../../../atoms/loginDataAtom';
import JoinTeamCard from './JoinTeamCard';
import EventDetailSection from './EventDetailSection';

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
    const [showParticipants, setShowParticipants] = useState(false);
    const [teamDetails, setTeamDetails] = useState(null);
    const [countLeft, setCountLeft] = useState(null);
    const [teamDetailsList, setTeamDetailsList] = useState(null);

    const isFieldUnique = (value) => {
        const subarray = inputFields.slice(0, inputFields.length - 1);
        return subarray.includes(value);
    };

    const handleAddField = async () => {
        const val = inputFields[inputFields.length - 1];
        if (val === '') {
            setErrorMsg("Please fill the email.");
        } else {
            if (!isFieldUnique(val)) {
                // ESA-058 - uncomment below code
                const response = await backendService.isProfilePresent(val);
                // const response = true;
                if (response) {
                    setErrorMsg('');
                    let counter = countPlayers;
                    setCountPlayers(++counter);
                    setInputFields([...inputFields, '']);
                } else {
                    setErrorMsg('Please register the last entered email to participate in the event');
                }

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
        const response = await backendService.getEventId(eventDetails.name);
        setEventId(response);
        return response;
    }

    const isRegisteredInEvent = async () => {
        const id = await getEventId();
        const response = await backendService.isRegistered(id, eventDetails.name, loggedInUser.email);
        if (response) {
            setRegistered(response);
            if (eventDetails.type === 'FREE') {
                setMessage('Team successfully registered');
            } else {
                // call backend to check team is approved or not

            }
            const message = eventDetails.type === 'FREE' ? 'Team successfully registered' : 'Team successfully registered and it is in pending state. Once organizer approves it, you will receive an email of confirmation.';
            setMessage(message);
        }
        // setRegistered(response);
        // ESA-058: make it set to the response
        // const message = eventDetails.type === 'FREE' ? 'Team successfully registered' : 'Team successfully registered and it is in pending state. Once organizer approves it, you will receive an email of confirmation.';
        // setMessage(message);
        else {
            setRegistered(response);
            const teamDetailsResponse = await backendService.getTeamsWithCount(id, eventDetails.name);
            setTeamDetailsList(teamDetailsResponse);
        }

    }

    const handleShowParticipant = async () => {
        const responseForTeamDetails = await backendService.getTeamDetailsForEvent(eventId, eventDetails.name, loggedInUser.email);
        setTeamDetails(responseForTeamDetails);
        const responseCount = await backendService.remainingPlayersPerSlotCount(eventId, eventDetails.name, loggedInUser.email);
        setCountLeft(responseCount);
        setShowParticipants(!showParticipants);

    }

    const handleCloseParticipant = () => {
        setShowParticipants(!showParticipants);
    }

    useEffect(() => {
        isRegisteredInEvent();
    }, []);
    return (
        <>
            {
                eventDetails && <div className='event-content-scrollable'>
                    <EventDetailSection eventDetails={eventDetails} />
                    {
                        !isRegistered ?
                            <div className="event-forms">
                                {
                                    eventDetails.remainingSlots > 0 && (
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
                                                        <div className="error-message-space">{errorMsg}</div>
                                                    </form>
                                                </div>
                                            </div>)
                                }
                                {
                                    !showJoinForm ?
                                        <button type="button" className='btn btn-outline-light button_team' onClick={handleJoinTeamClick}>
                                            JOIN A TEAM
                                        </button>
                                        :
                                        <div className='join-team-container'>
                                            <div className="close-icon-container">
                                                <RxCross2 size={30} color="grey" onClick={handleJoinTeamClick} />
                                            </div>
                                            <h1>Join a team</h1>
                                            {
                                                teamDetailsList && teamDetailsList.map((teamDetails) => (
                                                    teamDetails.remainingPlayers > 0 && <JoinTeamCard teamName={teamDetails.teamName} count={teamDetails.remainingPlayers} registered={setRegistered} />
                                                ))
                                            }
                                        </div>
                                }
                            </div>
                            :
                            <div>
                                <div className='message-space'>{message}</div>
                                {
                                    showParticipants ?
                                        <div className='show-participant-container'>
                                            <div className="show-participant-box">
                                                <div className="close-icon-container">
                                                    <RxCross2 size={30} color="grey" onClick={handleCloseParticipant} />
                                                </div>
                                                <h1>Participants</h1>
                                                <div className="participant-content-container">
                                                    {
                                                        teamDetails && teamDetails.map((details) => (
                                                            <div className='participant-content'>
                                                                <div className='participant-content-username'>{details.name}</div>
                                                                <div className='participant-content-email'>{details.email}</div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                {
                                                    countLeft && countLeft > 1 && <div className='error-message-space'>{countLeft} slots left</div>
                                                }
                                                {
                                                    countLeft && countLeft === 1 && <div className='error-message-space'>{countLeft} slot left</div>
                                                }
                                                {
                                                    countLeft && countLeft < 1 && <div className='error-message-space'>No slots left</div>
                                                }
                                            </div>
                                        </div>
                                        :
                                        <button type="button" className='btn btn-outline-light button_show_participant' onClick={handleShowParticipant}>
                                            Show Participants
                                        </button>
                                }
                            </div>
                    }
                </div>
            }
        </>
    )
}
