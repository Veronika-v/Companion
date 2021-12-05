import React from 'react'
import {useParams} from "react-router-dom";

export default function NotificationScreen(props){
    const params = useParams();
    const noteId = params.id;
    return (
        <div>
            <h1>Notifications Screen</h1>
            <p>ADD TO NOTIFICATIONS: NoteId: {noteId}</p>
        </div>
    )
}