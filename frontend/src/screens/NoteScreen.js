import React, {useEffect, useState} from 'react';
import {useParams, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {detailsNote} from "../actions/noteActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {Link} from "react-router-dom";
import Rating from "../components/Rating";


export default function NoteScreen(props){
    const navigate = useNavigate();
    const params = useParams();
    const noteId = params.id;
    //const [count, setCount] = useState(1);
    const dispatch = useDispatch();
    const noteDetails = useSelector(state => state.noteDetails);
    const {loading, error, note}= noteDetails;

    useEffect(() =>{
        dispatch(detailsNote(noteId));
    }, [dispatch, noteId]);

    const addToNotificationsHandler = () =>{
        navigate(`/notifications/${noteId}`);
    }

    return (
        <div>
            {loading?<LoadingBox/>
                : error?<MessageBox variant='danger'>{error}</MessageBox>
                    : (
                        <div>
                            {note.map(note => (
                            <div className='row top'>
                                <div className='col-2'>
                                    <img className="large" src={note.image}/>
                                    {/*<>
                                        <li>
                                            <div className='row'>
                                                <div>Count</div>
                                                <div>
                                                    <select value={count} onChange={e => setCount(e.target.value)}>
                                                        {
                                                            [...Array(note.countOfMembers).keys()].map( x =>(
                                                                <option key={x+1} value={x +1}>{x+1}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </li>*/}
                                        <button onClick={addToNotificationsHandler} className='block'>Respond to the note</button>
                                    {/*</>*/}
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
                                        <li><span className='nameOfField'>Age range: </span> { (note.ageFrom || note.ageTo)?((note.ageFrom?`from ${note.ageFrom} y.o.`:''), (note.ageTo?`to ${note.ageTo}y.o.`:'')):'does not matter'}</li>
                                    </ul>
                                </div>
                            </div>
                                ))}
                        </div>
                    )
            }
        </div>

    )
}