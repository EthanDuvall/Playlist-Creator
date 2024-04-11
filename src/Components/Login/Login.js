import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const client_id = 'CLIENT_ID';
const redirect_uri = 'http://localhost:8888/callback';

function Login() {
  const [state, setState] = useState(generateRandomString(16));
  const scope = 'user-read-private user-read-email';
  const history = useHistory();

  const handleLogin = () => {
    const url = `https://accounts.spotify.com/authorize?${new URLSearchParams({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }).toString()}`;
    window.location.href = url;
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
}

export default Login;
