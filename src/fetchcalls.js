function fetchAuthToken(clientID, clientSecret, code) {
  const redirect_uri = "http://localhost:3000/dashboard";
  const auth = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(`${clientID}:${clientSecret}`),
    },
    body: new URLSearchParams({
      code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    }),
  };

  return fetch("https://accounts.spotify.com/api/token", auth)
    .then((res) => {
      if (!res.ok) {
        console.error("Failed to fetch Token");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.error(err));
}

function getProfile(token) {
  const auth = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch("https://api.spotify.com/v1/me", auth)
    .then((res) => {
      if (!res.ok) {
        console.error("Failed to fetch User");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.error(err));
}

function getPlaylists(token) {
  const auth = { 
    method: "GET",
    headers: { Authorization: `Bearer ${token}` } 
  };
  return fetch("https://api.spotify.com/v1/me/playlists", auth)
  .then((res) => {
    if (!res.ok) {
      console.error("Failed to fetch Playlist");
    } else {
      return res.json();
    }
  })
  .then((data) => {
    return data;
  })
  .catch((err) => console.error(err));
}
function getTop5Songs(token){
  const auth = { 
    method: "GET",
    headers: { Authorization: `Bearer ${token}` } 
  };

  return fetch("https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5", auth)
  .then((res) => {
    if (!res.ok) {
      console.error("Failed to fetch Playlist");
    } else {
      return res.json();
    }
  })
  .then((data) => {
    return data;
  })
  .catch((err) => console.err("err",err))
}

function getGenres(token){
  const auth = { 
    method: "GET",
    headers: { Authorization: `Bearer ${token}` } 
  };

  return fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds", auth)
  .then((res) => {
    if (!res.ok) {
      console.error("Failed to fetch genres");
    } else {
      return res.json();
    }
  })
  .then((data) => {
    return data;
  })
  .catch((err) => console.err("err",err))
}

export { fetchAuthToken, getProfile, getPlaylists, getTop5Songs, getGenres, };
