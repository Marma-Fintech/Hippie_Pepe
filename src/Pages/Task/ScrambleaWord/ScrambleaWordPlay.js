import React from "react";
import "./ScrambleaWordPlay.css";

const ScrambleaWordPlay = () => {
  return (
    <div>
      <div className="ScrambleaWordPlay">
        <h1 className="text-heading">WORD SCRAMBLE</h1>
        <h3 className="scramble-count">YOU HAVE 1/5 SCRAMBLE</h3>
      </div>
      <div className="scramble-wordbox-container">
        <div className="scramble-wordbox"></div>
        <div className="scramble-wordbox"></div>
        <div className="scramble-wordbox"></div>
        <div className="scramble-wordbox"></div>
        <div className="scramble-wordbox"></div>
      </div>
      <div>
        <h2 className="hint-text">Hint</h2>
        <h2 className="first-cryptocurrency">FIRST CRYPTOCURRENCY</h2>
      </div>
      <div>
        <input
          className="input-text"
          type="text"
          placeholder="ENTER A VALID WORD"
        ></input>
      </div>
    </div>
  );
};

export default ScrambleaWordPlay;
