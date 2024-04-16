// Glitch.js
import React from 'react';
import '../component/glitch.css';

const Glitch = ({ text }) => {
  return (
    <div className="glitch-background"  style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', zIndex: 1000 }} >
       hello
    </div>
  );
}

export default Glitch;
