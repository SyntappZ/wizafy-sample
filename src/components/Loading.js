import React from "react";
import Lottie from "react-lottie";
import loader from "../images/loading.json";

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return <Lottie options={defaultOptions} height={450} width={450} />;
};

export default Loading;
