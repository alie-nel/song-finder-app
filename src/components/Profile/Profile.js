import "./Profile.css";
import { useState, useEffect } from "react";
import { auth, db } from "../../config/firebase";
import { doc, getDoc, collection } from "firebase/firestore";

const Profile = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getUserName = async () => {
      try {
        const userRef = doc(db, "profiles", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();
        const profileUsername = userData.username;

        setUserName(profileUsername);

      } catch (err) {
        console.error(err);
      }
    };

    getUserName();
  }, []);

  const postsCollection = collection(db, "posts");

  const [userPosts, setUserPosts] = useState([]);
  const [userLikes, setUserLikes] = useState([]);
  const [userStars, setUserStars] = useState([]);

  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const userRef = doc(db, "profiles", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();

          const posts = [];
          for (const postId of userData.posts) {
            const postDoc = doc(postsCollection, postId);
            const postSnap = await getDoc(postDoc);
            posts.push(postSnap.data());
          }

          const likes = [];
          for (const postId of userData.likes) {
            const postDoc = doc(postsCollection, postId);
            const postSnap = await getDoc(postDoc);
            likes.push(postSnap.data());
          }

          const stars = [];
          for (const postId of userData.stars) {
            const postDoc = doc(postsCollection, postId);
            const postSnap = await getDoc(postDoc);
            stars.push(postSnap.data());
          }

          setUserPosts(posts);
          setUserLikes(likes);
          setUserStars(stars);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getUserPosts();
  }, [postsCollection]);

  const [section, setSection] = useState("");

  const displaySection = async (sec) => {
    setSection(sec);
  }
  
  return (
    <div className="profile">
      <div className="profile-head">
        <p className="profile-username">
          Profile: {userName}
        </p>
      </div>
      <div className="profile-buttons">
        <button id="profile-posts-button" className="profile-button" onClick={() => displaySection("posts")}>
          POSTS
        </button>
        <button id="profile-liked-button" className="profile-button" onClick={() => displaySection("likes")}>
          LIKED
        </button>
        <button id="profile-starred-button" className="profile-button" onClick={() => displaySection("stars")}>
          STARRED
        </button>          
      </div>
      <div id="profile-posts" className="profile-info" style={{ display: section === "posts" ? "block" : "none" }}>
        {userPosts.map((post) => (
          <div key={post.id} className="profile-info-box">
            <p>{post.recSong.title} - {post.recSong.artist}</p>
            <p>{post.desc}</p>
            <p>Posted by {post.user.username}</p>
          </div>
        ))}
      </div>
      <div id="profile-likes" className="profile-info" style={{ display: section === "likes" ? "block" : "none" }}>
        {userLikes.map((post) => (
          <div key={post.id} className="profile-info-box">
            <p>{post.recSong.title} - {post.recSong.artist}</p>
            <p>{post.desc}</p>
            <p>Posted by {post.user.username}</p>
          </div>
        ))}
      </div>
      <div id="profile-stars" className="profile-info" style={{ display: section === "stars" ? "block" : "none" }}>
        {userStars.map((post) => (
          <div key={post.id} className="profile-info-box">
            <p>{post.recSong.title} - {post.recSong.artist}</p>
            <p>{post.desc}</p>
            <p>Posted by {post.user.username}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile;