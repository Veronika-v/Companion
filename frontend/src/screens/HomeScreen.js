import React from 'react';
import data from "../data";
import Note from "../components/Note";

export default function HomeScreen(){
    return (
        <div className="row center">
            {
                data.notes.map(note => (
                    <Note key={note.id} note={note}></Note>
                ))
            }

        </div>
    )
}