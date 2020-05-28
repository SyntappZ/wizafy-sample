import React, { useState, useContext, useEffect } from "react";
import { PlaylistStore } from "../context/ContextProvider";
import TrackList from "./TrackList";
import PlaylistBrowser from "./PlaylistBrowser";
import TrackScroller from "./TrackScroller";
const SearchResults = ({ isPlaylists, title }) => {
  const contextStore = useContext(PlaylistStore);
  const { state, dispatch } = contextStore;
  const { searchTracks, searchData } = state;
  //   const {albums, playlists} = searchData
  useEffect(() => {
    console.log("delete");
    dispatch({ type: "setSearchData", payload: null });
    dispatch({ type: "setSearchTracks", payload: null });
  }, [title]);
  useEffect(() => {
    console.log(searchTracks);
  }, [searchTracks]);

  return (
    <div className="search-results">
      <div>
        {searchData ? (
          <TrackScroller
            loadMoreTracks={null}
            tracks={[]}
            title={`${title} Album's`}
            album={true}
          />
        ) : null}
        {searchData ? <PlaylistBrowser playlists={[]} title={title} /> : null}
      </div>
      {searchTracks ? (
        <div>
          <h2 style={{ padding: "20px 0" }}>Search results for {title}</h2>
          <TrackList tracklist={searchTracks} />
        </div>
      ) : null}
    </div>
  );
};

export default SearchResults;
