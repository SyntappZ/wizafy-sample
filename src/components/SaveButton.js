import React from "react";
import { MdPlaylistAdd, MdPlaylistAddCheck } from "react-icons/md";
const SaveButton = ({ showButton, savePlaylist, title, isSaved }) => {

  return (
    <>
      {showButton ? (
        <div className="save-button" onClick={savePlaylist}>
          <p>{title}</p>
          {isSaved ? <MdPlaylistAddCheck style={{ fontSize: "18px", color: "grey" }} /> : <MdPlaylistAdd style={{ fontSize: "18px", color: "grey" }} /> }
          
        </div>
      ) : null}
    </>
  );
};

export default SaveButton;
