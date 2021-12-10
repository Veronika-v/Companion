import React from 'react'
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import Note from "./Note";

export default function UserNotes(props) {
    const loading = props.loading;
    const error = props.error;
    const notes = props.userNotes;
    return(
        <div>
            {loading?<LoadingBox/>
                : error?<MessageBox variant='danger'>{error}</MessageBox>
                    :
                        <div className="row center">
                            {notes.map(note => {
                                return (<Note key={note.id} note={note}></Note>);
                            })}
                        </div>
            }
        </div>
    )
}