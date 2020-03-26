import React, { useContext, useState, useEffect } from "react";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { PlaylistStore } from "../context/ContextProvider";
import Playlist from "../components/Playlist";
import TrackFull from "../components/TrackFull";
import Lottie from "react-lottie";
import heartBeat from "../images/heartBeat.json";

const CategoryPlaylists = () => {
  const history = useHistory();
  const contextStore = useContext(PlaylistStore);
  const { fetchData, state } = contextStore;
  const { selectedCategory, page } = state;
  const { title, playlists, image } = selectedCategory;
  const [tracks, setTracks] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState([]);
  const [playlistDesc, setPlaylistDesc] = useState([]);
  const [playlistImage, setPlaylistImage] = useState([]);

  const durationConverter = millis => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const getPlaylistDetails = (playlist, firstStart) => {
    if (!firstStart) {
      page.scrollTo(0, 470);
    }

    const { tracks, title, description, image } = playlist;
    setPlaylistTitle(title);
    setPlaylistDesc(description);
    setPlaylistImage(image);

    fetchData(tracks, "GET").then(data => {
      const tracklist = data.items.map(track => {
        track = track.track;
        return {
          id: track.id,
          title: track.name.split("-")[0],
          artist: track.artists ? track.artists[0].name.split("-")[0] : "none",
          image: track.album.images[1].url,
          duration: durationConverter(track.duration_ms),
          preview: track.preview_url,
          uri: track.uri,
          href: track.href
        };
      });
      setTracks(tracklist);
    });
  };

  useEffect(() => {
    getPlaylistDetails(playlists[0], true);
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: heartBeat,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  // console.log(playlistDesc)

  return (
    <div className="category-playlist">
      <FaRegArrowAltCircleLeft
        className="back-icon"
        onClick={() => history.goBack()}
      />
      <div className="top">
        <div className="details-bar">
          <div className="left">
            <div className="image-wrap">
              <img src={image} alt={title} />
              <div className="lottie">
                <Lottie
                  speed={0.7}
                  delay={1000}
                  options={defaultOptions}
                  height={200}
                  width={200}
                />
              </div>
            </div>
          </div>
          <div className="right">
            <div className="text-wrap">
              <h2>Category</h2>
              <h1>{title}</h1>
              <h3>All of {title}'s playlists</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="playlists-wrap">
        <div className="left">
          <h1 className="title">{title} playlists</h1>
          {playlists.map((playlist, i) => (
            <Playlist
              playlist={playlist}
              key={i}
              getPlaylistDetails={getPlaylistDetails}
            />
          ))}
        </div>
        <div className="right">
          <h1 className="title">{playlistTitle} playlist</h1>
          <div className="tracklist-bar">
            <div className="image-wrap">
              <img src={playlistImage} alt={playlistTitle} />
            </div>

            <div className="text-wrap">
              <h1>{playlistTitle}</h1>
              <h3>{playlistDesc}</h3>
            </div>
          </div>

          {tracks.map((track, i) => {
            return (
              <TrackFull
                key={i}
                title={track.title}
                artist={track.artist}
                image={track.image}
                duration={track.duration}
                // isFavorite={false}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryPlaylists;
