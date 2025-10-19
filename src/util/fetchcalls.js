function fetchAuthToken(clientID, clientSecret, code, setError) {
  const redirect_uri = "https://playlist-creator.vercel.app/dashboard";
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
        setError("Failed to fetch Token");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => setError(err));
}

function getProfile(token, setError) {
  const auth = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch("https://api.spotify.com/v1/me", auth)
    .then((res) => {
      if (!res.ok) {
        setError("Failed to fetch User");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => setError(err));
}

function getPlaylists(token, setError) {
  const auth = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  return fetch("https://api.spotify.com/v1/me/playlists", auth)
    .then((res) => {
      if (!res.ok) {
        setError("Failed to fetch Playlist");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => setError(err));
}
function getTop3Songs(token, setError) {
  const auth = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };

  return fetch(
    "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=3",
    auth
  )
    .then((res) => {
      if (!res.ok) {
        setError("Failed to fetch Playlist");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => setError(err));
}

function getGenres(token, setError) {
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
        setError("Failed to fetch genres");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => setError(err));
}

function makePlaylist(user_id, name, desc, token, isPublic, setError) {
  const auth = {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      name: name,
      description: desc,
      public: isPublic,
    }),
  };
  return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, auth)
    .then((res) => {
      if (!res.ok) {
        setError("Failed to make Playlist");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => setError(err));
}
function getSongs(token, genre, numSongs, setError) {
  const auth = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  return fetch(
    `https://api.spotify.com/v1/recommendations?limit=${numSongs}&seed_genres=${genre}`,
    auth
  )
    .then((res) => {
      if (!res.ok) {
        setError("Failed to get Genre Songs");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => setError(err));
}
function addSongsToPlaylist(playlist_id, token, songs, setError) {
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
        setError("Failed to add songs to playlist");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => setError(err));
}
function getPlaylistDetails(token, createdPlaylistId, setError) {
  const auth = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  return fetch(
    `https://api.spotify.com/v1/playlists/${createdPlaylistId}`,
    auth
  )
    .then((res) => {
      if (!res.ok) {
        setError("Failed to get new playlist details");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => setError(err));
}

function getTop3artists(token, setError) {
  const auth = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  return fetch(
    "https://api.spotify.com/v1/me/top/artists?time_range=long_term",
    auth
  )
    .then((res) => {
      if (!res.ok) {
        setError("Failed to fetch Top Artists");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => setError(err));
}

function getRecentSongs(token, setError) {
  const auth = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  return fetch(
    "https://api.spotify.com/v1/me/player/recently-played?limit=30",
    auth
  )
    .then((res) => {
      if (!res.ok) {
        setError("Failed to fetch Recent Songs");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => setError(err));
}

function getNewReleases(token,setError){
   const auth = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  return fetch(
    "https://api.spotify.com/v1/browse/new-releases?limit=5",
    auth
  )
    .then((res) => {
      if (!res.ok) {
        setError("Failed to fetch New Songs");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => setError(err));
}
export {
  fetchAuthToken,
  getProfile,
  getPlaylists,
  getTop3Songs,
  getGenres,
  makePlaylist,
  getSongs,
  addSongsToPlaylist,
  getPlaylistDetails,
  getTop3artists,
  getRecentSongs,
  getNewReleases
};
