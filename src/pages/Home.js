import React, { useEffect, useState, useContext } from "react";
import { MdPerson, MdArrowDownward, MdArrowForward } from "react-icons/md";
import { FiLogOut, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import TrackFull from "../components/TrackFull";
import { PlaylistStore } from "../context/ContextProvider";
import LoadingScreen from "../components/LoadingScreen";
import Track from "../components/Track";
import { serverUrl } from "../serverUrl";
import im from "../images/tempAlbum.jpg";
const Home = () => {
  const [years, setYears] = useState([]);

  const contextStore = useContext(PlaylistStore);
  const {
    signedIn,
    myTopTracks,
    profileImage,
    username,
    albums,
    favorites
  } = contextStore.state;

  useEffect(() => {
    const arr = ["All"];
    favorites.forEach(track => {
      if (!arr.includes(track.year)) {
        arr.push(track.year);
      }
    });
    setYears(arr);
  }, [favorites]);

  return signedIn ? (
    <HomeContent
      albums={albums}
      profileImage={profileImage}
      myTopTracks={myTopTracks}
      username={username}
      years={years}
      favorites={favorites}
    />
  ) : (
    <SignIn />
  );
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

const HomeContent = ({
  myTopTracks,
  years,
  username,
  albums,
  profileImage,
  favorites
}) => {
  const [currentYear, setCurrentYear] = useState("All");
  const [favoriteTracks, setFavoriteTracks] = useState([]);

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
              <div className="logout">
                <p>Logout</p>
                <FiLogOut />
              </div>
              <img src={profileImage} alt="profile" />
            </div>
          </div>

          <div className="top-tracks">
            <div className="title-wrap">
              <h1>top played tracks</h1>
              <div className="scroll-buttons">
                <div>
                  <FiChevronLeft />
                </div>
                <div>
                  <FiChevronRight />
                </div>
              </div>
            </div>

            <div className="myTopTracks">
              {myTopTracks.map((track, i) => {
                return (
                  <Track
                    key={i}
                    img={track.image}
                    title={track.title.split("-")[0]}
                  />
                );
              })}
            </div>
          </div>

          <div className="favorites">
            <div className="title-wrap">
              <h1>My Favorites</h1>
              <div className="favorite-dates">
                {years.map(year => (
                  <Year
                    changeCurrentYear={changeCurrentYear}
                    currentYear={currentYear}
                    date={year}
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
