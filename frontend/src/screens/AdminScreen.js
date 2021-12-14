import React, {useEffect} from 'react';
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {listUserNotes, listUserResponds} from "../actions/noteActions";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import UserNotes from "../components/UserNotes";
import RespondedNote from "../components/RespondedNote";
import ActiveUsers from "../components/ActiveUsers";
import {allUsers} from "../actions/userActions";
import BlockedUsers from "../components/BlockedUsers";

export default function AdminScreen(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // admin!!!!!!
    const userSignIn = useSelector((state) => state.userSignIn);
    const {userInfo} = userSignIn;
    //

    const usersList = useSelector(state => state.allUsers);
    const {loading, error, users} = usersList;

    let active = [];
    let blocked = [];
    //
    // const userResponds = useSelector(state => state.userResponds);
    // const {loadingR, errorR, responds} = userResponds;

    // const createNoteHandler = () =>{
    //     navigate('/note/add');
    // }

    if(users){
        users.map( user =>{
            if(user.statusId === 1)
                active.push(user)
            if(user.statusId === 2)
                blocked.push(user)
        })
        // console.log('users: ', users)
        // console.log('active: ', active)
        // console.log('blocked: ', blocked)
    }

    console.log('active: ', active)
    useEffect(() => {
        if(!userInfo){
            navigate('/signIn');
        }else {
            dispatch(allUsers());
            //dispatch(listUserResponds(userInfo));
        }
    }, [dispatch, userInfo]);

    return (
        <div>
            <Tabs className="tabs">
                <TabList>
                    <Tab>Active Users</Tab>
                    <Tab>Blocked Users</Tab>
                </TabList>

                <TabPanel>
                    <div>
                        <ActiveUsers loading={loading} error={error} users={active}/>
                    </div>
                </TabPanel>
                <TabPanel>
                    <BlockedUsers loading={loading} error={error} users={blocked}/>
                </TabPanel>
            </Tabs>
        </div>
    )

}