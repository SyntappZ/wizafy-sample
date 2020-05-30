import React, { useContext, useRef, useState, useEffect } from "react";

import Playlist from "../components/Playlist";

import { PlaylistStore } from "../context/ContextProvider";
import { convertTracks } from "../data/trackConverter.js";
import SaveButton from "./SaveButton";
import TrackList from "./TrackList";
import Toast from "./Toast";
const PlaylistBrowser = ({ playlists, title }) => {
  const contextStore = useContext(PlaylistStore);

  const {
    fetchData,
    state,
    putData,
    refreshData,
    setToastMessage,
  } = contextStore;
  const { page, userId } = state;
  const playlistScroll = useRef(null);
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [playlistDesc, setPlaylistDesc] = useState("");
  const [playlistImage, setPlaylistImage] = useState("");
  const [playlistId, setPlaylistId] = useState("");
  const [next, setNext] = useState("");
  const [tracks, setTracks] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  const savedCheck = async (playlistId) => {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/followers/contains?ids=${userId}`;
    const data = await fetchData(url, "GET");
    setIsSaved(data[0]);
  };
  const getPlaylistDetails = (playlist, firstStart) => {
    const top = playlistScroll.current.offsetTop;
    if (!firstStart) {
      page.scrollTo(0, top - 20);
    }

    const { tracks, title, description, image, id } = playlist;

    setPlaylistTitle(title);
    setPlaylistDesc(description);
    setPlaylistImage(image);
    setPlaylistId(id);
    savedCheck(id);

    fetchData(tracks + "?limit=50", "GET").then((data) => {
      setNext(data.next);

      const tracklist = convertTracks(data.items);

      setTracks(tracklist);
    });
  };

  const playlistHandler = async (method) => {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/followers`;
    const del = method === "DELETE";

    const data = await putData(url, method);
    if (data.status === 200) {
      const message = del ? "Playlist removed." : "playlist added.";
      setToastMessage(message);
      setIsSaved(!del);
    } else {
      console.log("error code" + data.status);
    }
    refreshData("playlists");
  };

  const updateNext = (newNext) => {
    setNext(newNext);
  };

  useEffect(() => {
    getPlaylistDetails(playlists[0], true);
  }, [playlists]);

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
            <h3>{tracks.length} Tracks</h3>
          </div>
        </div>
        <div className="tracklist-bar">
          <div className="image-wrap">
            <img src={playlistImage} alt={playlistTitle} />
          </div>

          <div className="text-wrap">
            <div style={{ paddingRight: "50px" }}>
              <h1>{playlistTitle}</h1>
              <h3>{playlistDesc}</h3>
            </div>

            <SaveButton
              showButton={tracks.length > 0}
              savePlaylist={() => playlistHandler(isSaved ? "DELETE" : "PUT")}
              title={isSaved ? "remove playlist" : "save playlist"}
              isSaved={isSaved}
            />
          </div>
        </div>
        <TrackList tracklist={tracks} next={next} updateNext={updateNext} />
      </div>
    </div>
  );
};

export default PlaylistBrowser;
