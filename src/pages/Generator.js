import React, { useState, useContext, useRef, useEffect } from "react";
import { PlaylistStore } from "../context/ContextProvider";
import { genres } from "../data/genres.js";
import { convertTracks } from "../data/trackConverter.js";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { MdPlaylistAdd } from "react-icons/md";
import Slider from "rc-slider";
import TrackList from "../components/TrackList";

import ToggleSwitch from "../components/ToggleSwitch";
import Details from "../components/Details";
import Tooltip from "../components/Tooltip";

const Generator = () => {
  const contextStore = useContext(PlaylistStore);
  const [playlist, setPlaylist] = useState([]);
  const [amountValue, setAmountValue] = useState("");
  const [advAmountValue, setAdvAmountValue] = useState("");
  const { getRecomendations, state, dispatch } = contextStore;
  const { topFiveIds, songToGenerate, selectedPlaylist } = state;
  const trackAmountRef = useRef("");
  const advTrackAmountRef = useRef("");
  const [showAdvanced, setAdvanced] = useState(false);
  const [genresArray, setGenresArray] = useState([]);
  const { title, image, id } = songToGenerate;

  const [attributes] = useState([
    {
      title: "acousticness",
      value: null,
      info:
        "A confidence measure from 0 to 10 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.",
    },

    {
      title: "danceability",
      value: null,
      info:
        "	Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0 is least danceable and 10 is most danceable.",
    },
    {
      title: "energy",
      value: null,
      info:
        "	Energy is a measure from 0 to 10 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.",
    },
    {
      title: "instrumentalness",
      value: null,
      info:
        "	Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The closer the instrumentalness value is to 10, the greater likelihood the track contains no vocal content. Values above 5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 10.",
    },
    {
      title: "liveness",
      value: null,
      info:
        "	Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 8 provides strong likelihood that the track is live.",
    },
    {
      title: "valence",
      value: null,
      info:
        "A measure from 0 to 10 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).",
    },
    {
      title: "popularity",
      value: null,
      info:
        "	The popularity of the track. The value will be between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are.",
    },
  ]);

  const savePlaylist = () => {
    dispatch({ type: "setGeneratedPlaylist", payload: playlist });
  };

  const getAmountValue = () => {
    const limit = trackAmountRef.current.valueAsNumber;
    let val = limit > 100 ? 100 : limit;
    val = Number.isNaN(val) ? "" : val.toString();
    setAmountValue(val);
  };

  const getAdvAmountValue = () => {
    const limit = advTrackAmountRef.current.valueAsNumber;
    let val = limit > 100 ? 100 : limit;
    val = Number.isNaN(val) ? "" : val.toString();
    setAdvAmountValue(val);
  };

  const generateTopPlayed = async () => {
    const url = `&seed_tracks=${topFiveIds}`;
    if (topFiveIds.length > 0) {
      const data = await getRecomendations(url, amountValue);
      const tracks = convertTracks(data.tracks);

      setPlaylist(tracks);
      clearInput();
    }
  };

  const updateAttributeValue = (attribute) => {
    attributes[attribute.id].value = attribute.value;
  };

  const generateSingleSong = async () => {
    const url = `&seed_tracks=${id}`;
    const data = await getRecomendations(url, amountValue);
    const tracks = convertTracks(data.tracks);

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

    setPlaylist(tracks);
    clearInput();
  };

  const clearInput = () => {
    setAmountValue("");
    setAdvAmountValue("");
  };

  const isSingleSong = Object.keys(songToGenerate).length > 0 ? true : false;

  useEffect(() => {
    setPlaylist([]);
  }, [isSingleSong, songToGenerate]);

  const openAdvanced = () => {
    setPlaylist([]);
    setAdvanced(!showAdvanced);
  };
  return (
    <div className="wrap">
      {isSingleSong ? (
        <div className="song-generator">
          <Details
            title={title}
            image={image}
            description={`Generate a playlist with song's like ${title}`}
            isGenerator={true}
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
              showButton={playlist.length > 0}
              savePlaylist={savePlaylist}
            />
          </div>
          {playlist.length > 0 ? (
            <div className="generated-tracks">
              <TrackList
                tracklist={playlist}
                loadMore={null}
                favorites={false}
                next={null}
              />
            </div>
          ) : null}
        </div>
      ) : (
        <>
          <h1 className="gen-title">generator</h1>
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
              showButton={playlist.length > 0}
              savePlaylist={savePlaylist}
            />
          </div>
          <div className="advanced">
            <div className="top">
              <h1>Advanced</h1>
              <div className="show" onClick={openAdvanced}>
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
          {playlist.length > 0 && genresArray.length > 0 ? (
            <div className="button-wrap">
              <h4>Tracks: {playlist.length}</h4>
              <SaveButton
                showButton={playlist.length > 0}
                savePlaylist={savePlaylist}
              />
            </div>
          ) : null}

          {playlist.length > 0 ? (
            <div className="generated-tracks">
              <TrackList
                tracklist={playlist}
                loadMore={null}
                favorites={false}
                next={null}
              />
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Generator;

const SaveButton = ({ showButton, savePlaylist }) => {
  return (
    <>
      {showButton ? (
        <div className="save-playlist" onClick={savePlaylist}>
          <p>save playlist</p>
          <MdPlaylistAdd style={{ fontSize: "18px", color: "grey" }} />
        </div>
      ) : null}
    </>
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
        max="100"
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
    console.log(sliderValue);
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
