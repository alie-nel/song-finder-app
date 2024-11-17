import "./Login.css";
import { useState } from "react";
import { auth, googleProvider, db } from "../../config/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  let redirect = useNavigate();

  const login = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
      const userRef = doc(db, "profiles", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          username: user.email.split("@")[0],
          posts: [],
          likes: [], 
          starred: [],
        });
      }

      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      redirect("/");

    } catch (err) {
      console.error(err);
    }
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userRef = doc(db, "profiles", user.uid); // Use uid as the document ID
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          username: user.displayName,
          posts: [],
          likes: [], 
          starred: [],
        });
      }

      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      redirect("/");

    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <>
      <div className="login-box">
        <p className="login-title">LOGIN</p>
        <input
          className="login-input"
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={login}>LOG IN</button>
        <p className="login-text">or</p>
        <button className="login-button" onClick={googleLogin}>LOG IN WITH GOOGLE</button>
      </div>
    </>
  )
}

export default Login;