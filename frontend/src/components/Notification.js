import React from 'react';
import {Link} from "react-router-dom";

export default function Notification(props){
    const {notif} = props;
    return (
        <div>
            {/*<div key={notif.id} className=" notification" >*/}
            {/*    <div className="card-body">*/}
            {/*        <Link to={`/note/${notif.noteId}`}>*/}
            {/*            <h2>{notif.title}</h2>*/}
            {/*        </Link>*/}
            {/*        <p>{notif.description.length<210?notif.description:`${notif.description.slice(0,210)}...`}</p>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div key={notif.id} className=" notification" >
                <div className="card-body">
                    <Link to={`/user/${notif.respondedUserId}`}>
                        <span>{notif.firstName} {notif.lastName}</span>
                    </Link>
                    {'  '}responded to your {' '}
                    <Link to={`/note/${notif.noteId}`}>
                        <span>{notif.title} </span>
                    </Link>
                    {'  '}note.
                </div>
            </div>
        </div>
    )
}