import React, { useState } from "react";
import Loading from "./Loading";
import { MdPerson, MdArrowDownward, MdLibraryMusic } from "react-icons/md";
import { FaSearch } from "react-icons/fa";


import { GiRegeneration } from 'react-icons/gi'
// import { AiFillControl } from 'react-icons/go'


import { AiFillDatabase, AiFillControl, AiFillCustomerService } from "react-icons/ai";
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
  const iconStyle = {
    color: "white",
    fontSize: "25px",
  };
  const arr = [
    {
      color: "#ac8be9",
      title: "search",
      desc:
        "Search for alsorts of playlists, albums and songs from the spotify database.",
      icon: <FaSearch style={iconStyle} />,
    },
    {
      color: "#6e50bf",
      title: "catagories",
      desc:
        "Explore through 35 catagories each of which has many playlists to browse through.",
      icon: <AiFillDatabase style={iconStyle} />,
    },
    {
      color: "#382b64",
      title: "playlists & albums",
      desc:
        "Add & remove any playlist or album and save any song to your favorites.",
      icon: <MdLibraryMusic style={iconStyle} />,
    },
    {
      color: "#3d3372",
      title: "generate playlists",
      desc:
        "Generate playlists from your most played tracks or from any song you choose.",
      icon: <GiRegeneration style={iconStyle} />,
    },
    {
      color: "#554fd8",
      title: "tuneable attributes",
      desc:
        "Add some tuneble attributes in the generator such as Danceability, Energy and Popularity to get the playlist more to your liking.",
      icon: <AiFillControl style={iconStyle} />,
    },
    {
      color: "#7d50e7",
      title: "genre generator",
      desc:
        "Choose upto 5 genres to generate a playlist from with over 127 genres to choose from.",
      icon: <AiFillCustomerService style={iconStyle} />,
    },
  ];
  return (
    <div className="features">
      <div className="wrap">
        {arr.map((feature, i) => {
          return (
            <Feature
              key={i}
              color={feature.color}
              title={feature.title}
              desc={feature.desc}
              icon={feature.icon}
            />
          );
        })}
      </div>
    </div>
  );
};

const Feature = ({ color, title, desc, icon }) => {
  return (
    <div className="feature">
      <div className="feature-wrap">
        <div className="icon-wrap">
          <div className="circle" style={{ background: color }}>
            {icon}
          </div>
        </div>
        <div className="text-wrap">
          <p className="feature-title">{title}</p>
          <p className="description">{desc}</p>
        </div>
      </div>
    </div>
  );
};
