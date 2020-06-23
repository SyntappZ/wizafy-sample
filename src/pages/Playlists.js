import React, { useState, useContext } from "react";
import { PlaylistStore } from "../context/ContextProvider";
import TrackScroller from "../components/TrackScroller";
import Search from "../components/Search";
import PlaylistBrowser from "../components/PlaylistBrowser";
import SearchResults from "../components/SearchResults";
import NoTracksLottie from "../components/NoTracksLottie";
import { motion } from "framer-motion";
import { fadeIn } from "../data/animations.js";
const Playlists = () => {
  const contextStore = useContext(PlaylistStore);
  const [inputVal, setInputValue] = useState(null);
  const { loadMoreTracks } = contextStore;
  const {
    myPlaylists,
    savedPlaylists,
    morePlaylistsUrl,
    selectedPlaylist,
  } = contextStore.state;

  const loadMorePlaylists = () => {
    loadMoreTracks(morePlaylistsUrl, "playlists");
  };

  return (
    <motion.div
      className="wrap"
      style={selectedPlaylist ? { overflow: "hidden", height: "100%" } : null}
      initial={fadeIn.initial}
      animate={fadeIn.animate}
      transition={fadeIn.transition}
    >
      <Search
        isPlaylists={true}
        placeholder={"Search for albums & playlists..."}
        inputValue={setInputValue}
      />
      {inputVal ? (
        <SearchResults isPlaylists={true} />
      ) : (
        <div>
          {myPlaylists.length > 0 ? (
            <TrackScroller
              loadMoreTracks={loadMorePlaylists}
              tracks={myPlaylists}
              title={"My Created Playlists"}
              album={true}
              created={true}
            />
          ) : null}

          {savedPlaylists.length > 0 ? (
            <PlaylistBrowser playlists={savedPlaylists} title={"My Saved"} />
          ) : (
            <NoTracksLottie />
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Playlists;
