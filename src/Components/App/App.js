import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import React from "react";
import Login from "../Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import Creator from "../Creator/Creator"
import "./App.css";
import spotifyLogo from "../../Spotify_Logo_RGB_Green.png";

function App() {
  const clientID = process.env.REACT_APP_API_ID;
  const clientSecret = process.env.REACT_APP_API_SECRET;
  const [authToken, setAuthToken] = useState(null);
  const [code, setCode] = useState(null)
  return (
    <>
      <header>
        <h1>Playlist Builder</h1>
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
              />
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
