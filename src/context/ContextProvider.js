import React, { createContext, useEffect } from "react";

import { fetchData } from "../data/fetchApi";
import { Reducer } from "./Reducer.js";
export const PlaylistStore = createContext();

const ContextProvider = ({ children }) => {
  const [state, dispatch] = Reducer();

  useEffect(() => {
    if (state.signedIn) {
      fetchStartupData();
    }
  }, []);

  const loadMoreTracks = (url, type) => {
  console.log('load more ' + url)
    fetchData(url, "GET").then(
      data => {
        dispatch({ type: type, payload: data });
      }
    );
  }

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
        dispatch({ type: "favorites", payload: data });
      }
    );

    fetchData("https://api.spotify.com/v1/me/top/tracks", "GET").then(data => {
      dispatch({ type: "topTracks", payload: data });
    });
  };

  const data = {
    state: state,
    dispatch: dispatch,
    loadMoreTracks: loadMoreTracks
  };

  return (
    <PlaylistStore.Provider value={data}>{children}</PlaylistStore.Provider>
  );
};

export default ContextProvider;
