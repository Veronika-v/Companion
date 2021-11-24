import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoteScreen from "./screens/NoteScreen";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
      <BrowserRouter>
        <div className="grid-container">
          <header className="row home">
            <div>
              <a className="brand" href="/">Companion</a>
            </div>
            <div>
              <div className="dropdown">
                <button className="dropbtn">User_name</button>
                <div className="dropdown-content">
                  <a href="#">Profile</a>
                  <a href="#">Notes</a>
                  <a href="#">Favorites</a>
                  <a href="#">Notifications</a>
                  <a href="#">Chats</a>
                </div>
              </div>
              <a href="/signIn">Sign In</a>
            </div>
          </header>
          <main>
            <Routes>
              <Route path = '/note/:id' element={<NoteScreen/>} ></Route>
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
