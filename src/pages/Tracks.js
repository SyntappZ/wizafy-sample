import React, { useContext, useState, useEffect } from "react";
import { PlaylistStore } from "../context/ContextProvider";
import Details from "../components/Details";
import TrackFull from "../components/TrackFull";
import { convertTracks } from "../data/trackConverter.js";

const Tracks = () => {
  const contextStore = useContext(PlaylistStore);
  const [playlistTracks, setTracks] = useState([]);
  const { state, fetchData } = contextStore;
  const { image, title, tracks, description } = state.selectedPlaylist;

  useEffect(() => {
   
    fetchData(tracks, "GET").then(data => {
      const tracklist = convertTracks(data, tracks, image);
      setTracks(tracklist);
    });
  }, []);

  return (
    <div className="tracks">
      <Details title={title} image={image} description={description} />
      <h1 className="title" style={{marginTop: '40px'}}>{title} Tracks</h1>

      {playlistTracks.map((track, i) => {
        return (
          <TrackFull
            key={i}
            title={track.title}
            artist={track.artist}
            image={track.image}
            duration={track.duration}
          />
        );
      })}
    </div>
  );
};

export default Tracks;
