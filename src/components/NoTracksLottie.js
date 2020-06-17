import React from "react";
import Lottie from "react-lottie";
import noTrackslottie from "../images/no-music-files.json";

const NoTracksLottie = () => {
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: noTrackslottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return <Lottie options={lottieOptions} width={500} height={250} />;
};

export default NoTracksLottie;
