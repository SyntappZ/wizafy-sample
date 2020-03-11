import React, { useEffect } from "react";
import "./App.scss";
import SideNav from "./components/SideNav";
import PageRouter from "./router/PageRouter";
import { BrowserRouter as Router } from "react-router-dom";
import ContextProvider from "./context/ContextProvider";
import Player from "./components/Player";
function App() {
  return (
    <ContextProvider>
      <Router>
        <div className="App">
          <div className="section-container">
            <div className="nav-section">
              <SideNav />
            </div>
            <div className="pages-section">
              <PageRouter />
            </div>
          </div>
          <div className="player-section">
            <Player />
          </div>
        </div>
      </Router>
    </ContextProvider>
  );
}

export default App;
