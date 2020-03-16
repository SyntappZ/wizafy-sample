import React, { useContext, useEffect, useState } from "react";
import img from "../images/tempAlbum.jpg";
import { FaStepForward, FaVolumeUp, FaStepBackward } from "react-icons/fa";
import { MdPlayArrow } from "react-icons/md";
import { PlaylistStore } from "../context/ContextProvider";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
const Player = () => {
  const contextStore = useContext(PlaylistStore);
  const [track, setTrack] = useState({});
  const { currentTrack } = contextStore.state;
  useEffect(() => {
    if (currentTrack) {
      if (currentTrack.title) {
        setTrack(currentTrack);
      } else {
        setTrack({
          id: currentTrack.id,
          title: currentTrack.name.split("-")[0],
          artist: currentTrack.artists[0].name,
          image: currentTrack.album.images[2].url,
          duration: "0:30",
          preview: currentTrack.preview_url,
          uri: currentTrack.uri,
          href: currentTrack.href
        });
      }
    }
    playSample()
  }, [currentTrack]);

  const playSample = () => {
    if (currentTrack.preview) {
      const audio = new Audio(currentTrack.preview);
      audio.play();
    }
  };

  const { title, artist, image } = track;
  return (
    <div className="player-container">
      <div className="now-playing">
        <div className="image-wrap">
          <img src={image} alt="album art" />
          <div className="text-wrap">
            <h3>{title}</h3>
            <p>{artist}</p>
          </div>
        </div>

        <div className="controls">
          <div className="controls-wrap">
            <FaStepBackward className="player-icon" />
            <div className="play-wrap" onClick={playSample}>
              <MdPlayArrow />
            </div>
            <FaStepForward className="player-icon" />
          </div>
        </div>
      </div>

      <div className="progress-bar">
        <div className="slider-wrap">
          <p>0:00</p>
          <Slider
            handleStyle={{ borderColor: "#554fd8" }}
            trackStyle={{ background: "#554fd8" }}
            min={0}
            max={30}
            defaultValue={3}
          />
          <p>0:30</p>
        </div>
      </div>
      <div className="volume">
        <div className="volume-wrap">
          <FaVolumeUp className="volume-icon" />
          <div style={{ paddingLeft: "20px" }}></div>
          <Slider
            handleStyle={{ borderColor: "#554fd8" }}
            trackStyle={{ background: "#554fd8" }}
            min={0}
            max={30}
            defaultValue={3}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
