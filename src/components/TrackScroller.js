import React from "react";
import Track from "./Track";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const TrackScroller = ({ loadMoreTopTracks, tracks, album }) => {
  return (
    <div className="top-tracks">
      <div className="title-wrap">
        <h1>my top tracks</h1>
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
        <Track loadMoreTopTracks={loadMoreTopTracks} album={album}  track={null} />
      </div>
    </div>
  );
};

export default TrackScroller;
