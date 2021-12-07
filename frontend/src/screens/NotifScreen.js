import React, {useEffect} from 'react'
import {useParams} from "react-router-dom";
import {addToNotifications} from "../actions/notifActions";
import {useDispatch} from "react-redux";

export default function NotificationScreen(props){
    const params = useParams();
    const noteId = params.id;

    const dispatch = useDispatch();
    useEffect(()=>{
        if(noteId){
            dispatch(addToNotifications(noteId));
        }
    }, [dispatch, noteId]);
    return (
        <div>
            <h1>Notifications Screen</h1>
            <p>ADD TO NOTIFICATIONS: NoteId: {noteId}</p>
        </div>
    )
}