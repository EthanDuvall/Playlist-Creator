import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import React from "react";
import Login from "../Login/Login";
import "./App.css";
import { fetchToken } from "../../fetchcalls";
import spotifyLogo from "../../Spotify_Logo_RGB_Green.png";

function App() {
  const clientID = process.env.REACT_APP_API_ID;
  const clientSecret = process.env.REACT_APP_API_SECRET;
  const [token, setToken] = useState(null);

  useEffect(() => {
    fetchToken(clientID, clientSecret)
      .then((accessToken) => {
        setToken("Access Token:", accessToken);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      <header>
        <h1>Playlist Builder</h1>
        <img className="spotifyLogo" src={spotifyLogo} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Login clientId={clientID} />} />
          <Route path="/dashboard" element={<p>YOU DID IT</p>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
