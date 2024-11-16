import Profile from "../../components/Profile/Profile";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProfilePage = ({ isAuth }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return (
  <>
    <Profile />
  </>
)}

export default ProfilePage;