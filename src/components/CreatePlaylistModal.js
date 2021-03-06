import React, { useEffect, useState, useContext, useRef } from "react";
import { MdClose } from "react-icons/md";
import { IoMdSave } from "react-icons/io";
import { PlaylistStore } from "../context/ContextProvider";
import ToggleSwitch from "./ToggleSwitch";
import { motion } from "framer-motion";
import { fadeInFast } from "../data/animations.js";
const CreatePlaylistModal = () => {
  const contextStore = useContext(PlaylistStore);
  const {
    sendData,
    state,
    refreshData,
    dispatch,
    toggleModal,
    setToastMessage,
  } = contextStore;
  const { generatedPlaylist, userId, modalOpen } = state;
  const titleRef = useRef("");
  const descriptionRef = useRef("");
  const [tracksAmount, setTracksAmount] = useState(0);
  const [isPublic, setPublic] = useState(true);

  const addToPlaylist = (playlistId, uris) => {
    const body = { uris: uris };
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    sendData(url, "POST", body).then((data) => {
      refreshData("playlists");
      setToastMessage("Playlist added.");
      dispatch({ type: "setGeneratedPlaylist", payload: null });
      toggleModal();
    });
  };

  const createPlaylist = () => {
    const name = titleRef.current.value;
    const description = descriptionRef.current.value;
    const body = { name: name, description: description, public: isPublic };
    const url = `https://api.spotify.com/v1/users/${userId}/playlists`;

    sendData(url, "POST", body).then((data) => {
      if (tracksAmount) {
        const playlistId = data.id;
        addToPlaylist(playlistId, generatedPlaylist);
      } else {
        refreshData("playlists");
        setToastMessage("Playlist created.");
        toggleModal();
      }
    });
  };

  const closeModal = () => {
    toggleModal();
    dispatch({ type: "setGeneratedPlaylist", payload: null });
  };

  const toggleHandler = () => setPublic(!isPublic);

  useEffect(() => {
    setTracksAmount(generatedPlaylist.length);
  }, [generatedPlaylist]);
  return (
    <>
      {modalOpen ? (
        <motion.div
          className="create-playlist-modal"
          initial={fadeInFast.initial}
          animate={fadeInFast.animate}
          transition={fadeInFast.transition}
        >
          <div className="modal">
            <div className="close">
              <p></p>
              <h2>Create Playlist</h2>
              <MdClose
                onClick={closeModal}
                style={{ fontSize: 20, cursor: "pointer" }}
              />
            </div>
            <div className="wrap">
              <div className="input-wrap">
                <label className="label">title</label>
                <div className="search-wrap">
                  <input
                    ref={titleRef}
                    type="text"
                    placeholder="Choose Playlist Title..."
                  />
                </div>
                <label className="label">description</label>
                <div className="description-box">
                  <textarea
                    ref={descriptionRef}
                    placeholder="Describe your playlist..."
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="send">
              <div className="public-switch">
                <p className="tracks-added">{tracksAmount} Tracks Added</p>
                <div
                  style={{
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <p style={{ marginRight: "5px" }}>private</p>
                  <ToggleSwitch setIsChecked={toggleHandler} />
                </div>
              </div>

              <div className="btn" onClick={createPlaylist}>
                <IoMdSave style={{ fontSize: "20px" }} />
                <p>save</p>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </>
  );
};

export default CreatePlaylistModal;
