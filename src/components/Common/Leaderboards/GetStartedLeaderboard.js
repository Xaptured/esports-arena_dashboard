import React from 'react'
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import './leaderboard.css'

export default function GetStartedLeaderboard(props) {
    const { userType } = props;
    return (
        <div style={{ marginTop: "27%" }}>
            {
                userType === "participant" ? 'Click on any previously participated events to see the leaderboards.' : 'Click on any previously create events.'
            }
            <br />
            <LiaLongArrowAltLeftSolid size={200} />
        </div>
    )
}
