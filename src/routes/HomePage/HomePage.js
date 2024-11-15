import './HomePage.css';
import Songs from '../../components/Song/Song';

const HomePage = () => {
  return (
  <>
    <div className="home-page">
      <h1 className="home-title">for all your music loving needs</h1>
      <div>
      <Songs />
      </div>
    </div>
  </>
)}

export default HomePage;