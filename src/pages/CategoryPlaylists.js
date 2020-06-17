import React, { useContext } from "react";

import { PlaylistStore } from "../context/ContextProvider";
import Details from "../components/Details";

import PlaylistBrowser from "../components/PlaylistBrowser";

const CategoryPlaylists = () => {
  const contextStore = useContext(PlaylistStore);
  const { state } = contextStore;
  const { selectedCategory } = state;
  const { title, playlists, image } = selectedCategory;

  const setStartAnimation = () => {};

  return (
    <div className="wrap">
      <Details
        title={title}
        image={image}
        category={true}
        setStartAnimation={setStartAnimation}
        cornerTitle={`${playlists.length} Playlists`}
      />
      <PlaylistBrowser playlists={playlists} title={title} />
    </div>
  );
};

export default CategoryPlaylists;
