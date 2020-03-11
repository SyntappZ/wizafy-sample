import React, { useEffect, useContext } from "react";
import { MdPerson, MdArrowDownward } from "react-icons/md";
import { PlaylistStore } from "../context/ContextProvider";
import LoadingScreen from '../components/LoadingScreen'

import { serverUrl } from '../serverUrl'
const Home = () => {
  const contextStore = useContext(PlaylistStore);
  const { signedIn, isloading } = contextStore.state
  return signedIn ? <HomeContent /> : <SignIn />;
};

export default Home;



const HomeContent = () => {
  return <div className="home">
     <LoadingScreen />
  </div>;
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
