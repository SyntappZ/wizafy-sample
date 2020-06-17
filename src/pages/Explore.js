import React, { useContext, useState } from "react";
import Search from "../components/Search";
import TrackScroller from "../components/TrackScroller";
import { PlaylistStore } from "../context/ContextProvider";
import Playlist from "../components/Playlist";
import { convertDescription } from "../data/trackConverter.js";
import SearchResults from "../components/SearchResults";
import { motion } from "framer-motion";
import { fadeIn, fadeInUp } from "../data/animations.js";
const Explore = () => {
  const [inputVal, setInputValue] = useState(null);

  const contextStore = useContext(PlaylistStore);
  const { state } = contextStore;
  const { selectedPlaylist } = state;

  return (
    <motion.div
      className="explore wrap"
      style={selectedPlaylist ? { overflow: "hidden" } : null}
      initial={fadeIn.initial}
      animate={fadeIn.animate}
      transition={fadeIn.transition}
    >
      <Search inputValue={setInputValue} placeholder={"Search for songs..."} />
      {inputVal ? (
        <SearchResults />
      ) : (
        <ExploreMain store={contextStore} state={state} />
      )}
    </motion.div>
  );
};

export default Explore;

const ExploreMain = ({ store, state }) => {
  const { dispatch, fetchData } = store;
  const {
    newReleaseAlbums,
    playlistMessage,
    featuredPlaylists,
    categories,
  } = state;

  const getPlaylistDetails = (playlist) => {
    dispatch({ type: "setFeatured", payload: true });
    dispatch({ type: "setSelectedPlaylist", payload: playlist });
  };

  return (
    <>
      <TrackScroller
        loadMoreTracks={null}
        tracks={newReleaseAlbums}
        title={`${playlistMessage} Album's`}
        album={true}
      />
      <motion.div
        className="bottom-wrap"
        initial={fadeInUp.initial}
        animate={fadeInUp.animate}
        transition={fadeInUp.transition}
      >
        <div className="featuredPlaylists">
          <h1 className="title">Featured Playlists</h1>
          {featuredPlaylists.map((playlist, i) => {
            return (
              <Playlist
                key={i}
                playlist={playlist}
                getPlaylistDetails={getPlaylistDetails}
              />
            );
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
                  id={catagory.id}
                  dispatch={dispatch}
                  fetchData={fetchData}
                />
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
};

const Catagory = ({ name, icon, id, dispatch, fetchData }) => {
  const getDetails = () => {
    fetchData(
      `https://api.spotify.com/v1/browse/categories/${id}/playlists?limit=50`,
      "GET"
    ).then((data) => {
      const playlists = {
        title: name,
        image: icon,
        playlists: data.playlists.items.map((playlist) => {
          return {
            id: playlist.id,
            title: playlist.name,
            description: convertDescription(playlist.description),
            image: playlist.images[0].url,
            uri: playlist.uri,
            tracks: playlist.tracks.href,
            tracksAmount: playlist.tracks.total,
            owner: playlist.owner.display_name,
          };
        }),
      };
      dispatch({ type: "setSelectedCategory", payload: playlists });
    });
  };

  return (
    <div className="catagory">
      <div className="image-wrap" onClick={getDetails}>
        <img src={icon} alt={name} />
        <h3>{name}</h3>
      </div>
    </div>
  );
};
