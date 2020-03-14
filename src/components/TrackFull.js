import React, { useState } from "react";
import Lottie from "react-lottie";
import playButton from "../images/play-circle.json";
import heart from "../images/heart.json";
import { MdMoreHoriz } from "react-icons/md";

const TrackFull = ({ title, artist, image, duration, isFavorite }) => {
  const [state, setState] = useState({
    isPaused: false,
    isStopped: true
  });
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: playButton,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  const heartOptions = {
    loop: false,
    autoplay: false,
    animationData: heart,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className="full-track">
      <div className="left">
        <Lottie
        style={{margin: 0}}
          options={defaultOptions}
          height={80}
          width={80}
          
        />
      
          <img src={image} alt={title} />
       
        <div className="text-wrap">
          <h3>{title}</h3>
          <p>{artist}</p>
        </div>
      </div>
      <div className="right">
        <p>{duration}</p>
        <Lottie options={heartOptions} isStopped={isFavorite} height={200} width={200} />
        <MdMoreHoriz className="more-icon" />
      </div>

      
    </div>
  );
};

export default TrackFull;
