import "./Creator.css";
import { useEffect, useState } from "react";
import { getGenres } from "../../fetchcalls";

function Creator({ authToken, clientID, clientSecret }) {
  const [isFav, setIsFav] = useState(false);
  const [genres, setGenres] = useState([]);
  const [favs, setFavs] = useState([]);
  const [token, setToken] = useState(null);

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
    if(favs){
        return favs.map((fav) => {
            return (
                <>
                  <input type="radio" id={fav} name="genre" value={fav} required/>
                  <label for={fav}>{fav}</label>
                  <button className= "remove-fav-btn" onClick={(e) => { 
                      e.preventDefault();
                      setFavs(favs.filter((selectedFav) => selectedFav !== fav))}}>-</button>
                </>
              );
        })
    }
  }

  function displayGenres() {
    if (genres) {
      return genres.map((genre) => {
        return (
          <>
            <input type="radio" id={genre} name="genre" value={genre}  required/>
            <label for={genre}>{genre}</label>
            <button className= "add-to-fav-btn" onClick={(e) => { 
                e.preventDefault() 
                setFavs([...favs, genre])}}>+</button>
          </>
        );
      });
    }
  }

  return (
    <div className="create-form-holder">
      <form>
        <div className="form-inputs">
          <label htmlFor="playlist-name">Playlist Name </label>
          <input name="playlist-name" type="text" required/>
          <label htmlFor="is-public">Do you want this to be public?</label>
          <input type="checkbox" name="is-public" />
          <label htmlFor="playlist-desc">Playlist Description</label>
          <textarea name="playlist-desc" required/>
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
