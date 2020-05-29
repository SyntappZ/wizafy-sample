import React, { useRef, useContext, useEffect, useState } from "react";
import "./App.scss";
import SideNav from "./components/SideNav";
import PageRouter from "./router/PageRouter";
import ScrollToTop from "./router/ScrollToTop";
import { BrowserRouter as Router } from "react-router-dom";
import ContextProvider from "./context/ContextProvider";
import { MdPerson, MdArrowDownward } from "react-icons/md";
import Loading from "./components/Loading";
import Player from "./components/Player";
import { PlaylistStore } from "./context/ContextProvider";
import Tracks from "./pages/Tracks";
import { serverUrl } from "./serverUrl";
const Screen = () => {
  const [signedIn, setSignedIn] = useState(false);
  const contextStore = useContext(PlaylistStore);
  const { accessToken } = contextStore.state;
  useEffect(() => {
    if (accessToken) {
      setSignedIn(true);
    }
  }, [accessToken]);

  return (
    <div className="screen">
      {signedIn ? null : <StartScreen />}
      <MainApp contextStore={contextStore} />
    </div>
  );
};
const StartScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loginToSpoify = () => {
    setIsLoading(true);
    return (window.location = serverUrl);
  };
  return (
    <div className="start-screen">
      <div className="wrap">
        <h1>welcome to playlist wizard</h1>
        <h3>sign in to spotify for wizardry</h3>
        <MdArrowDownward className="down-arrow" />
        <div onClick={loginToSpoify} className="btn">
          <MdPerson className="icon" style={{ fontSize: "20px" }} />
          <p>sign in</p>
        </div>
      </div>
      {isLoading ? <Loading /> : null}
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
  const { selectedPlaylist } = contextStore.state;

  // useEffect(() => {
  //   console.log(selectedPlaylist);
  // }, [selectedPlaylist]);
  const pageWrap = useRef(null);
  return (
    <div className="App">
      <div className="section-container">
        <div className="nav-section">
          <SideNav />
        </div>
        <div ref={pageWrap} className="pages-section">
          {selectedPlaylist ? <Tracks /> : null}

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
