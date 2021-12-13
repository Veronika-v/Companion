import React from 'react'
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteNote} from "../actions/noteActions";

export default function UserNotes(props) {

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const loading = props.loading;
    const err = props.error;
    const notes = props.userNotes;

    const updateNoteHandler = (noteId) =>{
        navigate(`/note/update/${noteId}`);
    }
    const deleteNoteHandler =  (noteId) =>{
        dispatch(deleteNote(noteId))
            .then(() =>{
                alert("You've delete the note!");
            })
            .catch(err => {
                alert(err.response.data);
            });
    }

    function getAgeRange(note){
        let range;
        if(note.ageFrom || note.ageTo){
            if(note.ageFrom)
                range=`from ${note.ageFrom}y.o. `
            else
                range='';
            if(note.ageTo)
                range+=`to ${note.ageTo}y.o.`;
        }else{
            range=` no age range`;
        }
        return range;
    }
    return(
        <div>
            {loading?<LoadingBox/>
                : err?<MessageBox variant='danger'>{err}</MessageBox>
                    :
                        <div className="row center">
                            {notes.map(note => {
                                /*return (<Note key={note.id} note={note}></Note>);*/
                                return (
                                    <div key={note.id} className="card">
                                        <Link to={`/note/${note.id}`}>
                                            <img className="medium" src={note.image} alt={note.title}/>
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/note/${note.id}`}>
                                                <h2>{note.title}</h2>
                                            </Link>
                                            <p>{note.description.length<190?note.description:`${note.description.slice(0,190)}...`}</p>
                                            <p>Count of members: {note.countOfMembers}</p>
                                            <p>Category: {note.category}</p>
                                            <p>Age: {getAgeRange(note)}</p>
                                        </div>
                                        <div>
                                            <button className="note down fa fa-pencil" onClick={() => updateNoteHandler(note.id)}/>
                                            <button className="note down fa fa-trash" onClick={() => deleteNoteHandler(note.id)}/>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
            }
        </div>
    )
}