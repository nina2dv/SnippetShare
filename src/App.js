import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { auth } from './firebase-config';


function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  const signUserOut = () => {
    signOut(auth).then(() =>{
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname="/";
    });
  }
  return (
    <BrowserRouter>
    
      <nav>
        <div className='siteTitle'>
          SnippetShare
        </div>

        
        {!isAuth ? 
          <Link to="/">Login</Link> : 
          <>
          <a><Link to="/home">Home</Link></a>
          <a><Link to="/createpost">Create Post</Link></a>
          <a><button className='button4' onClick={signUserOut}>Log Out</button></a>
          </>
        }
      </nav>
    <Routes>
      <Route exact path="/" element={<Login setIsAuth={setIsAuth}/>}/>
      <Route path="/home" element={<Home isAuth={isAuth}/>}/>
      <Route path="/createpost" element={<CreatePost isAuth={isAuth}/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
