import './NewPost.css';
import { useState } from "react";
import { db, auth } from "../../config/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const NewPost = ({ isAuth, songId }) => {
  const userName = auth.currentUser.displayName || auth.currentUser.email.split('@')[0];
  
  const [recTitle, setRecTitle] = useState("");
  const [recArtist, setRecArtist] = useState("");
  const [postDesc, setPostDesc] = useState("");

  const postsCollection = collection(db, "posts");

  const submitPost = async (e) => {
    e.preventDefault();

    try {
      await addDoc(postsCollection, {
        recSong: { title: recTitle, artist: recArtist },
        stemSongId: songId,
        desc: postDesc,
        user: { username: userName, id: auth.currentUser.uid },
        likes: { num: 0, users: [] },
        dislikes: { num: 0, users: [] },
        stars: []
      });

      setRecTitle("");
      setRecArtist("");
      setPostDesc("");
      
    } catch (err) {
        console.error(err);
    }
  }
  
  return (
    <form className="new-post">
      <div className="new-head">
        <p className="new-username">
          {userName}
        </p>
      </div>
      <div className="new-song-choice">
        <input
          className="new-song-title"
          placeholder='Title'
          onChange={(e) => setRecTitle(e.target.value)}
        />
        <input
          className="new-song-artist"
          placeholder='Artist'
          onChange={(e) => setRecArtist(e.target.value)}
        />
      </div>
      <div className="new-desc-box">
        <textarea
          className="new-desc"
          placeholder='I recommend this because...'
          onChange={(e) => setPostDesc(e.target.value)}
        />
      </div>
      <div className="new-tail">
        <button className="new-post-button" type="submit" onClick={submitPost}>
          RECOMMEND
        </button>
      </div>
    </form>
)}

export default NewPost;