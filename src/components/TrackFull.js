import React, { useState, useEffect, useContext } from "react";
import Lottie from "react-lottie";

import heart from "../images/heart.json";
import visualizer from "../images/sound-visualizer.json";
import { MdMoreHoriz, MdPlayArrow } from "react-icons/md";
import { GiRegeneration } from "react-icons/gi";
import Tooltip from "../components/Tooltip";
import { TiCancel } from "react-icons/ti";
import { PlaylistStore } from "../context/ContextProvider";
import Menu from "./Menu";

const TrackFull = ({ track, updateFavorite }) => {
  const contextStore = useContext(PlaylistStore);
  const { addFavorites, sendData, dispatch, setToastMessage } = contextStore;
  const { isPlaying, isPaused, currentTrack } = contextStore.state;
  const [state, setState] = useState({
    lottiePaused: false,
    lottieStopped: true,
  });
  const [showTip, showTooltip] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { title, artist, image, duration, favorite, preview, id, uri } = track;
  const arr = title.split(" ");
  const addToPlaylist = (playlistId, playlistTitle) => {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${uri}`;
    sendData(url, "POST").then((message) => {
      let toastTitle = title.split("(")[0].trim();
      toastTitle =
        toastTitle.length > 20 ? toastTitle.slice(0, 20) + "..." : toastTitle;
      setToastMessage(` added ${toastTitle} to ${playlistTitle}`);
    });
  };
  const sendToGenerator = () => {
    dispatch({ type: "setSongToGenerate", payload: track });
  };

  const heartOptions = {
    loop: false,
    autoplay: false,
    animationData: heart,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const visualizerOptions = {
    loop: true,
    autoplay: true,
    animationData: visualizer,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

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
    const message = favorite
      ? "Removed from favorites."
      : "Added to favorites.";
    const action = await addFavorites(url, method);
    if (action.status === 200) {
      setToastMessage(message);
    }
    updateFavorite(id, track);
  };

  const trackTitle = arr.length > 4 ? arr.slice(0, 4).join(" ") + "..." : title;
  const iconStyle = {
    fontSize: "25px",
    color: preview ? "#333" : "#aaa",
  };

  let isPlay;
  if (currentTrack.id === id && isPlaying) {
    isPlay = (
      <Lottie
        options={visualizerOptions}
        isPaused={isPaused}
        width={40}
        height={40}
      />
    );
  } else {
    isPlay = <MdPlayArrow style={iconStyle} />;
  }

  const icon = preview ? (
    isPlay
  ) : (
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
        {menuOpen ? (
          <Menu
            addToPlaylist={addToPlaylist}
            setMenuOpen={setMenuOpen}
            track={track}
          />
        ) : null}
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
        <div
          className="generator-wrap"
          onMouseOver={() => showTooltip(true)}
          onMouseLeave={() => showTooltip(false)}
          onClick={sendToGenerator}
        >
          <Tooltip message={"Generate"} toggle={showTip} mini={true} />
          <GiRegeneration style={{ fontSize: "20px" }} />
        </div>
        <div className="more-menu" onClick={() => setMenuOpen(!menuOpen)}>
          <MdMoreHoriz className="more-icon" />
        </div>
      </div>
    </div>
  );
};

export default TrackFull;
