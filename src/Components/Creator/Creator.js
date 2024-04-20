import "./Creator.css";
import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import {
  getGenres,
  makePlaylist,
  getSongs,
  addSongsToPlaylist,
} from "../../fetchcalls";
import { useNavigate } from "react-router-dom";

function Creator({ authToken, profile, setError }) {
  const [isFav, setIsFav] = useState(false);
  const [genres, setGenres] = useState([]);
  const [favs, setFavs] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredGenres, setFilterGenres] = useState([]);
  const Navigate = useNavigate();

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
  function checkColor(genre){
    if(favs.includes(genre)){
      return ("red")
    }
    return("white")
  }
  function displayFavs() {
    if (favs.length > 0) {
      return favs.map((fav) => {
        return (
          <div className="genre">
            <input type="radio" id={fav} name="genre" value={fav} required />
            <label htmlFor={fav}>{fav}</label>
            <button
              className="remove-fav-btn"
              onClick={(e) => {
                e.preventDefault();
                setFavs(favs.filter((selectedFav) => selectedFav !== fav));
              }}
            >
              -
            </button>
          </div>
        );
      });
    } else {
      return <p>You have no favs</p>;
    }
  }

  function displayGenres() {
    if (genres) {
      return genres.map((genre) => {
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
            <button
              className="add-to-fav-btn"
              onClick={(e) => {
                e.preventDefault();
                if (!favs.includes(genre)) {
                  setFavs([...favs, genre]);
                }
               

              }}
              style={{color:checkColor(genre)}}

            >
              ♥
            </button>
          </div>
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
            <button
              className="add-to-fav-btn"
              onClick={(e) => {
                e.preventDefault();
                if (!favs.includes(genre)) {
                  setFavs([...favs, genre]);
                }
                
              }}
              style={{color:checkColor(genre)}}
            >
              ♥
            </button>
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
  function seprateSongs(songs) {
    return songs.map((song) => {
      return song.uri;
    });
  }

  function createPlaylist(e) {
    e.preventDefault();
    const formData = getFormData(e);
    console.log(formData.name);
    makePlaylist(profile.id, formData.name, formData.desc, authToken, setError)
      .then((playlist) => {
        if (playlist) {
          getSongs(authToken, formData.genre, setError)
            .then((songs) => {
              if (songs.tracks) {
                addSongsToPlaylist(
                  playlist.id,
                  authToken,
                  seprateSongs(songs.tracks),
                  setError
                )
                  .then((songsInPlaylist) => {
                    if (songsInPlaylist) {
                      Navigate("/dashboard");
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
    console.log(filteredGenres);
  }
  return (
    <div className="create-form-holder">
      <form
        onSubmit={(e) => {
          createPlaylist(e);
        }}
      >
        <div className="form-inputs">
          <h2>Create A Playlist!</h2>
          <input
            name="name"
            type="text"
            placeholder="Input Playlist Name"
            className="name-input"
            required
          />
          <textarea
            name="desc"
            placeholder="Input Playlist Description"
            required
          />
        </div>
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
          <div className="fav-btns">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsFav(false);
              }}
            >
              All
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsFav(true);
              }}
            >
              Favs
            </button>
          </div>
          <div className="genre-holder" tabIndex={0}>
            {isFiltered ? (
              displaySearch()
            ) : (
              <>{genres && <>{isFav ? displayFavs() : displayGenres()}</>}</>
            )}
          </div>
          <button className="create-button" type="submit">
            Create!
          </button>
        </div>
      </form>
    </div>
  );
}

export default Creator;

Creator.propTypes ={
  authToken: PropTypes.string.isRequired,
  profile:PropTypes.object.isRequired,
  setError:PropTypes.func.isRequired
}