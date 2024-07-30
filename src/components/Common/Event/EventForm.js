import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { RxCross2 } from "react-icons/rx";
import "primereact/resources/themes/arya-blue/theme.css"
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import './eventform.css';
import { loggedInUserAtom, loggedInUserAtomCopy } from '../../../atoms/loginDataAtom';
import { useCopyValueAtom } from '../../../atoms/loginDataAtom';
import { useAtomValue, useAtom } from 'jotai';
import backendService from '../../../services/backendService';
import { activeOrganizerEventsCopy, activeOrganizerEvents } from '../../../atoms/eventAtom';
import SyncLoader from 'react-spinners/SyncLoader';

export default function EventForm(props) {

    // ESA-058-START
    const useCopyAtom = useAtomValue(useCopyValueAtom);
    let activeOrganizerEventsResult;
    let loggedInUserAtomResult;
    if (useCopyAtom) {
        loggedInUserAtomResult = loggedInUserAtomCopy;
        activeOrganizerEventsResult = activeOrganizerEventsCopy;
    } else {
        loggedInUserAtomResult = loggedInUserAtom;
        activeOrganizerEventsResult = activeOrganizerEvents;
    }
    // ESA-058-END
    const loggedInUser = useAtomValue(loggedInUserAtomResult);
    // ESA-058=used direct atom instead of atomResult
    const [activeOrgEvents, setActiveOrgEvents] = useAtom(activeOrganizerEvents);
    const { showEventForm } = props;
    const [eventName, setEventName] = useState(null);
    const [selectedGame, setSelectedGame] = useState(null);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [duration, setDuration] = useState(null);
    const [playersPerSlot, setPlayersPerSlot] = useState(null);
    const [slotCount, setSlotCount] = useState(null);
    const [selectedEventType, setSelectedEventType] = useState(null);
    const [prizepool, setPrizepool] = useState(null);
    const [inputFields, setInputFields] = useState(['']);
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setLoading] = useState(false);
    const override = {
        paddingLeft: "45%",
    };

    // ESA-058: in useEffect add call to get games
    const gameOptions = [
        { name: 'PUBG' },
        { name: 'BGMI' },
        { name: 'COD' }
    ];
    const eventTypeOptions = [{ name: 'FREE' }, { name: 'PAID' }];

    const showForm = () => {
        showEventForm();
    }

    const formatDate = (date) => {
        const dateObject = new Date(date);

        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObject.getDate().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    const formatTime = (time) => {
        const object = new Date(time);
        const hours = object.getHours();
        const minutes = object.getMinutes();
        const formattedTime = `${hours}:${minutes}:00`;
        return formattedTime;
    }

    const rulesPayloadArray = (rules) => {
        const rulesArr = rules.map((rule) => ({
            ruleNumber: null,
            description: rule,
        }));
        return rulesArr;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const payload = {
            name: eventName,
            email: loggedInUser.email,
            gameName: selectedGame.name,
            status: 'INACTIVE',
            date: formatDate(date),
            time: formatTime(time),
            duration: formatTime(duration),
            playersPerSlot: playersPerSlot,
            slotCount: slotCount,
            remainingSlots: slotCount,
            type: selectedEventType.name,
            prizePool: prizepool,
            rules: rulesPayloadArray(inputFields)
        };
        const response = await backendService.saveEvent(payload);
        if (response.message === 'Request Processed') {
            setLoading(false);
            const activeEvents = [...activeOrgEvents];
            const newEvent = {
                name: eventName
            };
            activeEvents.unshift(newEvent);
            setActiveOrgEvents(activeEvents);
            setErrorMsg('Event successfully saved and pending from admin.');
            setEventName('');
            setSelectedGame(null);
            setDate(null);
            setTime(null);
            setDuration(null);
            setPlayersPerSlot('');
            setSlotCount('');
            setSelectedEventType(null);
            setPrizepool('');
            setInputFields(['']);
            setTimeout(() => {
                showForm();
            }, 5000);
        } else {
            setErrorMsg('Something went wrong. Please try again later.');
        }
    }

    const handleInputChangeEventName = (e) => {
        setEventName(e.target.value);
    }

    const handleInputChangePlayersPerSlot = (e) => {
        setPlayersPerSlot(e.target.value);
    }

    const handleInputChangeSlotCount = (e) => {
        setSlotCount(e.target.value);
    }

    const handleInputChangePrizepool = (e) => {
        setPrizepool(e.target.value);
    }

    const handleInputChange = (index, event) => {
        const values = [...inputFields];
        values[index] = event.target.value;
        setInputFields(values);
    };

    const handleAddField = async () => {
        const val = inputFields[inputFields.length - 1];
        if (val === '') {
            setErrorMsg("Please fill the rule.");
        } else {
            setErrorMsg('');
            setInputFields([...inputFields, '']);
        }
    };

    const handleCancelField = () => {
        if (inputFields.length > 1) {
            const updatedFields = [...inputFields];
            updatedFields.pop();
            setInputFields(updatedFields);
        }
    };
    return (
        <>
            <div className='create-event-form event-content-scrollable'>
                <div className="form-box-create-event">
                    <form onSubmit={handleSubmit}>
                        <div className="close-icon-container">
                            <RxCross2 size={30} color="grey" onClick={showForm} />
                        </div>

                        <h1>Create Event</h1>
                        <div className='mb-3 input-box'>
                            <input
                                type="text"
                                placeholder="Event name"
                                value={eventName}
                                onChange={handleInputChangeEventName}
                                required />
                            <i className='bx bxs-user'></i>
                        </div>
                        <div className="mb-3 input-box">
                            <Dropdown value={selectedGame} onChange={(e) => setSelectedGame(e.value)} options={gameOptions} optionLabel="name"
                                placeholder="Select a game" className="customDropdown" panelClassName='customPanelDropdown' />
                        </div>
                        <div className="mb-3 input-box">
                            <Calendar value={date} onChange={(e) => setDate(e.value)} placeholder='Date' className='customCalendar' />

                        </div>
                        <div className="mb-3 input-box">
                            <Calendar value={time} onChange={(e) => setTime(e.value)} timeOnly className='customCalendar' placeholder='Time' hourFormat='12' />

                        </div>
                        <div className="mb-3 input-box">
                            <Calendar value={duration} onChange={(e) => setDuration(e.value)} timeOnly className='customCalendar' placeholder='Duration' />

                        </div>
                        <div className='mb-3 input-box'>
                            <input
                                type="text"
                                placeholder="Players per slot"
                                value={playersPerSlot}
                                onChange={handleInputChangePlayersPerSlot}
                                required />
                            <i className='bx bxs-user'></i>
                        </div>
                        <div className='mb-3 input-box'>
                            <input
                                type="text"
                                placeholder="Slot count"
                                value={slotCount}
                                onChange={handleInputChangeSlotCount}
                                required />
                            <i className='bx bxs-user'></i>
                        </div>
                        <div className="mb-3 input-box">
                            <Dropdown value={selectedEventType} onChange={(e) => setSelectedEventType(e.value)} options={eventTypeOptions} optionLabel="name"
                                placeholder="Event type" className="customDropdown" panelClassName='customPanelDropdown' />
                        </div>
                        <div className='mb-3 input-box'>
                            <input
                                type="text"
                                placeholder="Prizepool"
                                value={prizepool}
                                onChange={handleInputChangePrizepool}
                                required />
                            <i className='bx bxs-user'></i>
                        </div>
                        {inputFields.map((inputField, index) => (
                            <div key={index} className='mb-3 input-box'>
                                <input
                                    type="text"
                                    placeholder={`Rule-${index + 1}`}
                                    value={inputField}
                                    onChange={(event) => handleInputChange(index, event)}
                                    required
                                />
                                <i className='bx bxs-user'></i>
                            </div>
                        ))}
                        <div className="add-more">
                            {
                                <label onClick={handleAddField} style={{ marginRight: '4%' }}>+Add more</label>
                            }
                            {
                                <label onClick={handleCancelField}>-Cancel</label>
                            }
                        </div>
                        {
                            isLoading ?
                                <div>
                                    <div className=''>
                                        <SyncLoader
                                            color={"#ffffff"}
                                            loading={isLoading}
                                            cssOverride={override}
                                            size={10}
                                        />
                                    </div>
                                </div>
                                :
                                <div className="action-bar">
                                    <button type="button" className='btn btn-outline-light button_event_form' onClick={showForm}>
                                        Close
                                    </button>
                                    <button type="submit" className='btn btn-outline-light button_event_form'>
                                        Submit
                                    </button>
                                </div>
                        }

                        {/* Use this space to show error messages */}
                        <div className="error-message-space">{errorMsg}</div>
                    </form>
                </div>
            </div>

        </>
    )
}
