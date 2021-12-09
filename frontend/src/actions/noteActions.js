import {
    NOTE_DETAILS_FAIL,
    NOTE_DETAILS_REQUEST,
    NOTE_DETAILS_SUCCESS,
    NOTE_LIST_FAIL,
    NOTE_LIST_REQUEST,
    NOTE_LIST_SUCCESS
} from "../constants/noteConstants";
import Axios from "axios";

export const listNotes = () => async(dispatch) =>{
    dispatch({
        type: NOTE_LIST_REQUEST
    });
    try{
        const {data} = await Axios.get('/notes');
        dispatch({type: NOTE_LIST_SUCCESS, payload: data});
    }catch(error){
        dispatch({type: NOTE_LIST_FAIL, payload: error.message});
    }
};

export const detailsNote = (noteId) => async(dispatch) =>{
    dispatch({
        type: NOTE_DETAILS_REQUEST, payload: noteId
    });
    try{
        const {data} = await Axios.get(`/notes/${noteId}`);
        dispatch({type: NOTE_DETAILS_SUCCESS, payload: data});
    }catch(error){
        dispatch({type: NOTE_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};