import React, { useEffect } from "react";
import queryString from "query-string";
import "./App.css";

function App() {
  useEffect(() => {
    const parsed = queryString.parse(window.location.search);
    const accessToken = parsed.access_token;

    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      });
  }, []);

  const loginToSpoify = () => {
    return (window.location = "http://localhost:8888/login");
  };
  return (
    <div className="App">
      <button onClick={loginToSpoify}>login to spotify</button>
    </div>
  );
}

export default App;
