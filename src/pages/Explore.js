import React, { useContext, useState, useEffect } from "react";
import Search from "../components/Search";
import TrackScroller from "../components/TrackScroller";
import { PlaylistStore } from "../context/ContextProvider";
import im from "../images/tempAlbum.jpg";
import Playlist from '../components/Playlist'
const Explore = () => {
  const [isSearch, setIsSearch] = useState(false);
  const contextStore = useContext(PlaylistStore);

  return (
    <div className="explore">
      <Search />
      <ExploreMain store={contextStore} state={contextStore.state} />
    </div>
  );
};

export default Explore;

const ExploreMain = ({ store, state }) => {
  const { loadMoreTracks, dispatch } = store;
  const { newReleaseAlbums, moreNewAlbums, playlistMessage, featuredPlaylists } = state;

  const loadMoreAlbums = () => {
    loadMoreTracks(moreNewAlbums, "setNewReleases");
  };

  return (
    <>
      <TrackScroller
        loadMoreTracks={loadMoreAlbums}
        tracks={newReleaseAlbums}
        title={`${playlistMessage} Album's`}
        album={true}
      />
      <div className="bottom-wrap">
        <div className="featuredPlaylists">
        <h1 className="title">Featured Playlists</h1>
          {featuredPlaylists.map(playlist => {
              return <Playlist playlist={playlist}/>
          })}
        </div>
        <div className="catagories">
        <h1 className="title">catagories</h1>

        </div>
      </div>
    </>
  );
};


