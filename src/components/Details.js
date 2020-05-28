import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Lottie from "react-lottie";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import heartBeat from "../images/heartBeat.json";

import { PlaylistStore } from "../context/ContextProvider";

const Details = ({ image, title, description, category, isGenerator, id }) => {
  const history = useHistory();
  const contextStore = useContext(PlaylistStore);
  const { dispatch } = contextStore;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: heartBeat,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const goBack = () => {
    dispatch({ type: "setSelectedPlaylist", payload: null });
    dispatch({ type: "setSongToGenerate", payload: {} });
  };

  return (
    <div className="details">
      <div className="top-bar">
        <FaRegArrowAltCircleLeft className="back-icon" onClick={goBack} />
        {isGenerator ? (
          <h3>Generate from song</h3>
        ) : (
          <div
            className="title-wrap"
            style={{ cursor: category ? "default" : "pointer" }}
          >
            <h4>{title}</h4>
          </div>
        )}
      </div>

      <div className="details-bar">
        <div className="left">
          <div className="image-wrap">
            <img src={image} alt={title} />
            {category ? (
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
            {isGenerator ? null : <h2>{category ? "Category" : "Playlist"}</h2>}

            <h1>{title}</h1>
            <h3>{description ? description : `All of ${title}'s tracks`}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
