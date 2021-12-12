import Axios from "axios";
import {NOTIFICATION_ADD_ITEM} from "../constants/notifConstants";
import {useSelector} from "react-redux";

export const getAllNotificationsForUser = (userInfo) => async (dispatch, getState) => {
    const {data} = await Axios.get(`/notifications/getAllForNoteUser/${userInfo.id}`,
        {
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
            }});
    dispatch({
        type: NOTIFICATION_ADD_ITEM,
        payload: data.map(item => ({
            id: item.id,
            respondedUserId: item.userId,
            firstName: item.firstName,
            lastName: item.lastName,
            title: item.title,
            noteId: item.noteId,
        }))
    })
}

/*
export const getAllNotificationsForUser = () => async (dispatch, getState) => {
    const userId = 6; // установить текущего!!!!!
    const {data} = await Axios.get(`/notifications/getAllForRespondedUser/${userId}`);
    dispatch({
        type: NOTIFICATION_ADD_ITEM,
        payload: data.map(item => ({
            description: item.description,
            noteId: item.noteId,
            title: item.title
        }))
    })
}*/
