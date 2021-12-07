import {NOTIFICATION_ADD_ITEM} from "../constants/notifConstants";

export const notificationReducer = (state = {notif: [], loading: true}, action) =>{
    switch(action.type){
        case NOTIFICATION_ADD_ITEM:
            return {loading: false, notif: action.payload};
        default:
            return state;
    }
}