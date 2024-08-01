import React from "react";
import "./ScrambleaWordPlay.css";

const ScrambleaWordPlay = () => {
  return (
    <div className="quiz-play-task">
      <div className="ScrambleaWordPlay">
        <h1 className="text-heading">WORD SCRAMBLE</h1>
        <h3 className="scramble-count">YOU HAVE 1/5 SCRAMBLE</h3>
      </div>
      <div className="scramble-wordbox-container">
        <div className="scramble-wordbox"><p className="word-s">I</p></div>
        <div className="scramble-wordbox"><p className="word-s">T</p></div>
        <div className="scramble-wordbox"><p className="word-s">B</p></div>
        <div className="scramble-wordbox"><p className="word-s">C</p></div>
        <div className="scramble-wordbox"><p className="word-s">I</p></div>
        <div className="scramble-wordbox"><p className="word-s">N</p></div>
        <div className="scramble-wordbox"><p className="word-s">O</p></div>
      </div>
      <div className="margin">
        <h2 className="hint-text">Hint</h2>
        <h2 className="first-cryptocurrency">FIRST CRYPTOCURRENCY</h2>
      </div>
      <div>
      <div class="custom-search">
  <input type="text" class="custom-search-input" placeholder="Enter a valid word" />
  <button class="custom-search-botton" type="submit">Check Word</button>  
</div>
      </div>
      <button className="quitz-btn">
            Next
          </button>
    </div>
  );
};

export default ScrambleaWordPlay;
