import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {detailsNote} from "../actions/noteActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {Link} from "react-router-dom";
import Axios from "axios";


export default function NoteScreen(props) {
    const navigate = useNavigate();
    const params = useParams();
    const noteId = params.id;
    const dispatch = useDispatch();
    const noteDetails = useSelector(state => state.noteDetails);
    const {loading, error, note} = noteDetails;
    const userSignIn = useSelector((state) => state.userSignIn);
    const {userInfo} = userSignIn;

    useEffect(() => {
        dispatch(detailsNote(noteId));
    }, [dispatch, noteId]);

    const addToNotificationsHandler = () => {
        if (!userInfo) {
            navigate('/signIn');
        } else {
            Axios.post(`/notifications/addNotification`,
                {
                    noteId: noteId,
                    userId: userInfo.id
                },
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            ).then(() => {
                alert("You've responded to the note!");
                navigate('/userNotes');
            }).catch(err => {
                console.log(err)
                alert(err.response.data);
            });
        }
    }

    return (
        <div>
            {loading ? <LoadingBox/>
                : error ? <MessageBox variant='danger'>{error}</MessageBox>
                    : (
                        <div>
                            {note.map(note => {
                                // let date = Date.parse(note.meetingDateTime);
                                // //date= date.setHours(date.getHours() + 3);
                                // console.log(typeof date);
                                const userPath = `/user/${note.userId}`
                                console.log('note.userId: ', note.userId);

                                function getAgeRange() {
                                    let range;
                                    if (note.ageFrom || note.ageTo) {
                                        if (note.ageFrom)
                                            range = `from ${note.ageFrom}y.o. `
                                        else
                                            range = '';
                                        if (note.ageTo)
                                            range += `to ${note.ageTo}y.o.`;
                                    } else {
                                        range = ` no age range`;
                                    }
                                    return range;
                                }

                                return (
                                    <div className='row'>
                                        <div className='col-2'>
                                            <img className="large" src={note.image}/>
                                            {(userInfo && userInfo.role) ? ''
                                                : <button onClick={addToNotificationsHandler} className='block'>
                                                    Respond to the note
                                                </button> }
                                            <br/><br/>
                                            <Link to='/'>Go to the notes list</Link><br/>
                                            {(userInfo && userInfo.role)
                                                ? <Link to={userPath}>User Owner</Link>
                                                : ''
                                            }
                                        </div>
                                        <div className='col-1'>
                                            <ul>
                                                <li>
                                                    <h1>{note.title}</h1>
                                                </li>
                                                <li><span className='nameOfField'>Description:</span> {note.description}
                                                </li>
                                                <li><span
                                                    className='nameOfField'>Date:</span> {note.meetingDateTime.slice(0, 19).replace('T', ' ')}
                                                </li>
                                                <li><span className='nameOfField'>Geolocation:</span> {note.geolocation}
                                                </li>
                                                <li><span
                                                    className='nameOfField'>Count of members:</span> {note.countOfMembers}
                                                </li>
                                                <li><span className='nameOfField'>Gender: </span> {note.gender}</li>
                                                <li><span className='nameOfField'>Category: </span> {note.category}</li>
                                                <li><span
                                                    className='nameOfField'>Cost: </span> {note.money == 0 ? `don't need money` : `need some money`}
                                                </li>
                                                <li><span className='nameOfField'>Age range: </span> {getAgeRange()}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )
            }
        </div>

    )
}