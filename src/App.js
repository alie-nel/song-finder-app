import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from './config/firebase';
import { getDocs, collection } from "firebase/firestore";

import Nav from './components/Nav/Nav';
import HomePage from './routes/HomePage/HomePage';
import LoginPage from './routes/LoginPage/LoginPage';
import SongPage from './routes/SongPage/SongPage';
import ProfilePage from './routes/ProfilePage/ProfilePage';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [songs, setSongs] = useState([]);

  const songsCollection = collection(db, "songs");

  useEffect(() => {
    const getSongs = async () => {
      try {
        const songsData = await getDocs(songsCollection);
        const importantData = songsData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setSongs(importantData);
      } catch (err) {
        console.error(err);
      }
    };
    
    getSongs();
  }, []);

  return (
    <div className="App">
      <Router>
        <Nav isAuth={isAuth} setIsAuth={setIsAuth}/>
        <Routes>
          <Route path="/" exact element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage setIsAuth={setIsAuth}/>}/>
          {songs.map((song) => 
            <Route path={song.id} element={<SongPage isAuth={isAuth}/>}/>
          )}
          <Route path="/profile" element={<ProfilePage isAuth={isAuth}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
