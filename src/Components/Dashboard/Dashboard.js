import "./Dashboard.css";
import {
  getProfile,
  fetchAuthToken,
  getPlaylists,
  getTop5Songs,
} from "../../fetchcalls";
import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

function Dashboard({
  clientID,
  clientSecret,
  authToken,
  setAuthToken,
  profile,
  setProfile,
  setError,
}) {
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState({});
  const location = useLocation();
  const Navigate = useNavigate();

  function displayPlaylist() {
    if (playlists.items) {
      return playlists.items.map((playlist) => {
        console.log(playlist);
        return (
          <Link to={playlist.external_urls.spotify}>
            <div className="playlist">
              <h4 className="playlist-name">{playlist.name}</h4>
              {playlist.images && (
                <img
                  className="playlist-cover"
                  src={playlist.images[0].url}
                  id={playlist.id}
                  alt={`cover of playlist: ${playlist.name}`}
                />
              )}
            </div>
          </Link>
        );
      });
    }
  }
  function displayTopSongs() {
    if (songs.items) {
      return songs.items.map((song) => {
        console.log(song.album);
        return (
          <Link to={song.external_urls.spotify}>
            <div className="top-5-song" id={song.id}>
              <img
                className="song-cover"
                src={song.album.images[1].url}
                alt={song.album.name}
              />
              <div className="name-artist-holder">
                <h4>{song.name}</h4>
                <p>{song.album.artists[0].name}</p>
              </div>
            </div>
          </Link>
        );
      });
    }
  }
  function routeToCreate() {
    Navigate("/create");
  }

  useEffect(() => {
    if (!authToken) {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get("code");
      if (code) {
        fetchAuthToken(clientID, clientSecret, code, setError)
          .then((fetchToken) => {
            if (fetchToken) {
              setAuthToken(fetchToken.access_token);
              sessionStorage.setItem("token", fetchToken.access_token);
            }
          })
          .catch((error) => {
            setError(error);
          });
      }
    }
  }, []);

  useEffect(() => {
    if (authToken) {
      getProfile(authToken, setError)
        .then((fetchProfile) => {
          if (fetchProfile) {
            setProfile(fetchProfile);
          }
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [authToken]);

  useEffect(() => {
    if (authToken) {
      getPlaylists(authToken)
        .then((fetchPlaylists) => {
          if (fetchPlaylists) {
            setPlaylists(fetchPlaylists);
          }
        })
        .catch((error) => {
          setError(error);
        });
    } 
  }, [authToken]);

  useEffect(() => {
    if (authToken) {
      getTop5Songs(authToken)
        .then((fetchSongs) => {
          if (fetchSongs) {
            setSongs(fetchSongs);
          }
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [authToken]);

  return (
    <div className="dashboard">
      <div className="profile">
        {profile.images && (
          <img
            className="profile-img"
            src={profile.images[1].url}
            alt="profile picture"
          />
        )}
        <div className="display-name-container">
          <h2 className="profile-name">{profile.display_name}</h2>
          <button className="make-playlist-btn" onClick={routeToCreate}>
            Make Playlist
          </button>
        </div>
      </div>
      <div className="playlists">
        <h3>Playlists</h3>
        {playlists && (
          <div className="playlist-holder">{displayPlaylist()}</div>
        )}
      </div>
      <div className="top-songs">
        <h3>Top 5 Songs</h3>
        {songs && <div className="top-songs-holder">{displayTopSongs()}</div>}
      </div>
    </div>
  );
}

export default Dashboard;
