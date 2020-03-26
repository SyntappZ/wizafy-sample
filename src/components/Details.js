import React from "react";
import { useHistory } from "react-router-dom";
import Lottie from "react-lottie";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import heartBeat from "../images/heartBeat.json";

const Details = ({ image, title, isLottie }) => {
  const history = useHistory();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: heartBeat,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <div className="details">
      <div className="top-bar">
        <FaRegArrowAltCircleLeft
          className="back-icon"
          onClick={() => history.goBack()}
        />
        <h4>{title}</h4>
      </div>

      <div className="details-bar">
        <div className="left">
          <div className="image-wrap">
            <img src={image} alt={title} />
            {isLottie ? (
              <div className="lottie">
                <Lottie
                  speed={0.7}
                  delay={1000}
                  options={defaultOptions}
                  height={200}
                  width={200}
                />
              </div>
            ) : null}
          </div>
        </div>
        <div className="right">
          <div className="text-wrap">
            <h2>{isLottie ? 'Category' : 'Playlist'}</h2>
            <h1>{title}</h1>
            <h3>All of {title}'s {isLottie ? 'playlists' : 'tracks'}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
