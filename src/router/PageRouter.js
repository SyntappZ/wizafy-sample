import React, { useContext, useState, useEffect } from "react";
import Generator from "../pages/Generator";
import Playlists from "../pages/Playlists";
import Settings from "../pages/Settings";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import { PlaylistStore } from "../context/ContextProvider";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";

import CategoryPlaylists from "../pages/CategoryPlaylists";
import queryString from "query-string";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Home />,
  },
  {
    path: "/explore",
    main: () => <Explore />,
  },
  {
    path: "/generator",
    main: () => <Generator />,
  },
  {
    path: "/playlists",
    main: () => <Playlists />,
  },
  {
    path: "/settings",
    main: () => <Settings />,
  },
  {
    path: "/categoryPlaylists",
    main: () => <CategoryPlaylists />,
  },
];

const PageRouter = () => {
  const parsed = queryString.parse(window.location.search);
  const contextStore = useContext(PlaylistStore);
  const { dispatch, state } = contextStore;

  const {
    accessToken,
    selectedCategory,
    selectedPlaylist,
    songToGenerate,
  } = state;
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/generator") {
      dispatch({ type: "setSongToGenerate", payload: {} });
    }
    if(location.pathname !== "/playlists") {
      dispatch({ type: "clearSearch" });
    }
    dispatch({ type: "setSelectedPlaylist", payload: null });
  }, [location]);

  useEffect(() => {
    if (Object.keys(songToGenerate).length > 0) {
      history.push("/generator");
    }
  }, [songToGenerate]);

  useEffect(() => {
    if (parsed.access_token) {
      dispatch({ type: "setAccessToken", payload: parsed.access_token });
    }
    if (!accessToken) {
      history.push("/");
    }
  }, [accessToken]);

  useEffect(() => {
    if (Object.keys(selectedCategory).length > 0) {
      history.push("/categoryPlaylists");
    }
  }, [selectedCategory]);

  // useEffect(() => {
  //   if (Object.keys(selectedPlaylist).length > 0) {
  //     history.push("/tracks");
  //   }
  // }, [selectedPlaylist]);

  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          children={<route.main />}
          
        />
      ))}
    </Switch>
  );
};

export default PageRouter;
