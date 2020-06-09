import React, { useState, useContext, useEffect } from "react";
import { PlaylistStore } from "../context/ContextProvider";
import TrackList from "./TrackList";
import PlaylistBrowser from "./PlaylistBrowser";
import TrackScroller from "./TrackScroller";
const SearchResults = ({ isPlaylists }) => {
  const contextStore = useContext(PlaylistStore);
  const { state, dispatch } = contextStore;
  const { searchTracks, searchPlaylists, searchAlbums, searchTitle } = state;
 
 

  return (
    <div className="search-results">
      {isPlaylists ? (
        <div>
          {searchAlbums ? (
            <TrackScroller
              loadMoreTracks={null}
              tracks={searchAlbums}
              title={`${searchTitle} Album's`}
              album={true}
            />
          ) : null}
          {searchPlaylists ? <PlaylistBrowser playlists={searchPlaylists} title={searchTitle} /> : null}
        </div>
      ) : (
        <div>
          {searchTracks ? (
            <div>
              <h2 style={{ padding: "20px 0" }}>Search results for {searchTitle}</h2>
              <TrackList tracklist={searchTracks} startAnimation={true} />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
