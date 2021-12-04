import {NOTE_LIST_FAIL, NOTE_LIST_REQUEST, NOTE_LIST_SUCCESS} from "../constants/noteConstants";
import Axios from "axios";

export const listNotes = () => async(dispatch) =>{
    dispatch({
        type: NOTE_LIST_REQUEST
    });
    try{
        const {data} = await Axios.get('/api/notes');
        dispatch({type: NOTE_LIST_SUCCESS, payload: data});
    }catch(error){
        dispatch({type: NOTE_LIST_FAIL, payload: error.message});
    }
}