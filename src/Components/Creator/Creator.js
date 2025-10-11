import "./Creator.scss";
import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import {
  getGenres,
  makePlaylist,
  getSongs,
  addSongsToPlaylist,
} from "../../util/fetchcalls";
import { useNavigate } from "react-router-dom";

function Creator({ authToken, profile, setError, setCreatedPlaylistId }) {
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredGenres, setFilterGenres] = useState([]);
  const Navigate = useNavigate();

  /*
  useEffect(() => {
    getGenres(authToken, setError)
      .then((fetchGenre) => {
        if (fetchGenre) {
          setGenres(fetchGenre.genres);
        }
      })
      .catch((error) => {
        setError(error);
      });
  }, [authToken]);
  */
  useEffect(() => {
    setGenres([
      "pop",
      "rock",
      "alt",
      "emo",
      "rap",
      "hi<t-hop",
      "classical",
      "jazz",
      "country",
      "blues",
      "metal",
      "punk",
      "indie",
      "disco",
      "funk",
      "soul",
      "reggae",
      "gospel",
      "ska",
      "techno",
      "house",
      "trance",
      "dubstep",
      "drum and bass",
    ]);
  }, []);

  function displayGenres() {
    if (genres) {
      return genres.map((genre) => {
        return (
          <label className="genre" tabIndex={0} htmlFor={genre}>
            <input
              onClick={() => {
                setGenre(genre);
              }}
              type="radio"
              id={genre}
              name="genre"
              value={genre}
              required
            />

            {genre.charAt(0).toUpperCase() + genre.slice(1)}
          </label>
        );
      });
    }
  }
  function displaySearch() {
    if (filteredGenres.length > 0) {
      return filteredGenres.map((genre) => {
        return (
          <div className="genre">
            <input
              type="radio"
              id={genre}
              name="genre"
              value={genre}
              required
            />
            <label htmlFor={genre}>{genre}</label>
          </div>
        );
      });
    } else {
      return <p>No genres Found</p>;
    }
  }
  function getFormData(e) {
    const form = e.target;
    const formData = new FormData(form);
    const playlistData = {};
    formData.forEach((value, key) => {
      playlistData[key] = value;
    });
    return playlistData;
  }
  function seperateSongs(songs) {
    return songs.map((song) => {
      return song.uri;
    });
  }

  function createPlaylist(e) {
    e.preventDefault();
    const formData = getFormData(e);
    if (!formData.isPublic) {
      formData.isPublic = false;
    }

    makePlaylist(
      profile.id,
      formData.name,
      formData.desc,
      authToken,
      formData.isPublic,
      setError
    )
      .then((playlist) => {
        if (playlist) {
          setCreatedPlaylistId(playlist.id);
          getSongs(
            authToken,
            formData.genre,
            Number(formData.numSongs),
            setError
          )
            .then((songs) => {
              if (songs.tracks) {
                addSongsToPlaylist(
                  playlist.id,
                  authToken,
                  seperateSongs(songs.tracks),
                  setError
                )
                  .then((songsInPlaylist) => {
                    if (songsInPlaylist) {
                      Navigate("/playlist");
                    }
                  })
                  .catch((error) => {
                    setError(error);
                  });
              }
            })
            .catch((error) => {
              setError(error);
            });
        }
      })
      .catch((error) => {
        setError(error);
      });
  }
  function getSearch(search) {
    setIsFiltered(true);
    setFilterGenres(
      genres.filter((genre) => {
        return genre.includes(search.toLowerCase());
      })
    );
  }
  return (
    <div className="create-form-holder">
      <form
        onSubmit={(e) => {
          createPlaylist(e);
        }}
      >
        <div className="search-holder">
          <h2>Select a genre</h2>
          <input
            className="search"
            type="search"
            placeholder="Search Genres"
            onChange={(e) => {
              getSearch(e.target.value);
            }}
          />
          <div className="genre-holder" tabIndex={0}>
            {isFiltered ? (
              displaySearch()
            ) : (
              <>{genres && <>{displayGenres()}</>}</>
            )}
          </div>
        </div>
        <div className="form-inputs">
          <label>
            Playlist Name:
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="name-input"
              required
            />
          </label>
          <label>
            Number of Songs:
            <input
              type="number"
              name="numSongs"
              placeholder="1-100"
              max={100}
            />
          </label>
          <div className="extra-options">
            <label className="switch">
              Public :
              <input name="isPublic" type="checkbox" value={true} />
              <span className="slider round"></span>
            </label>
            <div className="genre-display-holder">
              <span className="genre-display">
                {genre.charAt(0).toUpperCase() + genre.slice(1) || "Genre"}
              </span>
            </div>
          </div>
          <label className="desc-label">
            Playlist Description:
            <textarea
              name="desc"
              placeholder="Input Playlist Description"
              required
            />
          </label>
          <button className="create-button" type="submit">
            Create!
          </button>
        </div>
      </form>
    </div>
  );
}

export default Creator;

Creator.propTypes = {
  authToken: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
  setError: PropTypes.func.isRequired,
};
