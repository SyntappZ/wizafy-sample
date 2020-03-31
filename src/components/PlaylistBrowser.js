import React, { useContext, useRef, useState, useEffect } from "react";

import Playlist from "../components/Playlist";

import { PlaylistStore } from "../context/ContextProvider";
import { convertTracks } from "../data/trackConverter.js";
import {IoIosSave} from 'react-icons/io'
import Tracklist from './Tracklist'
const PlaylistBrowser = ({playlists, title}) => {
  const contextStore = useContext(PlaylistStore);

  const { fetchData, state } = contextStore;
  const { page } = state;
  const playlistScroll = useRef(null);
  const [playlistTitle, setPlaylistTitle] = useState([]);
  const [playlistDesc, setPlaylistDesc] = useState([]);
  const [playlistImage, setPlaylistImage] = useState([]);
  const [tracks, setTracks] = useState([]);


  const getPlaylistDetails = (playlist, firstStart) => {
    const top = playlistScroll.current.offsetTop;
    if (!firstStart) {
      page.scrollTo(0, top - 20);
    }

    const { tracks, title, description, image } = playlist;
    setPlaylistTitle(title);
    setPlaylistDesc(description);
    setPlaylistImage(image);

    fetchData(tracks + '?limit=50', "GET").then(data => {
      const tracklist = convertTracks(data);
      setTracks(tracklist);
    });
  };


  useEffect(() => {
    getPlaylistDetails(playlists[0], true);
  }, []);

  return (
    <div ref={playlistScroll} className="playlist-browser">
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
        <div className="save-wrap">
        <h2>{playlistTitle} playlist</h2>
        <div className="save">
        <IoIosSave className="icon" />
        {/* <p>{'save'}</p> */}
        </div>
          
        </div>
        <div className="tracklist-bar">
          <div className="image-wrap">
            <img src={playlistImage} alt={playlistTitle} />
          </div>

          <div className="text-wrap">
            <h1>{playlistTitle}</h1>
            <h3>{playlistDesc}</h3>
          </div>
        </div>
         <Tracklist tracklist={tracks} />
      </div>
    </div>
  );
};

export default PlaylistBrowser;
