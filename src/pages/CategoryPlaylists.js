import React, { useContext, useRef, useState, useEffect } from "react";

import { PlaylistStore } from "../context/ContextProvider";
import Playlist from "../components/Playlist";
import TrackFull from "../components/TrackFull";
import Details from "../components/Details";
import { convertTracks } from "../data/trackConverter.js";

const CategoryPlaylists = () => {
  const playlistScroll = useRef(null);

  const contextStore = useContext(PlaylistStore);
  const { fetchData, state } = contextStore;
  const { selectedCategory, page } = state;
  const { title, playlists, image } = selectedCategory;
  const [tracks, setTracks] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState([]);
  const [playlistDesc, setPlaylistDesc] = useState([]);
  const [playlistImage, setPlaylistImage] = useState([]);

  const getPlaylistDetails = (playlist, firstStart) => {
    const top = playlistScroll.current.offsetTop;
    if (!firstStart) {
      page.scrollTo(0, top - 20);
    }

    const { tracks, title, description, image } = playlist;
    setPlaylistTitle(title);
    setPlaylistDesc(description);
    setPlaylistImage(image);

    fetchData(tracks, "GET").then(data => {
      const tracklist = convertTracks(data, true);
      setTracks(tracklist);
    });
  };

  useEffect(() => {
    getPlaylistDetails(playlists[0], true);
  }, []);

  return (
    <div className="category-playlist">
      <Details title={title} image={image} category={true} />

      <div ref={playlistScroll} className="playlists-wrap">
        <div className="left">
          <h1 className="title">{title} playlists</h1>
          {playlists.map((playlist, i) => (
            <Playlist
              playlist={playlist}
              key={i}
              getPlaylistDetails={getPlaylistDetails}
            />
          ))}
        </div>
        <div className="right">
          <h1 className="title">{playlistTitle} playlist</h1>
          <div className="tracklist-bar">
            <div className="image-wrap">
              <img src={playlistImage} alt={playlistTitle} />
            </div>

            <div className="text-wrap">
              <h1>{playlistTitle}</h1>
              <h3>{playlistDesc}</h3>
            </div>
          </div>

          {tracks.map((track, i) => {
            return (
              <TrackFull
                key={i}
                title={track.title}
                artist={track.artist}
                image={track.image}
                duration={track.duration}
                // isFavorite={false}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryPlaylists;
