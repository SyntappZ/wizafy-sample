import React, { useState, useEffect, useContext } from "react";
import Lottie from "react-lottie";

import heart from "../images/heart.json";
import visualizer from "../images/sound-visualizer.json";
import tick from "../images/correct-check-animation.json";
import cross from "../images/incorrect-failed.json";
import { MdMoreHoriz, MdPlayArrow } from "react-icons/md";
import { GiRegeneration, GiRollingDices } from "react-icons/gi";
import Tooltip from "../components/Tooltip";
import { TiCancel } from "react-icons/ti";
import { PlaylistStore } from "../context/ContextProvider";
import { FaHeart } from "react-icons/fa";
import Menu from "./Menu";

const TrackFull = ({ track }) => {
  const contextStore = useContext(PlaylistStore);
  const {
    addFavorites,
    sendData,
    dispatch,
    setToastMessage,
    searchSample,
    rollTrack,
  } = contextStore;
  const {
    isPlaying,
    isPaused,
    currentTrack,
    onGenerator,
    checkedPlaylist,
  } = contextStore.state;

  const [showTickTip, setShowTickTip] = useState(false);
  const [trackChosen, setTrackChosen] = useState(false);

  const [trackData, setTrackData] = useState({});

  const [isNoSample, setNoSample] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showTip, showTooltip] = useState(false);
  const [showRollTip, showRollTooltip] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setTrackData(track);
  }, [track]);

  const searchForSamples = async () => {
    const sample = await searchSample({
      title: trackData.title,
      artist: trackData.artist,
    });

    if (sample) {
      setTrackData({
        ...trackData,
        preview: sample.preview
      });
    } else {
      setNoSample(true);
    }
  };

  const reroll = async () => {
    const url = `seed_tracks=${trackData.id}`;
    const data = await rollTrack(url, 1);
    if (trackChosen) {
      addCheckedTrack();
      setTrackData(data);
      dispatch({ type: "setCheckedPlaylist", payload: data });
    } else {
      setTrackData(data);
      dispatch({ type: "setCheckedPlaylist", payload: data });
    }
  };

  const addToPlaylist = (playlistId, playlistTitle) => {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${trackData.uri}`;
    sendData(url, "POST").then((message) => {
      let toastTitle = trackData.title.split("(")[0].trim();
      toastTitle =
        toastTitle.length > 20 ? toastTitle.slice(0, 20) + "..." : toastTitle;
      setToastMessage(` added ${toastTitle} to ${playlistTitle}`);
    });
    setMenuOpen(false);
  };
  const sendToGenerator = () => {
    dispatch({ type: "setSongToGenerate", payload: track });
  };

  const addCheckedTrack = () => {
    dispatch({ type: "setCheckedPlaylist", payload: trackData });
  };

  useEffect(() => {
    const arr = checkedPlaylist.map((track) => track.id);
    const chosen = arr.includes(trackData.id);

    setTrackChosen(chosen);
  }, [checkedPlaylist.length, checkedPlaylist, trackData]);

  const visualizerOptions = {
    loop: true,
    autoplay: true,
    animationData: visualizer,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const tickOptions = {
    loop: false,
    autoplay: true,
    animationData: tick,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const crossOptions = {
    loop: false,
    autoplay: true,
    animationData: cross,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    setIsFavorite(trackData.favorite);
  }, [trackData]);

  const sendTrack = () => {
    dispatch({ type: "loadCurrentTrack", payload: trackData });
  };

  const handleFavorite = async () => {
    const action = await addFavorites(trackData.id);
    setIsFavorite(action);
  };

  let trackTitle;
  if (trackData.title) {
    trackTitle =
      trackData.title.length > 30
        ? trackData.title.slice(0, 30) + "..."
        : trackData.title;
  }

  const iconStyle = {
    fontSize: "25px",
    color: trackData.preview ? "#333" : "#aaa",
  };

  let isPlay;
  if (currentTrack.id === trackData.id && isPlaying) {
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

  const icon = trackData.preview ? (
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
          style={{ cursor: trackData.preview ? "pointer" : "default" }}
          onClick={trackData.preview ? sendTrack : null}
        >
          {icon}
        </div>

        <img src={trackData.image} alt={trackTitle} />

        <div className="text-wrap">
          <h3>{trackTitle}</h3>
          <p>{trackData.artist}</p>
        </div>
      </div>
      <div className="right">
        {onGenerator ? (
          <div
            className="sample-search"
            style={{ justifyContent: "flex-end", margin: 0 }}
            onClick={reroll}
            onMouseOver={() => showRollTooltip(true)}
            onMouseLeave={() => showRollTooltip(false)}
          >
             <Tooltip
              message={"Reroll track"}
              toggle={showRollTip}
              mini={true}
            />
            <GiRollingDices style={{ fontSize: "30px" }} />
          </div>
        ) : null}

        {!trackData.preview && !onGenerator ? (
          <div
            className="sample-search"
            style={{ border: "solid 1px #eee" }}
            onClick={searchForSamples}
          >
            <p> {isNoSample ? "no samples found" : "Search for sample"}</p>
          </div>
        ) : null}
        {onGenerator ? (
          <div
            className="tick"
            onClick={addCheckedTrack}
            onMouseOver={() => setShowTickTip(true)}
            onMouseLeave={() => setShowTickTip(false)}
          >
            <Tooltip
              message={trackChosen ? "Remove track" : "Add track"}
              toggle={showTickTip}
              mini={true}
            />

            {trackChosen ? (
              <Lottie options={tickOptions} width={80} height={70} />
            ) : (
              <Lottie options={crossOptions} width={80} height={70} />
            )}
          </div>
        ) : null}
        <div className="container">
          {menuOpen ? (
            <Menu
              addToPlaylist={addToPlaylist}
              setMenuOpen={setMenuOpen}
              track={track}
            />
          ) : null}
          <p>{trackData.duration}</p>

          <div className="lottie-wrap" onClick={handleFavorite}>
            <FaHeart
              style={{
                color: isFavorite ? "#C41E58" : "#D9D9D9",
                fontSize: "20px",
              }}
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
    </div>
  );
};

export default TrackFull;
