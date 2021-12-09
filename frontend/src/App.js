import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import NoteScreen from "./screens/NoteScreen";
import HomeScreen from "./screens/HomeScreen";
import React from "react";
import NotifScreen from "./screens/NotifScreen";
import SignInScreen from "./screens/SignInScreen";
import {useSelector} from "react-redux";

function App() {
  const userSignIn = useSelector((state) => state.userSignIn);
  const {userInfo} = userSignIn;

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
                    <div className="dropdown">
                      <button className="dropbtn">{userInfo.login}</button>
                      <div className="dropdown-content">
                        <Link to="#">Profile</Link>
                        <Link to="#">Notes</Link>
                        <Link to="#">Favorites</Link>
                        <Link to="/notifications">Notifications</Link>
                      </div>
                    </div>
                    <Link to="/signOut">Sign Out</Link>
                  </div>
              :   <Link to="/signIn">Sign In</Link>}

            </div>
          </header>
          <main>
            <Routes>
              <Route path = '/notifications' element={<NotifScreen/>}></Route>
              <Route path = '/note/:id' element={<NoteScreen/>} ></Route>
              <Route path = '/signIn' element={<SignInScreen/>}></Route>
              <Route path = '/' element={<HomeScreen/>} exact></Route>
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
