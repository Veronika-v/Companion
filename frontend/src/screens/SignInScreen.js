import React, {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signIn} from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function SignInScreen(props){

    const navigate = useNavigate();
    const location =  useLocation();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const redirect = location.search
        ? location.search.split('=')[1]
        : '/';

    const userSignIn = useSelector((state) => state.userSignIn);
    const {userInfo, loading, error} = userSignIn;

    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(signIn(login, password));
    }

    useEffect(()=>{
        if(userInfo){
           navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);
    return(
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1 className="title">Sign In</h1>
                </div>
                <div>
                    {loading && <LoadingBox/>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                </div>
                <div>
                    <label htmlFor="login">Login</label>
                    <input type="login" id="login" placeholder="Login..." required
                           onChange={e => setLogin(e.target.value)}/>

                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Password..." required
                           onChange={e => setPassword(e.target.value)}/>

                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">Sign In</button>
                </div>
                <div>
                    <label/>
                    <div className="center_text">
                        Don't have an account?
                        <Link to="/register"> Register</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}