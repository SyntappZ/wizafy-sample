import React, { useContext, useState, useEffect } from "react";
import { PlaylistStore } from "../context/ContextProvider";
import Details from "../components/Details";
import Tracklist from '../components/Tracklist'


import { convertTracks } from "../data/trackConverter.js";

const Tracks = () => {
  const contextStore = useContext(PlaylistStore);
  const [playlistTracks, setTracks] = useState([]);
  const { state, fetchData } = contextStore;
  const { image, title, tracks, description } = state.selectedPlaylist;
  const [next, setNext] = useState("");
 

  useEffect(() => {
    fetchData(tracks + "?limit=50", "GET").then((data) => {
      data = data.items || data.tracks.items;

      setNext(data.next);

      const list = convertTracks(data, image);
      setTracks(list);
    });
  }, []);

  return (
    <div className="tracks">
      <Details title={title} image={image} description={description} />
      <h1 className="title" style={{ marginTop: "40px" }}>
        {title} Tracks
      </h1>
      

      <Tracklist tracklist={playlistTracks} next={next} />
    </div>
  );
};

export default Tracks;
