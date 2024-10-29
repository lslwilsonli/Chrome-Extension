import { useEffect } from "react";

function Continue({
  winOrLosed,
  setCurrLV,
  setPlaying,
  currLV,
  playButtonSound,
  isActive,
}) {
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (event) => {
      if (event.key === " ") {
        handleOnContinue();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive]);

  if (!winOrLosed) return null;

  function handleOnContinue() {
    setCurrLV((prevState) => prevState + 1);
    setPlaying(true);
    playButtonSound();
  }

  function handleExit() {
    window.close();
    playButtonSound();
  }

  const CreditPage = () => {
    return (
      <div className="flex flex-col items-center relative overflow-hidden w-full h-full">
        <div className="font-bold mt-8 text-4xl relative">Credits</div>
        <div className="mt-8 mb-8 text-3xl text-center relative flex flex-col items-center">
          members from <br />
          generation HK
          <div
            className="border-dashed border-2 p-0 mt-4"
            style={{ width: "250px" }}
          >
            <ul className="list-none mt-4 mb-4 ">
              <li> &#129312; Andy Tse</li>
              <li> &#128511; Eric Chan</li>
              <li> &#128375; Wilson Li</li>
            </ul>
          </div>
          <div className="mt-10">
            ready for <br />
            infinity mode?
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center relative overflow-hidden w-full h-full">
        {currLV === 4 ? (
          <img
            src="https://i.pinimg.com/originals/64/a3/ef/64a3efa2d9cee0b67c9e09e7ef39db6a.gif"
            alt="beforeLeaderboard"
            className="absolute opacity-30 left-0	top-0 w-full h-full"
          />
        ) : (
          <img
            src="https://i.pinimg.com/736x/4e/a0/55/4ea0555cd941dbb66e336f330053db27.jpg"
            alt="cat"
            className="absolute opacity-30 left-0	top-0 w-full h-full"
          />
        )}
        {currLV === 4 && <CreditPage />}
        <div>
          {currLV < 4 && (
            <>
              <p className="relative text-center text-3xl mt-8 mb-12">
                Stage Clear!!!
              </p>
              <div className="relative text-center mb-10">
                Press Space to Continue
              </div>
            </>
          )}
          <div className="flex flex-row items-center justify-center">
            <button
              onClick={() => handleOnContinue()}
              className="button relative"
            >
              {currLV === 4 ? `YES!!!` : `continue`}
            </button>
            <button onClick={() => handleExit()} className="button relative">
              Exit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Continue;
