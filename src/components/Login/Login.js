import "./Login.css";
import { useState } from "react";
import { auth, googleProvider } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  let redirect = useNavigate();

  const login = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then((result) => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        redirect("/");
      });
    } catch (err) {
      console.error(err)
    }
  }

  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then((result) => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        redirect("/");
      });
    } catch (err) {
      console.error(err)
    }
  }
  
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