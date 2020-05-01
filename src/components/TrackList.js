import React, { useEffect, useContext, useState } from "react";
import TrackFull from "./TrackFull";
import { PlaylistStore } from "../context/ContextProvider";
import { IoMdCloudDownload } from "react-icons/io";
import { convertTracks } from "../data/trackConverter.js";
const Tracklist = ({
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
      check(tracklist); 
  }, [tracklist, id]);

  const check = async (tracks) => {
    const data = await favoriteCheck(tracks);
    setTracks(data);
  };

  // useEffect(() => {
  //  if(reverse !== undefined) {
  //    let flip = tracks.reverse()
  //    setTracks(flip)

  //  }

  // }, [reverse]);

  const loadMoreTracks = async () => {
    fetchData(next).then((data) => {
      updateNext(data.next);
      const convert = convertTracks(data.items);
      favoriteCheck(convert).then((newTracks) => {
        setTracks([...tracks, ...newTracks]);
      });
    });
  };

  const updateFavorite = (id, track) => {
    setId(id);
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
          onClick={favorites ? loadMore : loadMoreTracks}
        >
          <IoMdCloudDownload className="cloud" />
          <h3>load more</h3>
        </div>
      ) : null}
    </div>
  );
};

export default Tracklist;
