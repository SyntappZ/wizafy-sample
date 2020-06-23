import React, { useState } from "react";
import Loading from "./Loading";
import { MdPerson, MdArrowDownward } from "react-icons/md";
import { serverUrl } from "../serverUrl";

const StartScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loginToSpoify = () => {
    setIsLoading(true);
    return (window.location = serverUrl);
  };
  return (
    <div className="start-screen">
      <div className="background"></div>
      <div className="top">
        <div className="wrap">
          <h1 style={{ color: "white" }}>welcome to playlist wizard</h1>
          <h3>sign in to spotify for wizardry</h3>
          <MdArrowDownward className="down-arrow" />
          <div
            onClick={loginToSpoify}
            className="btn"
            style={{ background: "white" }}
          >
            <MdPerson
              className="icon"
              style={{ fontSize: "22px", color: "#554fd8" }}
            />
            <p style={{ color: "#554fd8" }}>sign in</p>
          </div>
        </div>
      </div>

      <div className="bottom">{isLoading ? <Loading /> : <Features />}</div>
    </div>
  );
};

export default StartScreen;

const Features = () => {
  const arr = [
    {
      color: "#ac8be9",
      title: "search",
      desc:
        "Search for alsorts of playlists, albums and songs from the spotify database.",
    },
    {
      color: "#6e50bf",
      title: "catagories",
      desc:
        "Explore through 35 catagories each of which has many playlists to browse through.",
    },
    {
      color: "#382b64",
      title: "playlists & albums",
      desc:
        "Add & remove any playlist or album and save any song to your favorites.",
    },
    {
      color: "#3d3372",
      title: "generate playlists",
      desc:
        "Generate playlists from your most played tracks or from any song you choose.",
    },
    {
      color: "#554fd8",
      title: "tuneable attributes",
      desc:
        "Add some tuneble attributes in the generator such as Danceability, Energy and Popularity to get the playlist more to your liking.",
    },
    { color: "#7d50e7", title: "genre generator", desc: "Choose upto 5 genres to generate a playlist from with over 127 genres to choose from." },
  ];
  return (
    <div className="features">
      <div className="wrap">
        {arr.map((feature, i) => {
          return (
            <Feature key={i} color={feature.color} title={feature.title} desc={feature.desc} />
          );
        })}
      </div>
    </div>
  );
};

const Feature = ({ color, title, desc }) => {
  return (
    <div className="feature">
      <div className="feature-wrap">
        <div className="icon-wrap">
          <div className="circle" style={{ background: color }}></div>
        </div>
        <div className="text-wrap">
          <p className="feature-title">{title}</p>
          <p className="description">{desc}</p>
        </div>
      </div>
    </div>
  );
};
