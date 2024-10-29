import "./App.css";
import { useState, useEffect, useRef } from "react";
import Start from "./component/Start";
import Stage from "./component/Stage";
import Continue from "./component/Continue";
import GameOver from "./component/GameOver";
import Setting from "./component/Setting";
import backgroundMusic from "./music/backgroundMusic.mp3";
import buttonSound from "./music/buttonSound.wav";
import loseSound from "./music/loseheheboi.mp3";
import winSoundEffect from "./music/winSoundEffect.mp3";

function App() {
  const [tracking, setTracking] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    "https://cdn.pixabay.com/photo/2022/07/11/12/15/naked-mole-rat-7314787_1280.png"
  );
  const [activeComponent, setActiveComponent] = useState("retry");
  // start
  const [started, setStarted] = useState(false);
  // stage
  const [playing, setPlaying] = useState(false);
  const [winOrLosed, setWinOrLosed] = useState(false);
  const [currLV, setCurrLV] = useState(0);
  const [score, setScore] = useState(0);
  const [name, setName] = useState("");
  // setting
  const [intoSetting, setIntoSetting] = useState(false);
  const [volume, setVolume] = useState(
    localStorage.getItem("volume") ? Number(localStorage.getItem("volume")) : 50
  );
  const [musicVolume, setMusicVolume] = useState(
    localStorage.getItem("musicVolume")
      ? Number(localStorage.getItem("musicVolume"))
      : 20
  );

  const buttonSoundRef = useRef(new Audio(buttonSound));
  const winSoundRef = useRef(new Audio(winSoundEffect));
  const loseSoundRef = useRef(new Audio(loseSound));
  const audioRef = useRef(new Audio(backgroundMusic));

  useEffect(() => {
    audioRef.current.volume = musicVolume / 100; // 將音量設置為 0 到 1

    if (started && audioRef.current.paused) {
      audioRef.current.play(); // 開始播放音樂
    }

    return () => {
      audioRef.current.pause(); // 清理時暫停音樂
    };
  }, [musicVolume, started]);

  const playButtonSound = () => {
    buttonSoundRef.current.currentTime = 0; // 確保從頭開始播放
    buttonSoundRef.current.play(); // 播放聲效
    buttonSoundRef.current.volume = volume / 100;
  };

  const playLoseSound = () => {
    loseSoundRef.current.currentTime = 0; // 確保從頭開始播放
    loseSoundRef.current.play(); // 播放聲效
    loseSoundRef.current.volume = musicVolume / 100;
  };

  const playWinSound = () => {
    winSoundRef.current.currentTime = 0; // 確保從頭開始播放
    winSoundRef.current.play(); // 播放聲效
    winSoundRef.current.volume = musicVolume / 100;
  };

  return (
    <div className="box">
      <div className="outerBox">
        {!started && (
          <Start
            setStarted={setStarted}
            setPlaying={setPlaying}
            setIntoSetting={setIntoSetting}
            setTracking={setTracking}
            setCurrLV={setCurrLV} // added by wilson
            playButtonSound={playButtonSound}
          />
        )}
        {intoSetting && (
          <Setting
            volume={volume}
            setVolume={setVolume}
            musicVolume={musicVolume}
            setMusicVolume={setMusicVolume}
            setStarted={setStarted}
            setIntoSetting={setIntoSetting}
            tracking={tracking}
            setImageUrl={setImageUrl}
            playButtonSound={playButtonSound}
          />
        )}

        {playing && (
          <Stage
            currLV={currLV}
            setPlaying={setPlaying}
            setWinOrLosed={setWinOrLosed}
            imageUrl={imageUrl}
            volume={volume}
            setScore={setScore}
            score={score}
            playLoseSound={playLoseSound}
            playWinSound={playWinSound}
            audioRef={audioRef}
            setActiveComponent={setActiveComponent}
          />
        )}

        {!playing && started && !intoSetting && (
          <Continue
            playButtonSound={playButtonSound}
            winOrLosed={winOrLosed}
            currLV={currLV}
            setCurrLV={setCurrLV}
            setPlaying={setPlaying}
            isActive={activeComponent === "continue"}
          />
        )}
        {!playing && started && !intoSetting && (
          <GameOver
            winOrLosed={winOrLosed}
            setPlaying={setPlaying}
            setIntoSetting={setIntoSetting}
            currLV={currLV}
            score={score}
            playButtonSound={playButtonSound}
            name={name}
            setName={setName}
            isActive={activeComponent === "retry"}
          />
        )}
      </div>
    </div>
  );
}

export default App;
