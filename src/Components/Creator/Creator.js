import "./Creator.css";
import { useEffect, useState } from "react";
import { getGenres, makePlaylist,getSongs,addSongsToPlaylist } from "../../fetchcalls";

function Creator({ authToken, profile }) {
  const [isFav, setIsFav] = useState(false);
  const [genres, setGenres] = useState([]);
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    getGenres(authToken)
      .then((fetchGenre) => {
        if (fetchGenre) {
          setGenres(fetchGenre.genres);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  function displayFavs() {
    if (favs) {
      return favs.map((fav) => {
        return (
          <>
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
          </>
        );
      });
    }
  }

  function displayGenres() {
    if (genres) {
      return genres.map((genre) => {
        return (
          <>
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
                setFavs([...favs, genre]);
              }}
            >
              +
            </button>
          </>
        );
      });
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
  function seprateSongs(songs){
    return(songs.map(song => {
        return song.uri
    }))
  }

  function createPlaylist(e) {
    e.preventDefault();
    const formData = getFormData(e);
    console.log(formData.name);
    makePlaylist(profile.id, formData.name, formData.desc, authToken)
      .then((playlist) => {
        if (playlist) {
          getSongs(authToken,formData.genre)
            .then((songs) => {
              if (songs.tracks) {                
                addSongsToPlaylist(playlist.id, authToken, seprateSongs(songs.tracks))
                  .then((songsInPlaylist) => {
                    if (songsInPlaylist) {
                      console.log("yay!");
                    }
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  });
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    addSongsToPlaylist();
  }

  return (
    <div className="create-form-holder">
      <form
        onSubmit={(e) => {
          createPlaylist(e);
        }}
      >
        <div className="form-inputs">
          <label htmlFor="name">Playlist Name </label>
          <input name="name" type="text" required />
          <label htmlFor="desc">Playlist Description</label>
          <textarea name="desc" required />
        </div>
        <div className="search-holder">
          <input type="search" placeholder="Search" />
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
          <div className="genre-holder">
            {genres && <>{isFav ? displayFavs() : displayGenres()}</>}
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
