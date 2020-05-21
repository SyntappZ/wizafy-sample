import React, { useEffect, useState, useContext, useRef } from "react";
import { MdClose } from "react-icons/md";
import { PlaylistStore } from "../context/ContextProvider";
const CreatePlaylistModal = ({ closeModal }) => {
  const contextStore = useContext(PlaylistStore);
  const { sendData, state, refreshData, dispatch } = contextStore;
  const { generatedPlaylist, userId } = state;
  const titleRef = useRef("");
  const descriptionRef = useRef("");
  const [tracksAmount, setTracksAmount] = useState(0);

  const addToPlaylist = (playlistId, uris) => {
    const body = { uris: uris };
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    sendData(url, "POST", body).then((data) => {
      refreshData("playlists");
      dispatch({ type: "setGeneratedPlaylist", payload: null });
      closeModal();
    });
  };

  const createPlaylist = () => {
    const name = titleRef.current.value;
    const description = descriptionRef.current.value;
    const body = { name: name, description: description };
    const url = `https://api.spotify.com/v1/users/${userId}/playlists`;

    sendData(url, "POST", body).then((data) => {
      if (tracksAmount) {
        const playlistId = data.id;
        addToPlaylist(playlistId, generatedPlaylist);
      } else {
        refreshData("playlists");
        closeModal();
      }
    });
  };

  useEffect(() => {
    setTracksAmount(generatedPlaylist.length);
  }, [generatedPlaylist]);
  return (
    <div className="create-playlist-modal">
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
          <p className="tracks-added">{tracksAmount} Tracks Added</p>
          <div className="btn" onClick={createPlaylist}>
            <p>create</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
