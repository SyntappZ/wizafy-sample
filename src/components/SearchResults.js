import React, { useContext, useEffect } from "react";
import { PlaylistStore } from "../context/ContextProvider";
import TrackList from "./TrackList";
import PlaylistBrowser from "./PlaylistBrowser";
import TrackScroller from "./TrackScroller";
import { motion } from "framer-motion";
import { fadeInLeft } from "../data/animations.js";
const SearchResults = ({ isPlaylists }) => {
  const contextStore = useContext(PlaylistStore);
  const { state } = contextStore;
  const { searchTracks, searchPlaylists, searchAlbums, searchTitle } = state;

  return (
    <div className="search-results">
      {isPlaylists ? (
        <div>
          {searchAlbums.length > 0 && searchTitle ? (
            <TrackScroller
              loadMoreTracks={null}
              tracks={searchAlbums}
              title={`${searchTitle} Album's`}
              album={true}
            />
          ) : (
            <motion.h1
              className="marginV"
              initial={fadeInLeft.initial}
              animate={fadeInLeft.animate}
              transition={fadeInLeft.transition}
            >
              {searchTitle ? "no albums found!" : ""}
            </motion.h1>
          )}
          {searchPlaylists.length > 0 ? (
            <PlaylistBrowser playlists={searchPlaylists} title={searchTitle} />
          ) : (
            <motion.h1
              className="marginV"
              initial={fadeInLeft.initial}
              animate={fadeInLeft.animate}
              transition={fadeInLeft.transition}
            >
              {searchTitle ? "no playlists found!" : "press enter to search"}
            </motion.h1>
          )}
        </div>
      ) : (
        <div>
          {searchTracks.length > 0 ? (
            <div>
              <h2 style={{ padding: "20px 0" }}>
                Search results for {searchTitle}
              </h2>
              <TrackList tracklist={searchTracks} startAnimation={true} />
            </div>
          ) : (
            <motion.h1
              className="marginV"
              initial={fadeInLeft.initial}
              animate={fadeInLeft.animate}
              transition={fadeInLeft.transition}
            >
              {searchTitle ? "no tracks found!" : "press enter to search"}
            </motion.h1>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
