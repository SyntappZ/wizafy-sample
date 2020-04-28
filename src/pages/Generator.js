import React, { useState, useContext, useRef, useEffect } from "react";
import { PlaylistStore } from "../context/ContextProvider";
import { genres } from "../data/genres.js";
import { convertTracks } from "../data/trackConverter.js";
import Tracklist from "../components/Tracklist";
const Generator = () => {
  const contextStore = useContext(PlaylistStore);
  const [playlist, setPlaylist] = useState([]);
  const { getRecomendations, state } = contextStore;
  const { topFiveIds } = state;
  const trackAmountRef = useRef(null);

  const generateTopPlayed = async () => {
    const limit = trackAmountRef.current.valueAsNumber;
    const url = `&seed_tracks=${topFiveIds}`;

    const data = await getRecomendations(url, limit);
    const tracks = convertTracks(data.tracks);
    setPlaylist(tracks);
    console.log(tracks);
  };
  return (
    <div className="wrap">
      <h1 className="gen-title">generator</h1>
      <div className="basic">
        <h1>Generate based on your top played tracks</h1>
        <div className="number-wrap">
          <input
            ref={trackAmountRef}
            type="number"
            placeholder="track amount"
            min="1"
            default="1"
            max="100"
          />
          <div onClick={generateTopPlayed} className="btn">
            generate
          </div>
        </div>
      </div>
      <div className="advanced"></div>
      <div className="generated-tracks">
        <Tracklist
          tracklist={playlist}
          loadMore={null}
          favorites={false}
          next={null}
        />

        {playlist.length > 0 ? <div style={{margin: '20px auto'}} className="btn">save playlist</div> : null}
      </div>
    </div>
  );
};

export default Generator;
