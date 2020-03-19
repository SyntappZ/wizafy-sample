import React from "react";
import Track from "./Track";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const TrackScroller = ({ loadMoreTracks, title, tracks, album }) => {
  return (
    <div className="top-tracks">
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

      <div className="myTopTracks">
        {tracks.map((track, i) => {
          return <Track key={i} track={track} id={track.id} album={album} />;
        })}
        <Track loadMoreTracks={loadMoreTracks} album={album}  track={null} />
      </div>
    </div>
  );
};

export default TrackScroller;
