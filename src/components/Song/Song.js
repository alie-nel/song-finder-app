import './Song.css';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { db } from '../../config/firebase';
import { getDocs, collection } from "firebase/firestore";

const Songs = () => {
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
  <>
    <div className="songs">
      {songs.map((song) => (
      <button>
      <Link to={song.id}>
      <div className="song">
          <p className="song-title">
            {song.title}
          </p>
          <p className="song-artist">
            {song.artist}
          </p>
      </div>
      </Link>
      </button>
      ))}
    </div>    
  </>
)}

export default Songs;