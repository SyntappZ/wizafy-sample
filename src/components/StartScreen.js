import React, { useState } from "react";
import Loading from "./Loading";
import { MdPerson, MdArrowDownward } from "react-icons/md";
import { serverUrl } from "../serverUrl";

const StartScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loginToSpoify = () => {
    setIsLoading(true);
    return (window.location = serverUrl);
  };
  return (
    <div className="start-screen">
      <div className="background"></div>
      <div className="top">
        <div className="wrap">
          <h1 style={{ color: "white" }}>welcome to playlist wizard</h1>
          <h3>sign in to spotify for wizardry</h3>
          <MdArrowDownward className="down-arrow" />
          <div
            onClick={loginToSpoify}
            className="btn"
            style={{ background: "white" }}
          >
            <MdPerson
              className="icon"
              style={{ fontSize: "22px", color: "#554fd8" }}
            />
            <p style={{ color: "#554fd8" }}>sign in</p>
          </div>
        </div>
      </div>

      <div className="bottom">{isLoading ? <Loading /> : <Features />}</div>
    </div>
  );
};

export default StartScreen;

const Features = () => {
  const arr = [1, 2, 3, 4, 5, 6];
  return (
    <div className="features">
      <div className="wrap">
        {arr.map((feature) => {
          return <Feature key={feature} />;
        })}
      </div>
    </div>
  );
};

const Feature = () => {
  return <div className="feature"></div>;
};
