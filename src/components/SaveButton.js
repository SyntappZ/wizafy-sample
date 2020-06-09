import React from "react";
import { MdPlaylistAdd, MdPlaylistAddCheck } from "react-icons/md";
import { motion } from "framer-motion";
import {
  fadeInRight,
  fadeInUp,
  fadeIn,
  fadeInLeft,
} from "../data/animations.js";
const SaveButton = ({ showButton, savePlaylist, title, isSaved }) => {
  return (
    <>
      {showButton ? (
        <motion.div
          className="save-button"
          onClick={savePlaylist}
          initial={fadeInRight.initial}
          animate={fadeInRight.animate}
          transition={fadeInRight.transition}
        >
          <p>{title}</p>
          {isSaved ? (
            <MdPlaylistAddCheck style={{ fontSize: "18px", color: "grey" }} />
          ) : (
            <MdPlaylistAdd style={{ fontSize: "18px", color: "grey" }} />
          )}
        </motion.div>
      ) : null}
    </>
  );
};

export default SaveButton;
