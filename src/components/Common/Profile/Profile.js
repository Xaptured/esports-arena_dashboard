import React, { useEffect } from 'react'
import './profile.css'
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { loggedInUserAtom, loggedInUserAtomCopy } from '../../../atoms/loginDataAtom';
import backendService from '../../../services/backendService';
import { profileStatusAtom } from '../../../atoms/loginDataAtom'
import { useCopyValueAtom } from '../../../atoms/loginDataAtom';
import SyncLoader from 'react-spinners/SyncLoader';
import "aos/dist/aos.css";
import Aos from 'aos';

export default function Profile() {

    // ESA-058-START
    const useCopyAtom = useAtomValue(useCopyValueAtom);
    let loggedInUserAtomResult;
    if (useCopyAtom) {
        loggedInUserAtomResult = loggedInUserAtomCopy;
    } else {
        loggedInUserAtomResult = loggedInUserAtom;
    }
    // ESA-058-END
    const loggedInUser = useAtomValue(loggedInUserAtomResult);

    const setProfileStatusAtom = useSetAtom(profileStatusAtom);

    const initialProfileDetails = {
        name: "",
        phone: "",
        city: "",
        email: loggedInUser.email,
        interestedGames: []
    };

    const [profile, setProfile] = useState(initialProfileDetails);
    const [checkedGames, setCheckedGames] = useState([]);
    const [activeGames, setActiveGames] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const override = {
        marginTop: "4%",
        paddingLeft: "42%",
    };

    const handleInputChangeName = (e) => {
        const newProfileObject = { ...profile };
        newProfileObject.name = e.target.value;
        setProfile(newProfileObject);
    };

    const handleInputChangePhone = (e) => {
        const newProfileObject = { ...profile };
        newProfileObject.phone = e.target.value;
        setProfile(newProfileObject);
    };

    const handleInputChangeCity = (e) => {
        const newProfileObject = { ...profile };
        newProfileObject.city = e.target.value;
        setProfile(newProfileObject);
    };

    const handleCheckboxChange = (value) => {
        if (checkedGames.includes(value)) {
            setCheckedGames(checkedGames.filter((v) => v !== value));
        } else {
            setCheckedGames([...checkedGames, value]);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const interestedGamesArray = checkedGames.map((game) => {
            return (
                {
                    gameName: game,
                    gameNumber: null,
                }
            )
        });
        const prevProfile = profile;
        prevProfile.interestedGames = interestedGamesArray;
        setProfile(prevProfile);
        const result = await backendService.saveProfile(profile);
        setLoading(false);
        if (result.message === 'Request Processed') {
            setProfileStatusAtom(true);
        } else {
            setMessage('Error occurred! Please try again later');
        }
    }

    const getActiveGames = async () => {
        const response = await backendService.getActiveGamesData();
        setActiveGames(response);
    }

    useEffect(() => {
        getActiveGames();
    }, []);

    useEffect(() => {
        Aos.init({ duration: 1500 });
    }, []);
    return (
        <div className='container profile-container'>
            <div className='profile-content'>
                <div className='profile-desciption' data-aos='fade-right'>
                    Your details will help us to provide you better experience.
                    <br />
                    <p style={{ fontSize: '25px', color: 'grey', marginTop: '5%' }}>Please complete your profile to start your exciting journey.</p>
                    <LiaLongArrowAltRightSolid size={200} />
                </div>
                <div className='profile-form' data-aos='fade-left'>
                    <div className="form-box-profile">
                        <form onSubmit={handleSubmit}>
                            <h1>Profile</h1>
                            <div className='mb-3 input-box'>
                                <input
                                    type="text"
                                    placeholder="name"
                                    value={profile.name}
                                    onChange={handleInputChangeName}
                                    required />
                                <i className='bx bxs-user'></i>
                            </div>
                            <div className='mb-3 input-box'>
                                <input
                                    type="text"
                                    placeholder="phone"
                                    value={profile.phone}
                                    onChange={handleInputChangePhone}
                                    required />
                                <i className='bx bxs-user'></i>
                            </div>
                            <div className='mb-3 input-box'>
                                <input
                                    type="text"
                                    placeholder="city"
                                    value={profile.city}
                                    onChange={handleInputChangeCity}
                                    required />
                                <i className='bx bxs-user'></i>
                            </div>
                            <div className="checkbox-content">
                                {
                                    activeGames && activeGames.map((game) => {
                                        return (
                                            <div className='checkbox-container'>
                                                <label className="checkBox">
                                                    <input id="ch3"
                                                        type="checkbox"
                                                        key={game.name}
                                                        value={game.name}
                                                        checked={checkedGames.includes(game.name)}
                                                        onChange={() => handleCheckboxChange(game.name)} />
                                                    <div className="transition"></div>
                                                </label>
                                                <p className='game-name'>{game.name}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {
                                isLoading ?
                                    <div className=''>
                                        <SyncLoader
                                            color={"#ffffff"}
                                            loading={isLoading}
                                            cssOverride={override}
                                            size={15}
                                        />
                                    </div>
                                    :
                                    <button type="submit" className='btn btn-outline-light button_submit_profile'>
                                        Submit
                                    </button>
                            }

                            {/* <button type="submit" className='btn btn-outline-light button_submit_profile'>
                                Submit
                            </button> */}
                            {/* {
                                isLoadingComments ?
                                    <div>
                                        Loading...
                                    </div>
                                    :
                                    <div>
                                        <button type="submit" className='btn btn-outline-light button_submit' disabled={disabledComments}>
                                            Submit
                                        </button>
                                        <div className='message'>
                                            {
                                                commentsMessage
                                            }
                                        </div>
                                    </div>
                            } */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
