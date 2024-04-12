import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import React from "react";
import Login from "../Login/Login";
import "./App.css";

function App() {
  const clientID = process.env.REACT_APP_API_ID;
  const clientSecret = process.env.REACT_APP_API_SECRET;
  const [token, setToken] = useState(null);
  console.log('Client ID:', process.env.REACT_APP_API_ID);
  console.log('Client Secret:', process.env.REACT_APP_API_SECRET);
  useEffect(() => {
    
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(`${clientID}:${clientSecret}`),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    };

    fetch("https://accounts.spotify.com/api/token", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.access_token) {
          setToken(data.access_token);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <p>Access Token: {token}</p>
      <p>Client Id: {clientID}</p>
      <Login clientId={clientID} />
      <Routes>
        <Route path="/dashboard" element={<p>YOU DID IT</p>} />
      </Routes>
    </div>
  );
}

export default App;