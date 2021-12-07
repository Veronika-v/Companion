import React, {useEffect} from 'react';
import Note from "../components/Note";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {useDispatch, useSelector} from "react-redux";
import {listNotes} from "../actions/noteActions";
import HomeFilter from "../components/HomeFilter";

export default function HomeScreen(){
    const dispatch = useDispatch();
    const noteList = useSelector( state => state.noteList);
    const {loading, error, notes} = noteList;
    useEffect(()=>{
       dispatch(listNotes());
    }, [])
    return (
        <div>
            {loading?<LoadingBox/>
            : error?<MessageBox variant='danger'>{error}</MessageBox>
            : <div>
                 {/*<HomeFilter/>*/}
                 <div className="row center">
                     {notes.map(note => (
                         <Note key={note.id} note={note}></Note>
                     ))}
                 </div>
            </div>
            }
        </div>
    )
}