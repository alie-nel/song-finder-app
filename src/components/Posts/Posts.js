import './Posts.css';
import { useEffect, useState } from "react";
import { db, auth } from "../../config/firebase";
import { getDocs, deleteDoc, doc, collection } from "firebase/firestore";

const Posts = ({ isAuth }) => {
  const [posts, setPosts] = useState([]);

  const postsCollection = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsData = await getDocs(postsCollection);
        const importantData = postsData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPosts(importantData);
      } catch (err) {
        console.error(err);
      }
    };
    
    getPosts();
  }, []);

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

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  }
  
  return (
  <>
    <div className="posts">
      {posts.map((post) => (
      <div className="post">
        <div className="post-head">
          <p className="post-song-title">
            {post.recSong.title}
          </p>
          <p className="post-song-artist">
            {post.recSong.artist}
          </p>
        </div>
        <div className="post-desc-box">
          <p className="post-desc">
            {post.desc}
          </p>
        </div>
        <div className="post-mid">
          <p className="post-username">
            Posted by {post.user.username}
          </p>
        </div>
        <div className="post-tail">
          <button id="post-like-button" className="post-button">

          </button>
          <p id="post-num-likes" className="post-data">
            {post.likes.num}
          </p>
          <button id="post-dislike-button" className="post-button">
            
          </button>
          <p id="post-num-dislikes" className="post-data">
            {post.dislikes.num}
          </p>
        </div>
        <div>
          {isAuth && post.user.id === auth.currentUser.uui && (
          <button
            onClick={() => {
              deletePost(post.id);
            }}
          >
            DELETE
          </button>)}
        </div>
      </div>
      ))}
    </div>
  </>
)}

export default Posts;