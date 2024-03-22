import React from 'react'
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import './schedule.css'

export default function GetStartedSchedule(props) {
    const { userType } = props;
    return (
        <div style={{ marginTop: "27%" }}>
            {
                userType === "participant" ? 'Click on any scheduled event to see the details' : 'Click on your events to see the details'
            }
            <br />
            <LiaLongArrowAltLeftSolid size={200} />
        </div>
    )
}
