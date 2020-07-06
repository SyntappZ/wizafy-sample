import React, { useState, useEffect, useContext } from "react";
import Lottie from "react-lottie";
import visualizer from "../images/sound-visualizer.json";
import { MdMoreHoriz, MdPlayArrow, MdDeleteForever } from "react-icons/md";
import { GiRegeneration, GiRollingDices } from "react-icons/gi";
import Tooltip from "../components/Tooltip";
import { TiCancel } from "react-icons/ti";
import { PlaylistStore } from "../context/ContextProvider";
import { FaHeart } from "react-icons/fa";
import Menu from "./Menu";

const TrackFull = ({ track, removeTrack }) => {
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
  } = contextStore.state;

  const [showTickTip, setShowTickTip] = useState(false);
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
        preview: sample.preview,

      });
    } else {
      setNoSample(true);
    }
  };



  const reroll = async () => {
    const url = `seed_tracks=${trackData.id}`;
    const data = await rollTrack(url, 1);
      setTrackData(data);
      track.uri = data.uri
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
    dispatch({ type: "setSongToGenerate", payload: trackData });
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
            className="delete"
            onClick={() => removeTrack(trackData.id)}
            onMouseOver={() => setShowTickTip(true)}
            onMouseLeave={() => setShowTickTip(false)}
          >
            <Tooltip
              message={"Remove track"}
              toggle={showTickTip}
              mini={true}
            />

           <MdDeleteForever  style={{
                fontSize: "25px",
              }} />
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
