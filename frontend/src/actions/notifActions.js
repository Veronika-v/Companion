import Axios from "axios";
import {NOTIFICATION_ADD_ITEM} from "../constants/notifConstants";

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
}