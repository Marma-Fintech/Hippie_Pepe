// import React, { useEffect, useRef, useState } from "react";
// import "../component/Coin.css";
// import videoSource from "../assets/video.mp4";
// import dogevideo from "../assets/doge.mp4";
// import frogvideo from "../assets/frog.mp4";
// import shibuvideo from "../assets/shibu.mp4";
// import doge from "../assets/Rectangle1.png";
// import frog from "../assets/frogs.png";
// import shibu from "../assets/image 101.png";
// import icon from "../assets/asset-hob.png";
// import buttonbefore from "../assets/button-before.png";
// import pepe from "../assets/PEPE.png";
// import image1 from "../assets/Image1.jpg";
// import meme from "../assets/Memetv.png";
// import roadmap1 from "../assets/a.png";
// import roadmap2 from "../assets/c.png";
// import roadmap3 from "../assets/W.png";
// import sociallinks from "../assets/social-links.png";
// import glitch from "../assets/757Y.gif";
// import leftarrow from "../assets/Group 20592 (1).png";
// import rightarrow from "../assets/Group 20601 (1).png";
// import twitter from "../assets/x.png";
// import snap from "../assets/snap.png";
// import telegram from "../assets/telegram.png";
// import youtube from "../assets/yt.png";
// import aboutgif from "../assets/about-gif.gif";
// import supplygif from "../assets/supply-gif.gif";
// import supplygif1 from "../assets/supply-gif1.gif";
// import socialimg from "../assets/social-gif.gif";
// import aboutimg from "../assets/Rope.png";
// import welcome from "../assets/logo-welcome.png";

// import clickSound from "../assets/clicksound.mp3";

// const Coin = () => {
//   const [showVideo, setShowVideo] = useState(false);
//   const [showAbout, setShowAbout] = useState(false);
//   const [showToken, setShowToken] = useState(false);
//   const [showSocial, setShowSocial] = useState(false);
//   const [showRoadmap, setShowRoadmap] = useState(false);
//   const [isActive, setIsActive] = useState(false);
//   const [seconds, setSeconds] = useState(0);
//   const [isOpen, setIsOpen] = useState(false);
//   const images = [doge, frog, shibu]; // Array of image imports
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const imageTexts = ["Doge", "Pepe", "Shibu"];
//   const [showContent, setShowContent] = useState(true);
//   // const videos = [frogvideo, shibuvideo];
//   const [showGlitchGif, setShowGlitchGif] = useState(true);
//   const [activeButton, setActiveButton] = useState("");
//   const [button, setButton] = useState("play");
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
//   const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
//   const videoRef = useRef(null);

//   const playClickSound = () => {
//     const sound = new Audio(clickSound);
//     sound.play();
//   };

//   function ButtonTextChange() {
//     if (button == "pause") {
//       setButton("play");

//       setShowVideo(true);
//     } else if (button == "play") {
//       setButton("pause");
//       setShowVideo(true);
//       handlePause();
//     }
//   }
//   // useEffect(() => {
//   //   togglePlayPause();
//   // }, [button]);

//   const handlePause = () => {
//     if (videoRef.current) {
//       videoRef.current.pause();
//     } else {
//       console.log("noynot");
//     }
//   };

//   useEffect(() => {
//     setShowGlitchGif(true); // Initially show the glitch GIF
//     setTimeout(() => {
//       setShowGlitchGif(false);
//       // setShowVideo(true); // Show the video component
//       setIsVideoPlaying(false); // Automatically start playing the video
//     }, 1000); // Glitch GIF displays for 1 second
//   }, []);

//   useEffect(() => {
//     let interval = null;
//     if (isActive) {
//       interval = setInterval(() => {
//         setSeconds((prevSeconds) => prevSeconds + 1);
//       }, 1000);
//     } else if (!isActive && interval) {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [isActive]);

//   const formatTime = (totalSeconds) => {
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;

//     return [hours, minutes, seconds]
//       .map((v) => (v < 10 ? "0" + v : v))
//       .join(":");
//   };

//   const handleClick = () => {
//     playClickSound();
//     if (!isActive) {
//       setIsActive(true); // Only activate the timer, no deactivation
//     }
//   };

//   const getButtonDetails = (buttonName) => {
//     if (buttonName === activeButton) {
//       // if (buttonName !== "play") {
//       //   togglePlayPause();
//       // }
//       return {
//         style: {
//           color: "yellow",
//           background:
//             "var(--Gradient, linear-gradient(180deg, #FD8D23 -1.34%, #FAE61C 10.31%, #EEF73B 20.95%, #4CF038 42.23%, #33C6F6 65.04%, #559CFB 73.14%, #7475FF 80.74%, #D457FF 100%))",
//           backgroundClip: "text",
//           WebkitBackgroundClip: "text",
//           WebkitTextFillColor: "transparent",
//           boxShadow: "0 5px #141414",
//         },
//         icon: icon, // Active icon
//       };
//     } else {
//       return {
//         style: {},
//         icon: buttonbefore, // Default icon
//       };
//     }
//   };
//   const handleVideoLoadAndPlay = (videoIndex) => {
//     if (videoRef.current) {
//       // videoRef.current.src = videos[videoIndex];
//       videoRef.current.load(); // Load the video after changing the source
//       videoRef.current
//         .play() // Attempt to play the video
//         .then(() => {
//           setIsVideoPlaying(true); // Update state to reflect that video is playing
//         })
//         .catch((error) => {
//           console.error("Error attempting to play the video: ", error);
//           setIsVideoPlaying(false); // Update state to reflect that video is not playing
//         });
//     }
//   };
//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.muted = false; // Mute the video initially
//       videoRef.current
//         .play() // Attempt to autoplay the video when component mounts
//         .then(() => {
//           // Video is playing muted
//           setIsVideoPlaying(true);
//         })
//         .catch((error) => {
//           console.error("Error attempting to autoplay the video: ", error);
//           setIsVideoPlaying(false);
//         });
//     }
//   }, []);
//   // const togglePlayPause = () => {
//   //   if (videoRef.current) {
//   //     if (videoRef.current.paused) {
//   //       videoRef.current
//   //         .play()
//   //         .then(() => {
//   //           setIsVideoPlaying(true);
//   //           setButton("pause");
//   //         })
//   //         .catch((error) => console.log("Error playing the video:", error));
//   //     } else {
//   //       videoRef.current.pause();
//   //       setIsVideoPlaying(false);
//   //       setButton("play");
//   //     }
//   //   }
//   // };

//   const togglePlayPause = () => {
//     if (videoRef.current) {
//       if (videoRef.current.paused) {
//         videoRef.current
//           .play()
//           .then(() => {
//             setIsVideoPlaying(true); // Ensure the state is correctly set when video plays
//             handleClick();
//             setButton("pause"); // Change button text to "pause"
//           })
//           .catch((error) => console.error("Error playing the video:", error));
//       } else {
//         videoRef.current.pause();
//         setIsVideoPlaying(false); // Ensure the state is correctly set when video is paused
//         setButton("play"); // Change button text to "play"
//       }
//     }
//   };

//   const handlePlayClick = () => {
//     // console.log('Play clicked');
//     playClickSound();
//     // alert("all")
//     setActiveButton("play");
//     setShowAbout(false);

//     ButtonTextChange();
//     // setShowVideo(false);
//     // setIsVideoPlaying(false);
//     setShowToken(false);
//     setShowSocial(false);
//     setShowRoadmap(false);
//     setShowWelcomeMessage(false);

//     if (!isVideoPlaying) {
//       // If the video is not playing, start it and the timer.
//       setIsActive(true); // Start the timer
//       togglePlayPause(); // This will start the video and update `isVideoPlaying` to true.
//     } else {
//       // If the video is playing, pause it and stop the timer.
//       setIsActive(false); // Stop the timer
//       togglePlayPause(); // This will pause the video and update `isVideoPlaying` to false.
//     }
//     setTimeout(() => {}, 1000);
//   };
//   const handleAboutClick = () => {
//     playClickSound();
//     setActiveButton("about");
//     // Immediately hide the content and start the glitch effect
//     setShowAbout(false);
//     setShowVideo(false);
//     setIsActive(false);
//     setIsVideoPlaying(false);
//     setShowToken(false);
//     setShowSocial(false);
//     setShowRoadmap(false);
//     videoRef.current.pause();
//     setIsVideoPlaying(false);
//     setButton("play");
//     setShowWelcomeMessage(false);
//     setShowGlitchGif(true);
//     // After the glitch effect, toggle the content
//     setTimeout(() => {
//       setShowGlitchGif(false);
//       setShowAbout((prevShowAbout) => !prevShowAbout); // Toggle the visibility based on previous state
//     }, 1000);
//   };
//   const handleTokenClick = () => {
//     playClickSound();
//     setActiveButton("token");
//     setIsActive(false);

//     // Hide all content and trigger the glitch effect
//     setShowAbout(false);
//     setShowVideo(false);
//     videoRef.current.pause();
//     setIsVideoPlaying(false);
//     setButton("play");
//     setIsVideoPlaying(false);
//     setShowToken(false);
//     setShowSocial(false);
//     setShowRoadmap(false);
//     setShowWelcomeMessage(false);
//     setShowGlitchGif(true);
//     setTimeout(() => {
//       setShowGlitchGif(false);
//       setShowToken((prevShowToken) => !prevShowToken); // Toggle the visibility based on previous state
//     }, 1000);
//   };
//   const handleSocialClick = () => {
//     playClickSound();
//     setActiveButton("social");
//     setShowAbout(false);
//     setShowVideo(false);
//     setIsActive(false);
//     videoRef.current.pause();
//     setIsVideoPlaying(false);
//     setButton("play");
//     setIsVideoPlaying(false);
//     setShowToken(false);
//     setShowSocial(false);
//     setShowRoadmap(false);
//     setShowWelcomeMessage(false);
//     setShowGlitchGif(true);
//     setTimeout(() => {
//       setShowGlitchGif(false);
//       setShowSocial((prevShowSocial) => !prevShowSocial); // Toggle the visibility based on previous state
//     }, 1000);
//   };
//   const handleRoadmapClick = () => {
//     playClickSound();
//     setActiveButton("roadmap");
//     setShowAbout(false);
//     setShowVideo(false);
//     setIsActive(false);
//     videoRef.current.pause();
//     setIsVideoPlaying(false);
//     setButton("play");
//     setIsVideoPlaying(false);
//     setShowToken(false);
//     setShowSocial(false);
//     setShowRoadmap(false);
//     setShowWelcomeMessage(false);
//     setShowGlitchGif(true);
//     setTimeout(() => {
//       setShowGlitchGif(false);
//       setShowRoadmap((prevShowRoadmap) => !prevShowRoadmap); // Toggle the visibility based on previous state
//     }, 1000);
//   };
//   // const handleNextClick = () => {
//   //   playClickSound();
//   //   setShowGlitchGif(true); // Display the glitch effect
//   //   setTimeout(() => {
//   //     setShowGlitchGif(false); // Hide the glitch effect
//   //     setIsVideoPlaying(true);
//   //     // setshowDoNothing(false);
//   //     setShowVideo(true);
//   //     setShowAbout(false);
//   //     setShowToken(false);
//   //     setShowSocial(false);
//   //     setShowRoadmap(false);
//   //     setShowWelcomeMessage(false);
//   //     let nextIndex = currentIndex + 1; // Get the next index
//   //     setCurrentIndex(nextIndex); // Update the current index
//   //     // Update the video source and ensure it plays
//   //     handleVideoLoadAndPlay(nextIndex);
//   //   }, 1000);
//   // };
//   // const handleBackClick = () => {
//   //   playClickSound();
//   //   setShowGlitchGif(true); // Display the glitch effect
//   //   setTimeout(() => {
//   //     setShowGlitchGif(false); // Hide the glitch effect
//   //     setIsVideoPlaying(true);
//   //     // setshowDoNothing(false);
//   //     setShowVideo(false);
//   //     setShowAbout(false);
//   //     setShowWelcomeMessage(false);
//   //     setShowToken(false);
//   //     setShowSocial(false);
//   //     setShowRoadmap(false);
//   //     let prevIndex =
//   //       currentIndex - 1 < 0 ? images.length - 1 : currentIndex - 1; // Calculate the previous index
//   //     setCurrentIndex(prevIndex); // Update the current index
//   //     handleVideoLoadAndPlay(prevIndex);
//   //   }, 1000);
//   // };
//   // Add event listener for play/pause toggle
//   // useEffect(() => {
//   //   const videoElement = videoRef.current;
//   //   if (videoElement) {
//   //     videoElement.addEventListener("click", togglePlayPause);
//   //     // Cleanup
//   //     return () => {
//   //       videoElement.removeEventListener("click", togglePlayPause);
//   //     };
//   //   }
//   // }, [videoRef.current]);
//   // Ensure re-attachment if the ref updates
//   // useEffect hook to manage changes in currentIndex or video source
//   useEffect(() => {
//     if (currentIndex !== undefined && [currentIndex]) {
//       handleVideoLoadAndPlay(currentIndex);
//     }
//   }, [currentIndex]);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div>
//       <div id="tv" className="memetv">
//         <div className="tv">
//           <div className="row">
//             <div className="col-9 col-xl-12">
//               <div className="social-links">
//                 <ul>
//                   <li>
//                     <a
//                       href="https://twitter.com/hippie_pepe"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <img src={twitter} alt="Twitter" />
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="https://www.snapchat.com/add/hippie_pepe?share_id=UB9twgjgo2w&locale=en-US"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <img src={snap} alt="snap" />
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="https://t.me/+918124877707"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <img src={telegram} alt="telegram" />
//                     </a>{" "}
//                   </li>
//                   <li>
//                     <a
//                       href="https://www.youtube.com/@HippiePepe"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <img src={youtube} alt="youtube" />
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//             <div className="col-3 navbar-1">
//               <nav className="navbar navbar-light">
//                 <div className="container-fluid">
//                   <button
//                     className="navbar-toggler"
//                     type="button"
//                     onClick={toggleMenu}
//                   >
//                     <span className="navbar-toggler-icon"></span>
//                   </button>
//                 </div>
//               </nav>
//               {isOpen && (
//                 <div className="overlay">
//                   <div className="overlay-content">
//                     <div
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         gap: 10,
//                       }}
//                     >
//                       <ul
//                         className="ul-button"
//                         style={{
//                           zIndex: 100000,
//                         }}
//                       >
//                         <li
//                           style={getButtonDetails("play").style}
//                           onClick={() => {
//                             handlePlayClick();
//                             toggleMenu();
//                           }}
//                         >
//                           <img
//                             src={getButtonDetails("play").icon}
//                             alt="Play Icon"
//                           />
//                           <span onClick={ButtonTextChange}>
//                             &nbsp;&nbsp;{button}
//                           </span>
//                         </li>
//                         <li
//                           style={getButtonDetails("about").style}
//                           onClick={() => {
//                             handleAboutClick();
//                             toggleMenu();
//                           }}
//                         >
//                           <img
//                             src={getButtonDetails("about").icon}
//                             alt="About Icon"
//                           />
//                           <span>&nbsp;&nbsp;About</span>
//                         </li>
//                         <li
//                           style={getButtonDetails("roadmap").style}
//                           onClick={() => {
//                             handleRoadmapClick();
//                             toggleMenu();
//                           }}
//                         >
//                           <img
//                             src={getButtonDetails("roadmap").icon}
//                             alt="Roadmap Icon"
//                           />
//                           <span>&nbsp;&nbsp;Roadmap</span>
//                         </li>
//                         <li
//                           style={getButtonDetails("token").style}
//                           onClick={() => {
//                             handleTokenClick();
//                             toggleMenu();
//                           }}
//                         >
//                           <img
//                             src={getButtonDetails("token").icon}
//                             alt="Token Icon"
//                           />
//                           <span>&nbsp;&nbsp;Token</span>
//                         </li>
//                         <li
//                           style={getButtonDetails("social").style}
//                           onClick={() => {
//                             handleSocialClick();
//                             toggleMenu();
//                           }}
//                         >
//                           <img
//                             src={getButtonDetails("social").icon}
//                             alt="Social Icon"
//                           />
//                           <span>&nbsp;&nbsp;Social</span>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                   <div className="overlay-close" onClick={toggleMenu}></div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//         <div id="screen">
//           <div id="glass">
//             <div className="inner-glass">
//               <div class="noise"></div>
//               <div className="inner-text">

//                 {showGlitchGif && (
//                   <img
//                     src={glitch}
//                     alt="Glitch Effect"
//                     style={{
//                       position: "absolute",
//                       width: "100%",
//                       height: "100%",
//                     }}
//                   />
//                 )}
//                 {showWelcomeMessage && (
//                     <div className="row img-res">
//                       <div className="col-md-12 ">
//                         <div>
//                         <img src={welcome} /> </div>
//                         </div>
//                       {/*<span className='shadow'>About HippiePepeMemeTV</span>  */}
//                       <div className="text-head pt-1"></div>
//                     </div>

//                 )}
//                 <div className="nav-1">
//                   <img src={meme} />
//                 </div>
//                 {/* {showVideo && (
//                   <video ref={videoRef} width="100%" height="100%" controls>
//                     <source src={frogvideo} type="video/mp4" />
//                     Your browser does not support the video tag.
//                   </video>
//                 )} */}
//                 <video
//                   ref={videoRef}
//                   width={showVideo ? "100%" : "0%"}
//                   height={showVideo ? "100%" : "0%"}
//                   controls
//                 >
//                   <source src={frogvideo} type="video/mp4" />
//                   Your browser does not support the video tag.
//                 </video>

//                 {showAbout && (
//                   <div id="glitch-background">
//                     <div className="about-trasition-1">
//                       <div className="rope-img">
//                         <img src={pepe} />
//                       </div>
//                       {/*<span className='shadow'>About HippiePepeMemeTV</span>  */}
//                       <div className="text-head pt-2">
//                         <h3 id="textcolorabout" className="about-para1">
//                           What is The Meme TV?{" "}
//                         </h3>
//                         <p className="about-para2 pb-2">
//                           It is a non-stop stream of delightful Meme videos.
//                         </p>

//                         <h3 id="textcolorabout" className="pb-3 about-para3">
//                           How do I get TheMemeTV(TheTV) tokens?{" "}
//                         </h3>
//                         <p>
//                           {" "}
//                           Connect your wallet and start watching TheMemeTV. You
//                           will be rewarded with TheTV tokens for every second
//                           you watch. At some point, we are sure you may also
//                           find the tokens on some exchanges or get airdrops.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 {showToken && (
//                   <div id="glitch-background">
//                     <div className="trasition-2">
//                       <div className="row">
//                         <div className="col-md-1"></div>
//                         <div className="col-md-10">
//                           <div className="supply-part">
//                             <h3 id="textcolorabout">Total Supply</h3>
//                             <img src={supplygif} />{" "}
//                           </div>
//                           <h2
//                             id="textcolorsocial"
//                             className="supply-p head-dash header-line"
//                           >
//                             17,922,656,250 MEMETV{" "}
//                           </h2>
//                         </div>
//                         <div className="col-md-1"></div>
//                       </div>
//                       {/*<span className='shadow'>About HippiePepeMemeTV</span>  */}
//                       <div>
//                         <div className="row justify-content-center">
//                           <div className="col-md-5">
//                             <div className="supply-token">
//                               <p className="text-head2">Development 10%</p>
//                               <p className="text-head2">Team 5%</p>
//                               <p className="text-head2">Charity 5%</p>
//                               <p className="text-head2">Airdrops 10%</p>
//                             </div>
//                           </div>
//                           <div className="col-md-5">
//                             {" "}
//                             <div className="supply-ocb">
//                               <div className="supply-token">
//                                 <p className="text-head2">Watch & Earn 10%</p>
//                                 <p className="text-head2">
//                                   Creator royalty 10%
//                                 </p>
//                                 <p className="text-head2">Liqudity Pool 50%</p>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="pt-4 col-md-12 text-head2">
//                             <button className="btn-line">
//                               Read More About Token
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/*   <div className="trasition-2">
//                     <h2 className="header-line ">How to Get HPTV</h2>
//                     <div className="text-head">
//                       <div className="img-res">
//                         <img className="hpmt-img" src={pepe} />
//                       </div>
//                       <p>Connect your wallet, watch the HippiePepeMemeTV </p>
//                     </div>
// <div className='row btn-do'>
//   <div className='do-nothing-button'>
//   <div className='col-md-3'>
//                       <button className='btn-primary'>Buy Now</button>
//                     </div>
//                     <div className='col-md-3'>
//                       <button className='btn-primary'>doNothing</button>
//                     </div>
//                      </div>

//    </div>

//                   </div> */}
//                   </div>
//                 )}

//                 {showSocial && (
//                   <div id="glitch-background">
//                     <div className="trasition-1">
//                       <img src={socialimg} />
//                       <h3>Watch TheMemeTV and doNothing</h3>

//                       <div className="text-head">
//                         <h2 id="textcolorsocial" className="header-line h-size">
//                           Ashte
//                         </h2>
//                         <div className="img-social">
//                           <ul>
//                             <li>
//                               <a
//                                 href="https://twitter.com/hippie_pepe"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                               >
//                                 <img
//                                   src={twitter}
//                                   alt="Twitter"
//                                   className="img-z"
//                                 />
//                               </a>
//                             </li>
//                             <li>
//                               <a
//                                 href="https://www.snapchat.com/add/hippie_pepe?share_id=UB9twgjgo2w&locale=en-US"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                               >
//                                 <img src={snap} alt="snap" />
//                               </a>
//                             </li>
//                             <li>
//                               <a
//                                 href="https://t.me/+918124877707"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                               >
//                                 <img src={telegram} alt="telegram" />
//                               </a>{" "}
//                             </li>
//                             <li>
//                               <a
//                                 href="https://www.youtube.com/@HippiePepe"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                               >
//                                 <img src={youtube} alt="youtube" />
//                               </a>
//                             </li>
//                           </ul>
//                         </div>
//                         <span className="hippe">HippiePepememeTV</span>
//                         <p className="social-tag">
//                           <a
//                             href="https://www.youtube.com/@HippiePepe"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                           >
//                             TheMemeTV is a meme coin with no intrinsic value or
//                             expectation of financial return. There is no formal
//                             team or roadmap. the coin is completely useless and
//                             for Entertainment purposes only.
//                           </a>
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 {showRoadmap && (
//                   <div id="glitch-background" className="road-map-text">
//                     <p id="textcolorroadmap" className="header-line">
//                       Road map
//                     </p>
//                     <div className="">
//                       <div className="row">
//                         <div className="col-12 col-md-4">
//                           <img className="roadmapimg" src={roadmap1} />
//                           <div className="road-map-dash">
//                             <h2 className="road-map do1">doNothing</h2>
//                             <p className="road-map-txt text-head">
//                               TheMemeTV child version. Random content. Limited
//                               Content. Watch and Earn . Creator royalty
//                             </p>
//                           </div>
//                         </div>
//                         <div className="col-12 col-md-4">
//                           <img className="roadmapimg" src={roadmap2} />
//                           <div className="road-map-dash">
//                             <h2 className="road-map do2">doNothing more</h2>
//                             <p className="road-map-txt text-head">
//                               TheMemeTV teenage version Pay to watch. Create and
//                               Earn. Mint your NFTs. Meme wars
//                             </p>{" "}
//                           </div>
//                         </div>
//                         <div className="col-12 col-md-4">
//                           <img className="roadmapimg" src={roadmap3} />
//                           <div className="road-map-dash">
//                             <h2 className="road-map do3">doNothing most</h2>
//                             <p className="road-map-txt text-head">
//                               TheMemeTV adult version. Meme Cinematic Universe
//                               Movie production.
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 {/* {showDoNothing && (
//                   <div className="trasition-1">
//                     <p id="textcolorroadmap" className="header-line">
//                       Meme Tv
//                     </p>
//                     <div className="text-head">
//                       <p id="textcolorroadmap">
//                         Watch HippiePepeMemeTv and doNothing
//                       </p>
//                       <p id="textcolorroadmap">Ashte</p>
//                       <p id="textcolorroadmap">
//                         Meme.Tv is a meme coin with no intrinsic value or
//                         expectation of financial return. There is no formal team
//                         or roadmap. the coin is completely useless and for
//                         entertainment purposes only.
//                       </p>
//                     </div>
//                   </div>
//                 )} */}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div id="controls">
//           <ul className="social-1">
//             <li>{/* <img src={sociallinks} /> */}</li>
//           </ul>
//           <div id="panel">
//             <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//               <ul className="ul-button">
//                 <li
//                   style={getButtonDetails("play").style}
//                   onClick={handlePlayClick}
//                 >
//                   <img src={getButtonDetails("play").icon} alt="Play Icon" />
//                   <span onClick={ButtonTextChange}>&nbsp;&nbsp;{button}</span>
//                 </li>
//                 <li
//                   style={getButtonDetails("about").style}
//                   onClick={handleAboutClick}
//                 >
//                   <img src={getButtonDetails("about").icon} alt="About Icon" />
//                   <span>&nbsp;&nbsp;About</span>
//                 </li>
//                 <li
//                   style={getButtonDetails("roadmap").style}
//                   onClick={handleRoadmapClick}
//                 >
//                   <img
//                     src={getButtonDetails("roadmap").icon}
//                     alt="Roadmap Icon"
//                   />
//                   <span>&nbsp;&nbsp;Roadmap</span>
//                 </li>
//                 <li
//                   style={getButtonDetails("token").style}
//                   onClick={handleTokenClick}
//                 >
//                   <img src={getButtonDetails("token").icon} alt="Token Icon" />
//                   <span>&nbsp;&nbsp;Token</span>
//                 </li>
//                 <li
//                   style={getButtonDetails("social").style}
//                   onClick={handleSocialClick}
//                 >
//                   <img
//                     src={getButtonDetails("social").icon}
//                     alt="Social Icon"
//                   />
//                   <span>&nbsp;&nbsp;Social</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="control-1">
//             <div id="navi-video">
//               <button className="btn-color">
//                 <h3>Time {formatTime(seconds)}</h3>
//               </button>
//             </div>
//           </div>

//           <div className="control-1">
//             <div>
//               <div id="speaker">
//                 <div className="navi">
//                   <h3 id="imagetext">connect your wallet to mint</h3>

//                   <div
//                     className="video-play"
//                     id="imagetext"
//                     style={{
//                       display: "flex",
//                       justifyContent: "center",
//                       gap: "10px",
//                       marginTop: "2px",
//                     }}
//                   >
//                     {/* <button onClick={handleBackClick}>Back</button>
//                   <button onClick={handleNextClick} >Next</button> */}
//                   </div>
//                 </div>
//               </div>

//               {/* <div style={{}}>
//               <h2 style={{ background: '#232323', padding: 1, border: '2px solid #595959ff', position: 'absolute', right: '7%' }}>meme tv</h2>
//             </div> */}
//             </div>
//             <div class="meme-img">
//               <img src={image1} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Coin;
