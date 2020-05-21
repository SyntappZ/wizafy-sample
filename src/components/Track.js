import React, { useContext } from "react";
import { PlaylistStore } from "../context/ContextProvider";
import { FiPlusCircle } from "react-icons/fi";
const Track = ({ track, loadMoreTracks }) => {
  const contextStore = useContext(PlaylistStore);

  const selectTrack = () => {
    const { dispatch } = contextStore;
    dispatch({ type: "loadCurrentTrack", payload: track });
  };
  return (
    <div className="track">
      <div
        className="image-wrap"
        onClick={() => (track ? selectTrack() : loadMoreTracks())}
      >
        {track ? (
          <img src={track.image} alt={`${track.title} album art`} />
        ) : (
          <div>
            <FiPlusCircle className="plus-icon" />
            <p>Load More</p>
          </div>
        )}
      </div>
      <p>{track ? track.title : null}</p>
    </div>
  );
};

export default Track;
