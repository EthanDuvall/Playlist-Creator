function fetchAuthToken(clientID, clientSecret, code) {
  const redirect_uri = "https://playlist-creator-git-main-ethans-projects-ff56cc66.vercel.app/dashboard";
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
    headers: { Authorization: `Bearer ${token}` },
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
function getTop5Songs(token) {
  const auth = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };

  return fetch(
    "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5",
    auth
  )
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
    .catch((err) => console.err("err", err));
}

function getGenres(token) {
  const auth = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };

  return fetch(
    "https://api.spotify.com/v1/recommendations/available-genre-seeds",
    auth
  )
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
    .catch((err) => console.err("err", err));
}

function makePlaylist(user_id, name, desc, token) {
  const auth = {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      name: name,
      description: desc,
      public: true,
    }),
  };
  return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, auth)
    .then((res) => {
      if (!res.ok) {
        console.error("Failed to make Playlist");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.err("err", err));
}
function getSongs(token, genre) {
  const auth = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  return fetch(
    `https://api.spotify.com/v1/recommendations?limit=30&seed_genres=${genre}`,
    auth
  )
    .then((res) => {
      if (!res.ok) {
        console.error("Failed to get Genre Songs");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.err("err", err));
}
function addSongsToPlaylist(playlist_id, token, songs) {
  const auth = {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      uris: songs,
      position: 0,
    }),
  };
  return fetch(
    `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
    auth
  )
    .then((res) => {
      if (!res.ok) {
        console.error("Failed to add songs to playlist");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.err("err", err));
}

export {
  fetchAuthToken,
  getProfile,
  getPlaylists,
  getTop5Songs,
  getGenres,
  makePlaylist,
  getSongs,
  addSongsToPlaylist,
};
