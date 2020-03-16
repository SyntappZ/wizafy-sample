import React, { useEffect, useState, useContext } from "react";
import { MdPerson, MdArrowDownward, MdArrowForward } from "react-icons/md";
import { FiLogOut, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import TrackFull from "../components/TrackFull";
import { PlaylistStore } from "../context/ContextProvider";
import LoadingScreen from "../components/LoadingScreen";
import Track from "../components/Track";
import { serverUrl } from "../serverUrl";
import TrackScroller from "../components/TrackScroller";
import im from "../images/tempAlbum.jpg";
const Home = () => {
  const contextStore = useContext(PlaylistStore);
  const { accessToken } = contextStore.state;

  return accessToken ? <HomeContent /> : <SignIn />;
};

export default Home;

const Year = ({ date, currentYear, changeCurrentYear }) => {
  return (
    <div
      onClick={() => changeCurrentYear(date)}
      className={currentYear === date ? "date current-date" : "date"}
    >
      {date}
    </div>
  );
};

const HomeContent = () => {
  const contextStore = useContext(PlaylistStore);
  const { loadMoreTracks, dispatch } = contextStore;
  const {
    myTopTracks,
    profileImage,
    username,
    favorites,
    moreFavorites,
    moreTopTracks
  } = contextStore.state;
  const [years, setYears] = useState([]);

  const [currentYear, setCurrentYear] = useState("All");
  const [favoriteTracks, setFavoriteTracks] = useState([]);

  useEffect(() => {
    const arr = ["All"];

    favorites.forEach(track => {
      if (!arr.includes(track.year)) {
        arr.push(track.year);
      }
    });
    setYears(arr);
  }, [favorites]);
  const changeCurrentYear = date => {
    setCurrentYear(date);
  };

  useEffect(() => {
    if (currentYear === "All") {
      setFavoriteTracks(favorites);
    } else {
      const tracks = favorites.filter(track => track.year === currentYear);
      setFavoriteTracks(tracks);
    }
  }, [currentYear, favorites]);

  const signOut = () => {
    dispatch({ type: "setAccessToken", payload: "" });
    dispatch({ type: "setProfileData", payload: [] });
    dispatch({ type: "setPlaylists", payload: [] });
    dispatch({ type: "setNewReleases", payload: [] });
    dispatch({ type: "favorites", payload: "logout" });
    dispatch({ type: "topTracks", payload: "logout" });
  };

  const loadMoreFavs = () => {
    loadMoreTracks(moreFavorites, "favorites");
  };
  const loadMoreTopTracks = () => {
    loadMoreTracks(moreTopTracks, "topTracks");
  };

  return (
    <>
      {myTopTracks.length > 0 ? (
        <div className="home">
          <div className="welcome">
            <div className="text-wrap">
              <div>
                <h1>playlist wizard</h1>
                <h2>Create or generate awesome playlists.</h2>
              </div>
              <div className="create">
                <h3>Create new playlist</h3>
                <MdArrowForward className="arrow" />
              </div>
            </div>
            <p className="username">{username}</p>
            <div className="image-section">
              <div className="logout" onClick={signOut}>
                <p>Logout</p>
                <FiLogOut />
              </div>
              <img src={profileImage} alt="profile" />
            </div>
          </div>

          <TrackScroller
            loadMoreTopTracks={loadMoreTopTracks}
            tracks={myTopTracks}
            album={null}
          />

          <div className="favorites">
            <div className="title-wrap">
              <h1>My Favorites</h1>
              <div className="favorite-dates">
                {years.map((year, i) => (
                  <Year
                    changeCurrentYear={changeCurrentYear}
                    currentYear={currentYear}
                    date={year}
                    key={i}
                  />
                ))}
              </div>
            </div>
            {favoriteTracks.map((track, i) => {
              
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
            <div className="load-more" onClick={loadMoreFavs}>
              load more
            </div>
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

const SignIn = () => {
  const loginToSpoify = () => {
    return (window.location = serverUrl);
  };
  return (
    <div className="signIn">
      <div className="wrap">
        <h1>welcome to playlist wizard</h1>
        <h3>sign in to spotify for wizardry</h3>
        <MdArrowDownward className="down-arrow" />
        <div onClick={loginToSpoify} className="btn">
          <MdPerson className="icon" />
          <p>sign in</p>
        </div>
      </div>
    </div>
  );
};
