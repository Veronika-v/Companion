import {
    ACTIVATE_USER_FAIL,
    ACTIVATE_USER_REQUEST, ACTIVATE_USER_SUCCESS,
    ACTIVE_USERS_FAIL,
    ACTIVE_USERS_REQUEST, ACTIVE_USERS_SUCCESS, BLOCK_USER_FAIL, BLOCK_USER_REQUEST, BLOCK_USER_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNOUT
} from "../constants/userConstants";
import Axios from "axios";

export const register = ( firstName, lastName, login, email, password) => async (dispatch) =>{
    dispatch({type: USER_REGISTER_REQUEST, payload: {login, password}});
    try{
        const {data} = await Axios.post('/users/register', {firstName, lastName, login, email, password});
        dispatch({type: USER_REGISTER_SUCCESS, payload: data});
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    }catch (error){
        dispatch({type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const signIn = (login, password) => async (dispatch) =>{
    dispatch({type: USER_SIGNIN_REQUEST, payload: {login, password}});
    try{
        const {data} = await Axios.post('/users/signIn', {login, password});
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    }catch (error){
        dispatch({type: USER_SIGNIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const signOut = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('notifItems');
    dispatch({type: USER_SIGNOUT});
}

export const detailsUser = (userId) => async (dispatch, getState) => {
    dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
    const {
        userSignIn: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(`/users/user/${userId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: USER_DETAILS_FAIL, payload: message });
    }
};

export const allUsers = () => async(dispatch, getState) =>{
    dispatch({
        type: ACTIVE_USERS_REQUEST
    });
    const {
        userSignIn: { userInfo },
    } = getState();
    console.log(userInfo)
    try{
        const {data} = await Axios.get('/users',
        {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({type: ACTIVE_USERS_SUCCESS, payload: data});
    }catch(error){
        dispatch({type: ACTIVE_USERS_FAIL, payload: error.message});
    }
};


export const activateUser = (userId) => async(dispatch, getState) =>{
    dispatch({
        type: ACTIVATE_USER_REQUEST
    });
    const {
        userSignIn: { userInfo },
    } = getState();
    try{
        const {data} = await Axios.get(`/users/user/${userId}/activate`,
            {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            });
        dispatch({type: ACTIVATE_USER_SUCCESS, payload: data});
    }catch(error){
        dispatch({type: ACTIVATE_USER_FAIL, payload: error.message});
    }
};

export const blockUser = (userId) => async(dispatch, getState) =>{
    dispatch({
        type: BLOCK_USER_REQUEST
    });
    const {
        userSignIn: { userInfo },
    } = getState();
    try{
        const {data} = await Axios.get(`/users/user/${userId}/block`,
            {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            });
        dispatch({type: BLOCK_USER_SUCCESS, payload: data});
    }catch(error){
        dispatch({type: BLOCK_USER_FAIL, payload: error.message});
    }
};




