import React, { useEffect, useContext, useState } from "react";
import TrackFull from "./TrackFull";
import { PlaylistStore } from "../context/ContextProvider";

const Tracklist = ({ tracklist }) => {
  const [tracks, setTracks] = useState([]);

  const contextStore = useContext(PlaylistStore);
  const { favoriteCheck } = contextStore;

  useEffect(() => {
    check()
  }, [tracklist]);
  

  const check = async () => {
    const data = await favoriteCheck(tracklist)
    setTracks(data)
  }

  return (
    <div className="tracklist">
      {tracks.map((track, i) => {
        return <TrackFull key={i} track={track} />;
      })}
    </div>
  );
};

export default Tracklist;
