import React, { useState } from "react";
import './App.css';
import backgroundImage from "./battle-bg.png"; // Import the image

function TimerApp() {
  const [time, setTime] = useState(0); // Initial time in seconds
  const [running, setRunning] = useState(false); // Whether the timer is running
  const [isStarted, setIsStarted] = useState(false); // Tracks timer start
  const [paused, setPaused] = useState(false); // Tracks if the timer is paused

  const handleStart = () => {
    if (time > 0) {
      setRunning(true);
      setPaused(false); // In case it's resumed from pause
      setIsStarted(true);
    }
  };

  const handlePause = () => {
    setRunning(false);
    setPaused(true);
  };

  const handleResume = () => {
    setRunning(true);
    setPaused(false);
  };

  const handleReset = () => {
    setRunning(false);
    setTime(0);
    setIsStarted(false);
    setPaused(false);
  };

  const updateTimer = () => {
    if (running && time > 0) {
      setTime((prev) => prev - 1);
    }
  };

  React.useEffect(() => {
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [running, time]);

  // Format time to HH:MM:SS
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours > 0 ? `${hours} : ` : ""}${
      hours > 0 && minutes < 10 ? `0${minutes}` : minutes
    } : ${seconds < 10 ? `0${seconds}` : seconds}`
      .split("")
      .join(" ");
  };

  // Check if timer should flicker based on time remaining
  const shouldFlicker = (time <= 100 && time > 0 && time <= 10) || (time > 100 && time <= 30); // Flicker if remaining time is <= 10 or <= 30

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden bg-gray-800 text-white relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundAttachment: "fixed",
          backgroundSize: "contain", // Ensure the entire image fits within the screen
          backgroundRepeat: "no-repeat", // Prevent tiling of the image
          height: "100vh", // Full height of the viewport
          width: "100vw", // Full width of the viewport
        }}
      ></div>

      {/* Timer Display - Always Centered */}
      <div
        className={`absolute flex items-center justify-center font-bold title ${
          shouldFlicker && isStarted ? "flicker" : ""
        }`} style={{fontSize: "8rem"}}
      >
        {formatTime(time)}
        <span class="drop"></span>
        <span class="drop"></span>
        <span class="drop"></span>
        <span class="drop"></span>
        <span class="drop"></span>
      </div>

      {/* Timer Controls */}
      {!isStarted && (
        <div className="relative flex flex-col items-center gap-4">
          <input
            type="number"
            className="text-black p-2 rounded focus:outline-none"
            placeholder="Set time (in seconds)"
            onChange={(e) => setTime(Number(e.target.value))}
          />
          <button
            onClick={handleStart}
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-700"
          >
            Start Timer
          </button>
        </div>
      )}

      {/* Timer Control Buttons */}
      {isStarted && (
        <div className="absolute bottom-10 flex gap-4">
          <button
            onClick={handlePause}
            disabled={paused} // Disable if paused
            className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-700 disabled:bg-gray-500"
          >
            Pause Timer
          </button>
          <button
            onClick={handleResume}
            disabled={!paused} // Disable if not paused
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-500"
          >
            Resume Timer
          </button>
          <button
            onClick={handleReset}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
          >
            Reset Timer
          </button>
        </div>
      )}
    </div>
  );
}

export default TimerApp;
