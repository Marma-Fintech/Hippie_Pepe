import React, { useEffect, useRef, useState } from "react";
import "../component/Coin.css";
import videoSource from "../assets/video.mp4";
import dogevideo from "../assets/doge.mp4";
import frogvideo from "../assets/frog.mp4";
import shibuvideo from "../assets/shibu.mp4";
import doge from "../assets/Rectangle.png";
import frog from "../assets/Frame 15.png";
import shibu from "../assets/image 10.png";
import icon from "../assets/asset-hob.png";
import buttonbefore from "../assets/button-before.png";
import pepe from "../assets/PEPE.png";
import image1 from "../assets/Image1.jpg";
import meme from "../assets/Memetv.png";
import roadmap1 from "../assets/a.png";
import roadmap2 from "../assets/c.png";
import roadmap3 from "../assets/W.png";
import sociallinks from "../assets/social-links.png";
import glitch from "../assets/757Y.gif";
import leftarrow from "../assets/Group 2059.png";
import rightarrow from "../assets/Group 2060.png";
import twitter from "../assets/x.png";
import snap from "../assets/snap.png";
import telegram from "../assets/telegram.png";
import youtube from "../assets/yt.png";
import aboutgif from "../assets/about-gif.gif";
import supplygif from "../assets/supply-gif.gif";
import supplygif1 from "../assets/supply-gif1.gif";
import socialimg from "../assets/social-gif.gif";
import aboutimg from "../assets/Rope.png";

import clickSound from "../assets/clicksound.mp3";

const Coin = () => {
  const [showVideo, setShowVideo] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [showDoNothing, setshowDoNothing] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const images = [doge, frog, shibu]; // Array of image imports
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageTexts = ["Doge", "Pepe", "Shibu"];
  const [showContent, setShowContent] = useState(true);
  const videos = [dogevideo, frogvideo, shibuvideo];
  const [showGlitchGif, setShowGlitchGif] = useState(true);
  const [activeButton, setActiveButton] = useState("");

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  const playClickSound = () => {
    const sound = new Audio(clickSound);
    sound.play();
  };

  function useTypingEffect(text, speed = 100) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
      setDisplayedText(""); // Reset text on text change
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText((prev) => prev + text.charAt(index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, [text, speed]);

    return displayedText;
  }

  useEffect(() => {
    setShowGlitchGif(true); // Initially show the glitch GIF
    setTimeout(() => {
      setShowGlitchGif(false);
      setShowVideo(true); // Show the video component
      setIsVideoPlaying(false); // Automatically start playing the video
      // if (videoRef.current) {
      //   videoRef.current.play(); // Ensure video plays if it's loaded
      // }
    }, 1000); // Glitch GIF displays for 1 second
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .join(":");
  };

  const getButtonDetails = (buttonName) => {
    if (buttonName === activeButton) {
      return {
        style: {
          color: "yellow",
          background:
            "var(--Gradient, linear-gradient(180deg, #FD8D23 -1.34%, #FAE61C 10.31%, #EEF73B 20.95%, #4CF038 42.23%, #33C6F6 65.04%, #559CFB 73.14%, #7475FF 80.74%, #D457FF 100%))",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          boxShadow: "0 5px #141414",
        },
        icon: icon, // Active icon
      };
    } else {
      return {
        style: {},
        icon: buttonbefore, // Default icon
      };
    }
  };

  const handleVideoLoadAndPlay = (videoIndex) => {
    if (videoRef.current) {
      videoRef.current.src = videos[videoIndex];
      videoRef.current.load();
      videoRef.current.play().catch((error) => {
        console.error("Error attempting to play the video: ", error);
      });
      videoRef.current.muted = false; // Ensure the video is not muted
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  useEffect(() => {
    setShowGlitchGif(true);
    setTimeout(() => {
      setShowGlitchGif(false);
      setShowVideo(true);
      setIsVideoPlaying(true);
      handleVideoLoadAndPlay(0); // Start with the first video
    }, 1000);
  }, []);
  const handlePlayClick = () => {
    // console.log('Play clicked');
    playClickSound();
    setActiveButton("play");
    setShowAbout(false);
    setShowVideo(true);
    setIsVideoPlaying(false);
    setShowToken(false);
    setShowSocial(false);
    setShowRoadmap(false);
    // setShowDoNothing(false);
    setShowGlitchGif(true);

    setTimeout(() => {
      setShowGlitchGif(false);
      setShowVideo((prevShowVideo) => !prevShowVideo); // Toggle the video visibility based on previous state
    }, 1000);
  };

  const handleAboutClick = () => {
    playClickSound();
    setActiveButton("about");
    // Immediately hide the content and start the glitch effect
    setShowAbout(false);
    setShowVideo(false);
    setIsVideoPlaying(false);
    setShowToken(false);
    setShowSocial(false);
    setShowRoadmap(false);
    // setShowDoNothing(false);
    setShowGlitchGif(true);

    // After the glitch effect, toggle the content
    setTimeout(() => {
      setShowGlitchGif(false);
      setShowAbout((prevShowAbout) => !prevShowAbout); // Toggle the visibility based on previous state
    }, 1000);
  };

  const handleTokenClick = () => {
    playClickSound();
    setActiveButton("token");
    // Hide all content and trigger the glitch effect
    setShowAbout(false);
    setShowVideo(false);
    setIsVideoPlaying(false);
    setShowToken(false);
    setShowSocial(false);
    setShowRoadmap(false);
    // setShowDoNothing(false);
    setShowGlitchGif(true);

    setTimeout(() => {
      setShowGlitchGif(false);
      setShowToken((prevShowToken) => !prevShowToken); // Toggle the visibility based on previous state
    }, 1000);
  };

  const handleSocialClick = () => {
    playClickSound();
    setActiveButton("social");
    setShowAbout(false);
    setShowVideo(false);
    setIsVideoPlaying(false);
    setShowToken(false);
    setShowSocial(false);
    setShowRoadmap(false);
    // setShowDoNothing(false);
    setShowGlitchGif(true);

    setTimeout(() => {
      setShowGlitchGif(false);
      setShowSocial((prevShowSocial) => !prevShowSocial); // Toggle the visibility based on previous state
    }, 1000);
  };

  const handleRoadmapClick = () => {
    playClickSound();
    setActiveButton("roadmap");
    setShowAbout(false);
    setShowVideo(false);
    setIsVideoPlaying(false);
    setShowToken(false);
    setShowSocial(false);
    setShowRoadmap(false);
    // setShowDoNothing(false);
    setShowGlitchGif(true);

    setTimeout(() => {
      setShowGlitchGif(false);
      setShowRoadmap((prevShowRoadmap) => !prevShowRoadmap); // Toggle the visibility based on previous state
    }, 1000);
  };

  const handleNextClick = () => {
    playClickSound();
    setShowGlitchGif(true); // Display the glitch effect
    setTimeout(() => {
      setShowGlitchGif(false); // Hide the glitch effect
      setIsVideoPlaying(true);
      setshowDoNothing(false);
      setShowVideo(true);
      setShowAbout(false);
      setShowToken(false);
      setShowSocial(false);
      setShowRoadmap(false);
      let nextIndex = (currentIndex + 1) % videos.length; // Get the next index
      setCurrentIndex(nextIndex); // Update the current index
      // Update the video source and ensure it plays
      handleVideoLoadAndPlay(nextIndex);
    }, 1000);
  };
  const handleBackClick = () => {
    playClickSound();
    setShowGlitchGif(true); // Display the glitch effect
    setTimeout(() => {
      setShowGlitchGif(false); // Hide the glitch effect
      setIsVideoPlaying(true);
      setshowDoNothing(false);
      setShowVideo(true);
      setShowAbout(false);
      setShowToken(false);
      setShowSocial(false);
      setShowRoadmap(false);
      let prevIndex =
        currentIndex - 1 < 0 ? images.length - 1 : currentIndex - 1; // Calculate the previous index
      setCurrentIndex(prevIndex); // Update the current index
      handleVideoLoadAndPlay(prevIndex);
    }, 1000);
  };
  useEffect(() => {
    // Check if videoRef.current is available and only then add the event listener
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("click", togglePlayPause);

      // Return a cleanup function that removes the event listener
      return () => {
        if (videoElement) {
          // Check again if the element is still there
          videoElement.removeEventListener("click", togglePlayPause);
        }
      };
    }
  }, [videoRef.current]); // Depend on videoRef.current to re-attach the listener if the ref changes

  // The useEffect for updating video based on currentIndex remains the same.
  useEffect(() => {
    handleVideoLoadAndPlay(currentIndex);
  }, [currentIndex]);

  return (
    <div>
      <div id="tv" className="memetv">
        <div className="tv">
          <div className="social-links">
            <ul>
              <li>
                <a
                  href="https://twitter.com/hippie_pepe"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={twitter} alt="Twitter" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.snapchat.com/add/hippie_pepe?share_id=UB9twgjgo2w&locale=en-US"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={snap} alt="snap" />
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/+918124877707"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={telegram} alt="telegram" />
                </a>{" "}
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@HippiePepe"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={youtube} alt="youtube" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div id="screen">
          <div id="glass">
            <div className="inner-glass">
              <div class="noise"></div>
              <div className="inner-text">
                <div className="nav-1">
                  <img src={meme} />
                </div>
                {showGlitchGif && (
                  <img
                    src={glitch}
                    alt="Glitch Effect"
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                )}
                {showVideo && (
                  <video ref={videoRef} width="850" height="740" controls>
                    <source src={frogvideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}

                {showAbout && (
                  <div id="glitch-background">
                    <div className="about-trasition-1">
                      <div className="rope-img">
                      <img src={aboutimg} />
                        </div>
                     
                      <h2 id="textcolorabout" className="header-line">
                        About HippiePepeMemeTV
                      </h2>
                      {/*<span className='shadow'>About HippiePepeMemeTV</span>  */}
                      <div className="text-head pt-2">
                        <p id="textcolorabout" className="about-para">
                          We were all born Memes . We were all born to Memes. We
                          were all born to meme.
                        </p>
                        <p id="textcolorabout" className="about-para">
                          The world seems to have forgotten this and taken
                          itself too seriously.
                        </p>
                        <p id="textcolorabout" className="about-para">
                          HippiePepeMemeTv is here- to spread joy, to spread
                          other things also I think but most importantly to
                          #doNothing
                        </p>
                        <p id="textcolorabout" className="about-para">
                          So, you also watch HippiPepeMemeTv and doNothing. Okay
                        </p>
                        <div className="about-gif-part">
                        <img src={aboutgif} /> </div>

                        
                      </div>
                    </div>
                  </div>
                )}
                {showToken && (
                  <div id="glitch-background">
                    <div className="trasition-2">
                      <div className="supply-part">
                        <h2 id="textcolorabout">
                        Total Supply
                      </h2>
                      <img src={supplygif} /> </div>
                      
                      
                      {/*<span className='shadow'>About HippiePepeMemeTV</span>  */}
                      <div className="text-head">
                        <h3 id="textcolorsocial" className="supply-p">
                            999,999,999,999,999 HPTV{" "}
                        </h3>
                        <p id="textcolorsocial">
                          5%- Build (We can’t jus’ doNothing. Memes need to win)
                          5% - Team(We need to win. We want to doNothing) Rest-
                          You decide while you doNothing
                        </p>
                        <div className="supply-ocb">
                          <img src={supplygif1} />
                        </div>
                        <p id="textcolorsocial">
                          Small Presale(Obvio) L.P Burnt(Obvio more). Contract
                          Revoked(obvio most)
                        </p>
                      </div>
                    </div>

                    {/*   <div className="trasition-2">
                    <h2 className="header-line ">How to Get HPTV</h2>
                    <div className="text-head">
                      <div className="img-res">
                        <img className="hpmt-img" src={pepe} />
                      </div>
                      <p>Connect your wallet, watch the HippiePepeMemeTV </p>
                    </div>
<div className='row btn-do'>
  <div className='do-nothing-button'>
  <div className='col-md-3'>
                      <button className='btn-primary'>Buy Now</button>
                    </div>
                    <div className='col-md-3'>
                      <button className='btn-primary'>doNothing</button>
                    </div>
                     </div>

   </div>

                  
                  </div> */}
                  </div>
                )}

                {showSocial && (
                  <div id="glitch-background">
                    <div className="trasition-1">
                    <img src={socialimg} />
                      <h3>Tune into CMemeTv and doNothing</h3>

                      <div className="text-head">
                        <h2 id="textcolorsocial" className="header-line h-size">
                          Namastay
                        </h2>
                        <div className="img-social">
                          <ul>
                            <li>
                              <a
                                href="https://twitter.com/hippie_pepe"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <img
                                  src={twitter}
                                  alt="Twitter"
                                  className="img-z"
                                />
                              </a>
                            </li>
                            <li>
                              <a
                                href="https://www.snapchat.com/add/hippie_pepe?share_id=UB9twgjgo2w&locale=en-US"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <img src={snap} alt="snap" />
                              </a>
                            </li>
                            <li>
                              <a
                                href="https://t.me/+918124877707"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <img src={telegram} alt="telegram" />
                              </a>{" "}
                            </li>
                            <li>
                              <a
                                href="https://www.youtube.com/@HippiePepe"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <img src={youtube} alt="youtube" />
                              </a>
                            </li>
                          </ul>
                        </div>
                        <span className="hippe">HippiePepememeTV</span>
                        <p className="social-tag">
                          <a
                            href="https://www.youtube.com/@HippiePepe"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            5Meme.Tv is a meme coin with no intrinsic value or
                            expectation of financial return. There is no formal
                            team or roadmap. the coin is completely useless and
                            for entertainment purposes only.
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {showRoadmap && (
                  <div id="glitch-background" className="road-map-text">
                    <p id="textcolorroadmap" className="header-line">
                      Road map
                    </p>
                    <div className="text-head">
                      <div className="row">
                        <div className="column">
                          <img className="roadmapimg" src={roadmap1} />
                          <div className="road-map-dash">
                            <h2 className="road-map">doNothing</h2>
                            <p className="road-map-txt">
                              HippiePepeMemeTv BetaTheta version
                            </p>
                          </div>
                        </div>
                        <div className="column">
                          <img className="roadmapimg" src={roadmap2} />
                          <div className="road-map-dash">
                            <h2 className="road-map">doNothing more</h2>
                            <p className="road-map-txt">
                              HippieMemeTv Mint your own MEMEs
                            </p>{" "}
                          </div>
                        </div>
                        <div className="column">
                          <img className="roadmapimg" src={roadmap3} />
                          <div className="road-map-dash">
                            <h2 className="road-map">doNothing most</h2>
                            <p className="road-map-txt">The HippiepepeMemeTv</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* {showDoNothing && (
                  <div className="trasition-1">
                    <p id="textcolorroadmap" className="header-line">
                      Meme Tv
                    </p>
                    <div className="text-head">
                      <p id="textcolorroadmap">
                        Watch HippiePepeMemeTv and doNothing
                      </p>
                      <p id="textcolorroadmap">Ashte</p>
                      <p id="textcolorroadmap">
                        Meme.Tv is a meme coin with no intrinsic value or
                        expectation of financial return. There is no formal team
                        or roadmap. the coin is completely useless and for
                        entertainment purposes only.
                      </p>
                    </div>
                  </div>
                )} */}

                {isVideoPlaying && (
                  <div>
                    <video ref={videoRef} width="850" height="480" controls>
                      <source src={videos[currentIndex]} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    {/* <button>{videoRef.current && videoRef.current.muted ? '' : ''}</button> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div id="controls">
          <ul className="social-1">
            <li>{/* <img src={sociallinks} /> */}</li>
          </ul>
          <div id="panel">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <ul className="ul-button">
                <li
                  style={getButtonDetails("play").style}
                  onClick={handlePlayClick}
                >
                  <img src={getButtonDetails("play").icon} alt="Play Icon" />
                  <span>&nbsp;&nbsp;Play</span>
                </li>
                <li
                  style={getButtonDetails("about").style}
                  onClick={handleAboutClick}
                >
                  <img src={getButtonDetails("about").icon} alt="About Icon" />
                  <span>&nbsp;&nbsp;About</span>
                </li>
                <li
                  style={getButtonDetails("roadmap").style}
                  onClick={handleRoadmapClick}
                >
                  <img
                    src={getButtonDetails("roadmap").icon}
                    alt="Roadmap Icon"
                  />
                  <span>&nbsp;&nbsp;Roadmap</span>
                </li>
                <li
                  style={getButtonDetails("token").style}
                  onClick={handleTokenClick}
                >
                  <img src={getButtonDetails("token").icon} alt="Token Icon" />
                  <span>&nbsp;&nbsp;Token</span>
                </li>
                <li
                  style={getButtonDetails("social").style}
                  onClick={handleSocialClick}
                >
                  <img
                    src={getButtonDetails("social").icon}
                    alt="Social Icon"
                  />
                  <span>&nbsp;&nbsp;Social</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="control-1">
            <div id="navi-video">
              <button>
                <h1>Time {formatTime(seconds)}</h1>
              </button>
            </div>

            <div id="speaker">
              <div>
                <div
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    border: "2px solid #0e7616",
                    padding: "12px",
                    gap: 10,
                    justifyContent: "center",
                  }}
                >
                  <h1 id="imagetext">{imageTexts[currentIndex]}</h1>
                  <img
                    id="imagetext"
                    src={images[currentIndex]}
                    alt="Display"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "300px",
                      width: "auto",
                      height: "auto",
                    }}
                  />

                  <div
                    id="imagetext"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                      marginTop: "2px",
                    }}
                  >
                    {/* <button onClick={handleBackClick}>Back</button>
                  <button onClick={handleNextClick} >Next</button> */}
                    <img onClick={handleBackClick} src={leftarrow}></img>
                    <img onClick={handleNextClick} src={rightarrow}></img>
                  </div>
                </div>
              </div>

              {/* <div style={{}}>
              <h2 style={{ background: '#232323', padding: 1, border: '2px solid #595959ff', position: 'absolute', right: '7%' }}>meme tv</h2>
            </div> */}
            </div>
            <div class="meme-img">
              <img src={image1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coin;
