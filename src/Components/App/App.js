import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const clientID = "f8791f93dad4435cafbc64320e66c76f"
  const clientSecret = "2f042acf3d6d4599ae16866c2531b98d"
  const [token, setToken] = useState(null);

  
  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`${clientID}:${clientSecret}`),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    };

    fetch('https://accounts.spotify.com/api/token', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.access_token) {
          setToken(data.access_token);
        }
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <p>Access Token: {token}</p>
    </div>
  );
}

export default App;
