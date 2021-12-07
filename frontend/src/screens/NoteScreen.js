import React, {useEffect, useState} from 'react';
import {useParams, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {detailsNote} from "../actions/noteActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {Link} from "react-router-dom";
import Rating from "../components/Rating";
import Axios from "axios";


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
        Axios.post(`/notifications/addNotification`,
            {
                noteId:noteId,
                userId: 6 //// изменить на текущего пользователя!!!!!!!!!!
            });
        navigate('/');
        //navigate(`/notifications/${noteId}`);
    }

    return (
        <div>
            {loading?<LoadingBox/>
                : error?<MessageBox variant='danger'>{error}</MessageBox>
                    : (
                        <div>
                            {note.map(note => {
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
                            return(
                            <div className='row'>
                                <div className='col-2'>
                                    <img className="large" src={note.image}/>
                                    <button onClick={addToNotificationsHandler} className='block'>Respond to the note</button>
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
                                        <li><span className='nameOfField'>Age range: </span> {getAgeRange()}</li>
                                    </ul>
                                </div>
                            </div>
                                )})}
                        </div>
                    )
            }
        </div>

    )
}