import React from "react";

const Playlist = ({ playlist, getPlaylistDetails }) => {
  const { image, title } = playlist;

  const playlistTitle = title.length > 35 ? title.slice(0, 35) + '...' : title
  return (
    <div className="playlist" onClick={() => getPlaylistDetails(playlist)}>
      <img src={image} alt="playlist" />
      <div className="cover">
        <h3>{playlistTitle}</h3>
      </div>
    </div>
  );
};

export default Playlist;
