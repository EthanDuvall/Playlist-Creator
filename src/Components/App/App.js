import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import React from "react";
import Login from "../Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import Creator from "../Creator/Creator";
import Error from "../Error/Error";
import "./App.scss";
import spotifyLogo from "../../util/Full_Logo_Black_RGB.svg";

function App() {
  const clientID = process.env.REACT_APP_API_ID;
  const clientSecret = process.env.REACT_APP_API_SECRET;
  const [authToken, setAuthToken] = useState(sessionStorage.getItem("token"));
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      navigate("/error");
    }
  }, [error]);

  return (
    <>
      <header>
        <h1>Playlist Builder</h1>

        {profile && (
          <div>
            <button>Dashboard</button>
            <p>|</p>
            <button>Creator</button>
          </div>
        )}
        <img className="spotifyLogo" src={spotifyLogo} alt="spotify logo" />
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <div className="welcome-container">
                <div className="welcome-message">
                  <h2>Welcome</h2>
                  <p>
                    This app allows you to create a playlist based on a genre of
                    your liking. More features coming soon!
                  </p>
                </div>
                <div className="login-container">
                  <h2>Login to get started!</h2>
                  <Login clientId={clientID} />
                </div>
              </div>
            }
          />
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
                <button className="error-btn" onClick={() => navigate("/")}>
                  Go home?
                </button>
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
