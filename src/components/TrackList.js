import React, { useEffect, useContext, useState } from "react";
import TrackFull from "./TrackFull";
import { PlaylistStore } from "../context/ContextProvider";

const Tracklist = ({ tracklist }) => {
  const [tracks, setTracks] = useState([]);
  const [id, setId] = useState('')
  const contextStore = useContext(PlaylistStore);
  const { favoriteCheck } = contextStore;

  useEffect(() => {
    check()
  }, [tracklist, id]);
  

  const check = async () => {
    const data = await favoriteCheck(tracklist)
    setTracks(data)
  }


  const updateFavorite = (id) => {

  }
 

  return (
    <div className="tracklist">
      {tracks.map((track, i) => {
        return <TrackFull key={i} track={track} updateFavorite={updateFavorite} />;
      })}
    </div>
  );
};

export default Tracklist;
