import React, { useContext, useEffect, useState } from "react";
import { PlaylistStore } from "../context/ContextProvider";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import SaveButton from "./SaveButton";
import {
  fadeInRight,
  fadeInUp,
  fadeIn,
  fadeInLeft,
  scaleUp,
} from "../data/animations.js";
const Menu = ({ addToPlaylist, setMenuOpen, newPlaylist, track }) => {
  const contextStore = useContext(PlaylistStore);
  const { state, dispatch } = contextStore;
  const { myPlaylists } = state;
  const [playlists, setPlaylists] = useState([]);
  const closeMenu = () => setMenuOpen(false);
  const createNewPlaylist = () => {
    if (newPlaylist) {
      dispatch({ type: "setGeneratedPlaylist", payload: newPlaylist });
    } else {
      dispatch({ type: "setGeneratedPlaylist", payload: [track] });
    }
    closeMenu()
  };

  useEffect(() => {
    const temp = [...myPlaylists];
    let playlistObject = {};
    let arr = [];
    let num = 0;
    let count = 0;
    temp.forEach((playlist, i) => {
      arr.push(playlist);
      count++;
      if (i % 6 === 0) {
        playlistObject[num] = arr;
        num++;
        arr = [];
        count = 0;
      }
    });
    if (count) {
      let rev = temp.reverse().slice(0, count);
      rev.forEach((item) => {
        playlistObject[0].push(item);
      });
    }
    const convert = Object.values(playlistObject);
    setPlaylists(convert);
  }, [myPlaylists]);

  

  const pos = newPlaylist
    ? { position: "absolute" }
    : { top: "50%", right: "50%", position: "absolute" };

  const amount = newPlaylist ? newPlaylist.length : 1;

  return (
    <motion.div
      className="menu"
      style={pos}
      initial={fadeInRight.initial}
      animate={fadeInRight.animate}
      transition={fadeInRight.transition}
    >
      <div className="title-container">
        <p>{amount} tracks</p>
        <h3>Add to playlist</h3>
        <div className="close-wrap" onClick={closeMenu}>
          <MdClose style={{ fontSize: "20px" }} />
        </div>
      </div>

      <div className="playlist-wrap">
        {playlists.map((lists, i) => (
          <Section key={i} playlists={lists} addToPlaylist={addToPlaylist} />
        ))}
      </div>
      <div className="create-new">
        <SaveButton
          showButton={true}
          savePlaylist={createNewPlaylist}
          title={"Create playlist "}
        />
      </div>
    </motion.div>
  );
};

const Title = ({ title, id, sendId }) => {
  title = title.length > 25 ? title.slice(0, 25) + "..." : title;
  return (
    <div className="playlist-title" onClick={() => sendId(id, title)}>
      <h4>{title}</h4>
    </div>
  );
};

const Section = ({ playlists, addToPlaylist }) => {
  return (
    <div className="section">
      {playlists.map((list, i) => {
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
  );
};

export default Menu;
