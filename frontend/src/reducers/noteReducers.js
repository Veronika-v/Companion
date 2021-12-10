import {
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

export const noteListReducer = (state = {
    loading: true, notes : []}, action) => {
    switch(action.type){
        case NOTE_LIST_REQUEST:
            return {loading: true};
        case NOTE_LIST_SUCCESS:
            return {loading: false, notes: action.payload};
        case NOTE_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const noteDetailsReducer = (state ={ notes: {}, loading: true}, action) =>{
    switch(action.type){
        case NOTE_DETAILS_REQUEST:
            return {loading: true};
        case NOTE_DETAILS_SUCCESS:
            return {loading: false, note: action.payload};
        case NOTE_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const userNoteListReducer = (state = {
    loading: true, notes : []}, action) => {
    switch(action.type){
        case USERNOTE_LIST_REQUEST:
            return {loading: true};
        case USERNOTE_LIST_SUCCESS:
            return {loading: false, notes: action.payload};
        case USERNOTE_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const userRespondsReducer = (state = {
    loadingR: true, responds : []}, action) => {
    switch(action.type){
        case USER_RESPONDS_REQUEST:
            return {loadingR: true};
        case USER_RESPONDS_SUCCESS:
            return {loadingR: false, responds: action.payload};
        case USER_RESPONDS_FAIL:
            return {loadingR: false, errorR: action.payload};
        default:
            return state;
    }
}

