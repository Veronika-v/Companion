import React, {useState} from 'react'
import {Link} from "react-router-dom";

export default function SignInScreen(){


    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const submitHandler = (e) =>{
        e.preventDefault();
    }

    return(
        <di>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                <div>
                    <label htmlFor="login">Password</label>
                    <input type="login" id="login" placeholder="Login..." required
                           onChange={e => setLogin(e.target.value)}/>

                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" placeholder="Email..." required
                        onChange={e => setEmail(e.target.value)}/>

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
                    <div>
                        Don't have an account?
                        <Link to="/register"> Register</Link>
                    </div>
                </div>
            </form>
        </di>
    )
}