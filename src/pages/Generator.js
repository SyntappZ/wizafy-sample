import React, { useState, useContext, useRef, useEffect } from "react";
import { PlaylistStore } from "../context/ContextProvider";
import { genres } from "../data/genres.js";
import { convertTracks } from "../data/trackConverter.js";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { attributeData } from "../data/categories.js";
import Slider from "rc-slider";
import TrackList from "../components/TrackList";
import TrackScroller from "../components/TrackScroller";
import SaveButton from "../components/SaveButton";
import ToggleSwitch from "../components/ToggleSwitch";
import Details from "../components/Details";
import Tooltip from "../components/Tooltip";
import { motion } from "framer-motion";
import Menu from "../components/Menu";
import tick from "../images/correct-check-animation.json";
import cross from "../images/incorrect-failed.json";
import Lottie from "react-lottie";

import { fadeInUp } from "../data/animations.js";

const Generator = () => {
  const contextStore = useContext(PlaylistStore);
  const [playlist, setPlaylist] = useState([]);
  const [amountValue, setAmountValue] = useState("");
  const [advAmountValue, setAdvAmountValue] = useState("");
  const {
    getRecomendations,
    state,
    dispatch,
    sendData,
    setToastMessage,
    loadMoreTracks,
  } = contextStore;
  const {
    topFiveIds,
    songToGenerate,
    myTopTracks,
    moreTopTracks,
    editPlaylist,
  } = state;
  const trackAmountRef = useRef("");
  const advTrackAmountRef = useRef("");
  const [showAdvanced, setAdvanced] = useState(false);
  const [genresArray, setGenresArray] = useState([]);
  const { title, image, id } = songToGenerate;
  const [attributes, setAttributes] = useState([]);
  const [startAnimation, setStartAnimation] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setAttributes(attributeData);
  }, [attributeData]);

  useEffect(() => {
    dispatch({ type: "setEditPlaylist", payload: playlist });
  }, [playlist]);

  const savePlaylist = () => setMenuOpen(!menuOpen);

  const loadMoreTopTracks = () => {
    loadMoreTracks(moreTopTracks, "topTracks");
  };

  const getAmountValue = () => {
    const limit = trackAmountRef.current.valueAsNumber;
    let val = limit > 50 ? 50 : limit;
    val = Number.isNaN(val) ? "" : val.toString();
    setAmountValue(val);
  };

  const getAdvAmountValue = () => {
    const limit = advTrackAmountRef.current.valueAsNumber;
    let val = limit > 50 ? 50 : limit;
    val = Number.isNaN(val) ? "" : val.toString();
    setAdvAmountValue(val);
  };

  const generateTopPlayed = async () => {
    const url = `&seed_tracks=${topFiveIds}`;
    if (topFiveIds.length > 0) {
      const data = await getRecomendations(url, amountValue);
      const tracks = convertTracks(data.tracks);
      clearList();
      setPlaylist(tracks);
      clearInput();
    }
  };

  const updateAttributeValue = (attribute) => {
    attributes[attribute.id].value = attribute.value;
  };

  const generateSingleSong = async () => {
    let convertedAttributes = "";
    attributes.forEach((attribute) => {
      if (attribute.value !== null) {
        const val = attribute.value == "1" ? "1.0" : attribute.value;
        convertedAttributes += `target_${attribute.title}=${val}&`;
      }
    });
    const url = `${convertedAttributes}seed_tracks=${id}`;

    const data = await getRecomendations(url, amountValue || advAmountValue);

    const tracks = convertTracks(data.tracks);

    clearList();
    setPlaylist(tracks);
    clearInput();
  };

  const generateAdvanced = async () => {
    let convertedAttributes = "";
    attributes.forEach((attribute) => {
      if (attribute.value !== null) {
        const val = attribute.value == "1" ? "1.0" : attribute.value;
        convertedAttributes += `target_${attribute.title}=${val}&`;
      }
    });

    const url = `${convertedAttributes}seed_genres=${genresArray}`;

    const data = await getRecomendations(url, advAmountValue);

    const tracks = convertTracks(data.tracks);
    clearList();
    setPlaylist(tracks);
    clearInput();
  };

  const clearInput = () => {
    setAmountValue("");
    setAdvAmountValue("");
  };

  const clearList = () => {
    setPlaylist([]);
  };

  const addToPlaylist = (playlistId, playlistTitle) => {
    const uris = editPlaylist.map((track) => track.uri);

    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${uris}`;
    sendData(url, "POST").then((message) => {
      if (message.error) {
        setToastMessage(` error ${message.error.message.split(":")[0]}`);
      } else {
        setToastMessage(
          ` added ${editPlaylist.length} tracks to ${playlistTitle}`
        );
      }

      setMenuOpen(false);
    });
  };

  const isSingleSong = Object.keys(songToGenerate).length > 0 ? true : false;

  useEffect(() => {
    clearList();
    setGenresArray([]);
    setAdvanced(false);
    return () => {
      setMenuOpen(false);
    };
  }, [isSingleSong, songToGenerate]);

  const openAdvanced = () => {
    setAdvanced(!showAdvanced);
  };

  return (
    <div className="wrap">
      {menuOpen ? (
        <div className="modal-wrap">
          <Menu
            addToPlaylist={addToPlaylist}
            setMenuOpen={setMenuOpen}
            newPlaylist={editPlaylist}
          />
        </div>
      ) : null}
      {isSingleSong ? (
        <div className="song-generator">
          <Details
            title={title}
            image={image}
            description={`Generate a playlist with song's like ${title}`}
            isGenerator={true}
            setStartAnimation={setStartAnimation}
            cornerTitle={`${editPlaylist.length} Tracks`}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <NumberInput
              inputRef={trackAmountRef}
              onChangeEvent={getAmountValue}
              amountValue={amountValue}
              buttonHandler={generateSingleSong}
            />

            <SaveButton
              showButton={editPlaylist.length > 0}
              savePlaylist={savePlaylist}
              title={"save playlist"}
            />
          </div>
          <div className="advanced">
            <div className="top" onClick={openAdvanced}>
              <h1>Attributes</h1>
              <div className="show">
                <h2>{showAdvanced ? "hide" : "show"}</h2>
                {showAdvanced ? (
                  <FiChevronUp style={{ fontSize: "24px", color: "#949494" }} />
                ) : (
                  <FiChevronDown
                    style={{ fontSize: "24px", color: "#949494" }}
                  />
                )}
              </div>
            </div>
            {showAdvanced ? (
              <>
                <Attributes
                  attributes={attributes}
                  updateAttributeValue={updateAttributeValue}
                />

                <NumberInput
                  inputRef={advTrackAmountRef}
                  onChangeEvent={getAdvAmountValue}
                  amountValue={advAmountValue}
                  buttonHandler={generateSingleSong}
                  advanced={true}
                />
              </>
            ) : null}
          </div>
          <TracksChosen chosenTracks={editPlaylist} />
          {showAdvanced && editPlaylist.length > 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <SaveButton
                showButton={editPlaylist.length > 0}
                savePlaylist={savePlaylist}
                title={"save playlist"}
              />
            </div>
          ) : null}
          {playlist.length > 0 ? (
            <div className="generated-tracks">
              <TrackList
                tracklist={editPlaylist}
                loadMore={null}
                favorites={false}
                next={null}
                startAnimation={startAnimation}
              />
            </div>
          ) : null}
        </div>
      ) : (
        <>
          <h4 className="gen-title">generator</h4>
          <TrackScroller
            title="my top played tracks"
            loadMoreTracks={loadMoreTopTracks}
            tracks={myTopTracks}
            album={null}
          />
          <motion.div
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={fadeInUp.transition}
            onAnimationComplete={() => setStartAnimation(true)}
          >
            <div className="basic">
              <div>
                <h1>Generate based on your top played tracks</h1>
                <NumberInput
                  inputRef={trackAmountRef}
                  onChangeEvent={getAmountValue}
                  amountValue={amountValue}
                  buttonHandler={generateTopPlayed}
                />
              </div>

              <SaveButton
                showButton={editPlaylist.length > 0}
                savePlaylist={savePlaylist}
                title={"save playlist"}
              />
            </div>
            <div className="advanced">
              <div className="top" onClick={openAdvanced}>
                <h1>Advanced</h1>
                <div className="show">
                  <h2>{showAdvanced ? "hide" : "show"}</h2>
                  {showAdvanced ? (
                    <FiChevronUp
                      style={{ fontSize: "24px", color: "#949494" }}
                    />
                  ) : (
                    <FiChevronDown
                      style={{ fontSize: "24px", color: "#949494" }}
                    />
                  )}
                </div>
              </div>

              {showAdvanced ? (
                <div className="generator-form">
                  <h1
                    style={{
                      fontSize: "25px",
                      color: "#333",
                      textAlign: "center",
                    }}
                  >
                    Genres
                  </h1>

                  <p
                    style={{
                      color: "#aaa",
                      textAlign: "center",
                    }}
                  >
                    Choose 1 or more genres to show attributes.
                  </p>

                  <Genres
                    genres={genres}
                    genresArray={genresArray}
                    setGenresArray={setGenresArray}
                  />
                  {genresArray.length > 0 ? (
                    <>
                      <Attributes
                        attributes={attributes}
                        updateAttributeValue={updateAttributeValue}
                      />
                      <NumberInput
                        inputRef={advTrackAmountRef}
                        onChangeEvent={getAdvAmountValue}
                        amountValue={advAmountValue}
                        buttonHandler={generateAdvanced}
                        advanced={true}
                      />
                    </>
                  ) : null}
                </div>
              ) : null}
            </div>
            <TracksChosen chosenTracks={editPlaylist} />
          </motion.div>

          {playlist.length > 0 && genresArray.length && showAdvanced > 0 ? (
            <div className="button-wrap">
              <h4>Tracks: {playlist.length}</h4>
              <SaveButton
                showButton={editPlaylist.length > 0}
                savePlaylist={savePlaylist}
                title={"save playlist"}
              />
            </div>
          ) : null}

          {playlist.length > 0 ? (
            <div className="generated-tracks">
              <TrackList
                tracklist={editPlaylist}
                loadMore={null}
                favorites={false}
                next={null}
                startAnimation={startAnimation}
              />
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Generator;

const TracksChosen = ({ chosenTracks }) => {
  const tickOptions = {
    loop: false,
    autoplay: true,
    animationData: tick,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const crossOptions = {
    loop: false,
    autoplay: true,
    animationData: cross,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="tracks-chosen">
      <div className="item" style={{ cursor: "default" }}>
        <Lottie options={tickOptions} width={60} height={60} />
        <h1>Tracks Added {chosenTracks.length}</h1>
      </div>

      <div className="item-wrap"></div>
    </div>
  );
};

const NumberInput = ({
  inputRef,
  onChangeEvent,
  amountValue,
  buttonHandler,
  advanced,
}) => {
  const keyPress = (e) => {
    if (e.keyCode == 13 && amountValue) {
      buttonHandler();
    }
  };

  return (
    <div
      className="number-wrap"
      style={advanced ? { margin: "30px auto 0 auto" } : null}
    >
      <input
        ref={inputRef}
        type="number"
        placeholder="track amount"
        min="0"
        default="0"
        max="50"
        onChange={onChangeEvent}
        value={amountValue}
        onKeyDown={keyPress}
      />
      <div onClick={amountValue ? buttonHandler : null} className="btn">
        generate
      </div>
    </div>
  );
};

const Attributes = ({ attributes, updateAttributeValue }) => {
  return (
    <div className="attributes">
      <h1
        style={{
          marginTop: "50px",
          fontSize: "25px",
          color: "#333",
          textAlign: "center",
        }}
      >
        attributes
      </h1>
      <p
        style={{
          color: "#aaa",
          textAlign: "center",
        }}
      >
        Hover over the title for information.
      </p>

      <div className="sliders">
        {attributes.map((attribute, i) => {
          if (attribute.title !== "popularity") {
            return (
              <TuneableAttribute
                key={i}
                id={i}
                title={attribute.title}
                info={attribute.info}
                value={attribute.value}
                updateAttributeValue={updateAttributeValue}
              />
            );
          }
        })}
      </div>
      <div className="popularity">
        <TuneableAttribute
          id={6}
          title={attributes[6].title}
          info={attributes[6].info}
          value={attributes[6].value}
          updateAttributeValue={updateAttributeValue}
          isPopularity={true}
        />
      </div>
    </div>
  );
};

const TuneableAttribute = ({
  title,
  info,
  id,
  updateAttributeValue,
  isPopularity,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [sliderValue, setSliderValue] = useState(null);
  const [showInfo, setInfo] = useState(false);
  const toggleHandler = () => setIsChecked(!isChecked);

  useEffect(() => {
    isChecked ? setSliderValue(0) : setSliderValue(null);
  }, [isChecked]);

  useEffect(() => {
    updateAttributeValue({ title: title, id: id, value: sliderValue });
  }, [sliderValue]);

  const getSliderValue = (value) => {
    setSliderValue(value);
  };

  let marks = {};
  Array(11)
    .fill(0)
    .forEach((num, i) => {
      marks[i * 10] = i * 10;
    });

  const sliderAts = {
    max: isPopularity ? 100 : 1.0,
    marks: isPopularity
      ? marks
      : { 0: 0, 0.2: 2, 0.4: 4, 0.6: 6, 0.8: 8, 1.0: 10 },
  };
  return (
    <div className={isPopularity ? "popularity" : "attribute"}>
      <Tooltip message={info} toggle={showInfo} />

      <div className="switch-wrap">
        <p
          style={{ cursor: "pointer" }}
          onMouseOver={() => setInfo(true)}
          onMouseLeave={() => setInfo(false)}
        >
          {title}
        </p>
        <ToggleSwitch setIsChecked={toggleHandler} />
      </div>

      <div className="slider-wrap">
        <Slider
          onChange={getSliderValue}
          disabled={!isChecked}
          handleStyle={{ borderColor: "#554fd8" }}
          trackStyle={{ background: "#554fd8" }}
          activeDotStyle={{ borderColor: "#554fd8" }}
          min={0}
          value={sliderValue}
          defaultValue={0}
          max={sliderAts.max}
          marks={sliderAts.marks}
          step={null}
        />
      </div>
    </div>
  );
};

const Genre = ({ title, chosenGenres, arr }) => {
  const [chosen, setChosen] = useState(false);
  const purple = "#554fd8";
  const white = "white";
  const grey = "#b4b4b4";

  useEffect(() => {
    if (arr.includes(title)) {
      setChosen(true);
    } else {
      setChosen(false);
    }
  }, [arr]);

  const selectGenre = () => {
    chosenGenres(title);
  };

  const genStyle = {
    background: chosen ? purple : white,
    color: chosen ? white : grey,
    border: `solid 1px ${chosen ? white : grey}`,
  };

  return (
    <div className="genre" onClick={selectGenre} style={genStyle}>
      {title}
    </div>
  );
};

const Genres = ({ genres, genresArray, setGenresArray }) => {
  const [isFull, setIsFull] = useState(false);

  useEffect(() => {
    if (genresArray.length < 5) {
      setIsFull(false);
    } else {
      setIsFull(true);
    }
  }, [genresArray]);

  const chosenGenres = (title) => {
    if (genresArray.includes(title)) {
      let remove = genresArray.filter((x) => x !== title);
      setGenresArray(remove);
    } else {
      if (!isFull) {
        setGenresArray([...genresArray, title]);
      }
    }
  };
  return (
    <div>
      <div className="choose-genre">
        <h1>choose up to 5 genres</h1>
        <h1>chosen: {genresArray.length}/5</h1>
      </div>

      <div className="genres">
        {genres.map((title, i) => (
          <Genre
            key={i}
            title={title}
            arr={genresArray}
            chosenGenres={chosenGenres}
          />
        ))}
      </div>
    </div>
  );
};
