import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {detailsUser} from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {useParams} from "react-router-dom";

export default function UserScreen() {
    const params = useParams();
    const userId = params.id;
    const userSignin = useSelector((state) => state.userSignIn);
    const {userInfo} = userSignin;
    const userDetails = useSelector((state) => state.userDetails);
    const {loading, error, user} = userDetails;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailsUser(userId));
    }, [dispatch, userId]);
    return (
        <div>
            <form className="form">
                <div>
                    <h1 className="title">User Profile</h1>
                </div>
                {loading ? <LoadingBox/>
                    : error ?
                        <MessageBox variant="danger">{error}</MessageBox>
                        : (
                            <div className="big">
                                <label htmlFor="firstname"><h3>First name: {user.firstName}</h3></label>
                                <label htmlFor="lastname"><h3>Last name: {user.lastName}</h3></label>
                                <label htmlFor="login"><h3>Login: {user.login}</h3></label>
                                <label htmlFor="email"><h3>E-mail: {user.email}</h3></label>
                            </div>
                        )}
            </form>
        </div>
    );
}