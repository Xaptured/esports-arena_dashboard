import React from 'react'
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";

export default function GetStartedEvent() {
    return (
        <div style={{ marginTop: "18%" }}>
            Start your journey by participating in events.
            <br />
            <p style={{ fontSize: '30px', color: 'grey', marginTop: '1%' }}>
                Click on any event to see description and rules.
            </p>
            <LiaLongArrowAltLeftSolid size={200} />
        </div>
    )
}
