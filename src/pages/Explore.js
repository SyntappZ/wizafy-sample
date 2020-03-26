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
  const { loadMoreTracks, dispatch, fetchData } = store;
  const {
    newReleaseAlbums,
    moreNewAlbums,
    playlistMessage,
    featuredPlaylists,
    categories
  } = state;

  const loadMoreAlbums = () => {
    loadMoreTracks(moreNewAlbums, "setNewReleases");
  };

  const getPlaylistDetails = (playlist) => {
     dispatch({type: 'setSelectedPlaylist', payload: playlist})
  }

  


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
            return <Playlist key={i} playlist={playlist} getPlaylistDetails={getPlaylistDetails} />;
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
      </div>
    </>
  );
};

const Catagory = ({ name, icon, id, dispatch, fetchData }) => {
  const getDetails = () => {
    fetchData(
      `https://api.spotify.com/v1/browse/categories/${id}/playlists?limit=50`,
      "GET"
    ).then(data => {
    
      const playlists = {
        title: name,
        image: icon,
        playlists: data.playlists.items.map(playlist => {
          return {
            id: playlist.id,
            title: playlist.name,
            description: playlist.description,
            image: playlist.images[0].url,
            uri: playlist.uri,
            tracks: playlist.tracks.href,
            tracksAmount: playlist.tracks.total,
            owner: playlist.owner.display_name
          };
        })
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
