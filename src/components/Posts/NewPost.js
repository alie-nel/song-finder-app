import './NewPost.css';
import { useEffect, useState } from "react";
import { db, auth } from "../../config/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const NewPost = ({ isAuth }) => {
  const [recSong, setRecTitle] = useState("");
  const [recArtist, setRecArtist] = useState("");
  const [postDesc, setPostDesc] = useState("");

  const postsCollection = collection(db, "posts");
  let redirect = useNavigate();

  const submitPost = async () => {
    try {
      await addDoc(postsCollection, {
        recSong: { title: setRecTitle, artist: setRecArtist },
        stemSong: { title: "", artist: "", id: "" },
        desc: setPostDesc,
        user: { username: auth.currentUser.displayName, id: auth.currentUser.uid },
        likes: { num: 0, users: [] },
        dislikes: { num: 0, users: [] },
      });
    } catch (err) {
        console.error(err);
    }
  }

  useEffect(() => {
    if (!isAuth) {
      redirect("/login");
    }
  })
  
  
  return (
    <form className="new-post">
      <div className="new-head">
        <p className="new-username">
          {auth.currentUser.displayName}
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