import React, { useState, useEffect } from 'react';
import AnalogClock from './AnalogClock'; // Import the custom AnalogClock component
import './MyClock.css';

const MyClock = () => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0); // For the analog clock

  useEffect(() => {
    const interval = setInterval(() => {
      setSecond((prev) => (prev + 1) % 60);
      if (second === 59) {
        setMinute((prev) => (prev + 1) % 60);
        if (minute === 59) {
          setHour((prev) => (prev + 1) % 24);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [second, minute]);

  const handleGetTime = () => {
    console.log(`Hour: ${hour}, Minute: ${minute}`);
  };

  const handleHourChange = (e) => {
    const newHour = parseInt(e.target.value);
    if (!isNaN(newHour) && newHour >= 0 && newHour < 24) {
      setHour(newHour);
    }
  };

  const handleMinuteChange = (e) => {
    const newMinute = parseInt(e.target.value);
    if (!isNaN(newMinute) && newMinute >= 0 && newMinute < 60) {
      setMinute(newMinute);
    }
  };

  return (
    <div className="clock-container">
      <div className="clock-display">
        <AnalogClock hour={hour} minute={minute} second={second} />
      </div>
      <div className="digital-display">
        {`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`}
      </div>
      <label>
        Hour:
        <input 
          type="number" 
          value={hour} 
          onChange={handleHourChange} 
          min="0" 
          max="23" 
        />
      </label>
      <label>
        Minute:
        <input 
          type="number" 
          value={minute} 
          onChange={handleMinuteChange} 
          min="0" 
          max="59" 
        />
      </label>
      <button onClick={handleGetTime} className="get-time-button">
        Get Time
      </button>
    </div>
  );
};

export default MyClock;
