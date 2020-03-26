import React, { useContext, useEffect } from "react";
import CreatePlaylist from "../pages/CreatePlaylist";
import Generator from "../pages/Generator";
import Playlists from "../pages/Playlists";
import Settings from "../pages/Settings";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import { PlaylistStore } from "../context/ContextProvider";
import { Switch, Route, useHistory } from "react-router-dom";
import Tracks from "../pages/Tracks";
import CategoryPlaylists from "../pages/CategoryPlaylists";
import queryString from "query-string";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Home />
  },
  {
    path: "/explore",
    main: () => <Explore />
  },
  {
    path: "/createPlaylist",
    main: () => <CreatePlaylist />
  },
  {
    path: "/generator",
    main: () => <Generator />
  },
  {
    path: "/playlists",
    main: () => <Playlists />
  },
  {
    path: "/settings",
    main: () => <Settings />
  },
  {
    path: "/tracks",
    main: () => <Tracks />
  },
  {
    path: "/categoryPlaylists",
    main: () => <CategoryPlaylists />
  }

];

const PageRouter = () => {
  const parsed = queryString.parse(window.location.search);
  const contextStore = useContext(PlaylistStore);
  const { dispatch } = contextStore;
  const { accessToken, selectedCategory } = contextStore.state;
  const history = useHistory();
 




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
