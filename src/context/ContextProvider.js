import React, { createContext, useEffect } from "react";
import { Reducer } from "./Reducer.js";
export const PlaylistStore = createContext();

const ContextProvider = ({ children }) => {
  const [state, dispatch] = Reducer();
  const { accessToken } = state;

  useEffect(() => {
    if (accessToken) {
      fetchStartupData();
    }
  }, [accessToken]);

  const loadMoreTracks = (url, type) => {
    fetchData(url, "GET").then(data => {
      dispatch({ type: type, payload: data });
    });
  };

  const fetchData = (url, method) => {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: method,
        headers: {
          Authorization: "Bearer " + accessToken
        }
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    });
  };

  const fetchStartupData = () => {
    fetchData("https://api.spotify.com/v1/me", "GET").then(data => {
    
      dispatch({ type: "setProfileData", payload: data });
    });
    fetchData("https://api.spotify.com/v1/me/playlists", "GET").then(data => {
      dispatch({ type: "setPlaylists", payload: data });
    });
    fetchData("https://api.spotify.com/v1/browse/new-releases", "GET").then(
      data => {
        dispatch({ type: "setNewReleases", payload: data.albums });
      }
    );
    fetchData("https://api.spotify.com/v1/me/tracks?limit=50", "GET").then(
      data => {
        console.log(data)
        dispatch({ type: "favorites", payload: data });
      }
    );

    fetchData("https://api.spotify.com/v1/me/top/tracks", "GET").then(data => {
      dispatch({ type: "topTracks", payload: data });
      dispatch({type: 'loadTrack', payload: data.items[0]})
    });
  };

  const data = {
    state: state,
    dispatch: dispatch,
    loadMoreTracks: loadMoreTracks,
    fetchData: fetchData
  };

  return (
    <PlaylistStore.Provider value={data}>{children}</PlaylistStore.Provider>
  );
};

export default ContextProvider;
