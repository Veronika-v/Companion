import React from 'react'
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {blockUser} from "../actions/userActions";

export default function ActiveUsers(props) {

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const loading = props.loading;
    const err = props.error;
    const users = props.users;

    const blockUserHandler = (userId) =>{
        dispatch(blockUser(userId))
            .then(()=>{
                alert("user blocked!")
            });
    }

    return(
        <div>
            {loading?<LoadingBox/>
                : err?<MessageBox variant='danger'>{err}</MessageBox>
                    :
                    <div className="row center">
                        {users.map(user => {
                            return (
                                <div key={user.id} className=" admin">
                                    <div className="card-body">
                                        <label htmlFor="firstname"><h3>First name: {user.firstName}</h3></label>
                                        <label htmlFor="lastname"><h3>Last name: {user.lastName}</h3></label>
                                        <label htmlFor="login"><h3>Login: {user.login}</h3></label>
                                        <label htmlFor="email"><h3>E-mail: {user.email}</h3></label>
                                    </div>
                                    <div>
                                        <button onClick={() => blockUserHandler(user.id)}>Block</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
            }
        </div>
    )
}