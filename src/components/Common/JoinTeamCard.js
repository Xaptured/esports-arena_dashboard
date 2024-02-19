import React, { useState } from 'react'
import './eventdetails.css'
import backendService from '../../services/backendService';

export default function JoinTeamCard(props) {

    const [showJoin, setShowJoin] = useState(false);
    const [inputFields, setInputFields] = useState(['']);
    const [countPlayers, setCountPlayers] = useState(1);
    const [errorMsg, setErrorMsg] = useState('');
    const [disableSubmit, setDisableSubmit] = useState(false);

    const handleShowJoin = () => {
        setShowJoin(!showJoin);
    };

    const handleInputChange = (index, event) => {
        const values = [...inputFields];
        values[index] = event.target.value;
        setInputFields(values);
    };

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
                const payload = {
                    name: props.teamName,
                    eventId: null,
                    teamStatus: null,
                    detail: emailArr,
                    message: null
                };
                const result = await backendService.updateTeam(payload);
                if (result.message === 'Request Processed') {
                    const message = 'Updated successfully';
                    setErrorMsg(message);
                    props.registered(true);
                } else {
                    setErrorMsg('Error occurred. Please try again later.');
                    setDisableSubmit(false);
                }
            } else {
                setErrorMsg('Please enter a new email address.');
            }
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
            </div>
            <div className='join-button'>
                {
                    !showJoin ?
                        <button type="button" className='btn btn-outline-light' onClick={handleShowJoin}>
                            JOIN
                        </button>
                        :
                        <div className='join-form-container'>
                            <form onSubmit={handleSubmit}>
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
                                        countPlayers < 2 ?
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
                                <div className='join-team-card-action-bar'>
                                    <button type="submit" className='btn btn-outline-light join-team-card-button' disabled={disableSubmit}>
                                        Submit
                                    </button>
                                    <button type="button" className='btn btn-outline-light join-team-card-button' onClick={handleShowJoin}>
                                        Cancel
                                    </button>
                                </div>

                            </form>
                            {
                                errorMsg && <div className="error-message-space">{errorMsg}</div>
                            }
                        </div>
                }

            </div>

        </div>
    )
}
