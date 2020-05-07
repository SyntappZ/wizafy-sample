import React, { createContext, useEffect } from "react";
import { Reducer } from "./Reducer.js";
import { categories } from "../data/categories.js";

export const PlaylistStore = createContext();

const ContextProvider = ({ children }) => {
  const [state, dispatch] = Reducer();
  const { accessToken } = state;

  useEffect(() => {
    if (accessToken) {
      fetchStartupData();
    }
  }, [accessToken]);

  const fetchData = (url) => {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  };

  const addFavorites = (url, method) => {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: method,
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          refreshData('favorites')
          resolve(res)
        })
       
        .catch((err) => reject(err));
    });
  };

  const sendData = (url, method, body) => {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: method,
        body: body ? JSON.stringify(body) : '',
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  };

  const favoriteCheck = (list) => {
    return new Promise((resolve, reject) => {
      
      if (list.length > 0) {
        const ids = list.map((track) => {
          track = track.track || track;
          return track.id;
        });

        fetchData(
          `https://api.spotify.com/v1/me/tracks/contains?ids=${ids}`,
          "GET"
        )
          .then((trackData) => {
            const tracks = list.map((track, i) => {
              const year = track.added_at ? track.added_at.split("-")[0] : null;
              track = track.track || track;

              return {
                ...track,
                favorite: trackData[i],
                year: year,
              };
            });
            resolve(tracks);
          })
          .catch((err) => reject(err));
      }
    });
  };

  const getRecomendations = async (attributes, limit) => {
    return new Promise((resolve, reject) => {
      const url = "https://api.spotify.com/v1/recommendations?";
      fetchData(url + attributes + `&limit=${limit}`)
        .then((data) => {
          resolve(data);
          // const tracks = []
          //  dispatch({type: 'setGeneratedTracks', payload: tracks})
        })
        .catch((err) => reject(err));
    });
  };

  const loadMoreTracks = (url, type) => {
    fetchData(url).then((data) => {
      favoriteCheck(data.items).then((tracks) => {
        data.items = tracks;

        dispatch({ type: type, payload: data });
      });
    });
  };

  useEffect(() => {
    state.audio.onplaying = (event) => {
      const data = {
        isPlaying: true,
        isPaused: false,
      };
      dispatch({ type: "audioTracker", payload: data });
    };

    state.audio.onpause = (event) => {
      const data = {
        isPlaying: false,
        isPaused: true,
      };
      dispatch({ type: "audioTracker", payload: data });
    };
    state.audio.onended = (event) => {
      const data = {
        isPlaying: false,
        isPaused: false,
      };
      dispatch({ type: "audioTracker", payload: data });
    };
  }, []);

  const fetchStartupData = () => {
    dispatch({ type: "setCatagories", payload: categories });

    fetchData("https://api.spotify.com/v1/me").then((data) => {
      dispatch({ type: "setProfileData", payload: data });
    });
    fetchData("https://api.spotify.com/v1/me/playlists?limit=50").then(
      (data) => {
        data.refresh = false
        dispatch({ type: "setPlaylists", payload: data });
      }
    );
    fetchData("https://api.spotify.com/v1/browse/new-releases").then((data) => {
      dispatch({ type: "setNewReleases", payload: data });
    });

    fetchData("https://api.spotify.com/v1/browse/featured-playlists").then(
      (data) => {
        dispatch({ type: "setFeaturedPlaylists", payload: data });
      }
    );
    fetchData("https://api.spotify.com/v1/me/tracks?limit=50").then((data) => {
      favoriteCheck(data.items).then((tracks) => {
        data.items = tracks;
        data.refresh = false
        dispatch({ type: "favorites", payload: data });
      });
    });

    fetchData("https://api.spotify.com/v1/me/top/tracks?limit=40").then(
      (data) => {
        favoriteCheck(data.items).then((tracks) => {
          data.items = tracks;
          dispatch({ type: "topTracks", payload: data });
          dispatch({ type: "loadCurrentTrack", payload: data.items[0] });
        });
      }
    );
  };

  const refreshData = (type) => {
    switch (type) {
      case "playlists": {
        fetchData("https://api.spotify.com/v1/me/playlists?limit=50").then(
          (data) => {
            data.refresh = true
            dispatch({ type: "setPlaylists", payload: data });
          }
        );
      }
      case "favorites": {
        fetchData("https://api.spotify.com/v1/me/tracks?limit=50").then((data) => {
          
          favoriteCheck(data.items).then((tracks) => {
            data.items = tracks;
            data.refresh = true
            dispatch({ type: "favorites", payload: data });
          });
        });
      }
    }
  };

  const data = {
    state: state,
    dispatch: dispatch,
    loadMoreTracks: loadMoreTracks,
    fetchData: fetchData,
    sendData: sendData,
    favoriteCheck: favoriteCheck,
    getRecomendations: getRecomendations,
    refreshData: refreshData,
    addFavorites: addFavorites
  };

  return (
    <PlaylistStore.Provider value={data}>{children}</PlaylistStore.Provider>
  );
};

export default ContextProvider;
