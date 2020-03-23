import React, { useContext, useState, useEffect } from "react";
import Search from "../components/Search";
import TrackScroller from "../components/TrackScroller";
import { PlaylistStore } from "../context/ContextProvider";
import im from "../images/tempAlbum.jpg";
import Playlist from "../components/Playlist";
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
  const {
    newReleaseAlbums,
    moreNewAlbums,
    playlistMessage,
    featuredPlaylists,
    categories
  } = state;

  console.log(categories)

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
          {featuredPlaylists.map((playlist, i) => {
            return <Playlist key={i} playlist={playlist} />;
          })}
        </div>
        <div className="catagories">
          <h1 className="title">catagories</h1>
          <div className="catagory-wrap">
            {categories.map((catagory, i) => {
              return (
                <Catagory
                  key={i}
                  icon={catagory.icon}
                  name={catagory.title}
                  url={catagory.url}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

const Catagory = ({ name, icon, url }) => {
  return (
    <div className="catagory">
      <div className="image-wrap">
        <img src={icon} alt={name} />
         <h3>{name}</h3>
      </div>
    </div>
  );
};
