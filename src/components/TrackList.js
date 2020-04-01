import React, { useEffect, useContext, useState } from "react";
import TrackFull from "./TrackFull";
import { PlaylistStore } from "../context/ContextProvider";
import { IoMdCloudDownload } from "react-icons/io";
import { convertTracks } from "../data/trackConverter.js";
const Tracklist = ({ tracklist, loadMore, favorites, next, updateNext }) => {
  const [tracks, setTracks] = useState([]);
  const [id, setId] = useState("");
  const contextStore = useContext(PlaylistStore);
  const { favoriteCheck, fetchData, dispatch, trackConverter } = contextStore;

  useEffect(() => {
    console.log(tracklist);
    if (!favorites) {
      check(tracklist);
    }
  }, [tracklist, id]);

  const check = async () => {
    const data = await favoriteCheck(tracklist);
    setTracks(data);
  };

  const loadMoreTracks = async () => {
    fetchData(next).then(data => {
      updateNext(data.next);
      const convert = convertTracks(data.items);
      favoriteCheck(convert).then(newTracks => {
        setTracks([...tracks, ...newTracks]);
      });
    });
  };

  const updateFavorite = (id, track) => {
    setId(id);
  };

  const renderTracks = favorites ? tracklist : tracks;

  return (
    <div className="tracklist">
      {renderTracks.map((track, i) => {
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
