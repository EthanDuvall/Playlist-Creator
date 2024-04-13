import "./Dashboard.css";
import { getProfile, fetchToken } from "../../fetchcalls";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Dashboard({ clientID, clientSecret }) {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState({});
  const location = useLocation();

  function displayProfile() {
    setProfile(getProfile(token));
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");

    if (code) {
      fetchToken(clientID, clientSecret, code)
        .then((fetchToken) => {
          if (fetchToken) {
            setToken(fetchToken.access_token);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [clientID]);

  useEffect(() => {
    getProfile(token)
      .then((fetchProfile) => {
        if (fetchProfile) {
          setProfile(fetchProfile);
        }
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, [token]);

  return (
    <div className="dashboard">
      <div>
        <img className = "profile-img"src = {profile.images[1].url} alt = "profile picture"/>
        <h2>{profile.display_name}</h2>
        <button className="make-playlist-btn">Make Playlist</button>
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
