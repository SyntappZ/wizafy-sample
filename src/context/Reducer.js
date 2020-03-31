import { useReducer } from "react";
import { convertTracks, convertDescription } from "../data/trackConverter.js";



const cleanState = {
  accessToken: "",
  isPremium: false,
  username: "",
  email: "",
  profileImage: "",
  playlists: [],
  morePlaylistsUrl: "",
  newReleaseAlbums: [],
  moreNewAlbums: "",
  myTopTracks: [],
  moreTopTracks: "",
  currentTrack: "",
  favorites: [],
  favoriteIds: [],
  moreFavorites: "",
  playlistMessage: "",
  featuredPlaylists: [],
  categories: [],
  selectedCategory: {},
  selectedPlaylist: {},
  page: null
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
    case "setAccessToken": {
      return {
        ...state,
        accessToken: action.payload
      };
    }

    case "setPage": {
      return {
        ...state,
        page: action.payload
      };
    }

    case "setPlaylists": {
      const playlists = action.payload.items.map(playlist => {
        
        return {
          id: playlist.id,
          title: playlist.name,
          description: convertDescription(playlist.description),
          image: playlist.images[0].url,
          uri: playlist.uri,
          tracks: playlist.tracks.href,
          tracksAmount: playlist.tracks.total,
          owner: playlist.owner.display_name
        };
      });
      return {
        ...state,
        playlists: [...state.playlists, ...playlists],
        morePlaylistsUrl: action.payload.next
      };
    }
    case "setNewReleases": {
      const albums = action.payload.albums.items.map(album => {
       
        return {
          id: album.id,
          title: album.name,
          artist: album.artists[0].name.split("-")[0],
          image: album.images[1].url,
          uri: album.uri,
          tracks: album.href,
          tracksAmount: album.total_tracks
        };
      });
      return {
        ...state,
        newReleaseAlbums: [...state.newReleaseAlbums, ...albums],
        moreNewAlbums: action.payload.albums.next
      };
    }
    case "setFeaturedPlaylists": {
      const playlists = action.payload.playlists.items.map(playlist => {
        return {
          id: playlist.id,
          title: playlist.name,
          description: convertDescription(playlist.description),
          image: playlist.images[0].url,
          uri: playlist.uri,
          tracks: playlist.tracks.href,
          tracksAmount: playlist.tracks.total,
          owner: playlist.owner.display_name
        };
      });
      return {
        ...state,
        playlistMessage: action.payload.message,
        featuredPlaylists: [...state.featuredPlaylists, ...playlists]
      };
    }
    case "topTracks": {
      const tracks = convertTracks(action.payload);

      return {
        ...state,
        myTopTracks: [...state.myTopTracks, ...tracks],
        moreTopTracks: action.payload.next
      };
    }
    case "favorites": {
      const tracks = convertTracks(action.payload);
      const ids = action.payload.items.map(track => track.track.id)
      
      return {
        ...state,
        favorites: [...state.favorites, ...tracks],
        favoriteIds: ids,
        moreFavorites: action.payload.next
      };
    }
    case "setCatagories": {
      const categoryList = action.payload
      return {
        ...state,
        categories: categoryList
      };
    }

    case "setSelectedPlaylist": {
      return {
        ...state,
        selectedPlaylist: action.payload
      };
    }
    case "setSelectedCategory": {
      return {
        ...state,
        selectedCategory: action.payload
      };
    }
    case "loadCurrentTrack": {
      return {
        ...state,
        currentTrack: action.payload
      };
    }
    case "logout": {
      return cleanState;
    }

    default:
      break;
  }
  return state;
};

const userState = cleanState;

export const Reducer = () => useReducer(userData, userState);
