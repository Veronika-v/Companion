import React from 'react'
import Rating from "./Rating";
import {Link} from "react-router-dom";

export default function Note(props){
    const {note} = props;
    return (
        <div key={note.id} className="card">
            <Link to={`/note/${note.id}`}>
                <img className="medium" src={note.image} alt={note.title}/>
            </Link>
            <div className="card-body">
                <Link to={`/note/${note.id}`}>
                    <h2>{note.title}</h2>
                </Link>
                <p>{console.log(`id:${note.id}, length:${note.description.length}`)}{note.description.length<190?note.description:`${note.description.slice(0,190)}...`}</p>
                <p>Count of members: {note.countOfMembers}</p>
                <p>Category: {note.category}</p>
                <p>Age:  from {note.ageFrom} to {note.ageTo}</p>
                {/*<Rating
                    rating={note.rating}
                    numReviews={note.numReviews}>
                </Rating>*/}
            </div>
        </div>
    )
}