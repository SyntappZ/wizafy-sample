import React, { createContext, useEffect } from "react";

import { fetchData } from "../data/fetchApi";
import { Reducer } from "./Reducer.js";
export const PlaylistStore = createContext();


const durationConverter = millis => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};

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
    fetchData("https://api.spotify.com/v1/me/tracks?limit=50", "GET").then(
      data => {
      
        const tracks = data.items.map(track => {
          const year = track.added_at.split('-')[0]
          
          track = track.track
      
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
        dispatch({ type: "favorites", payload: tracks });
      }
    );

    fetchData("https://api.spotify.com/v1/me/top/tracks", "GET").then(data => {
      const tracks = data.items.map(track => {
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

     dispatch({ type: "topTracks", payload: tracks });
     
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
