import { useReducer } from "react";
import queryString from "query-string";
const parsed = queryString.parse(window.location.search);
const userData = (state, action) => {
  

  switch (action.type) {
    case "setProfileData": {
      return {
        ...state,
        username: action.payload.display_name,
        email: action.payload.email,
        profileImage: action.payload.images ? action.payload.images[0].url : ""
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
    case 'homeData': {
      return {
        ...state,
        myTopTracks: action.payload
      }
    }
    case 'test': {
      return {
        ...state,
        testPreview: action.payload
      }
    }
    default:
      break;
  }
  return state;
};

const userState = {
  signedIn: parsed.access_token ? true : false,
  isloading: true,
  username: "",
  email: "",
  profileImage: "",
  playlists: [],
  morePlaylistsUrl: "",
  albums: [],
  moreAlbums: "",
  myTopTracks: [],
  testPreview: ''
};

export const Reducer = () => useReducer(userData, userState);
