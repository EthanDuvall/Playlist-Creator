import "./Dashboard.scss";
import {
  getProfile,
  fetchAuthToken,
  getPlaylists,
  getTop3Songs,
  getRecentSongs,
  getTop3artists,
  getNewReleases,
} from "../../util/fetchcalls";
import { PropTypes } from "prop-types";

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
  const [top3songs, setTop3songs] = useState({});
  const [top3artists, setTop3artists] = useState({});
  const [recentSongs, setRecentSongs] = useState({});
  const [newReleases, setNewReleases] = useState({});
  const [currentRelease, setCurrentRelease] = useState({});
  const location = useLocation();
  const Navigate = useNavigate();

  function displayPlaylist() {
    if (playlists.items) {
      return playlists.items.map((playlist) => {
        return (
          <Link to={playlist.external_urls.spotify} target="_blank">
            <div className="album">
              <h4 className="playlist-name">{playlist.name}</h4>
              {playlist.images && (
                <img
                  className="album-cover"
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
    if (top3songs.items) {
      return top3songs.items.map((song) => {
        return (
          <Link to={song.external_urls.spotify} target="_blank">
            <div className="top-3-item" id={song.id}>
              <img
                className="item-cover"
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
  function displayTopArtists() {
    if (top3artists.items) {
      return top3artists.items.map((artist) => {
        return (
          <Link to={artist.external_urls.spotify} target="_blank">
            <div className="top-3-item" id={artist.id}>
              <img
                className="item-cover"
                src={artist.images[1].url}
                alt={artist.name}
              />
              <h4>{artist.name}</h4>
            </div>
          </Link>
        );
      });
    }
  }
  function displayRecentSongs() {
    if (recentSongs.items) {
      return recentSongs.items.map((song) => {
        return (
          <Link to={song.track.external_urls.spotify} target="_blank">
            <div className="album recent" id={song.id}>
              <h4>{song.track.name}</h4>
              <p>{song.track.album.artists[0].name}</p>
              <img
                className="album-cover"
                src={song.track.album.images[1].url}
                alt={song.track.album.name}
              />
            </div>
          </Link>
        );
      });
    }
  }
  function displayNewReleases() {
    if (newReleases.albums) {
      return newReleases.albums.items.map((album, index) => {
        return (
          <div
            id={index}
            className={`new-album ${
              currentRelease.id === album.id ? "current" : ""
            }`}
            onClick={() => {
              changeCurrentRelease(index);
            }}
          >
            <h4>{album.name}</h4>
            <div>
              <p>
                {album.artists[0].name} : {album.release_date}
              </p>
            </div>
          </div>
        );
      });
    }
  }
  function changeCurrentRelease(i) {
    setCurrentRelease(newReleases.albums.items[i]);
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
      getTop3Songs(authToken)
        .then((fetchSongs) => {
          if (fetchSongs) {
            setTop3songs(fetchSongs);
          }
        })
        .catch((error) => {
          setError(error);
        });
      getPlaylists(authToken)
        .then((fetchPlaylists) => {
          if (fetchPlaylists) {
            setPlaylists(fetchPlaylists);
          }
        })
        .catch((error) => {
          setError(error);
        });
      getTop3artists(authToken, setError)
        .then((fetchArtists) => {
          if (fetchArtists) {
            setTop3artists(fetchArtists);
          }
        })
        .catch((error) => {
          setError(error);
        });
      if (false) {
        getRecentSongs(authToken, setError)
          .then((fetchRecent) => {
            if (fetchRecent) {
              setRecentSongs(fetchRecent);
            }
          })
          .catch((error) => {
            setError(error);
          });
      }
      getNewReleases(authToken)
        .then((fetchReleases) => {
          if (fetchReleases) {
            setNewReleases(fetchReleases);
          }
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [authToken]);
  useEffect(() => {
    if (newReleases.albums) {
      setCurrentRelease(newReleases.albums.items[0]);
    }
  }, [newReleases]);
  return (
    <div className="dashboard">
      <div className="left">
        <div className="multi-item">
          <h3>Playlists</h3>
          {playlists && (
            <div className="multi-item-holder">{displayPlaylist()}</div>
          )}
        </div>
        <div className="top-songs top3">
          <h3>Top 3 Songs</h3>
          {top3songs && <div className="top-holder">{displayTopSongs()}</div>}
        </div>
      </div>
      <div className="right">
        <div className="top-artists top3">
          <h3>Top 3 Artists</h3>
          {top3artists && (
            <div className="top-holder">{displayTopArtists()}</div>
          )}
        </div>
        <div className="multi-item">
          <h3>Recently Played Songs</h3>
          <h4>🚧Under Review🚧 </h4>
          {/*
          {recentSongs && (
            <div className="multi-item-holder">{displayRecentSongs()}</div>
          )}
          */}
        </div>
      </div>

      <div className="new-releases">
        <h3>Top 3 Newest Album Releases</h3>
        {newReleases.albums && (
          <div className="new-releases-holder">{displayNewReleases()}</div>
        )}
        {currentRelease.external_urls && (
          <Link to={currentRelease.external_urls.spotify}>
            <div id="album">
              <img
                id="cover"
                src={currentRelease.images[0].url}
                alt="Album cover"
              />
              <div id="vinyl"></div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

Dashboard.propTypes = {
  clientID: PropTypes.string.isRequired,
  clientSecret: PropTypes.string.isRequired,
  authToken: PropTypes.string.isRequired,
  setAuthToken: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  setProfile: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};
