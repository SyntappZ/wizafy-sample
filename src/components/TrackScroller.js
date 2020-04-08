import React from "react";
import Track from "./Track";
import Album from "./Album";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const TrackScroller = ({ loadMoreTracks, title, tracks, album }) => {

  return (
    <div className="scroller">
      <div className="title-wrap">
        <h1 className="title">{title}</h1>
        <div className="scroll-buttons">
          <div>
            <FiChevronLeft />
          </div>
          <div>
            <FiChevronRight />
          </div>
        </div>
      </div>

      <div className="scroller-tracks">
        {tracks.map((track, i) => {
         
          return album ? (
            <Album key={i} album={track} id={track.id} />
          ) : (
            <Track key={i} track={track} id={track.id} />
          );
        })}
        <Track loadMoreTracks={loadMoreTracks} track={null} />
      </div>
    </div>
  );
};

export default TrackScroller;
