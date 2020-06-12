import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Lottie from "react-lottie";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import heartBeat from "../images/heartBeat.json";
import { motion } from "framer-motion";
import {
  fadeInLeft,
  fadeInRight,
  fadeIn,
  fadeInDelay,
} from "../data/animations.js";
import { PlaylistStore } from "../context/ContextProvider";

const Details = ({
  image,
  title,
  description,
  category,
  isGenerator,
  id,
  setStartAnimation,
  tracksAmount,
}) => {
  const history = useHistory();
  const contextStore = useContext(PlaylistStore);
  const { dispatch, state } = contextStore;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: heartBeat,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const goBack = () => {
    if (state.selectedPlaylist) {
      dispatch({ type: "setSelectedPlaylist", payload: null });
    } else {
      history.goBack();
    }
    dispatch({ type: "setSongToGenerate", payload: {} });
    dispatch({ type: "setFeatured", payload: false });
  };

  const track = tracksAmount === 1 ? ' track' : ' tracks'

  return (
    <div className="details">
      <motion.div
        className="top-bar"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      >
        <FaRegArrowAltCircleLeft className="back-icon" onClick={goBack} />

        <div
          className="title-wrap"
          style={{ cursor: category ? "default" : "pointer" }}
        >
          <h4>{tracksAmount + track}</h4>
        </div>
      </motion.div>

      <div className="details-bar">
        <div className="left">
          <motion.div
            className="image-wrap"
            initial={fadeInLeft.initial}
            animate={fadeInLeft.animate}
            transition={fadeInLeft.transition}
            onAnimationComplete={() => setStartAnimation(true)}
          >
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
          </motion.div>
        </div>
        <motion.div
          className="right"
          initial={fadeInDelay.initial}
          animate={fadeInDelay.animate}
          transition={fadeInDelay.transition}
        >
          <div className="text-wrap">
            {isGenerator ? null : <h2>{category ? "Category" : "Playlist"}</h2>}

            <h1>{title}</h1>
            <h3>{description ? description : `All of ${title}'s tracks`}</h3>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Details;
