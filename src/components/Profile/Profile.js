import "./Profile.css";
import { useState, useEffect } from "react";
import { auth, db } from "../../config/firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";

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
            posts.push(postSnap.data());
          }

          const stars = [];
          for (const postId of userData.stars) {
            const postDoc = doc(postsCollection, postId);
            const postSnap = await getDoc(postDoc);
            stars.push(postSnap.data());
          }

          setUserPosts(posts);
          setUserLikes(likes);
          setUserLikes(stars);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getUserPosts();
  }, []);
  
  return (
    <div className="profile">
      <div className="profile-head">
        <p className="profile-username">
          {userName}
        </p>
      </div>
      <div className="profile-buttons">
        <button id="profile-starred-button" className="profile-button">
          STARRED
        </button>
        <button id="profile-liked-button" className="profile-button">
          LIKED
        </button>
        <button id="profile-posts-button" className="profile-button">
          POSTS
        </button>
      </div>
    </div>
  )
}

export default Profile;