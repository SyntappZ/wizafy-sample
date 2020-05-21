import React, { useRef } from "react";
import { FiSearch, FiSettings } from "react-icons/fi";
const Search = ({}) => {
  const inputRef = useRef(null);

  return (
    <div className="search">
      <div className="search-wrap">
        <FiSearch className="icon" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for song, artists etc..."
        />
      </div>
      <div className="settings-wrap">
        <p>Settings</p>
        <FiSettings className="icon" />
      </div>
    </div>
  );
};

export default Search;
