import React, {useEffect} from 'react'
import Tabs from "../components/Tabs";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {listUserNotes} from "../actions/noteActions";
import UserNotes from "../components/UserNotes";

export default function UserNotesScreen () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userSignIn = useSelector((state) => state.userSignIn);
    const {userInfo} = userSignIn;

    const userNotes = useSelector(state => state.userNoteList);
    const {loading, error, notes} = userNotes;

    useEffect(() => {
        if(!userInfo){
            navigate('/signIn'); ////////// если нет юзера, урл меняется на /signIn, но дальше все равно рендериться эта страница
        }else {
            dispatch(listUserNotes(userInfo.id));
        }
    }, [userInfo]);

    return (
        <div>
            <Tabs myNotes />
            <UserNotes loading={loading} error={error} userNotes={notes}/>

        </div>
    )
}