// src/AnalogClock.js
import React, { useEffect, useState } from 'react';
import './AnalogClock.css';

const AnalogClock = () => {
  

  const hourNumbers = [];
  for (let i = 1; i <= 12; i++) {
    const angle = (i * 30) - 90; 
    const x = 50 + 40 * Math.cos(angle * (Math.PI / 180)); 
    const y = 50 + 40 * Math.sin(angle * (Math.PI / 180)); 
    hourNumbers.push(
      <div key={i} className="hour-number" style={{ left: `${x}%`, top: `${y}%` }}>
        {i}
      </div>
    );
  }

  return (
    <div className="clock">
      {hourNumbers}
     
      <div className="center" />
    </div>
  );
};

export default AnalogClock;
