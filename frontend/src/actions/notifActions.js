import Axios from "axios";
import {NOTIFICATION_ADD_ITEM} from "../constants/notifConstants";

export const addToNotifications = (noteId) => async (dispatch, getState) => {
    const {data} = await Axios.get(`/api/notes/${noteId}`);
    dispatch({
        type: NOTIFICATION_ADD_ITEM,
        payload: {
            firstName:data.firstName,
            lastName: data.lastName,
            userId: data.userId,
            noteId: data.noteId,
            title: data.title
        }
    })
}