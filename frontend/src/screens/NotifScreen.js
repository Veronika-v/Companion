import React, {useEffect} from 'react'
import {useParams} from "react-router-dom";
import {getAllNotificationsForUser} from "../actions/notifActions";
import {useDispatch, useSelector} from "react-redux";
import Notification from "../components/Notification";

export default function NotificationScreen(props){
    const params = useParams();

    const dispatch = useDispatch();
    const notifications = useSelector(state => state.notification);
    const {loading, error, notif}= notifications;
    useEffect(()=>{
        dispatch(getAllNotificationsForUser());
    }, [dispatch]);
    return (
        <div>
            <div className="row center">
                {notif.map(n => (
                    <Notification key={n.id} notif={n}></Notification>
                ))}
            </div>
        </div>
    )
}