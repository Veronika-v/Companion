import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {detailsNote, updateNote} from "../actions/noteActions";

export default function UpdateNoteScreen(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const params = useParams();
    const noteId = params.id;
    const noteDetails = useSelector(state => state.noteDetails);
    const {note} = noteDetails;


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [geolocation, setGeolocation] = useState('');
    const [ageFrom, setAgeFrom] = useState(Number);
    const [ageTo, setAgeTo] = useState(Number);
    const [countOfMembers, setCountOfMembers] = useState(Number);
    const [selectImageValue, setSelectImageValue] = useState('');


    const userSignIn = useSelector((state) => state.userSignIn);
    const {userInfo, loading, error} = userSignIn;


    const fileTypes = [
        'image/jpeg',
        'image/pjpeg',
        'image/png'
    ];

    function validFileType(file) {
        for (let i = 0; i < fileTypes.length; i++) {
            if (file.type === fileTypes[i]) {
                return true;
            }
        }
        return false;
    }


    const submitHandler = (e) => {
        e.preventDefault();
            dispatch(updateNote(noteId, title, description, userInfo, countOfMembers, geolocation, ageFrom, ageTo, selectImageValue));
            //alert("Note updated successfully!")
            navigate('/');
    }


    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    const onChangeImageHandler = async (e) => {
        e.preventDefault();

        let file = e.target.files[0];
        if (!validFileType(file))
            alert('You can load only .jpg, .jpeg, .png files ');
        else {
            const image = await toBase64(file);
            setSelectImageValue(image);
        }
    };


    useEffect(() => {
        if (!userInfo) {
            navigate('/SignIn');
        } else {
            dispatch(detailsNote(noteId));
        }
    }, [userInfo, noteId]);

    return (
        <div>
            {note?.map(note => {
console.log(note)
                return (
                    <form className="form" onSubmit={submitHandler}>
                        <div>
                            <div>
                                <h1 className="title">Update Note</h1>
                            </div>
                            <div>
                                {loading && <LoadingBox/>}
                                {error && <MessageBox variant="danger">error</MessageBox>}
                            </div>
                            <div>
                                <input type="text" id="title" placeholder="Title..." required value={note.title}
                                       onChange={e => setTitle(e.target.value)}/>
                            </div>
                            <div>
                                <input type="text" id="description" placeholder="Description..." required
                                       value={note.description}
                                       onChange={e => setDescription(e.target.value)}/>
                            </div>
                            <div>
                                <input type="text" id="geolocation" placeholder="Geolocation..." required
                                       value={note.geolocation}
                                       onChange={e => setGeolocation(e.target.value)}/>
                            </div>
                            <div>
                                <input type="number" id="ageFrom" placeholder="Age from..." min="1" max="100"
                                       value={note.ageFrom}
                                       onChange={e => setAgeFrom(e.target.value)}/>
                            </div>
                            <div>
                                <input type="number" id="ageTo" placeholder="Age to..." min="1" max="100"
                                       value={note.ageTo}
                                       onChange={e => setAgeTo(e.target.value)}/>
                            </div>
                            <div>
                                <input type="number" id="countOfMembers" min="1" max="100" value={note.countOfMembers}
                                       placeholder="Count of members" required
                                       onChange={e => setCountOfMembers(e.target.value)}/>
                            </div>

                            <div>
                                <label className="custom-file-upload">
                                    <input type="file" id="image" placeholder="Image..." accept=".jpg, .jpeg, .png"
                                           onChange={onChangeImageHandler}/>
                                    <i className="fa fa-cloud-upload"/> Upload image
                                </label>
                                {selectImageValue
                                    ? <img className="medium" src={selectImageValue}/>
                                    : <img className="medium" src={note.image}/>
                                }
                            </div>
                            <div>
                                <label/>
                                <button className="primary" type="submit">Update</button>
                            </div>
                        </div>
                    </form>
                )
            })}

        </div>
    )
}