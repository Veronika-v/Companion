import {GENDER_LIST_FAIL, GENDER_LIST_SUCCESS} from "../constants/genderConstants";

export const genderListReducer = (state = {
    genders : []}, action) => {
    switch(action.type){
        case GENDER_LIST_SUCCESS:
            return { genders: action.payload};
        case GENDER_LIST_FAIL:
            return { error: action.payload};
        default:
            return state;
    }
}