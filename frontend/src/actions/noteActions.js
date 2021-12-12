import {
    NOTE_ADD_FAIL,
    NOTE_ADD_REQUEST, NOTE_ADD_SUCCESS,
    NOTE_DETAILS_FAIL,
    NOTE_DETAILS_REQUEST,
    NOTE_DETAILS_SUCCESS,
    NOTE_LIST_FAIL,
    NOTE_LIST_REQUEST,
    NOTE_LIST_SUCCESS, USER_RESPONDS_FAIL,
    USER_RESPONDS_REQUEST,
    USER_RESPONDS_SUCCESS,
    USERNOTE_LIST_FAIL,
    USERNOTE_LIST_REQUEST,
    USERNOTE_LIST_SUCCESS
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

export const listUserNotes = (userInfo) => async(dispatch) =>{
    dispatch({
        type: USERNOTE_LIST_REQUEST
    });
    try{
        const {data} = await Axios.get(`notes/getAllByUserId/${userInfo.id}`,

            {
                headers:{
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });
        dispatch({type: USERNOTE_LIST_SUCCESS, payload: data});
    }catch(error){
        dispatch({type: USERNOTE_LIST_FAIL, payload: error.message});
    }
};

export const listUserResponds = (userInfo) => async(dispatch) =>{
    dispatch({
        type: USER_RESPONDS_REQUEST
    });
    try{
        const {data} = await Axios.get(`notifications/getAllForRespondedUser/${userInfo.id}`,
            {
                headers:{
                    Authorization: `Bearer ${userInfo.token}`,
                }
            });
        dispatch({type: USER_RESPONDS_SUCCESS, payload: data});
    }catch(error){
        dispatch({type: USER_RESPONDS_FAIL, payload: error.message});
    }
};

export const addNote = (title, description, meetingDateTime, money, userInfo,
                        categoryId, genderId, countOfMembers, geolocation, ageFrom, ageTo, image) => async(dispatch) =>{
    dispatch({
        type: NOTE_ADD_REQUEST
    });
    try{
        const userId = userInfo.id
        const {data} = await Axios.post('/notes/add', {
            title, description, meetingDateTime, money, userId,
            categoryId, genderId, countOfMembers, geolocation, ageFrom, ageTo, image,
        },
        {
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
            }}
        ).catch(err => {
            console.log(err)
            alert(err.response.data);
        });
        dispatch({type: NOTE_ADD_SUCCESS, payload: data});
    }catch(error){
        dispatch({type: NOTE_ADD_FAIL, payload: error.message});
    }
};