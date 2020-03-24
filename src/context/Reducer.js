import { useReducer } from "react";

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
  moreFavorites: "",
  playlistMessage: "",
  featuredPlaylists: [],
  categories: [],
  selectedCategory: {}
}
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
    case "setAccessToken": {
      return {
        ...state,
        accessToken: action.payload
      };
    }

    case "setPlaylists": {
      const playlists = action.payload.items.map(playlist => {
        return {
          id: playlist.id,
          title: playlist.name,
          description: playlist.description,
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
          href: album.href,
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
          description: playlist.description,
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
      const tracks = action.payload.items.map(track => {
        return {
          id: track.id,
          title: track.name.split("-")[0],
          artist: track.artists[0].name.split("-")[0],
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
          title: track.name.split("-")[0],
          artist: track.artists[0].name.split("-")[0],
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
    case "setCatagories": {

      const categoryList = action.payload.map(category => {
        return {
          title: category.name,
          url: category.href,
          id: category.id,
          icon: category.icons[0].url
        }
      })
     
      return {
        ...state,
        categories: categoryList
      }
    }
    case "setSelectedCategory": {

      return {
        ...state,
        selectedCategory: action.payload
        
      }
    }
    case "loadCurrentTrack": {
      return {
        ...state,
        currentTrack: action.payload
      };
    }
    case "logout": {
      return cleanState
    }
       
    default:
      break;
  }
  return state;
};

const userState = cleanState

export const Reducer = () => useReducer(userData, userState);
