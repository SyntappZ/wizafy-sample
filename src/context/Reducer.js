import { useReducer } from "react";
import { convertTracks, convertDescription } from "../data/trackConverter.js";
import noImage from "../images/no-image.png";
import defaultImg from "../images/tempProfile.jpg";

const userState = {
  accessToken: "",
  isPremium: false,
  username: "",
  userId: "",
  email: "",
  profileImage: "",
  myPlaylists: [],
  savedAlbums: [],
  moreSavedAlbums: "",
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
  selectedPlaylist: null,
  page: null,
  topFiveIds: [],
  audio: new Audio(),
  isPlaying: false,
  isPaused: false,
  generatedPlaylist: [],
  songToGenerate: {},
  searchAlbums: null,
  searchPlaylists: null,
  searchTracks: null,
  searchTitle: "",
  savedSearch: false,
  modalOpen: false,
  isCreated: true,
  isFeatured: false,
  toastMessage: "",
  onGenerator: false,
  checkedPlaylist: []
};

const convertAlbums = (albums) => {
  const albumsList = albums
    ? albums.map((album) => {
        album = album.album || album;
        return {
          id: album.id,
          title: album.name,
          artist: album.artists[0].name.split("-")[0],
          image: album.images.length > 0 ? album.images[1].url : noImage,
          uri: album.uri,
          tracks: album.href,
          tracksAmount: album.total_tracks,
        };
      })
    : null;
  return albumsList;
};

const convertPlaylists = (playlists) => {
  const list = playlists
    ? playlists.map((playlist) => {
        return {
          id: playlist.id,
          title: playlist.name,
          description: convertDescription(playlist.description),
          image: playlist.images.length > 0 ? playlist.images[0].url : noImage,
          uri: playlist.uri,
          tracks: playlist.tracks.href,
          tracksAmount: playlist.tracks.total,
          owner: playlist.owner.display_name,
        };
      })
    : null;
  return list;
};

const userData = (state, action) => {
  switch (action.type) {
    case "setProfileData": {
      return {
        ...state,
        username: action.payload.display_name,
        email: action.payload.email,
        userId: action.payload.id,
        profileImage:
          action.payload.images.length > 0
            ? action.payload.images[0].url
            : defaultImg,
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

    case "setFeatured": {
      return {
        ...state,
        isFeatured: action.payload,
      };
    }

    case "setToastMessage": {
      return {
        ...state,
        toastMessage: action.payload,
      };
    }

    case "setOnGenerator": {
      return {
        ...state,
        onGenerator: action.payload
      }
    }

    case "setCheckedPlaylist": {
      const track = action.payload;
      let playlist;

      const arr = state.checkedPlaylist.map(track => track.id)
      const chosen = arr.includes(track.id);
      
      if(chosen) {
        playlist = state.checkedPlaylist.filter(item => item.id !== track.id)
      }else{
        playlist = [...state.checkedPlaylist, track]
      }
      return {
        ...state,
        checkedPlaylist: playlist
      }
    }

    case "setAllChecked": {
      const playlist = action.payload
      return {
        ...state,
        checkedPlaylist: playlist
      }
    }

    

    case "setPlaylists": {
      const myPlaylists = [];
      const savedPlaylists = [];
      const refresh = action.payload.refresh;
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
        myPlaylists: refresh
          ? myPlaylists
          : [...state.myPlaylists, ...myPlaylists],
        savedPlaylists: refresh
          ? savedPlaylists
          : [...state.savedPlaylists, ...savedPlaylists],
        morePlaylistsUrl: action.payload.next,
      };
    }
    case "setSavedAlbums": {
      const albums = convertAlbums(action.payload.items);
      const refresh = action.payload.refresh;
      return {
        ...state,
        savedAlbums: refresh ? albums : [...state.savedAlbums, ...albums],
        moreSavedAlbums: action.payload.next,
      };
    }
    case "setNewReleases": {
      const albums = convertAlbums(action.payload.albums.items);

      return {
        ...state,
        newReleaseAlbums: [...state.newReleaseAlbums, ...albums],
        moreNewAlbums: action.payload.albums.next,
      };
    }
    case "setFeaturedPlaylists": {
      const playlists = convertPlaylists(action.payload.playlists.items);
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
          return tracks[rand(num)].id;
        });

      return {
        ...state,
        myTopTracks: [...state.myTopTracks, ...tracks],
        topFiveIds: topFive,
        moreTopTracks: action.payload.next,
      };
    }
    case "favorites": {
      const refresh = action.payload.refresh;
      const tracks =
        action.payload.items.length > 0
          ? convertTracks(action.payload.items)
          : "none";

      return {
        ...state,
        favorites: refresh ? tracks : [...state.favorites, ...tracks],
        moreFavorites: action.payload.next,
      };
    }

    case "clearSearch": {
      return {
        ...state,
        searchPlaylists: null,
        searchAlbums: null,
        searchTracks: null,
        searchTitle: "",
        savedSearch: false,
      };
    }

    case "setSearchData": {
      const data = action.payload.data;

      const albums = convertAlbums(data.albums.items);
      const playlists = convertPlaylists(data.playlists.items);

      return {
        ...state,
        searchPlaylists: playlists,
        searchAlbums: albums,
        searchTitle: action.payload.val,
      };
    }

    case "ToggleModal": {
      return {
        ...state,
        modalOpen: !state.modalOpen,
      };
    }
    case "setSearchTracks": {
      const data = action.payload.data.tracks.items;
      const tracks = data ? convertTracks(data) : null;

      return {
        ...state,
        searchTracks: tracks,
        searchTitle: action.payload.val,
      };
    }

    case "setIsCreated": {
      return {
        ...state,
        isCreated: action.payload,
      };
    }

    case "setGeneratedTracks": {
      return {
        ...state,
        generatedTracks: action.payload,
      };
    }

    case "setSongToGenerate": {
      const song = action.payload;
      return {
        ...state,
        songToGenerate: song,
      };
    }
    case "setGeneratedPlaylist": {
      const uris = action.payload
        ? action.payload.map((track) => track.uri)
        : [];

      return {
        ...state,
        generatedPlaylist: uris,
      };
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
    default:
      break;
  }
  return state;
};

export const Reducer = () => useReducer(userData, userState);
