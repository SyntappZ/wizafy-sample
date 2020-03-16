import { useReducer } from "react";
import queryString from "query-string";
const parsed = queryString.parse(window.location.search);

const durationConverter = millis => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

const userData = (state, action) => {
  switch (action.type) {
    case "setProfileData": {
      return {
        ...state,
        username: action.payload.display_name,
        email: action.payload.email,
        profileImage: action.payload.images ? action.payload.images[0].url : "",
        isPremium: action.payload.product === "premium" ? true : false
      };
    }

    case "setPlaylists": {
      return {
        ...state,
        playlists: action.payload.items,
        morePlaylistsUrl: action.payload.next
      };
    }
    case "setNewReleases": {
      return {
        ...state,
        albums: action.payload.items,
        moreAlbums: action.payload.next
      };
    }
    case "topTracks": {
      const tracks = action.payload.items.map(track => {
        return {
          id: track.id,
          title: track.name,
          artist: track.artists[0].name,
          image: track.album.images[1].url,
          duration: durationConverter(track.duration_ms),
          preview: track.preview_url,
          uri: track.uri,
          href: track.href
        };
      });
      return {
        ...state,
        myTopTracks: [...state.myTopTracks, ...tracks],
        moreTopTracks: action.payload.next
      };
    }
    case "favorites": {
      const tracks = action.payload.items.map(track => {
        const year = track.added_at.split("-")[0];

        track = track.track;

        return {
          id: track.id,
          title: track.name,
          artist: track.artists[0].name,
          image: track.album.images[1].url,
          duration: durationConverter(track.duration_ms),
          preview: track.preview_url,
          uri: track.uri,
          href: track.href,
          year: year
        };
      });
      return {
        ...state,
        favorites: [...state.favorites, ...tracks],
        moreFavorites: action.payload.next
      };
    }
    case "loadTrack": {
      return {
        ...state,
        currentTrack: action.payload
      };
    }
    default:
      break;
  }
  return state;
};

const userState = {
  signedIn: parsed.access_token ? true : false,
  isloading: true,
  isPremium: false,
  username: "",
  email: "",
  profileImage: "",
  playlists: [],
  morePlaylistsUrl: "",
  albums: [],
  moreAlbums: "",
  myTopTracks: [],
  moreTopTracks: "",
  currentTrack: "",
  favorites: [],
  moreFavorites: ""
};

export const Reducer = () => useReducer(userData, userState);
