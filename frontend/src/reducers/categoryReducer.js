import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
    SUBCATEGORY_LIST_FAIL,
    SUBCATEGORY_LIST_REQUEST,
    SUBCATEGORY_LIST_SUCCESS
    } from "../constants/categoryConstants";

export const categoryListReducer = (state = {
     categories : []}, action) => {
    switch(action.type){
        // case CATEGORY_LIST_REQUEST:
        //     return {loading: true};
        case CATEGORY_LIST_SUCCESS:
            return { categories: action.payload};
        case CATEGORY_LIST_FAIL:
            return { error: action.payload};
        default:
            return state;
    }
}