import React from "react";
import img from "../images/tempAlbum.jpg";
import { FaStepForward, FaVolumeUp, FaStepBackward } from "react-icons/fa";
import { MdPlayArrow } from "react-icons/md";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
const Player = () => {
  return (
    <div className="player-container">
      <div className="now-playing">
        <div className="image-wrap">
          <img src={img} alt="album art" />
          <div className="text-wrap">
            <h3>Arlo</h3>
            <p>forever neverland</p>
          </div>
        </div>

        <div className="controls">
          <div className="controls-wrap">
            <FaStepBackward className="player-icon" />
            <div className="play-wrap">
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
          <div style={{paddingLeft: '20px'}}></div>
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
