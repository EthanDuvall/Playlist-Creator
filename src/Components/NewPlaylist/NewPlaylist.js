import "./NewPlaylist.scss";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlaylistDetails } from "../../util/fetchcalls";
import loadingGif from "../../util/loading.gif";

function NewPlaylist({ authToken, setError, createdPlaylistId }) {
  const [playlistDetails, setPlaylistDetails] = useState({});
  if (!createdPlaylistId) {
    setError("No playlist created");
  }

  useEffect(() => {
    if (createdPlaylistId) {
      getPlaylistDetails(authToken, createdPlaylistId, setError)
        .then((details) => {
          if (details) {
            setPlaylistDetails(details);
          }
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [authToken, createdPlaylistId]);

  function displayTracks() {
    if (
      playlistDetails &&
      playlistDetails.tracks &&
      playlistDetails.tracks.items
    ) {
      return playlistDetails.tracks.items.map((item, index) => (
        <Link to={`/track/${item.track.id}`} key={index} className="track-item" target="_blank">
          <div key={index} className="track-item">
            <img
              src={item.track.album.images[0]?.url}
              alt={item.track.name}
              className="track-cover"
            />
            <div className="track-info">
              <h4 className="track-name">{item.track.name}</h4>
              <p className="track-artists">
                {item.track.artists.map((artist) => artist.name).join(", ")}
              </p>
            </div>
          </div>
        </Link>
      ));
    }
  }

  return (
    <div className="new-play-holder">
      {playlistDetails.tracks ? (
        <>
          <div className="playlist-details">
            <Link
              to={playlistDetails.external_urls.spotify}
              className="track-item"
              target="_blank"
            >
              <img
                src={playlistDetails.images[0]?.url}
                alt="Playlist Cover"
                className="playlist-cover"
              />
              <h2 className="playlist-name">{playlistDetails.name}</h2>

              <p className="playlist-track-count">
                {playlistDetails.tracks.total} songs
              </p>
              <p className="playlist-description">
                {playlistDetails.description || "No description available."}
              </p>
              <button className="view-on-spotify-button">
                View on Spotify
              </button>
            </Link>
          </div>
          <div className="songs-container">{displayTracks()}</div>
        </>
      ) : (
        <>
          <p>Loading playlist details...</p>
          <img className="loading-gif" alt="loading gif" src={loadingGif} />
        </>
      )}
    </div>
  );
}

export default NewPlaylist;
