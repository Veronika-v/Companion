import Axios from "axios";
import {GENDER_LIST_FAIL, GENDER_LIST_SUCCESS} from "../constants/genderConstants";

export const listGenders = () => async(dispatch) =>{
    try{
        const {data} = await Axios.get('/genders');
        dispatch({type:     GENDER_LIST_SUCCESS,
            payload: data});
    }catch(error){
        dispatch({type: GENDER_LIST_FAIL, payload: error.message});
    }
};
