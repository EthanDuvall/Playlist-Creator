import "./Dashboard.scss";
import {
  getProfile,
  fetchAuthToken,
  getPlaylists,
  getTop5Songs,
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
  const [songs, setSongs] = useState({});
  const location = useLocation();
  const Navigate = useNavigate();

  function displayPlaylist() {
    if (playlists.items) {
      return playlists.items.map((playlist) => {
        return (
          <Link to={playlist.external_urls.spotify} target="_blank">
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
          <Link to={song.external_urls.spotify} target="_blank">
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
   /*
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
*/
  useEffect(() => {
    setProfile({
        display_name: "Ethan",
        id: "FAKEIDPLACEHOLDERTEST",
        images: [
          {
            url: "https://i.scdn.co/image/ab67757000003b82c24f12507fbbc39e50d6e6cd",
          },
          {
            url: "https://i.scdn.co/image/ab67757000003b82c24f12507fbbc39e50d6e6cd",
          },
        ],
      })
    setPlaylists({
        href: "https://api.spotify.com/v1/users/21qbacdcuaymk7w6hbovby3yi/playlists?offset=0&limit=2&locale=en-US%2Cen%3Bq%3D0.9",
        limit: 2,
        next: "https://api.spotify.com/v1/users/21qbacdcuaymk7w6hbovby3yi/playlists?offset=2&limit=2&locale=en-US%2Cen%3Bq%3D0.9",
        offset: 0,
        previous: null,
        total: 23,
        items: [
          {
            collaborative: false,
            description: "",
            external_urls: {
              spotify:
                "https://open.spotify.com/playlist/5RGNY99olYIvEPY7Ouhckb",
            },
            href: "https://api.spotify.com/v1/playlists/5RGNY99olYIvEPY7Ouhckb",
            id: "5RGNY99olYIvEPY7Ouhckb",
            images: [
              {
                url: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84daa06eac9bda6bb904b444a0",
                height: null,
                width: null,
              },
            ],
            name: "Radiant ",
            owner: {
              external_urls: {
                spotify:
                  "https://open.spotify.com/user/21qbacdcuaymk7w6hbovby3yi",
              },
              href: "https://api.spotify.com/v1/users/21qbacdcuaymk7w6hbovby3yi",
              id: "21qbacdcuaymk7w6hbovby3yi",
              type: "user",
              uri: "spotify:user:21qbacdcuaymk7w6hbovby3yi",
              display_name: "Ethan",
            },
            public: true,
            snapshot_id:
              "OSwxNmM2OTYwMWMxNGNlZjQ5MTMwMWFkYTVhMWE0ZDE5ZTAyMmM3YTcz",
            tracks: {
              href: "https://api.spotify.com/v1/playlists/5RGNY99olYIvEPY7Ouhckb/tracks",
              total: 7,
            },
            type: "playlist",
            uri: "spotify:playlist:5RGNY99olYIvEPY7Ouhckb",
            primary_color: null,
          },
          {
            collaborative: false,
            description: "",
            external_urls: {
              spotify:
                "https://open.spotify.com/playlist/3UP7QTdMdnttJr505K9n4u",
            },
            href: "https://api.spotify.com/v1/playlists/3UP7QTdMdnttJr505K9n4u",
            id: "3UP7QTdMdnttJr505K9n4u",
            images: [
              {
                url: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8415122037fa58b223a1dc7051",
                height: null,
                width: null,
              },
            ],
            name: "The time will pass anyway ",
            owner: {
              external_urls: {
                spotify:
                  "https://open.spotify.com/user/21qbacdcuaymk7w6hbovby3yi",
              },
              href: "https://api.spotify.com/v1/users/21qbacdcuaymk7w6hbovby3yi",
              id: "21qbacdcuaymk7w6hbovby3yi",
              type: "user",
              uri: "spotify:user:21qbacdcuaymk7w6hbovby3yi",
              display_name: "Ethan",
            },
            public: true,
            snapshot_id:
              "NTQsZGY4Mjk4OWQ1NTcyZmY4M2ZmZjYxZWQxY2FlYThlMTBhMzU0N2I0ZA==",
            tracks: {
              href: "https://api.spotify.com/v1/playlists/3UP7QTdMdnttJr505K9n4u/tracks",
              total: 2,
            },
            type: "playlist",
            uri: "spotify:playlist:3UP7QTdMdnttJr505K9n4u",
            primary_color: null,
          },
        ],
      })
    setSongs({
          href: "https://api.spotify.com/v1/me/top/tracks?offset=0&limit=2&locale=en-US%2Cen%3Bq%3D0.9",
          limit: 2,
          next: "https://api.spotify.com/v1/me/top/tracks?offset=2&limit=2&locale=en-US%2Cen%3Bq%3D0.9",
          offset: 0,
          previous: null,
          total: 1301,
          items: [
            {
              album: {
                album_type: "ALBUM",
                total_tracks: 12,
                external_urls: {
                  spotify:
                    "https://open.spotify.com/album/0e9GjrztzBw8oMC6n2CDeI",
                },
                href: "https://api.spotify.com/v1/albums/0e9GjrztzBw8oMC6n2CDeI",
                id: "0e9GjrztzBw8oMC6n2CDeI",
                images: [
                  {
                    url: "https://i.scdn.co/image/ab67616d0000b27343fc02bcfa7cd4e6bb66aa22",
                    height: 640,
                    width: 640,
                  },
                  {
                    url: "https://i.scdn.co/image/ab67616d00001e0243fc02bcfa7cd4e6bb66aa22",
                    height: 300,
                    width: 300,
                  },
                  {
                    url: "https://i.scdn.co/image/ab67616d0000485143fc02bcfa7cd4e6bb66aa22",
                    height: 64,
                    width: 64,
                  },
                ],
                name: "the record",
                release_date: "2023-03-31",
                release_date_precision: "day",
                type: "album",
                uri: "spotify:album:0e9GjrztzBw8oMC6n2CDeI",
                artists: [
                  {
                    external_urls: {
                      spotify:
                        "https://open.spotify.com/artist/1hLiboQ98IQWhpKeP9vRFw",
                    },
                    href: "https://api.spotify.com/v1/artists/1hLiboQ98IQWhpKeP9vRFw",
                    id: "1hLiboQ98IQWhpKeP9vRFw",
                    name: "boygenius",
                    type: "artist",
                    uri: "spotify:artist:1hLiboQ98IQWhpKeP9vRFw",
                  },
                ],
              },
              artists: [
                {
                  external_urls: {
                    spotify:
                      "https://open.spotify.com/artist/1hLiboQ98IQWhpKeP9vRFw",
                  },
                  href: "https://api.spotify.com/v1/artists/1hLiboQ98IQWhpKeP9vRFw",
                  id: "1hLiboQ98IQWhpKeP9vRFw",
                  name: "boygenius",
                  type: "artist",
                  uri: "spotify:artist:1hLiboQ98IQWhpKeP9vRFw",
                },
                {
                  external_urls: {
                    spotify:
                      "https://open.spotify.com/artist/12zbUHbPHL5DGuJtiUfsip",
                  },
                  href: "https://api.spotify.com/v1/artists/12zbUHbPHL5DGuJtiUfsip",
                  id: "12zbUHbPHL5DGuJtiUfsip",
                  name: "Julien Baker",
                  type: "artist",
                  uri: "spotify:artist:12zbUHbPHL5DGuJtiUfsip",
                },
                {
                  external_urls: {
                    spotify:
                      "https://open.spotify.com/artist/1r1uxoy19fzMxunt3ONAkG",
                  },
                  href: "https://api.spotify.com/v1/artists/1r1uxoy19fzMxunt3ONAkG",
                  id: "1r1uxoy19fzMxunt3ONAkG",
                  name: "Phoebe Bridgers",
                  type: "artist",
                  uri: "spotify:artist:1r1uxoy19fzMxunt3ONAkG",
                },
                {
                  external_urls: {
                    spotify:
                      "https://open.spotify.com/artist/07D1Bjaof0NFlU32KXiqUP",
                  },
                  href: "https://api.spotify.com/v1/artists/07D1Bjaof0NFlU32KXiqUP",
                  id: "07D1Bjaof0NFlU32KXiqUP",
                  name: "Lucy Dacus",
                  type: "artist",
                  uri: "spotify:artist:07D1Bjaof0NFlU32KXiqUP",
                },
              ],

              disc_number: 1,
              duration_ms: 234933,
              explicit: false,
              external_ids: {
                isrc: "USUG12209242",
              },
              external_urls: {
                spotify:
                  "https://open.spotify.com/track/09DR0sHnQUhHOiSNttc1mv",
              },
              href: "https://api.spotify.com/v1/tracks/09DR0sHnQUhHOiSNttc1mv",
              id: "09DR0sHnQUhHOiSNttc1mv",
              name: "Not Strong Enough",
              popularity: 78,
              preview_url:
                "https://p.scdn.co/mp3-preview/9d97929323164caf0e18bed34e4d8bb2cec0c4f4?cid=cfe923b2d660439caf2b557b21f31221",
              track_number: 6,
              type: "track",
              uri: "spotify:track:09DR0sHnQUhHOiSNttc1mv",
              is_local: false,
            },
            {
              album: {
                album_type: "EP",
                total_tracks: 5,

                external_urls: {
                  spotify:
                    "https://open.spotify.com/album/3fIxJzinc2MADbgfkLrmYY",
                },
                href: "https://api.spotify.com/v1/albums/3fIxJzinc2MADbgfkLrmYY",
                id: "3fIxJzinc2MADbgfkLrmYY",
                images: [
                  {
                    url: "https://i.scdn.co/image/ab67616d0000b273502345ddf02b0fe85ad15830",
                    height: 640,
                    width: 640,
                  },
                  {
                    url: "https://i.scdn.co/image/ab67616d00001e02502345ddf02b0fe85ad15830",
                    height: 300,
                    width: 300,
                  },
                  {
                    url: "https://i.scdn.co/image/ab67616d00004851502345ddf02b0fe85ad15830",
                    height: 64,
                    width: 64,
                  },
                ],
                name: "Good God!",
                release_date: "2022-09-23",
                release_date_precision: "day",
                type: "album",
                uri: "spotify:album:3fIxJzinc2MADbgfkLrmYY",
                artists: [
                  {
                    external_urls: {
                      spotify:
                        "https://open.spotify.com/artist/22y08IZx7u6SWpsfap1Cub",
                    },
                    href: "https://api.spotify.com/v1/artists/22y08IZx7u6SWpsfap1Cub",
                    id: "22y08IZx7u6SWpsfap1Cub",
                    name: "Rio Romeo",
                    type: "artist",
                    uri: "spotify:artist:22y08IZx7u6SWpsfap1Cub",
                  },
                ],
              },
              artists: [
                {
                  external_urls: {
                    spotify:
                      "https://open.spotify.com/artist/22y08IZx7u6SWpsfap1Cub",
                  },
                  href: "https://api.spotify.com/v1/artists/22y08IZx7u6SWpsfap1Cub",
                  id: "22y08IZx7u6SWpsfap1Cub",
                  name: "Rio Romeo",
                  type: "artist",
                  uri: "spotify:artist:22y08IZx7u6SWpsfap1Cub",
                },
              ],

              disc_number: 1,
              duration_ms: 211000,
              explicit: false,
              external_ids: {
                isrc: "UK6KW2200112",
              },
              external_urls: {
                spotify:
                  "https://open.spotify.com/track/0EF1EE8zusg3Y869e56JFd",
              },
              href: "https://api.spotify.com/v1/tracks/0EF1EE8zusg3Y869e56JFd",
              id: "0EF1EE8zusg3Y869e56JFd",
              name: "Nothing's New",
              popularity: 83,
              preview_url:
                "https://p.scdn.co/mp3-preview/90044cc5eb039fce8edf874ad737ff7693dc4634?cid=cfe923b2d660439caf2b557b21f31221",
              track_number: 4,
              type: "track",
              uri: "spotify:track:0EF1EE8zusg3Y869e56JFd",
              is_local: false,
            },
          ],
        })
  }, []);
  return (


    <div className="dashboard">
      <div className="left-side">
        <div className="playlists">
          <h3>Playlists</h3>
          {playlists && (
            <div className="playlist-holder">{displayPlaylist()}</div>
          )}
        </div>
      </div>
      <div className="top-songs">
        <h3>Top 5 Songs</h3>
        {songs && <div className="top-songs-holder">{displayTopSongs()}</div>}
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
