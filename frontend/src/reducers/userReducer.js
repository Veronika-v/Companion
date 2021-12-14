import {
    ACTIVATE_USER_FAIL,
    ACTIVATE_USER_REQUEST, ACTIVATE_USER_SUCCESS,
    ACTIVE_USERS_FAIL,
    ACTIVE_USERS_REQUEST, ACTIVE_USERS_SUCCESS, BLOCK_USER_FAIL, BLOCK_USER_REQUEST, BLOCK_USER_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNOUT
} from "../constants/userConstants";

export const userSignInReducer = (state = {}, action) =>{
    switch(action.type){
        case USER_SIGNIN_REQUEST:
            return {loading: true};
        case USER_SIGNIN_SUCCESS:
            return {loading:false, userInfo: action.payload};
        case USER_SIGNIN_FAIL:
            return {loading: false, error: action.payload};
        case USER_SIGNOUT:
            return {};
        default:
            return state;
    }
};

export const userRegisterReducer = (state = {}, action) =>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading: true};
        case USER_REGISTER_SUCCESS:
            return {loading:false, userInfo: action.payload};
        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const userDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { loading: true };
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload };
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};


export const allUsersReducer = (state = {
    loading: true, users : []}, action) => {
    switch(action.type){
        case ACTIVE_USERS_REQUEST:
            return {loading: true};
        case ACTIVE_USERS_SUCCESS:
            return {loading: false, users: action.payload};
        case ACTIVE_USERS_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};


export const toActivateReducer = (state = {
    loading: true, users : []}, action) => {
    switch(action.type){
        case ACTIVATE_USER_REQUEST:
            return {loading: true};
        case ACTIVATE_USER_SUCCESS:
            return {loading: false, users: action.payload};
        case ACTIVATE_USER_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};


export const toBlockReducer = (state = {
    loading: true, users : []}, action) => {
    switch(action.type){
        case BLOCK_USER_REQUEST:
            return {loading: true};
        case BLOCK_USER_SUCCESS:
            return {loading: false, users: action.payload};
        case BLOCK_USER_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};