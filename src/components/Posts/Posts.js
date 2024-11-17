import './Posts.css';
import { useEffect, useState } from "react";
import { db, auth } from "../../config/firebase";
import { getDocs, deleteDoc, doc, collection, query, where } from "firebase/firestore";

const Posts = ({ isAuth, songId }) => {
  const [posts, setPosts] = useState([]);

  const postsCollection = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsFiltered = query(postsCollection, where("stemSongId", "==", songId));
        const postsData = await getDocs(postsFiltered);
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

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  }
  
  return (
  <>
    <div className="posts">
      {posts.map((post) => (
      <div className="post" key={post.id}>
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
          {isAuth && post.user.id === auth.currentUser.uid && (
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