import React from "react";
import CreatePlaylist from "../pages/CreatePlaylist";
import Generator from "../pages/Generator";
import Playlists from "../pages/Playlists";
import Settings from "../pages/Settings";
import Home from "../pages/Home";
import { Switch, Route } from "react-router-dom";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Home />
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
  }
];

const PageRouter = () => {
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
