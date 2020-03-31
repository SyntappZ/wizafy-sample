import React, { useState, useEffect, useContext } from "react";
import Lottie from "react-lottie";
import playButton from "../images/play-pause.json";
import heart from "../images/heart.json";
import { MdMoreHoriz, MdPlayArrow } from "react-icons/md";
import { PlaylistStore } from "../context/ContextProvider";

const TrackFull = ({ track, isFavorite }) => {
  const contextStore = useContext(PlaylistStore);

  const [state, setState] = useState({
    isPaused: false,
    isStopped: true,
    paused: false,
    stopped: true
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

  const sendTrack = () => {
    
    setState({ stopped: true });
  };
  const { title, artist, image, duration, favorite } = track;

  const arr = title.split(" ");

  useEffect(() => {
    if (favorite) {
      setState({ isStopped: false, isPaused: false });
    } else {
      setState({ isStopped: true });
    }
  }, [favorite]);

  const handleFavorite = () => {};

  const trackTitle = arr.length > 4 ? arr.slice(0, 4).join(" ") + "..." : title;
  const iconSize = { fontSize: "30px" };
  return (
    <div className="full-track">
      <div className="left">
        <div className="icon-wrap" onClick={sendTrack}>
          <MdPlayArrow style={iconSize} />
        </div>

        <img src={image} alt={trackTitle} />

        <div className="text-wrap">
          <h3>{trackTitle}</h3>
          <p>{artist}</p>
        </div>
      </div>
      <div className="right">
        <p>{duration}</p>

        <div className="lottie-wrap" onClick={handleFavorite}>
          <Lottie
            options={heartOptions}
            style={{ cursor: "pointer" }}
            isStopped={state.isStopped}
            isPaused={state.isPaused}
            width={200}
            height={150}
          />
        </div>

        <MdMoreHoriz className="more-icon" />
      </div>
    </div>
  );
};

export default TrackFull;

// <button  onClick={() => setState({isStopped: true})}>Stop</button>
//<button  onClick={() => setState({isStopped: false, isPaused: false })}>Play</button>
