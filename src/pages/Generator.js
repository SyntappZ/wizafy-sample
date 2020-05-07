import React, { useState, useContext, useRef, useEffect } from "react";
import { PlaylistStore } from "../context/ContextProvider";
import { genres } from "../data/genres.js";
import { convertTracks } from "../data/trackConverter.js";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { MdPlaylistAdd } from "react-icons/md";
import Slider from "rc-slider";
import Tracklist from "../components/Tracklist";

const Generator = () => {
  const contextStore = useContext(PlaylistStore);
  const [playlist, setPlaylist] = useState([]);
  const [amountValue, setAmountValue] = useState("");
  const { getRecomendations, state, dispatch } = contextStore;
  const { topFiveIds } = state;
  const trackAmountRef = useRef("");
  const [showAdvanced, setAdvanced] = useState(false);

  const savePlaylist = () => {
    dispatch({ type: "setGeneratedPlaylist", payload: playlist });
  };

  const getAmountValue = () => {
    const limit = trackAmountRef.current.valueAsNumber;
    const val = limit > 100 ? "100" : limit.toString();
    setAmountValue(val);
  };

  const generateTopPlayed = async () => {
    const url = `&seed_tracks=${topFiveIds}`;
    const data = await getRecomendations(url, amountValue);
    const tracks = convertTracks(data.tracks);

    setPlaylist(tracks);
  };
  // {playlist.length > 0 ? <div style={{margin: '20px auto'}} className="btn">save playlist</div> : null}
  return (
    <div className="wrap">
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
            <div onClick={generateTopPlayed} className="btn">
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
              <FiChevronDown style={{ fontSize: "24px", color: "#949494" }} />
            )}
          </div>
        </div>

        {showAdvanced ? (
          <div className="generator-form">
            <Genres genres={genres} />
            <div className="sliders">
              <TuneableAttribute title={"testing"} />
            </div>
          </div>
        ) : null}
      </div>

      <div className="generated-tracks">
        <Tracklist
          tracklist={playlist}
          loadMore={null}
          favorites={false}
          next={null}
        />
      </div>
    </div>
  );
};

export default Generator;

const TuneableAttribute = ({ title }) => {
  return (
    <div className="tuneable">
      <p>{title}</p>
      <Slider
        handleStyle={{ borderColor: "#554fd8" }}
        trackStyle={{ background: "#554fd8" }}
        activeDotStyle={{ borderColor: "#554fd8" }}
        min={0}
        defaultValue={0}
        max={1.0}
        marks={{ 0: 0, 0.2: 2, 0.4: 4, 0.6: 6, 0.8: 8, 1.0: 10 }}
        step={null}
      />
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

// if(arr.includes(title)) {
//   arr.filter(x => x !== title)
// }else{
//   arr.push(title)
// }

const Genres = ({ genres }) => {
  const [genresArray, setGenresArray] = useState([]);
  const [isFull, setIsFull] = useState(false);

  useEffect(() => {
    if (genresArray.length < 5) {
      setIsFull(false);
    } else {
      setIsFull(true);
    }
    console.log(genresArray);
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
    <div className="wrap">
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
