import React from "react";

function Login({ clientId }) {
  const redirect_uri = 'http://localhost:3000/dashboard'; 
  const scope = 'user-read-private user-read-email';

  const handleLogin = () => {
    const authorizationUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${scope}&redirect_uri=${redirect_uri}`;
    
    window.location.href = authorizationUrl;
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
}

export default Login;
