import data from './data';

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
                  <div key={note.id} className="card">
                    <a href={`/note/${note.id}`}>
                      <img className="medium" src={note.image} alt={note.title}/>
                    </a>
                    <div className="card-body">
                      <a href={`/note/${note.id}`}>
                        <h2>{note.title}</h2>
                      </a>
                      <div className="rating">
                        <span> <i className="fa fa-star"></i></span>
                        <span> <i className="fa fa-star"></i></span>
                        <span> <i className="fa fa-star"></i></span>
                        <span> <i className="fa fa-star-half-o"></i></span>
                        <span> <i className="fa fa-star-o"></i></span>
                      </div>
                    </div>
                  </div>
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
