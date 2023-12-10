import React, { useState, useEffect, useRef } from 'react';

const Clock = ({ currentTime: propCurrentTime, selectedTimezone }) => {
  const [currentTime, setCurrentTime] = useState(propCurrentTime);
  const [isPaused, setIsPaused] = useState(false);
  const [pausedTime, setPausedTime] = useState(null);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isPaused) {
      clearInterval(intervalRef.current);

      // Calculate the time elapsed during pause
      const elapsedMilliseconds = pausedTime ? new Date() - pausedTime : 0;
      setCurrentTime(new Date(currentTime.getTime() + elapsedMilliseconds));

      // Start the clock
      intervalRef.current = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
      setPausedTime(new Date());
    }
    return () => clearInterval(intervalRef.current);
  }, [selectedTimezone, isPaused]);

  const togglePause = () => {
    setIsPaused((prevIsPaused) => !prevIsPaused);
  };

  return (
    <div className="clock">
      <div className="clock-display">
        <p>{currentTime.toLocaleTimeString()}</p>
      </div>
      <button className='time-btn' onClick={togglePause}>
        {isPaused ? 'Start' : 'Pause'}
      </button>
    </div>
  );
};
export default Clock;
