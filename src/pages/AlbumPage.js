import React, { useContext, useState, useEffect } from "react";
import { PlaylistStore } from "../context/ContextProvider";
import Details from "../components/Details";
import TrackList from "../components/TrackList";
import SaveButton from "../components/SaveButton";
import { convertTracks } from "../data/trackConverter.js";
import { motion } from "framer-motion";
import { fadeInFast } from "../data/animations.js";
const AlbumPage = () => {
  const contextStore = useContext(PlaylistStore);
  const [playlistTracks, setTracks] = useState([]);
  const [startAnimation, setStartAnimation] = useState(false);
  const {
    state,
    fetchData,
    putData,
    setToastMessage,
    refreshData,
    dispatch,
  } = contextStore;
  const { isCreated, isFeatured, userId } = state;
  const { image, title, tracks, description, id } = state.selectedPlaylist;
  const [next, setNext] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const savedCheck = async () => {
    const url = isFeatured
      ? `https://api.spotify.com/v1/playlists/${id}/followers/contains?ids=${userId}`
      : `https://api.spotify.com/v1/me/albums/contains?ids=${id}`;
    const data = await fetchData(url, "GET");
    setIsSaved(data[0]);
  };

  const albumHandler = async (method) => {
    const url = `https://api.spotify.com/v1/me/albums`;
    const body = [id];
    const del = method === "DELETE";
    const data = await putData(url, method, body);
    if (data.status === 200) {
      const message = del ? "Album removed." : "Album added.";
      setToastMessage(message);
      setIsSaved(!del);
    } else {
      console.log("error code" + data.status);
    }
    refreshData("albums");
  };

  const playlistHandler = async (method) => {
    const url = `https://api.spotify.com/v1/playlists/${id}/followers`;
    const del = method === "DELETE";

    const data = await putData(url, method);
    if (data.status === 200) {
      const message = del ? "Playlist removed." : "playlist added.";
      setToastMessage(message);
      setIsSaved(!del);
    } else {
      console.log("error code" + data.status);
    }
    dispatch({ type: "setFeatured", payload: false });
    refreshData("playlists");
  };

  const updateNext = (newNext) => {
    setNext(newNext);
  };

  useEffect(() => {
    savedCheck();
    fetchData(tracks + "?limit=50", "GET").then((data) => {
      setNext(data.next);
      data = data.items || data.tracks.items;

      const list = convertTracks(data, image);
      setTracks(list);
    });
  }, []);

  return (
    <motion.div
      className="albumPage"
      initial={fadeInFast.initial}
      animate={fadeInFast.animate}
      transition={fadeInFast.transition}
    >
      <Details
        title={title}
        image={image}
        description={description}
        id={id}
        setStartAnimation={setStartAnimation}
        cornerTitle={`${playlistTracks.length} Tracks`}
      />
      <div className="save-btn-wrap">
        <h1 className="title">{title} Tracks</h1>
        {isFeatured ? (
          <SaveButton
            showButton={isCreated}
            savePlaylist={() => playlistHandler(isSaved ? "DELETE" : "PUT")}
            title={isSaved ? "remove playlist" : "save playlist"}
            isSaved={isSaved}
          />
        ) : (
          <SaveButton
            showButton={isCreated}
            savePlaylist={() => albumHandler(isSaved ? "DELETE" : "PUT")}
            title={isSaved ? "remove album" : "save album"}
            isSaved={isSaved}
          />
        )}
      </div>

      <TrackList
        tracklist={playlistTracks}
        next={next}
        updateNext={updateNext}
        startAnimation={startAnimation}
      />
    </motion.div>
  );
};

export default AlbumPage;
