import React, {useEffect} from 'react'
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {detailsNote} from "../actions/noteActions";
import Axios from 'axios';

export default function HomeFilter({searchValue, onSearchValueChange}){
    const navigate = useNavigate();
    const params = useParams();
    const noteId = params.id;
    const dispatch = useDispatch();
    const noteDetails = useSelector(state => state.noteDetails);
    const {loading, error, note}= noteDetails;

    useEffect(() =>{
        dispatch(detailsNote(noteId));
    }, [dispatch, noteId]);

    const onSearchChange = (e) => {
        onSearchValueChange(e.target.value);
    }


    return (
        <div className="filter">
            <div className="row top ">
                <div className="column left ">
                    <input type="text" value={searchValue} onChange={onSearchChange}/>
                </div>
                <div className="column medium">
                </div>
                <div className="column right ">
                </div>
            </div>
        </div>
    )
}