import React, { useContext, useEffect, useState } from "react";
import Lottie from "react-lottie";
import soundWave from "../images/long-sound-wave.json";
import { FaStepForward, FaVolumeUp, FaStepBackward } from "react-icons/fa";
import { MdPause, MdPlayArrow } from "react-icons/md";
import { motion } from "framer-motion";
import { PlaylistStore } from "../context/ContextProvider";
import {
  fadeInRight,
  fadeIn,
  fadeInLeft,
  scaleUp,
} from "../data/animations.js";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
const Player = () => {
  const contextStore = useContext(PlaylistStore);
  const [track, setTrack] = useState({});
  const [volume, setVolume] = useState(0.2);
  const [time, setTime] = useState(0);
  const { currentTrack, audio, isPlaying, isPaused } = contextStore.state;
  const [state, setState] = useState({
    lottiePaused: false,
    lottieStopped: true,
  });

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
          href: currentTrack.href,
        });
      }
    }
    autoPlay();
  }, [currentTrack]);

  const playSample = () => {
    if (currentTrack.preview) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    }
  };

  const autoPlay = () => {
    if (currentTrack.preview) {
      audio.src = currentTrack.preview;
      audio.play();
    }
  };

  useEffect(() => {
    let interval = null;

    if (isPlaying) {
      interval = setInterval(() => {
        setTime(audio.currentTime);
      }, 1000);
    } else if (!isPlaying && isPaused) {
      clearInterval(interval);
    } else {
      setTime(0);
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [currentTrack, isPlaying, isPaused]);

  useEffect(() => {
    audio.volume = volume;
  }, [volume]);

  const changeVolume = (event) => {
    setVolume(event / 100);
  };

  const soundWaveOptions = {
    loop: true,
    autoplay: true,
    animationData: soundWave,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const lottie = isPlaying ? (
      <Lottie options={soundWaveOptions} />
  ) : null;

  const { title, artist, image } = track;
  const timePosition = Math.floor(time);
  return (
    <div className="player-container">
      <div className="now-playing">
        <div className="image-wrap">
          {image ? <img src={image} alt="album art" /> : null}
          <div className="text-wrap">
            <h3>{title}</h3>
            <p>{artist}</p>
          </div>
        </div>

        <div className="controls">
          <div className="controls-wrap">
            <FaStepBackward className="player-icon" onClick={autoPlay} />
            <div className="play-wrap" onClick={playSample}>
              {isPlaying ? <MdPause /> : <MdPlayArrow />}
            </div>
          </div>
        </div>
      </div>

      <div className="progress-bar">
        <div className="slider-wrap">
          <p>0:{timePosition < 10 ? "0" + timePosition : timePosition}</p>
          <Slider
            handleStyle={{ borderColor: "#554fd8" }}
            trackStyle={{ background: "#554fd8" }}
            min={0}
            max={30}
            defaultValue={0}
            value={time}
          />
          <p>0:30</p>
        </div>
      </div>
      <div className="lottie-wrap">{lottie}</div>
      <div className="volume">
        <div className="volume-wrap">
          <FaVolumeUp className="volume-icon" />
          <div style={{ paddingLeft: "20px" }}></div>
          <Slider
            handleStyle={{ borderColor: "#554fd8" }}
            trackStyle={{ background: "#554fd8" }}
            min={0}
            max={100}
            defaultValue={20}
            value={volume * 100}
            onChange={changeVolume}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
