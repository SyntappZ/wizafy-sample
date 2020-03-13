import React, { useEffect, useContext } from "react";
import { MdPerson, MdArrowDownward, MdArrowForward } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

import { PlaylistStore } from "../context/ContextProvider";
import LoadingScreen from "../components/LoadingScreen";
import Track from "../components/Track";
import { serverUrl } from "../serverUrl";
import im from "../images/tempProfile.jpg";
const Home = () => {
  const contextStore = useContext(PlaylistStore);
  const {
    signedIn,
    myTopTracks,
    profileImage,
    username,
    albums
  } = contextStore.state;

  return signedIn ? (
    <HomeContent
      albums={albums}
      profileImage={profileImage}
      myTopTracks={myTopTracks}
      username={username}
    />
  ) : (
    <SignIn />
  );
};

export default Home;

const HomeContent = ({ myTopTracks, username, albums, profileImage }) => {
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
            <h1 className="title">top played tracks</h1>
            
            <div className="myTopTracks">
              {myTopTracks.map(track => {
                return (
                  <Track
                    img={track.image.url}
                    title={track.title.split("-")[0]}
                  />
                );
              })}
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
