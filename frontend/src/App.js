import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import NoteScreen from "./screens/NoteScreen";
import HomeScreen from "./screens/HomeScreen";
import React from "react";
import NotifScreen from "./screens/NotifScreen";
import SignInScreen from "./screens/SignInScreen";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "./actions/userActions";
import RegisterScreen from "./screens/RegisterScreen";
import UserNotesScreen from "./screens/UserNotesScreen";
import AddNoteScreen from "./components/AddNoteScreen";
import UpdateNoteScreen from "./screens/UpdateNoteScreen";
import UserScreen from "./screens/UserScreen";

function App() {
  const userSignIn = useSelector((state) => state.userSignIn);
  const {userInfo} = userSignIn;
  const dispatch = useDispatch();
  const signOutHandler = () =>{
    dispatch(signOut());
  }

  const profilePath = `/users/${userInfo.id}`;

  return (
      <BrowserRouter>
        <div className="grid-container">
          <header className="row home">
            <div>
              <Link className="brand" to="/">Companion</Link>
            </div>
            <div>
              {userInfo?
                  <div>
                    {!userInfo.role ?
                      <div className="dropdown">
                        <button className="dropbtn">{userInfo.login}</button>
                        <div className="dropdown-content">
                          <Link to={profilePath}>Profile</Link>
                          <Link to="/userNotes">Notes</Link>
                          <Link to="/notifications">Notifications</Link>
                        </div>
                      </div>
                      :
                        <div className="dropdown">
                          <button className="dropbtn">{userInfo.login}</button>
                          <div className="dropdown-content">
                            <Link to="#">Chek Notes</Link>
                          </div>
                        </div>
                    }
                    <Link to="#signOut" onClick={signOutHandler}>Sign Out</Link>
                  </div>
              :   <Link to="/signIn">Sign In</Link>
              }
            </div>
          </header>
          <main>
            <Routes>
              <Route path = '/notifications' element={<NotifScreen/>}/>
              <Route path = '/note/:id' element={<NoteScreen/>} />
              <Route path = '/note/update/:id' element={<UpdateNoteScreen/>} />
              <Route path = '/user/:id' element={<UserScreen/>} />
              <Route path = '/userNotes' element={<UserNotesScreen/>}/>
              <Route path = '/note/add' element={<AddNoteScreen/>}/>
              <Route path = '/signIn' element={<SignInScreen/>}/>
              <Route path = '/register' element={<RegisterScreen/>}/>
              <Route path = '/' element={<HomeScreen/>} exact/>
            </Routes>
          </main>
          <footer className="row center">
            All rights reserved
          </footer>
        </div>
      </BrowserRouter>
  );
}

export default App;
