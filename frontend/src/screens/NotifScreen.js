import React, {useEffect} from 'react';
import {getAllNotificationsForUser} from "../actions/notifActions";
import {useDispatch, useSelector} from "react-redux";
import Notification from "../components/Notification";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {useNavigate} from "react-router";

export default function NotificationScreen(props){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userSignIn = useSelector((state) => state.userSignIn);
    const {userInfo} = userSignIn;

    const notifications = useSelector(state => state.notification);
    const {loading, error, notif} = notifications;
    useEffect(() => {
        if(!userInfo){
            navigate('/signIn'); ////////// если нет юзера, урл меняется на /signIn, но дальше все равно рендериться эта страница
        }else {
            dispatch(getAllNotificationsForUser(userInfo));
        }
    }, [userInfo]);

    return (
        <div>
            {loading?<LoadingBox/>
                : error?<MessageBox variant='danger'>{error}</MessageBox>
                    :
                    <div>
                        <div className="row center">
                            {notif.map(n => (
                                <Notification key={n.id} notif={n} />
                            ))}
                        </div>
                    </div>
            }
        </div>
    )
}