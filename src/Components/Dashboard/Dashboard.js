import "./Dashboard.css";
import { getProfile, fetchToken } from "../../fetchcalls";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'
function Dashboard({ clientID, clientSecret }) {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState({})
  const location = useLocation();


  function displayProfile() {
    setProfile(getProfile(token));
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");

    if (code) {
        console.log("code",code)
      fetchToken(clientID, clientSecret, code)
        .then((accessToken) => {
          setToken(accessToken);

        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    
  }, []);
  useEffect (() => {
    displayProfile()
  },[token])

  return (
    <div className="dashboard">
      <div>
        <h2>{profile.displayName}</h2>
      </div>
      <div>
        <h3>Playlists</h3>
      </div>
      <div>
        <h3>Top Genres</h3>
      </div>
    </div>
  );
}

export default Dashboard;
