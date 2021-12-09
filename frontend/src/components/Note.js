import React from 'react'
import Rating from "./Rating";
import {Link} from "react-router-dom";

export default function Note(props){
    const {note} = props;
    function getAgeRange(){
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
                <p>Age: {getAgeRange()}</p>
                {/*<Rating
                    rating={note.rating}
                    numReviews={note.numReviews}>
                </Rating>*/}
            </div>
        </div>
    )
}