import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {listUserNotes, listUserResponds} from "../actions/noteActions";
import UserNotes from "../components/UserNotes";
import RespondedNote from "../components/RespondedNote";
import {Tabs, Tab, TabPanel,TabList} from "react-tabs";
import Axios from "axios";

export default function UserNotesScreen () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userSignIn = useSelector((state) => state.userSignIn);
    const {userInfo} = userSignIn;

    const userNotes = useSelector(state => state.userNoteList);
    const {loading, error, notes} = userNotes;

    const userResponds = useSelector(state => state.userResponds);
    const {loadingR, errorR, responds} = userResponds;

    const createNoteHandler = () =>{
        navigate('/note/add');
    }

    useEffect(() => {
        if(!userInfo){
            navigate('/signIn');
        }else {
            dispatch(listUserNotes(userInfo));
            dispatch(listUserResponds(userInfo));
        }
    }, [dispatch, userInfo]);

    return (
        <div>
            <Tabs className="tabs">
                <TabList>
                    <Tab>My Notes</Tab>
                    <Tab>My Responds</Tab>
                </TabList>

                <TabPanel>
                    <div>
                        <button className="addNote" onClick={createNoteHandler}>New Note</button>
                        <UserNotes loading={loading} error={error} userNotes={notes}/>
                    </div>
                </TabPanel>
                <TabPanel>
                    <RespondedNote loading={loadingR} error={errorR} responds={responds}/>
                </TabPanel>
            </Tabs>
        </div>
    )
}