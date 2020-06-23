import React, { useRef, useContext, useEffect, useState } from "react";
import "./App.scss";
import SideNav from "./components/SideNav";
import PageRouter from "./router/PageRouter";
import ScrollToTop from "./router/ScrollToTop";
import { BrowserRouter as Router } from "react-router-dom";
import ContextProvider from "./context/ContextProvider";
import StartScreen from "./components/StartScreen";

import Toast from "./components/Toast";
import Player from "./components/Player";
import { PlaylistStore } from "./context/ContextProvider";
import AlbumPage from "./pages/AlbumPage";
import CreatePlaylist from "./components/CreatePlaylistModal";

const Screen = () => {
  const [signedIn, setSignedIn] = useState(false);
  const contextStore = useContext(PlaylistStore);
  const { accessToken } = contextStore.state;
  useEffect(() => {
    if (accessToken) {
      // setSignedIn(true);
    }
  }, [accessToken]);

  return (
    <div className="screen">
      {signedIn ? null : <StartScreen />}
      <MainApp contextStore={contextStore} />
    </div>
  );
};

function App() {
  return (
    <ContextProvider>
      <Router>
        <Screen />
      </Router>
    </ContextProvider>
  );
}

export default App;

const MainApp = ({ contextStore }) => {
  const { selectedPlaylist, modalOpen } = contextStore.state;

  const pageWrap = useRef(null);
  return (
    <div className="App">
      <CreatePlaylist modalOpen={modalOpen} />
      <div className="section-container">
        <div className="nav-section">
          <SideNav />
        </div>
        <div ref={pageWrap} className="pages-section">
          {selectedPlaylist ? <AlbumPage /> : null}
          <Toast />
          <ScrollToTop pageWrap={pageWrap} />
          <PageRouter />
        </div>
      </div>
      <div className="player-section">
        <Player />
      </div>
    </div>
  );
};
