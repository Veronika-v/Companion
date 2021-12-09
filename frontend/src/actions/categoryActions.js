import {
    CATEGORY_LIST_FAIL,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_REQUEST,
    SUBCATEGORY_LIST_SUCCESS,
    SUBCATEGORY_LIST_REQUEST,
    SUBCATEGORY_LIST_FAIL
} from "../constants/categoryConstants";
import Axios from "axios";

export const listCategories = () => async(dispatch) =>{
    // dispatch({
    //     type: CATEGORY_LIST_REQUEST
    // });
    try{
        const {data} = await Axios.get('/categories');
        dispatch({type:     CATEGORY_LIST_SUCCESS,
             payload: data});
    }catch(error){
        dispatch({type: CATEGORY_LIST_FAIL, payload: error.message});
    }
};

export const listSubcategories = () => async(dispatch) =>{
    // dispatch({
    //     type: CATEGORY_LIST_REQUEST
    // });
    try{
        const {data} = await Axios.get('/categories/subcategories');
        dispatch({type:     SUBCATEGORY_LIST_SUCCESS,
            payload: data.map(item => ({
                id: item.id,
                category: item.category}))
        })
    }catch(error){
        dispatch({type: SUBCATEGORY_LIST_FAIL, payload: error.message});
    }
};
