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

    fetchData("https://api.spotify.com/v1/me/top/tracks", "GET").then(data => {
      const tracks = data.items.map(track => {
        return {
          id: track.id,
          title: track.name,
          artist: track.artists[0].name,
          image: track.album.images[1],
          duration: track.duration_ms,
          preview: track.preview_url,
          uri: track.uri,
          href: track.href
        };
      });

     dispatch({ type: "homeData", payload: tracks });
     
    });
  };

  const data = {
    state: state,
    dispatch: dispatch
  };

  return (
    <PlaylistStore.Provider value={data}>{children}</PlaylistStore.Provider>
  );
};

export default ContextProvider;
