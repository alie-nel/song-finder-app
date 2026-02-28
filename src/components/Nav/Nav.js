import './Nav.css';
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

const Nav = ({ isAuth, setIsAuth }) => {
  let redirect = useNavigate();

  const logOut = async () => {
    try {
      await signOut(auth).then(() => {
        localStorage.clear();
        setIsAuth(false);
        redirect("/login");
      });
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <nav>
      <Link to="/">
        <button className="nav-button">
          Home
        </button>
      </Link>
      
      {!isAuth ? 
        <Link to="/login">
          <button className="nav-button">
            Login
          </button> 
        </Link> 
        : 
        <>
          <Link to="/profile">
            <button className="nav-button">
              Profile
            </button> 
          </Link>
          <button className="nav-button" onClick={logOut}>
            Logout
          </button>
        </>
      }
    </nav>
  )
}

export default Nav;