import React, {useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {detailsNote} from "../actions/noteActions";
import CategoryDropdown from "./CategoryDropdown";

export default function HomeFilter({searchValue, onSearchValueChange, selectValue, setSelectValue}){
    // const navigate = useNavigate();
    // const params = useParams();
    // const noteId = params.id;
    // const dispatch = useDispatch();
    // const noteDetails = useSelector(state => state.noteDetails);
    // const {loading, error, note}= noteDetails;
    //
    // useEffect(() =>{
    //     dispatch(detailsNote(noteId));
    // }, [dispatch, noteId]);


    const onSearchChange = (e) => {
        console.log('search e: ', e);
        console.log('search e.target: ', e.target);
        console.log('search e.target.value: ', e.target.value);
        onSearchValueChange(e.target.value);
    }


    return (
        <div className="filter">
            <div className="row top ">
                <div className="column-1 left search">
                    <input type="text" value={searchValue} onChange={onSearchChange} placeholder='Search...'/>
                </div>
                <div className="column-2 medium">
                    <CategoryDropdown selectValue={selectValue} onSelectValueChange={setSelectValue}/>
                </div>
            </div>
        </div>
    )
}