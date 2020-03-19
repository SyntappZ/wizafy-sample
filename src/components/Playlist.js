import React from 'react'

const Playlist = ({ playlist }) => {
    const {image, title} = playlist
  return (
    <div className="playlist">
      <img src={image} alt="playlist" />
      <div className="cover">
      <h3>{title}</h3>
      </div>
    </div>
  );
};

export default Playlist
