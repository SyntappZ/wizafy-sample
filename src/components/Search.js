import React, { useRef, useContext, useState, useEffect } from "react";
import { FiSearch, FiSettings } from "react-icons/fi";
import { PlaylistStore } from "../context/ContextProvider";

const Search = ({ isPlaylists, inputValue, placeholder }) => {
  const contextStore = useContext(PlaylistStore);
  const inputRef = useRef(null);
  const [search, setSearch] = useState(null);
  const { fetchData, state, dispatch } = contextStore;

  useEffect(() => {
    if (!search && !state.savedSearch) {
      dispatch({ type: "clearSearch" });
    }
  }, [search]);

  const searchInput = async (e) => {
    const val = inputRef.current.value;
    setSearch(val);
    inputValue(val);
    const url = `https://api.spotify.com/v1/search?q=${val}&type=${
      isPlaylists ? "album,playlist" : "track&limit=50"
    }`;
    if (e.keyCode === 13) {
      const data = await fetchData(url);

      if (!data.error) {
        isPlaylists
          ? dispatch({ type: "setSearchData", payload: { data, val } })
          : dispatch({ type: "setSearchTracks", payload: { data, val } });
      } else {
        alert(data.error.message);
      }
    }
  };

  return (
    <div className="search">
      <div className="search-wrap">
        <FiSearch className="icon" />
        <input
          onKeyUp={searchInput}
          ref={inputRef}
          type="text"
          placeholder={placeholder}
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
