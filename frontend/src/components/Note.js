import React from 'react'
import Rating from "./Rating";

export default function Note(props){
    const {note} = props;
    return (
        <div key={note.id} className="card">
            <a href={`/note/${note.id}`}>
                <img className="medium" src={note.image} alt={note.title}/>
            </a>
            <div className="card-body">
                <a href={`/note/${note.id}`}>
                    <h2>{note.title}</h2>
                </a>
                <p>{note.description}</p>
                <p>Count of members: {note.countOfMembers}</p>
                <p>Category: {note.category}</p>
                <p>Age from {note.ageFrom} to {note.ageTo}</p>
                <Rating
                    rating={note.rating}
                    numReviews={note.numReviews}>
                </Rating>
            </div>
        </div>
    )
}