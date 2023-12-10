// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Clock = ({ timezone }) => {
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [clockPaused, setClockPaused] = useState(false);

//   // Fetch and update current time
//   const fetchCurrentTime = async () => {
//     try {
//       // console.log('Timezone:', timezone);
//       const response = await axios.get(`http://worldtimeapi.org/api/timezone/${timezone}`);
//       // console.log('response', response);
//       setCurrentTime(new Date(response.data.utc_datetime));
//     } catch (error) {
//       console.error('Error fetching current time:', error);
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!clockPaused) {
//         // fetchCurrentTime(); //Enable later
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [clockPaused, timezone]);

//   // Toggle clock pause state
//   const toggleClockPause = () => {
//     setClockPaused(!clockPaused);
//   };

//   return (
//     <div className="clock">
//       {/* Display clock using currentTime state */}
//       <button onClick={toggleClockPause}>{clockPaused ? 'Start' : 'Pause'}</button>
//     </div>
//   );
// };

// export default Clock;


// Clock.js
import React, { useState, useEffect, useRef } from 'react';

const Clock = ({ timezones }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPaused, setIsPaused] = useState(false);
  const [pausedTime, setPausedTime] = useState(null);


  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await fetch(`http://worldtimeapi.org/api/timezone/${timezones}`);
        const data = await response.json();
        setCurrentTime(new Date(data.utc_datetime));
      } catch (error) {
        console.error('Error fetching time:', error);
      }
    };

    if (!isPaused) {
      // fetchTime();
      // intervalRef.current = setInterval(fetchTime, 1000);

      // Pause the clock and store the paused time
      clearInterval(intervalRef.current);
      setPausedTime(currentTime);
    }

    return () => clearInterval(intervalRef.current);
  }, [timezones, isPaused]);

  const togglePause = () => {
    setIsPaused((prevIsPaused) => !prevIsPaused);
  };

  return (
    <div className="clock">
      <div className="clock-display">
        <p>{currentTime.toLocaleTimeString()}</p>
      </div>
      <button className='time-btn' onClick={togglePause}>{isPaused ? 'Start' : 'Pause'}</button>
    </div>
  );
};

export default Clock;
