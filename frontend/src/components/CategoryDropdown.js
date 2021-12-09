import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Select from 'react-select';
import {useDispatch, useSelector} from "react-redux";
import {listCategories, listSubcategories} from "../actions/categoryActions";

export default function CategoryDropdown ({selectValue,onSelectValueChange }) {
    const dispatch = useDispatch();
    const categoriesList = useSelector( state => state.categories);
    console.log('selectValue: ', selectValue);

    const { categories} = categoriesList;
    console.log('categories: ',categories);
    useEffect(()=>{
        dispatch(listCategories());
     }, [])

    const onSelectChange = (e) => {
        console.log('e: ', e);
        console.log('e.target: ', e.target);
        //console.log('e.target.value: ', e.target.value);
        onSelectValueChange(e.value);
    }
    const list = [];


    return (
        <div>
            <div  className='category'>
                    {categories.map(category => {
                        list.push({value:category.id, label:category.category});
                    })}
                    {/*<Select value={selectValue} onChange={onSelectChange} options={list}/>*/}
                    <Select options={list}/>
            </div>
        </div>
    )
}
