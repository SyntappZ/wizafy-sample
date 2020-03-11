import React from "react";
import Lottie from "react-lottie";
import loader from "../images/loading.json";

const LoadingScreen = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <div className="loader">
      <Lottie options={defaultOptions} height={450} width={450} />
    </div>
  );
};

export default LoadingScreen;
