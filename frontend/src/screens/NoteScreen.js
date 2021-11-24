import React from 'react';
import data from "../data";
import Rating from "../components/Rating";
import {useParams} from "react-router";
import {Link} from "react-router-dom";


export default function NoteScreen(props){
    const params = useParams();
    const note = data.notes.find(x => x.id == params.id);
    console.log(note);
    if(!note){
        return <div> Note not found</div>
    }
    return (
        <div>
            <div className='row top'>
                <div className='col-2'>
                    <img className='large' src={note.image} alt={note.image}/>
                    <button className='block'>Respond to the note</button>
                    <br/><br/>
                    <Link to='/'>Back to the list</Link>
                </div>
                <div className='col-1'>
                    <ul>
                        <li>
                            <h1>{note.title}</h1>
                        </li>
                        <li>
                            <Rating rating={note.rating} numReviews={note.numReviews}/>
                        </li>
                        <li><span className='nameOfField'>Description:</span> {note.description}</li>
                        <li><span className='nameOfField'>Date:</span> {note.meetingDateTime}</li>
                        <li><span className='nameOfField'>Geolocation:</span> {note.geolocation}</li>
                        <li><span className='nameOfField'>Count of members:</span> {note.countOfMembers}</li>
                        <li><span className='nameOfField'>Gender: </span> {note.gender}</li>
                        <li><span className='nameOfField'>Category: </span> {note.category}</li>
                        <li><span className='nameOfField'>Subcategory: </span> {note.subcategory}</li>
                        <li><span className='nameOfField'>Cost: </span> {note.money==0?`don't need money`:`need some money`}</li>
                        <li><span className='nameOfField'>Range: </span> from {note.ageFrom} y.o. to {note.ageTo}y.o.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}