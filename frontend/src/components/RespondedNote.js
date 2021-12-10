import React from 'react'
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import Note from "./Note";
import {Link} from "react-router-dom";

export default function RespondedNote(props) {
    const loading = props.loading;
    const error = props.error;
    const notes = props.responds;
    return(
        <div>
            {loading?<LoadingBox/>
                : error?<MessageBox variant='danger'>{error}</MessageBox>
                    :
                    <div>
                        {notes.map(note => {
                            return (
                                <div key={note.id} className=" notification" >
                                    <div className="card-body">
                                        <Link to={`/note/${note.noteId}`}>
                                            <h2>{note.title}</h2>
                                        </Link>
                                        <p>{note.description.length<210?note.description:`${note.description.slice(0,210)}...`}</p>
                                    </div>
                                </div>
                            )})
                        }
                    </div>
            }
        </div>
    )
}