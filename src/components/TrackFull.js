import React, { useState, useEffect, useContext } from "react";
import Lottie from "react-lottie";

import heart from "../images/heart.json";
import visualizer from "../images/sound-visualizer.json";
import { MdMoreHoriz, MdPause, MdPlayArrow } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import { PlaylistStore } from "../context/ContextProvider";

const TrackFull = ({ track, updateFavorite }) => {
  const contextStore = useContext(PlaylistStore);
  const { sendData, dispatch } = contextStore;
  const {isPlaying, isPaused, audio, currentTrack} = contextStore.state
  const [state, setState] = useState({
    lottiePaused: false,
    lottieStopped: true
  });

  const heartOptions = {
    loop: false,
    autoplay: false,
    animationData: heart,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const visualizerOptions = {
    loop: true,
    autoplay: true,
    animationData: visualizer,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const { title, artist, image, duration, favorite, preview, id } = track;

  const arr = title.split(" ");

  useEffect(() => {
    if (favorite) {
      setState({ lottieStopped: false, lottiePaused: false });
    } else {
      setState({ lottieStopped: true });
    }
  }, [favorite]);

  const sendTrack = () => {
      dispatch({ type: "loadCurrentTrack", payload: track });
  };

  const handleFavorite = async () => {
    const url = `https://api.spotify.com/v1/me/tracks?ids=${id}`;
    const method = favorite ? "DELETE" : "PUT";

    const action = await sendData(url, method);
  
    updateFavorite(id, track);
  };

  const trackTitle = arr.length > 4 ? arr.slice(0, 4).join(" ") + "..." : title;
  const iconStyle = {
    fontSize: "30px",
    color: preview ? "#333" : "#aaa"
  };
 
  let isPlay
    if(currentTrack.id === id && isPlaying) {
      isPlay = (  <Lottie
        options={visualizerOptions}
        isPaused={isPaused}
        width={40}
        height={40}
      />)
    }else{
      isPlay = <MdPlayArrow style={iconStyle} /> 
    }
  
  const icon = preview ? isPlay : (
    <div style={{ textAlign: "center" }}>
      <TiCancel style={iconStyle} />
      <p style={{ fontSize: "10px", color: "#aaa" }}>no sample</p>
    </div>
  );
  return (
    <div className="full-track">
      <div className="left">
        <div
          className="play-icon-wrap"
          style={{ cursor: preview ? "pointer" : "default" }}
          onClick={preview ? sendTrack : null}
        >
          {icon}
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
            isStopped={state.lottieStopped}
            isPaused={state.lottiePaused}
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


