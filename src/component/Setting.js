import { useState } from "react";

function Setting({
  volume,
  setVolume,
  musicVolume,
  setMusicVolume,
  setIntoSetting,
  setStarted,
  tracking,
  setImageUrl,
  playButtonSound,
}) {
  const [url, setUrl] = useState(
    "https://cdn.pixabay.com/photo/2022/07/11/12/15/naked-mole-rat-7314787_1280.png"
  );

  // set mai localStorage
  const handleVolumeChange = (event) => {
    setVolume(parseInt(event.target.value, 10));
    localStorage.setItem("volume", String(parseInt(event.target.value, 10)));
  };
  const handleMusicVolumeChange = (event) => {
    setMusicVolume(parseInt(event.target.value, 10));
    localStorage.setItem(
      "musicVolume",
      String(parseInt(event.target.value, 10))
    );
  };
  const handleConfirm = () => {
    setIntoSetting(false);
    setImageUrl(url);
    !tracking && setStarted(false);
    playButtonSound();
  };
  const handleReset = () => {
    localStorage.setItem("volume", 50);
    localStorage.setItem("musicVolume", 20);
    setVolume(50);
    setMusicVolume(20);
    setUrl(
      "https://cdn.pixabay.com/photo/2022/07/11/12/15/naked-mole-rat-7314787_1280.png"
    );
  };
  const handleImage = (ev) => {
    setUrl(ev.target.value);
  };
  return (
    <div className="flex flex-col items-center justify-center relative overflow-hidden w-full h-full">
      <img
        src="https://i.pinimg.com/1200x/56/77/0c/56770cf5bfecfb70fa5e5e2fd33161e4.jpg"
        alt="settingBackground"
        className="absolute opacity-30 left-0	top-0 w-full h-full"
      />
      <div className="relative mb-10 text-4xl">Setting</div>
      <div className="mb-12 flex flex-col items-center	">
        <h2 className="relative text-center mb-2">
          Beat Who You Want!!!
          <br />
          ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
          <br />
          input an Image URL:
        </h2>
        <input
          className="mb-2 relative border-2 border-neutral-300	rounded-lg bg-pink-100"
          type="Text"
          value={url}
          onChange={handleImage}
          onClick={playButtonSound}
        />
        <div className="flex">
          <div className="mr-5 mt-3">preview: </div>
          {/* <img src={url} alt="test image" className="mole visible" /> */}
          <div className="relative mole visible">
            <div className="overflow-visible scale-y-150 absolute -top-5">
              <img className="" src={url} />
            </div>
          </div>
        </div>
      </div>
      <div className="relative volumeContainer mb-4">
        <h2>Sound Volume</h2>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          onClick={playButtonSound}
        />
        <p>{volume}</p>
      </div>
      <div className="relative volumeContainer mb-6">
        <h2>Music Volume</h2>
        <input
          type="range"
          min="0"
          max="100"
          value={musicVolume}
          onChange={handleMusicVolumeChange}
          onClick={playButtonSound}
        />
        <p>{musicVolume}</p>
      </div>
      <div className="relative">
        <button className="button" onClick={() => handleReset()}>
          Reset
        </button>
        <button className="button" onClick={() => handleConfirm()}>
          Confirm
        </button>
      </div>
    </div>
  );
}

export default Setting;
