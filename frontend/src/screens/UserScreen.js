import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function UserScreen() {
    const userSignin = useSelector((state) => state.userSignIn);
    const { userInfo } = userSignin;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailsUser(userInfo.id));
    }, [dispatch, userInfo.id]);
    return (
        <div>
            <form className="form" >
                <div>
                    <h1>User Profile</h1>
                </div>
                {loading ?   <LoadingBox/>
                : error ?
                    <MessageBox variant="danger">{error}</MessageBox>
                 : (
                    <>
                        <div>
                            <label htmlFor="firstname">First name: {user.firstName}</label>
                            <label htmlFor="lastname">Last name: {user.lastName}</label>
                            <label htmlFor="login">Login: {user.login}</label>
                            <label htmlFor="email">E-mail: {user.email}</label>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}