import React, {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Select from "react-select";
import {listCategories} from "../actions/categoryActions";
import {listGenders} from "../actions/genderActions";
import CategoryDropdown from "./CategoryDropdown";
import {addNote} from "../actions/noteActions";

export default function AddNoteScreen(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location =  useLocation();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [meetingDateTime, setMeetingDateTime] = useState('');
    const [money, setMoney] = useState(Boolean);
    const [geolocation, setGeolocation] = useState('');
    const [ageFrom, setAgeFrom] = useState(Number);
    const [ageTo, setAgeTo] = useState(Number);
    const [countOfMembers, setCountOfMembers] = useState(Number);
    const [image, setImage] = useState('');
    const [ selectCategoryValue, setSelectCategoryValue] = useState(null);
    const [ selectGenderValue, setSelectGenderValue] = useState(null);


    const userSignIn = useSelector((state) => state.userSignIn);
    const {userInfo, loading, error} = userSignIn;
    const categoriesList = useSelector( state => state.categories);
    const { categories} = categoriesList;
    const categoryList = [];
    const gendersList = useSelector( state => state.genders);
    const { genders} = gendersList;
    const genderList = [];



    const fileTypes = [
        'image/jpeg',
        'image/pjpeg',
        'image/png'
    ];
    function validFileType(file) {
        for(let i = 0; i < fileTypes.length; i++) {
            if(file.type === fileTypes[i]) {
                return true;
            }
        }
        return false;
    }


    const submitHandler = (e) =>{
        e.preventDefault();

        dispatch(addNote(title, description, meetingDateTime, money, userInfo.id,
            selectCategoryValue.value, selectGenderValue.value, countOfMembers, geolocation, ageFrom, ageTo, image));
    }



    const onSelectCategoryChange = (e) => {
        setSelectCategoryValue(e);
    }
    const onSelectGenderChange = (e) => {
        setSelectGenderValue(e);
    }


    useEffect(()=>{
        if(!userInfo){
            navigate('/SignIn');
        }else{
            dispatch(listCategories());
            dispatch(listGenders());
        }
    }, [dispatch, navigate, userInfo]);


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
                    <input type="text" id="title" placeholder="Title..." required
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
                    <div  className='selectField'>
                        {categories.map(category => {
                            categoryList.push({value:category.id, label:category.category});
                        })}
                        <Select value={selectCategoryValue} onChange={onSelectCategoryChange} options={categoryList} placeholder="Leisure type..."/>
                    </div>
                </div>
                <div>
                    <div>
                        <div className='selectField'>
                            {genders.map(gender => {
                                genderList.push({value:gender.id, label:gender.gender});
                            })}
                            <Select value={selectGenderValue} onChange={onSelectGenderChange} options={genderList} placeholder="Gender..."/>
                        </div>
                    </div>
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
                    <input type="number" id="countOfMembers" min="1" max="100" placeholder="Count of members" required
                           onChange={e => setCountOfMembers(e.target.value)}/>
                </div>
                <div >
                    <label className="checkbox" htmlFor="money">Need money:
                        <input type="checkbox" id="money"
                               onChange={e => setMoney(e.target.value)}/>
                    </label>
                </div>

                <div>
                    <label className="custom-file-upload">
                        <input type="file" id="image" placeholder="Image..." accept=".jpg, .jpeg, .png"
                               onChange={e => setImage(e.target.value)}/>
                        <i className="fa fa-cloud-upload"></i> Upload image
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