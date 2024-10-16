import React from 'react';
import './AnalogClock.css';

const AnalogClock = ({ hour, minute, second }) => {
  const hourDeg = (hour % 12) * 30 + (minute / 60) * 30; // 30 degrees for each hour
  const minuteDeg = minute * 6; // 6 degrees for each minute
  const secondDeg = second * 6; // 6 degrees for each second

  return (
    <div className="analog-clock">
      <div className="hand hour-hand" style={{ transform: `rotate(${hourDeg}deg)` }} />
      <div className="hand minute-hand" style={{ transform: `rotate(${minuteDeg}deg)` }} />
      <div className="hand second-hand" style={{ transform: `rotate(${secondDeg}deg)` }} />
      <div className="center-circle" />
    </div>
  );
};

export default AnalogClock;
