import React, {useEffect} from 'react';
import {getAllNotificationsForUser} from "../actions/notifActions";
import {useDispatch, useSelector} from "react-redux";
import Notification from "../components/Notification";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function NotificationScreen(props){

    const dispatch = useDispatch();
    const notifications = useSelector(state => state.notification);
    const {loading, error, notif}= notifications;
    useEffect(()=>{
        dispatch(getAllNotificationsForUser());
    }, [dispatch]);
    return (
        <div>
            {loading?<LoadingBox/>
                : error?<MessageBox variant='danger'>{error}</MessageBox>
                    :
            <div className="row center">
                {notif.map(n => (
                    <Notification key={n.id} notif={n}></Notification>
                ))}
            </div>
            }
        </div>
    )
}