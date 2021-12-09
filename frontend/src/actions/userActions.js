import {USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS} from "../constants/userConstants";
import Axios from "axios";

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
}