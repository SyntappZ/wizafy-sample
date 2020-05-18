import React, { useState, useContext, useRef, useEffect } from "react";
import { PlaylistStore } from "../context/ContextProvider";
import { genres } from "../data/genres.js";
import { convertTracks } from "../data/trackConverter.js";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { MdPlaylistAdd } from "react-icons/md";
import Slider from "rc-slider";
import Tracklist from "../components/Tracklist";
import ToggleSwitch from "../components/ToggleSwitch";
import Details from "../components/Details";
import im from "../images/tempAlbum.jpg";
const Generator = () => {
  const contextStore = useContext(PlaylistStore);
  const [playlist, setPlaylist] = useState([]);
  const [amountValue, setAmountValue] = useState("");
  const [advAmountValue, setAdvAmountValue] = useState("");
  const { getRecomendations, state, dispatch } = contextStore;
  const { topFiveIds, songToGenerate } = state;
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
    const data = await getRecomendations(url, amountValue);
    const tracks = convertTracks(data.tracks);

    setPlaylist(tracks);
    clearInput();
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
            <div className="number-wrap">
              <input
                ref={trackAmountRef}
                type="number"
                placeholder="track amount"
                min="0"
                default="0"
                max="100"
                onChange={getAmountValue}
                value={amountValue}
              />
              <div
                onClick={amountValue ? generateSingleSong : null}
                className="btn"
              >
                generate
              </div>
            </div>

            {playlist.length > 0 ? (
              <div className="save-playlist" onClick={savePlaylist}>
                <p>save playlist</p>
                <MdPlaylistAdd style={{ fontSize: "18px", color: "grey" }} />
              </div>
            ) : null}
          </div>
          {playlist.length > 0 ? (
            <div className="generated-tracks">
              <Tracklist
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
              <div className="number-wrap">
                <input
                  ref={trackAmountRef}
                  type="number"
                  placeholder="track amount"
                  min="0"
                  default="0"
                  max="100"
                  onChange={getAmountValue}
                  value={amountValue}
                />
                <div
                  onClick={amountValue ? generateTopPlayed : null}
                  className="btn"
                >
                  generate
                </div>
              </div>
            </div>

            {playlist.length > 0 ? (
              <div className="save-playlist" onClick={savePlaylist}>
                <p>save playlist</p>
                <MdPlaylistAdd style={{ fontSize: "18px", color: "grey" }} />
              </div>
            ) : null}
          </div>
          <div className="advanced">
            <div className="top">
              <h1>Advanced</h1>
              <div className="show" onClick={() => setAdvanced(!showAdvanced)}>
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
                      {attributes.map((attribute, i) => (
                        <TuneableAttribute
                          key={i}
                          id={i}
                          title={attribute.title}
                          info={attribute.info}
                          value={attribute.value}
                          updateAttributeValue={updateAttributeValue}
                        />
                      ))}
                    </div>
                    <div
                      className="number-wrap"
                      style={{ margin: "30px auto 0 auto" }}
                    >
                      <input
                        ref={advTrackAmountRef}
                        type="number"
                        placeholder="track amount"
                        min="0"
                        default="0"
                        max="100"
                        onChange={getAdvAmountValue}
                        value={advAmountValue}
                      />
                      <div
                        onClick={advAmountValue ? generateAdvanced : null}
                        className="btn"
                      >
                        generate
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            ) : null}
          </div>

          {playlist.length > 0 ? (
            <div className="generated-tracks">
              <Tracklist
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

const TuneableAttribute = ({ title, info, id, updateAttributeValue }) => {
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
  return (
    <div className="attribute">
      {showInfo ? (
        <div className="info">
          <p>{info}</p>
        </div>
      ) : null}
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
          max={1.0}
          marks={{ 0: 0, 0.2: 2, 0.4: 4, 0.6: 6, 0.8: 8, 1.0: 10 }}
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
