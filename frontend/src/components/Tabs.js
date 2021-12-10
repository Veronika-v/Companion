import React from 'react'

export default function NotificationTabs(props) {
    return(
        <div className="row tabs">
            <button className={props.myNotes ? 'active' : ''}>My notes</button>
            <button className={props.respondedUsers ? 'active' : ''}>Responded Notes</button>
        </div>
    )
}