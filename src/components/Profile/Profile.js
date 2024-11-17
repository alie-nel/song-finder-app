import "./Profile.css";
import { auth } from "../../config/firebase";

const Profile = () => {

  const userName = auth.currentUser.displayName || auth.currentUser.email.split('@')[0];
  
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