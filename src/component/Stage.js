// *** props ***

import { useEffect, useState, useRef, useCallback } from "react";
import pressRightSound from "../music/pressRight.wav";
import pressWrongSound from "../music/pressWrong.wav";
import crazybackgroundMusic from "../music/crazybackgroundMusic.mp3";

/*
original stage
*/

const stages = [
  { width: 3, height: 3, interval: 1400, life: 3, timer: 10, difficulty: 3 },
  { width: 4, height: 3, interval: 1300, life: 3, timer: 12, difficulty: 8 },
  { width: 4, height: 4, interval: 1200, life: 4, timer: 15, difficulty: 18 },
  { width: 5, height: 4, interval: 1100, life: 4, timer: 18, difficulty: 36 },
  { width: 5, height: 5, interval: 1000, life: 5, timer: 20, difficulty: 39 },
  { width: 5, height: 5, interval: 900, life: 5, timer: 9999, difficulty: 39 },
];

/* 
easy mode for testing only
const stages = [
  { width: 3, height: 3, interval: 1400, life: 3, timer: 5, difficulty: 3 }, // testing
  { width: 4, height: 3, interval: 1300, life: 3, timer: 1, difficulty: 8 },
  { width: 4, height: 4, interval: 1200, life: 3, timer: 1, difficulty: 18 },
  { width: 5, height: 4, interval: 1100, life: 3, timer: 1, difficulty: 36 },
  { width: 5, height: 5, interval: 1000, life: 3, timer: 1, difficulty: 39 }, // testing
  { width: 5, height: 5, interval: 900, life: 5, timer: 9999, difficulty: 39 },
];

*/

const randomKeyList = "abcdefgh1234567890ijklmnopqrstuvwxyz!@#".split("");

function Stage({
  currLV,
  setPlaying,
  setWinOrLosed,
  imageUrl,
  volume,
  setScore,
  score,
  playLoseSound,
  playWinSound,
  audioRef,
  setActiveComponent,
}) {
  const [moles, setMoles] = useState([]);
  const [gameActive, setGameActive] = useState(false);
  const [currentLetter, setCurrentLetter] = useState("");
  const [lives, setLives] = useState(stages[0].life);
  const [timer, setTimer] = useState(0);
  const [currentMole, setCurrentMole] = useState(null);
  const [conditionMet, setConditionMet] = useState(false);

  const pressRightSoundRef = useRef(new Audio(pressRightSound));
  const pressWrongSoundRef = useRef(new Audio(pressWrongSound));

  const random = randomKeyList.slice(0, stages[currLV].difficulty);

  const handlePressRight = useCallback(() => {
    pressRightSoundRef.current.volume = volume / 100;
    pressRightSoundRef.current.currentTime = 0;
    pressRightSoundRef.current.play();
  }, [volume]);

  const handlePressWrong = useCallback(() => {
    pressWrongSoundRef.current.volume = volume / 100;
    pressWrongSoundRef.current.currentTime = 0;
    pressWrongSoundRef.current.play();
  }, [volume]);

  useEffect(() => {
    const startGame = () => {
      setScore(0);
      setLives(stages[currLV].life);
      setGameActive(true);
      setMoles(Array(stages[currLV].width * stages[currLV].height).fill(false));
      setCurrentLetter("");
      setPlaying(true);
      setTimer(stages[currLV].timer);
    };

    startGame();
  }, [currLV]);

  useEffect(() => {
    if (gameActive) {
      const { width, height } = stages[currLV];
      const interval = Math.random() * (stages[currLV].interval - 800) + 800;

      const moleInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * (width * height));
        setCurrentMole(randomIndex);
        setMoles(
          Array(width * height)
            .fill(false)
            .map((_, index) => index === randomIndex)
        );
        setCurrentLetter(random[Math.floor(Math.random() * random.length)]);
      }, interval);

      const disappear = setTimeout(() => {
        if (moles[currentMole]) {
          setLives((lives) => {
            const newLives = lives - 1;
            if (newLives <= 0) {
              setGameActive(false);
              setPlaying(false);
              setWinOrLosed(false);
              playLoseSound();
            }
            return newLives;
          });
        }
      }, interval);

      return () => {
        clearInterval(moleInterval);
        clearTimeout(disappear);
      };
    }
  }, [gameActive, currLV, currentLetter]);

  useEffect(() => {
    const gameDuration = stages[currLV].timer * 1000; // 30 seconds
    let on;
    let timerInterval;

    on = setTimeout(() => {
      playWinSound();
      setActiveComponent("continue");
      setGameActive(false);
      setPlaying(false);
      setWinOrLosed(true);
    }, gameDuration);

    timerInterval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          setGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerInterval);
      clearTimeout(on);
    };
  }, [currLV]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!gameActive) return;
      if (event.key === currentLetter) {
        setScore((score) => score + 10);
        setMoles(Array(moles.length).fill(false));
        setCurrentLetter("");
        setCurrentMole(null);
        handlePressRight();
      } else if (event.key !== " ") {
        setLives((lives) => {
          const newLives = lives - 1;
          if (newLives <= 0) {
            setActiveComponent("retry");
            setGameActive(false);
            setPlaying(false);
            setWinOrLosed(false);
            playLoseSound();
          }
          return newLives;
        });
        handlePressWrong();
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [currentLetter]);

  useEffect(() => {
    if (conditionMet) {
      audioRef.current.src = crazybackgroundMusic; // 替換為新的背景音樂路徑
      audioRef.current.play().catch((error) => {
        console.error("播放失敗:", error);
      });
    }
  }, [conditionMet]);

  useEffect(() => {
    currLV === 5 && setConditionMet(true);
  }, [currLV]);

  return (
    <div className="whack-a-mole relative overflow-hidden w-full h-full">
      {currLV < 5 ? (
        <img
          src="https://i.pinimg.com/originals/c0/ff/5b/c0ff5b4b6de7335ce9d467feffdf938a.gif"
          alt="normalStageBackground" //train
          className="absolute opacity-40 left-0	top-0 w-full h-full"
        />
      ) : (
        <img
          src="https://i.pinimg.com/originals/91/5f/86/915f86965153fcc94666611ea97109c3.gif"
          alt="infinityStageBackground"
          className="absolute opacity-40 left-0	top-0 h-full w-full block"
        />
      )}
      <h1 className="relative text-center mt-8 mb-8 text-4xl">
        Stage: {currLV + 1 > 5 ? Infinity : currLV + 1}
      </h1>
      <h2 className="relative text-center mt-8 mb-8 text-2xl flex flex-col items-center justify-center">
        <div className="score">{currLV < 5 ? "" : `Score:${score}`}</div>
        <div className="">Lives:{Array(lives).fill("💖").join("")}</div>
      </h2>
      <h3 className="relative text-center mt-8 mb-16 text-2xl">
        Time Remaining: {timer > 1000 ? Infinity : `${timer}s`}
      </h3>
      <div
        className="board relative text-center mt-12 mb-8 text-4xl"
        style={{
          gridTemplateColumns: `repeat(${stages[currLV].width}, 50px)`,
        }}
      >
        {moles.map((isVisible, index) => (
          <div key={index} className="mole-container">
            {isVisible && (
              <div className="current-letter">
                {currentLetter.toUpperCase()}
              </div>
            )}
            <div className={`relative mole ${isVisible ? "visible" : ""} `}>
              {isVisible ? (
                <div className="overflow-visible scale-y-150 absolute -top-5">
                  <img className="moleAnimation" src={imageUrl} />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stage;
