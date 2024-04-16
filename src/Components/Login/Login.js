import React from "react";
import "./Login.css"

function Login({ clientId }) {
  const redirect_uri = 'https://playlist-creator-git-main-ethans-projects-ff56cc66.vercel.app/dashboard'; 
  const scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public user-top-read';

  const handleLogin = () => {
    const authorizationUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirect_uri}`;
    
    window.location.href = authorizationUrl;
  };

  return (
      <button className = "loginBtn" onClick={handleLogin}>Login with Spotify</button>
  );
}

export default Login;
