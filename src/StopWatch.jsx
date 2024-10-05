import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";

const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  let timeout;

  const formattedTime = useMemo(() => {
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
    const hours = `0${Math.floor((time / 3600000) % 24)}`.slice(-2);
    return `${hours}:${minutes}:${seconds}`;
  }, [time]);

  const reset = () => {
    setIsTimeRunning(false);
    setTime(0);
    if (timeout) {
      clearInterval(timeout);
    }
  };

  useEffect(() => {
    if (isTimeRunning) {
      timeout = setInterval(() => {
        setTime((prev) => prev + 1000);
      }, 1000);
    } else if (!isTimeRunning) {
      clearInterval(timeout);
    }
    return () => {
      if (timeout) {
        clearInterval(timeout);
      }
    };
  }, [isTimeRunning]);

  return (
    <div className="timer">
      <h1 className="text">{formattedTime}</h1>
      <div className="buttons">
        <button
          onClick={() => {
            setIsTimeRunning((prev) => !prev);
          }}
          className="button"
        >
          {isTimeRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => {
            reset();
          }}
          className="button"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default StopWatch;
