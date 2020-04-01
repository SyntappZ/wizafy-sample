import React, { useContext, useState, useEffect } from "react";
import { PlaylistStore } from "../context/ContextProvider";
import Details from "../components/Details";
import Tracklist from "../components/Tracklist";

import { convertTracks } from "../data/trackConverter.js";

const Tracks = () => {
  const contextStore = useContext(PlaylistStore);
  const [playlistTracks, setTracks] = useState([]);
  const { state, fetchData } = contextStore;
  const { image, title, tracks, description } = state.selectedPlaylist;

  useEffect(() => {
    fetchData(tracks + "?limit=50", "GET").then(data => {
      const tracklist = convertTracks(data, tracks, image);
      setTracks(tracklist);
    });
  }, []);

  return (
    <div className="tracks">
      <Details title={title} image={image} description={description} />
      <h1 className="title" style={{ marginTop: "40px" }}>
        {title} Tracks
      </h1>

      <Tracklist tracklist={playlistTracks} />
    
    </div>
  );
};

export default Tracks;
