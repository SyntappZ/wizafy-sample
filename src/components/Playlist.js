import React from 'react'

const Playlist = ({ playlist, getPlaylistDetails }) => {
    const {image, title} = playlist
  return (
    <div className="playlist" onClick={() => getPlaylistDetails(playlist)}>
      <img src={image} alt="playlist" />
      <div className="cover">
      <h3>{title}</h3>
      </div>
    </div>
  );
};

export default Playlist
