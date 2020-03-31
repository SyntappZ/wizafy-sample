import React, { useContext } from "react";
import { PlaylistStore } from "../context/ContextProvider";

const Album = ({ album }) => {
  const contextStore = useContext(PlaylistStore);
  const { dispatch } = contextStore;

  const setAlbum = () => {
    dispatch({ type: "setSelectedPlaylist", payload: album });
  };
  return (
    <div className="album">
      <div className="image-wrap" onClick={setAlbum}>
        <img src={album.image} alt={`${album.title} album art`} />
      </div>
      <p>{album.title.split('-')[0]}</p>
    </div>
  );
};

export default Album;
