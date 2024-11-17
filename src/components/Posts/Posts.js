import './Posts.css';
import { useEffect, useState } from "react";
import { db, auth } from "../../config/firebase";
import { getDoc, getDocs, doc, collection, query, where, orderBy } from "firebase/firestore";
import { updateDoc, deleteDoc, arrayUnion, arrayRemove, increment } from "firebase/firestore";

const Posts = ({ isAuth, songId }) => {
  const [posts, setPosts] = useState([]);

  const postsCollection = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsFiltered = query(postsCollection, where("stemSongId", "==", songId), orderBy("likes.num", "desc"));
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
  }, [postsCollection, songId]);

  const starPost = async (id) => {
    try {
      const postDoc = doc(db, "posts", id);
      const postSnap = await getDoc(postDoc);
      const postData = postSnap.data();

      const userRef = doc(db, "profiles", auth.currentUser.uid);

      if (postData.stars.includes(auth.currentUser.uid)) {
        await updateDoc(postDoc, {
          stars: arrayRemove(auth.currentUser.uid),
        });

        await updateDoc(userRef, {
          stars: arrayRemove(id),
        });

      } else {
        await updateDoc(postDoc, {
          stars: arrayUnion(auth.currentUser.uid),
        });

        await updateDoc(userRef, {
          stars: arrayUnion(id),
        });
      };
    } catch (err) {
      console.log(err);
    }
  }

  const likePost = async (id) => {
    try {
      const postDoc = doc(db, "posts", id);
      const postSnap = await getDoc(postDoc);
      const postData = postSnap.data();

      const userRef = doc(db, "profiles", auth.currentUser.uid);

      if (postData.likes.users.includes(auth.currentUser.uid)) {
        await updateDoc(postDoc, {
          "likes.num": increment(-1),
          "likes.users": arrayRemove(auth.currentUser.uid),
        });

        await updateDoc(userRef, {
          likes: arrayRemove(id),
        });

      } else {
        await updateDoc(postDoc, {
          "likes.num": increment(1),
          "likes.users": arrayUnion(auth.currentUser.uid),
        });

        await updateDoc(userRef, {
          likes: arrayUnion(id),
        });
      };
    } catch (err) {
      console.log(err);
    }
  }

  const dislikePost = async (id) => {
    try {
      const postDoc = doc(db, "posts", id);
      const postSnap = await getDoc(postDoc);
      const postData = postSnap.data();

      if (postData.dislikes.users.includes(auth.currentUser.uid)) {
        await updateDoc(postDoc, {
          "dislikes.num": increment(-1),
          "dislikes.users": arrayRemove(auth.currentUser.uid),
        });
      } else {
        await updateDoc(postDoc, {
          "dislikes.num": increment(1),
          "dislikes.users": arrayUnion(auth.currentUser.uid),
        });
      };
    } catch (err) {
      console.log(err);
    }
  }

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
          <button id="post-star-button" className="post-button"
            onClick={() => {
              starPost(post.id);
            }}
          >
          </button>
          
          <button id="post-like-button" className="post-button"
            onClick={() => {
              likePost(post.id);
            }}
          >
          </button>
          <p id="post-num-likes" className="post-data">
            {post.likes.num}
          </p>

          <button id="post-dislike-button" className="post-button"
            onClick={() => {
              dislikePost(post.id);
            }}
          >
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