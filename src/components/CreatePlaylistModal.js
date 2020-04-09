import React from "react";
import { MdClose } from "react-icons/md";
import { GoCloudUpload } from "react-icons/go";

const CreatePlaylistModal = ({ closeModal }) => {
  return (
    <div className="create-playlist-modal">
      <div className="modal">
        <div className="close">
          <p></p>
          <h2>Create Playlist</h2>
          <MdClose
            onClick={closeModal}
            style={{ fontSize: 30, cursor: "pointer" }}
          />
        </div>
        <div className="wrap">
          <div className="upload-image">
            <GoCloudUpload style={{ fontSize: 40 }} />

            <h3>Upload image</h3>
          </div>
          <div className="input-wrap">
            <label className="label">title</label>
            <div className="search-wrap">
              <input
                // ref={inputRef}
                type="text"
                placeholder="Choose Playlist Title..."
              />
            </div>
            <label className="label">description</label>
            <div className="description-box">
              <textarea placeholder="Describe your playlist..." maxLength="30"></textarea>
            </div>
          </div>
        </div>
        <div className="send">
          <div className="btn">
            <p>create</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylistModal
