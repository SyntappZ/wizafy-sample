import React, { useEffect, useState, useContext } from "react";
import { PlaylistStore } from "../context/ContextProvider";
import TrackScroller from "../components/TrackScroller";
import Search from "../components/Search";
import PlaylistBrowser from "../components/PlaylistBrowser";
const Playlists = () => {
  const contextStore = useContext(PlaylistStore);

  const { loadMoreTracks } = contextStore;
  const { myPlaylists, savedPlaylists, morePlaylistsUrl } = contextStore.state;

  const loadMorePlaylists = () => {
    loadMoreTracks(morePlaylistsUrl, "playlists");
  };
  return (
    <div className="wrap">
      <Search />
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
  );
};

export default Playlists;
