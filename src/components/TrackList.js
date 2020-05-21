import React, { useEffect, useContext, useState } from "react";
import TrackFull from "./TrackFull";
import { PlaylistStore } from "../context/ContextProvider";
import { IoMdCloudDownload } from "react-icons/io";
import { convertTracks } from "../data/trackConverter.js";
const TrackList = ({
  tracklist,
  loadMore,
  favorites,
  next,
  updateNext,
}) => {
  const [tracks, setTracks] = useState([]);
  const [id, setId] = useState("");
  const contextStore = useContext(PlaylistStore);
  const { favoriteCheck, fetchData, dispatch, trackConverter } = contextStore;
  // let renderTracks = favorites ? tracklist : tracks;
  useEffect(() => { 
    check(tracklist)
    
  }, [tracklist, id]);

  const check = async (tracklist) => {
   
    const data = await favoriteCheck(tracklist);
    setTracks(data);
    // return check(tracklist)
    
  };

  

  const loadMoreTracks = async () => {
    
    fetchData(next).then((data) => {
      updateNext(data.next);
      const convert = convertTracks(data.items);
      favoriteCheck(convert).then((newTracks) => {
        setTracks([...tracks, ...newTracks]);
      });
    });
  };

  

  const updateFavorite = (nextId) => {
    if(nextId === id) {
      nextId = nextId + Math.floor(Math.random() + 10000).toString()
    }
    setId(nextId);
  };

  return (
    <div className="tracklist">
      {tracks.map((track, i) => {
        return (
          <TrackFull key={i} track={track} updateFavorite={updateFavorite} />
        );
      })}

      {next ? (
        <div
          className="track-list-more"
          onClick={loadMoreTracks}
        >
          <IoMdCloudDownload className="cloud" />
          <h3>load more</h3>
        </div>
      ) : null}
    </div>
  );
};

export default TrackList;
