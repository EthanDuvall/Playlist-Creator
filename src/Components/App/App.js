import { useState, useEffect } from "react";
import { Route, Routes, useNavigate,Link } from "react-router-dom";
import React from "react";
import Login from "../Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import Creator from "../Creator/Creator";
import Error from "../Error/Error";
import "./App.css";
import spotifyLogo from "../../Spotify_Logo_RGB_Green.png";

function App() {
  const clientID = process.env.REACT_APP_API_ID;
  const clientSecret = process.env.REACT_APP_API_SECRET;
  const [authToken, setAuthToken] = useState(sessionStorage.getItem("token"));
  const [profile, setProfile] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if(error){
    navigate("/error");
    }
  }, [error]);

  return (
    <>
      <header>
        <Link to="/dashboard">
          <h1>Playlist Builder</h1>
        </Link>
        <img className="spotifyLogo" src={spotifyLogo} alt="spotify logo" />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Login clientId={clientID} />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                clientID={clientID}
                clientSecret={clientSecret}
                authToken={authToken}
                setAuthToken={setAuthToken}
                profile={profile}
                setProfile={setProfile}
                setError={setError}
              />
            }
          />
          <Route
            path="/create"
            element={
              <Creator
                authToken={authToken}
                clientID={clientID}
                clientSecret={clientSecret}
                profile={profile}
                setError={setError}
              />
            }
          />
          <Route
            path="*"
            element={
              <>
                <p className="error-tag">This page doesn't Exist</p>
                <button className = "error-btn" onClick={() => navigate("/")}>Go home?</button>
              </>
            }
          />
          <Route path="Error" element={<Error error={error} />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
