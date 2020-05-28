import React, { useEffect, useState, useContext } from "react";
import { PlaylistStore } from "../context/ContextProvider";
import TrackScroller from "../components/TrackScroller";
import Search from "../components/Search";
import PlaylistBrowser from "../components/PlaylistBrowser";
import SearchResults from "../components/SearchResults";

const Playlists = () => {
  const contextStore = useContext(PlaylistStore);
  const [inputVal, setInputValue] = useState(null);
  const { loadMoreTracks } = contextStore;
  const { myPlaylists, savedPlaylists, morePlaylistsUrl } = contextStore.state;

  const loadMorePlaylists = () => {
    loadMoreTracks(morePlaylistsUrl, "playlists");
  };
  return (
    <div className="wrap">
      <Search isPlaylists={true} placeholder={"Search for albums & playlists..."} inputValue={setInputValue} />
      {inputVal ? (
        <SearchResults isPlaylists={true} />
      ) : (
        <div>
          {myPlaylists ? (
            <TrackScroller
              loadMoreTracks={loadMorePlaylists}
              tracks={myPlaylists}
              title={"My Created Playlists"}
              album={true}
            />
          ) : null}
          {savedPlaylists ? (
            <PlaylistBrowser playlists={savedPlaylists} title={"My Saved"} />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Playlists;
