import React, {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function RegisterScreen(props){

    const navigate = useNavigate();
    const location =  useLocation();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const redirect = location.search
        ? location.search.split('=')[1]
        : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const {userInfo, loading, error} = userRegister;

    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        if(password !== confirmPassword) {
            const infoBox = document.getElementById("info");
            infoBox.innerHTML(`
                <MessageBox variant="danger">
                    Password and confirm password are not match
                </MessageBox>`);
        }
        else
            dispatch(register(firstName, lastName, login, email, password));
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
                    <h1 className="title">Registration</h1>
                </div>
                <div id="info">
                    {loading && <LoadingBox/>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                </div>
                <div>
                    <label htmlFor="firstName">First name</label>
                    <input type="text" id="firstName" placeholder="First name..." required
                           onChange={e => setFirstName(e.target.value)}/>

                </div>
                <div>
                    <label htmlFor="lastName">Last name</label>
                    <input type="text" id="lastName" placeholder="Last name..." required
                           onChange={e => setLastName(e.target.value)}/>

                </div>
                <div>
                    <label htmlFor="login">Login</label>
                    <input type="text" id="login" placeholder="Login..." required
                           onChange={e => setLogin(e.target.value)}/>

                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Email..." required
                           onChange={e => setEmail(e.target.value)}/>

                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Password..." required
                           onChange={e => setPassword(e.target.value)}/>

                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input type="password" id="confirmPassword" placeholder="confirmPassword..." required
                           onChange={e => setConfirmPassword(e.target.value)}/>

                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">Register</button>
                </div>
                <div>
                    <label/>
                    <div className="center_text">
                        Do you already have an account?
                        <Link to="/signIn"> Sign In</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}