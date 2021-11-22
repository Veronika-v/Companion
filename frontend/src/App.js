import data from './data';
import Note from './components/Note';

function App() {
  return (
      <div className="grid-container">
        <header className="row">
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
          <div className="row center">
            {
              data.notes.map(note => (
                  <Note key={note.id} note={note}></Note>
              ))
            }

          </div>
        </main>
        <footer className="row center">
          All rights reserved
        </footer>
      </div>
  );
}

export default App;
