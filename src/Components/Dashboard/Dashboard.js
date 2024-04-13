import "./Dashboard.css";
import { getProfile, fetchToken } from "../../fetchcalls";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'
function Dashboard({ clientID, clientSecret }) {
  const [token, setToken] = useState(null);
  const location = useLocation();


  function displayProfile() {
    console.log(getProfile(token));
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");

    if (code) {
      fetchToken(clientID, clientSecret, code)
        .then((accessToken) => {
          setToken(accessToken);

        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    console.log(token)
    
  }, []);
  useEffect (() => {
    displayProfile()
  },[token])

  return (
    <div className="dashboard">
      <div>
        <h2>Ethan</h2>
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
