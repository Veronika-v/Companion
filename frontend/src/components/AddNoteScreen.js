import React, {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signIn} from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Select from "react-select";
import {listCategories} from "../actions/categoryActions";

export default function AddNoteScreen(){

    const navigate = useNavigate();
    const location =  useLocation();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(Boolean);
    const [meetingDateTime, setMeetingDateTime] = useState('');
    const [money, setMoney] = useState(Boolean);
    const [geolocation, setGeolocation] = useState('');
    const [ageFrom, setAgeFrom] = useState(Number);
    const [ageTo, setAgeTo] = useState(Number);
    const [countOfMembers, setCountOfMembers] = useState(Number);
    const [image, setImage] = useState('');
    const [gender, setGender] = useState('');
    const [ selectValue, setSelectValue] = useState(null);

    /*const redirect = location.search
        ? location.search.split('=')[1]
        : '/';*/

    const userSignIn = useSelector((state) => state.userSignIn);
    const {userInfo, loading, error} = userSignIn;

    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        // dispatch(signIn(login, password));
    }

    const categoriesList = useSelector( state => state.categories);
    const { categories} = categoriesList;
    useEffect(()=>{
        dispatch(listCategories());
    }, [])

    const onSelectChange = (e) => {
        setSelectValue(e);
    }
    const list = [];

    useEffect(()=>{
        if(!userInfo){
            navigate('/SignIn');
        }
    }, [navigate, userInfo]);
    return(
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1 className="title">Create Note</h1>
                </div>
                <div>
                    {loading && <LoadingBox/>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                </div>
                <div>
                    <input type="text" htmlFor="title" id="title" placeholder="Title..." required
                           onChange={e => setTitle(e.target.value)}/>
                </div>
                <div>
                    <input type="text" id="description" placeholder="Description..." required
                           onChange={e => setDescription(e.target.value)}/>
                </div>
                <div>
                    <input type="datetime-local" id="meeetingDateTime" placeholder="Meeting Date&Time..." required
                           onChange={e => setMeetingDateTime(e.target.value)}/>
                </div>
                <div>
                    <div  className='category'>
                        {categories.map(category => {
                            list.push({value:category.id, label:category.category});
                        })}
                        <Select value={selectValue} onChange={onSelectChange} options={list} />
                    </div>
                </div>
                <div>
                    <input type="text" id="gender" placeholder="Gender..." required
                           onChange={e => setGender(e.target.value)}/>
                </div>
                <div>
                    <input type="text" id="geolocation" placeholder="Geolocation..."
                           onChange={e => setGeolocation(e.target.value)}/>
                </div>
                <div>
                    <input type="number" id="ageFrom" placeholder="Age from..." min="1" max="100"
                           onChange={e => setAgeFrom(e.target.value)} />
                </div>
                <div>
                    <input type="number" id="ageTo" placeholder="Age to..."  min="1" max="100"
                           onChange={e => setAgeTo(e.target.value)}/>
                </div>
                <div>
                    <input type="text" id="image" placeholder="Image..."
                           onChange={e => setImage(e.target.value)}/>
                </div>
                <div>
                    <input type="number" id="countOfMembers" min="1" max="100" placeholder="Count of members"
                           onChange={e => setCountOfMembers(e.target.value)}/>
                </div>
                <div >
                    <label className="checkbox" htmlFor="money">Need money:
                        <input type="checkbox" id="money"
                               onChange={e => setMoney(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}