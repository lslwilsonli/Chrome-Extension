import { useEffect, useState } from "react";

function GameOver({
  winOrLosed,
  setPlaying,
  setIntoSetting,
  currLV,
  score,
  playButtonSound,
  name,
  setName,
  isActive,
}) {
  const [currName, setCurrName] = useState("");
  const [leaderboardPlaceholder, setLeaderboardPlaceholder] = useState(null);

  useEffect(() => {
    const highestStage = localStorage.getItem("highestStage");
    if (highestStage === null) {
      localStorage.setItem("highestStage", currLV);
    } else if (currLV > Number(highestStage)) {
      localStorage.setItem("highestStage", currLV);
    }
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (event) => {
      if (event.key === " ") {
        handleRetry();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive]);

  if (winOrLosed) return null;

  function handleRetry() {
    setPlaying(true);
    playButtonSound();
    setName("");
  }

  function handleSetting() {
    setIntoSetting(true);
    playButtonSound();
  }

  const handleNameChange = (ev) => {
    setCurrName(ev.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase());
    playButtonSound();
  };

  const blameSentence = "input your name!!!";

  const handleSubmit = () => {
    if (currName.length > 0) {
      setName(currName);
      const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || {};
      if (!leaderboard[currName]) leaderboard[currName] = score;
      if (currName && leaderboard[currName] < score)
        leaderboard[currName] = score;
      localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
      playButtonSound();
    } else {
      setLeaderboardPlaceholder(blameSentence);
    }
  };

  const currLeaderBoard = JSON.parse(localStorage.getItem("leaderboard")) || {};
  const arrayScore = Object.entries(currLeaderBoard).sort(
    (a, b) => b[1] - a[1]
  );

  return currLV < 5 ? (
    <div className="flex flex-col items-center justify-center relative overflow-hidden w-full h-full">
      <img
        src="https://i.pinimg.com/enabled/564x/56/dc/db/56dcdb932c02f0d2a28a61866f41ed79.jpg"
        alt="cat"
        className="absolute opacity-30 left-0	top-0 w-full h-full"
      />
      <div className="relative font-bold mt-8 mb-12 text-4xl">GameOver</div>
      <div className="relative mb-10">Press Space to Retry</div>
      <div className="relative">
        <button className="button" onClick={handleRetry}>
          Retry
        </button>
        <button className="button" onClick={handleSetting}>
          Setting
        </button>
      </div>
    </div>
  ) : name ? (
    <div className="relative overflow-hidden w-full h-full flex flex-col justify-between">
      <img
        src="https://png.pngtree.com/thumb_back/fw800/background/20190223/ourmid/pngtree-creative-gradient-color-performance-leaderboard-background-material-pointbattle-reportperformancepersonal-war-image_78947.jpg"
        alt="cat"
        className="absolute opacity-40 left-0	top-0 w-full h-full"
      />
      <div className="relative text-center mt-8  text-4xl">
        <div>leaderboard</div>
        <div>Top 5</div>
      </div>
      <div className="flex flex-col justify-center items-center	">
        {arrayScore.slice(0, 5).map((x) => {
          return (
            <div key={x[0]} className="text-2xl">{`${x[0]} : ${x[1]}`}</div>
          );
        })}
      </div>
      <div className="relative flex flex-row items-center	justify-center justify-self-end mb-8">
        <button className="button" onClick={handleRetry}>
          Retry
        </button>
        <button className="button" onClick={handleSetting}>
          Setting
        </button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center w-full h-full relative overflow-hidden">
      <img
        src="https://i.pinimg.com/originals/a8/5c/14/a85c1471101aabc0b177ea9546bf48ea.gif"
        alt="cat"
        className="absolute opacity-40 left-0	top-0 w-full h-full"
      />
      <div>
        <div className="relative text-xl mt-16 mb-20 flex flex-col items-center">
          {`Your Score: `}
          {score}
          <div className="mt-16 text-2xl text-center">
            {score === 0 &&
              `lmao you are so bad wor ${Array(12)
                .fill(String.fromCodePoint(128078))
                .join("")}`}
          </div>
        </div>
      </div>
      <div>
        <div className="relative mb-10 text-xl">Please Enter Your Name:</div>
      </div>
      <div>
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
          onClick={playButtonSound}
          placeholder={leaderboardPlaceholder}
          className={`leaderboardInput ${
            leaderboardPlaceholder === blameSentence
              ? "placeholder:text-red-800"
              : ""
          }`}
        />
      </div>
      <div>
        <button onClick={handleSubmit} className="button">
          Submit
        </button>
      </div>
    </div>
  );
}

export default GameOver;
