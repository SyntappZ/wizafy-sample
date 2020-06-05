import React, { useContext } from "react";
import { PlaylistStore } from "../context/ContextProvider";

const Album = ({ album, created }) => {
  const contextStore = useContext(PlaylistStore);
  const { dispatch } = contextStore;

  const setAlbum = () => {
    dispatch({ type: "setSelectedPlaylist", payload: album });
    dispatch({ type: "setIsCreated", payload: !created });
    
  };

  const title = album.title.length > 20 ? album.title.slice(0, 20) + '...' : album.title 
  return (
    <div className="album">
      <div className="image-wrap" onClick={setAlbum}>
        <img src={album.image} alt={`${album.title} album art`} />
      </div>
      <p>{title}</p>
    </div>
  );
};

export default Album;
