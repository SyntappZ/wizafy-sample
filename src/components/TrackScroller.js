import React, { useRef } from "react";
import Track from "./Track";
import Album from "./Album";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { motion } from "framer-motion";
import { fadeIn } from "../data/animations.js";
const TrackScroller = ({ loadMoreTracks, title, tracks, album, created }) => {
  const scrollerRef = useRef(null);

  const scroller = (direction) => {
    const { offsetWidth } = scrollerRef.current;
    if (direction) {
      scrollerRef.current.scrollLeft += offsetWidth;
    } else {
      scrollerRef.current.scrollLeft -= offsetWidth;
    }
  };

  return (
    <motion.div
      className="scroller"
      initial={fadeIn.initial}
      animate={fadeIn.animate}
      transition={fadeIn.transition}
    >
      <div className="title-wrap">
        <h1 className="title">{title}</h1>
        <div className="scroll-buttons">
          <div onClick={() => scroller(false)}>
            <FiChevronLeft />
          </div>
          <div onClick={() => scroller(true)}>
            <FiChevronRight />
          </div>
        </div>
      </div>

      <div className="scroller-tracks" ref={scrollerRef}>
        {tracks.map((track, i) => {
          return album ? (
            <Album key={i} album={track} id={track.id} created={created} />
          ) : (
            <Track key={i} track={track} id={track.id} />
          );
        })}
        {loadMoreTracks ? (
          <Track loadMoreTracks={loadMoreTracks} track={null} />
        ) : null}
      </div>
    </motion.div>
  );
};

export default TrackScroller;
