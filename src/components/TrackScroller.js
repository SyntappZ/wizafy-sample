import React, { useState, useEffect, useRef } from "react";
import Track from "./Track";
import Album from "./Album";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const TrackScroller = ({ loadMoreTracks, title, tracks, album }) => {
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
    <div className="scroller">
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
            <Album key={i} album={track} id={track.id} />
          ) : (
            <Track key={i} track={track} id={track.id} />
          );
        })}
        {loadMoreTracks ? (
          <Track loadMoreTracks={loadMoreTracks} track={null} />
        ) : null}
      </div>
    </div>
  );
};

export default TrackScroller;
