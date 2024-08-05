import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { RxCross2 } from "react-icons/rx";
import "primereact/resources/themes/arya-blue/theme.css"
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import './eventform.css';
import backendService from '../../../services/backendService';

export default function Leaderboard(props) {

    const [selectedTeam, setSelectedTeam] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [file, setFile] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const [disableUpload, setDisableUpload] = useState(false);
    const [teamOptions, setTeamOptions] = useState([]);

    const toggleForm = () => {
        setShowForm(!showForm);
    }

    const toggleSubmit = () => {
        setIsSubmit(!isSubmit);
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const response = await backendService.saveLeaderboardDocument(file, props.eventId);
        if (response.message === "Request Processed") {
            setErrorMsg("File uploaded successfully");
            setDisableUpload(true);
        }
    };

    const getTeamsWithIds = async () => {
        const response = await backendService.getTeamsWithIds(props.eventId);
        const mappedResponse = response.map((obj) => ({ name: obj.teamName, id: obj.teamID }));
        setTeamOptions(mappedResponse);

    }
    useEffect(() => {
        getTeamsWithIds();
        // eslint-disable-next-line
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const leaderboard = {
            eventId: props.eventId,
            teamId: selectedTeam.id,
            message: ''
        }
        const response = await backendService.saveLeaderboard(leaderboard);
        if (response.message === "Request Processed") {
            toggleSubmit();
        } else {
            setErrorMsg('Something went wrong. Please try again later.')
        }
    }

    return (
        <>
            {
                showForm ? (
                    <>
                        <div className='create-event-form'>
                            <div className="form-box-create-event">
                                {
                                    isSubmit ?
                                        <>
                                            <p className="message-space-two">Please upload the updated teams document with points. It will help teams to understand the rankings.</p>
                                            <div className="mb-3 input-box">
                                                <input type="file" onChange={handleFileChange} />
                                            </div>
                                            <div className="action-bar-leaderboard">
                                                <button className='btn btn-outline-light button_event_form' onClick={handleUpload} disabled={disableUpload}>Upload Document</button>
                                            </div>
                                            <div className="error-message-space">{errorMsg}</div>
                                        </>
                                        :
                                        <form onSubmit={handleSubmit}>
                                            <div className="close-icon-container">
                                                <RxCross2 size={30} color="grey" onClick={toggleForm} />
                                            </div>

                                            <h1>Leaderboard</h1>
                                            <p className="message-space">Once submitted it can not be reverted.</p>

                                            <div className='leaderboard-container'>
                                                <div className="mb-3 input-box">
                                                    <Dropdown value={selectedTeam} onChange={(e) => setSelectedTeam(e.value)} options={teamOptions} optionLabel="name"
                                                        placeholder="Select winning team" className="customDropdown" panelClassName='customPanelDropdown' />
                                                </div>
                                                <div className="action-bar-leaderboard">
                                                    <button type="submit" className='btn btn-outline-light button_event_form'>
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="error-message-space">{errorMsg}</div>
                                        </form>
                                }

                            </div>
                        </div>

                    </>)
                    :
                    <button type="submit" className='btn btn-outline-light button_team' onClick={toggleForm}>
                        Submit Leaderboard
                    </button>
            }

        </>
    )
}
