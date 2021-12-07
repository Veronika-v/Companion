import {NOTIFICATION_ADD_ITEM} from "../constants/notifConstants";

export const notificationReducer = (state = {notifItems: []}, action) =>{
    switch(action.type){
        case NOTIFICATION_ADD_ITEM:
            const item = action.payload;
            const existItem = state.notifItems.find(x =>x.noteId === item.noteId);
            if(existItem){
                return {
                    ...state,
                    notifItems: state.notifItems.map(x =>
                        x.noteId === existItem.noteId? item: x),
                };
            }else{
                return { ...state, notifItems: [...state.notifItems, item]}
            }
        default:
            return state;
    }
}