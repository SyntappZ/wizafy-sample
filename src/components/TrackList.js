import React, { useEffect, useContext, useState } from "react";
import TrackFull from "./TrackFull";
import { PlaylistStore } from "../context/ContextProvider";
import { IoMdCloudDownload } from "react-icons/io";
import { convertTracks } from "../data/trackConverter.js";
import { motion, useAnimation } from "framer-motion";
import { fadeIn } from "../data/animations.js";
const TrackList = ({ tracklist, next, updateNext, startAnimation }) => {
  const [tracks, setTracks] = useState([]);
  const [id, setId] = useState("");
  const contextStore = useContext(PlaylistStore);
  const { favoriteCheck, fetchData } = contextStore;
  const controls = useAnimation()
  let _mounted = false;
  useEffect(() => {
    _mounted = true;
    check(tracklist);
    return () => {
      _mounted = false;
    };
  }, [tracklist, id]);

  const check = async (tracklist) => {
    const data = await favoriteCheck(tracklist);
    if (_mounted) {
      setTracks(data);
    }
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
    if (nextId === id) {
      nextId = nextId + Math.floor(Math.random() + 10000).toString();
    }

    setId(nextId);
  };

  const { initial, animate, transition } = fadeIn;
  if(startAnimation) {
    controls.start(animate)
  }
 
  return (
    <motion.div
      className="tracklist"
      initial={initial}
      animate={controls}
      transition={transition}
    >
     { startAnimation ? tracks.map((track, i) => {
      return (
        <TrackFull key={i} track={track} updateFavorite={updateFavorite} />
      );
    }) : null}

      {next ? (
        <div className="track-list-more" onClick={loadMoreTracks}>
          <IoMdCloudDownload className="cloud" />
          <h3>load more</h3>
        </div>
      ) : null}
    </motion.div>
  );
};

export default TrackList;
