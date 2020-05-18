import { useReducer } from "react";
import { convertTracks, convertDescription } from "../data/trackConverter.js";
import noImage from "../images/no-image.png";

const cleanState = {
  accessToken: "",
  isPremium: false,
  username: "",
  userId: '',
  email: "",
  profileImage: "",
  myPlaylists: [],
  savedPlaylists: [],
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
  generatedTracks: [],
  selectedCategory: {},
  selectedPlaylist: {},
  page: null,
  topFiveIds: [],
  audio: new Audio(),
  isPlaying: false,
  isPaused: false,
  generatedPlaylist: [],
  songToGenerate: {}
};

const userData = (state, action) => {
  switch (action.type) {
    case "setProfileData": {
      
      return {
        ...state,
        username: action.payload.display_name,
        email: action.payload.email,
        userId: action.payload.id,
        profileImage: action.payload.images ? action.payload.images[0].url : "",
        isPremium: action.payload.product === "premium" ? true : false,
      };
    }
    case "setAccessToken": {
      return {
        ...state,
        accessToken: action.payload,
      };
    }

    case "setPage": {
      return {
        ...state,
        page: action.payload,
      };
    }

    case "setPlaylists": {
      const myPlaylists = [];
      const savedPlaylists = [];
      const refresh = action.payload.refresh
      action.payload.items.forEach((playlist) => {
        if (playlist.owner.display_name === state.username) {
          myPlaylists.push({
            id: playlist.id,
            title: playlist.name,
            description: convertDescription(playlist.description),
            image:
              playlist.images.length > 0 ? playlist.images[0].url : noImage,
            uri: playlist.uri,
            tracks: playlist.tracks.href,
            tracksAmount: playlist.tracks.total,
            owner: playlist.owner.display_name,
          });
        } else {
          savedPlaylists.push({
            id: playlist.id,
            title: playlist.name,
            description: convertDescription(playlist.description),
            image:
              playlist.images.length > 0 ? playlist.images[0].url : noImage,
            uri: playlist.uri,
            tracks: playlist.tracks.href,
            tracksAmount: playlist.tracks.total,
            owner: playlist.owner.display_name,
          });
        }
      });

      return {
        ...state,
        myPlaylists: refresh ? myPlaylists :  [...state.myPlaylists, ...myPlaylists],
        savedPlaylists:  refresh ? savedPlaylists : [...state.savedPlaylists, ...savedPlaylists],
        morePlaylistsUrl: action.payload.next,
      };
    }
    case "setNewReleases": {
      const albums = action.payload.albums.items.map((album) => {
        return {
          id: album.id,
          title: album.name,
          artist: album.artists[0].name.split("-")[0],
          image: album.images[1].url,
          uri: album.uri,
          tracks: album.href,
          tracksAmount: album.total_tracks,
        };
      });
      return {
        ...state,
        newReleaseAlbums: [...state.newReleaseAlbums, ...albums],
        moreNewAlbums: action.payload.albums.next,
      };
    }
    case "setFeaturedPlaylists": {
      const playlists = action.payload.playlists.items.map((playlist) => {
        return {
          id: playlist.id,
          title: playlist.name,
          description: convertDescription(playlist.description),
          image: playlist.images[0].url,
          uri: playlist.uri,
          tracks: playlist.tracks.href,
          tracksAmount: playlist.tracks.total,
          owner: playlist.owner.display_name,
        };
      });
      return {
        ...state,
        playlistMessage: action.payload.message,
        featuredPlaylists: [...state.featuredPlaylists, ...playlists],
      };
    }
    case "topTracks": {
      const tracks = convertTracks(action.payload.items);
      const rand = (n) => Math.floor(Math.random() * n);

      let len = tracks.length;
      const topFive = Array(5)
        .fill(len)
        .map((num) => {
          return tracks[rand(num)].id
        });
      
      return {
        ...state,
        myTopTracks: [...state.myTopTracks, ...tracks],
        topFiveIds: topFive,
        moreTopTracks: action.payload.next,
      };
    }
    case "favorites": {
      const refresh = action.payload.refresh
      const tracks = convertTracks(action.payload.items);

      return {
        ...state,
        favorites: refresh ? tracks : [...state.favorites, ...tracks],
        moreFavorites: action.payload.next,
      };
    }

    case "setGeneratedTracks": {
      return {
        ...state,
        generatedTracks: action.payload,
      };
    }

    case "setSongToGenerate" : {
      const song = action.payload
      return {
        ...state,
        songToGenerate: song
      }
    }
    case "setGeneratedPlaylist": {
       const uris = action.payload ? action.payload.map(track => track.uri) : []
    
      return {
        ...state,
        generatedPlaylist: uris 
      }
    }
    case "setCatagories": {
      const categoryList = action.payload;
      return {
        ...state,
        categories: categoryList,
      };
    }

    case "setSelectedPlaylist": {
      return {
        ...state,
        selectedPlaylist: action.payload,
      };
    }
    case "setSelectedCategory": {
      return {
        ...state,
        selectedCategory: action.payload,
      };
    }
    case "loadCurrentTrack": {
      return {
        ...state,
        currentTrack: action.payload,
      };
    }
    case "audioTracker": {
      return {
        ...state,
        isPlaying: action.payload.isPlaying,
        isPaused: action.payload.isPaused,
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
