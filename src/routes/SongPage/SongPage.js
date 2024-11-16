import "./SongPage.css"
import NewPost from "../../components/Posts/NewPost";
import Posts from "../../components/Posts/Posts";

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

const SongPage = ({ isAuth }) => {
  const { songId } = useParams();
  const [song, setSong] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    const getSong = async () => {
      try {
        const songDoc = await getDoc(doc(db, "songs", songId));
        console.log(songId)
        if (songDoc.exists()) {
          setSong(songDoc.data());
        } else {
          console.error("This song hasn't been uploaded yet.");
        }
      } catch (err) {
        console.error(err);
      }
    };

    getSong();
  }, [songId]);

  if (!song) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="song-page">
      <h1 className="song-titles">{song.title}</h1>
      <h2 className="song-titles" id="song-artist">{song.artist}</h2>
        
        <NewPost isAuth={isAuth}/>
        <Posts isAuth={isAuth}/>
    </div>
  )
}

export default SongPage;