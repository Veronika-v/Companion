import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {listUserNotes, listUserResponds} from "../actions/noteActions";
import UserNotes from "../components/UserNotes";
import RespondedNote from "../components/RespondedNote";
import {Tabs, Tab, TabPanel,TabList} from "react-tabs";

export default function UserNotesScreen () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userSignIn = useSelector((state) => state.userSignIn);
    const {userInfo} = userSignIn;

    const userNotes = useSelector(state => state.userNoteList);
    const {loading, error, notes} = userNotes;

    const userResponds = useSelector(state => state.userResponds);
    const {loadingR, errorR, responds} = userResponds;

    useEffect(() => {
        if(!userInfo){
            navigate('/signIn');
        }else {
            dispatch(listUserNotes(userInfo.id));
            dispatch(listUserResponds(userInfo.id));
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
                    <UserNotes loading={loading} error={error} userNotes={notes}/>
                </TabPanel>
                <TabPanel>
                    <RespondedNote loading={loadingR} error={errorR} responds={responds}/>
                </TabPanel>
            </Tabs>
        </div>
    )
}