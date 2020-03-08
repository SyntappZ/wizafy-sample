import React, { useEffect } from "react";
import "./App.scss";
import SideNav from "./components/SideNav";
import PageRouter from "./router/PageRouter";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
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
        <div className="player-section"></div>
      </div>
    </Router>
  );
}

export default App;

//const loginToSpoify = () => {
//     return (window.location = "http://localhost:8888/login");
//   };
