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


  const styleSheet = {
    container: {
      position: "relative",
    },
    title: {
      textAlign: "center",
      padding: "50px",
      fontSize: "20px",
      color: '#333',
      fontWeight: '100'
    },
    lottie: {
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      margin: "auto",
    },
  };


  return (
    <div style={styleSheet.container}>
      <h1 style={styleSheet.title}>Connecting to Spotify...</h1>
      <Lottie style={styleSheet.lottie} options={defaultOptions} height={450} width={450} />
    </div>
  );
};



export default Loading;
