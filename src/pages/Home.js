import React, { useEffect, useState, useContext } from "react";
import { MdPerson, MdArrowDownward, MdArrowForward } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

import { PlaylistStore } from "../context/ContextProvider";
import LoadingScreen from "../components/LoadingScreen";
import Tracklist from "../components/Tracklist";
import { serverUrl } from "../serverUrl";
import TrackScroller from "../components/TrackScroller";
// import im from "../images/tempAlbum.jpg";
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

  const { loadMoreTracks, dispatch, state, favoriteCheck } = contextStore;
  const {
    myTopTracks,
    profileImage,
    username,
    favorites,
    moreFavorites,
    moreTopTracks
  } = state;
  const [years, setYears] = useState([]);
  const [next, setNext] = useState('')

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

  
  useEffect(() => {
    setNext(moreFavorites)
  }, [moreFavorites])

  const updateNext = (newNext) => {
    setNext(newNext)
  }

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

  const logout = () => {
    // dispatch({ type: "logout" });
    
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
              <a className="logout" href="https://spotify.com/logout">
                <p>Logout</p>
                <FiLogOut />
              </a>
              <img src={profileImage} alt="profile" />
            </div>
          </div>
          <div className="wrap" style={{ paddingTop: "20px" }}>
            <TrackScroller
              title="my top tracks"
              loadMoreTracks={loadMoreTopTracks}
              tracks={myTopTracks}
              album={null}
            />
          </div>

          <div className="favorites">
            <div className="title-wrap">
              <h1 className="title">My Favorites</h1>
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
            <Tracklist
              tracklist={favoriteTracks}
              favorites={true}
              next={next}
              updateNext={updateNext}
            />
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
