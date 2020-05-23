import React, { useContext } from "react";
import { PlaylistStore } from "../context/ContextProvider";

const Menu = ({ addToPlaylist, setMenuOpen }) => {
  const contextStore = useContext(PlaylistStore);
  const { myPlaylists } = contextStore.state;

  return (
    <div className="menu" onMouseLeave={() => setMenuOpen(false)}>
      <h3>Add to playlist</h3>
      <div className="playlist-wrap">
        {myPlaylists.map((list, i) => {
          return (
            <Title
              title={list.title.split("-")[0]}
              key={i}
              sendId={addToPlaylist}
              id={list.id}
            />
          );
        })}
      </div>
    </div>
  );
};

const Title = ({ title, id, sendId }) => (
  <div className="playlist-title" onClick={() => sendId(id)}>
    <h4>{title}</h4>
  </div>
);

export default Menu;
