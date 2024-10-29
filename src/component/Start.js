import { useState, useEffect, useRef } from "react";
import spaceBar from "../image/spaceBar.png";

function Start({
  setStarted,
  setPlaying,
  setIntoSetting,
  setTracking,
  setCurrLV,
  playButtonSound,
}) {
  const [showStageSelect, setShowStageSelect] = useState(false);
  const selectedStageRef = useRef(0);
  const highestStage = Math.min(localStorage.getItem("highestStage"), 5); //set safety
  const stageSelectionArr = [];

  for (let i = 0; i <= highestStage; i++) {
    stageSelectionArr.push(i);
  }

  useEffect(() => {
    if (!localStorage.getItem("firstPlayDate")) {
      localStorage.setItem("firstPlayDate", String(new Date()));
    } else if (highestStage) {
      // If they are not a Newbie
      setShowStageSelect(true);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === " ") {
        setStarted(true);
        setPlaying(true);
        setTracking(true);
        setCurrLV(Number(selectedStageRef.current));
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleIntoSetting = () => {
    setStarted(true);
    setIntoSetting(true);
    playButtonSound();
  };

  const handleOnStageSelect = (e) => {
    selectedStageRef.current = e.target.value;
    playButtonSound();
  };

  const backgroundimage =
    "https://i.pinimg.com/originals/0e/45/ae/0e45ae65e082395ff0b319931f58b60f.gif";
  // "https://i.pinimg.com/enabled_lo/564x/d4/fb/24/d4fb247e92e189b7d38987d0f25fba68.jpg"; original background

  return (
    <div
      className=" relative bg-cover bg-center w-full h-full "
      style={{ backgroundImage: `url(${backgroundimage})` }}
    >
      <div className="flex flex-col justify-center text-center text-2xl absolute inset-0 bg-opacity-30 bg-white">
        {/* <img
        style={{ width: "100%" }}
        src="https://down-tw.img.susercontent.com/file/5f32481d6fee818e618d94812925e264" original background
      /> */}
        <div className="py-5 mb-20 text-4xl">
          <span className="colorText">
            <span className="text-6xl">Beat</span> <br /> the THING!!!
          </span>
        </div>

        <div className="floating-text mb-20 text-2xl">
          Press <img src={spaceBar} width={"100px"} className="inline" /> to
          start
        </div>
        <div className="flex flex-col items-center">
          {showStageSelect && (
            <>
              <label htmlFor="stage">Choose a stage:</label>
              <select
                className="text-center border-4 border-black w-80 rounded-lg border-double"
                name="stage"
                id="stage"
                onChange={handleOnStageSelect}
              >
                {stageSelectionArr.map((stage, idx) => {
                  return (
                    <option value={stage} key={idx}>
                      {stage === 5
                        ? `${String.fromCodePoint(8734)}`
                        : stage + 1}
                    </option>
                  );
                })}
              </select>
            </>
          )}
        </div>
        <div className="flex justify-center">
          <button className="button" onClick={() => handleIntoSetting()}>
            Setting
          </button>
        </div>
      </div>
    </div>
  );
}

export default Start;
