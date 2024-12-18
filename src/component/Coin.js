import React, { useEffect, useCallback, useRef, useState } from "react";
import "../component/Coin.css";
import videoSource from "../assets/video.mp4";
// import dogevideo from "../assets/dogevideo.MP4";
import frogvideo from "../assets/frog.mp4";
import shibuvideo from "../assets/shibu.mp4";
import doge from "../assets/Rectangle1.png";
import frog from "../assets/frogs.png";
import shibu from "../assets/image 101.png";
import icon from "../assets/asset-hob.png";
import buttonbefore from "../assets/button-before.png";
import pepe from "../assets/PEPE.png";
import image1 from "../assets/Image1.jpg";
import meme from "../assets/Memetv.svg";
import roadmap1 from "../assets/a.png";
import roadmap2 from "../assets/c.png";
import roadmap3 from "../assets/W.png";
import sociallinks from "../assets/social-links.png";
import glitch from "../assets/757Y.gif";
import { isMobile, isTablet, isDesktop } from "react-device-detect";

import twitter from "../assets/x.png";
import snap from "../assets/instagram.png";
import telegram from "../assets/telegram.png";
// import youtube from "../assets/yt.png";
import aboutgif from "../assets/about-gif.gif";
import supplygif from "../assets/supply-gif.gif";
import supplygif1 from "../assets/supply-gif1.gif";
import socialimg from "../assets/social-gif.gif";
import aboutimg from "../assets/Rope.png";
import welcome from "../assets/logo-welcome.svg";
import info from "../assets/info.png";
import btn from "../assets/btn.png";
import yo from "../assets/yo.gif";
import arrow from "../assets/logo-meme.svg";
import tokenarrow from "../assets/Vector 1.png";
import handgif from "../assets/handgif.gif";
import claimTokenn from "../assets/claim-token.gif";
import one from "../assets/84.svg";
import two from "../assets/10.svg";
import three from "../assets/5.svg";
import four from "../assets/1.svg";
import phase1 from "../assets/phase1.svg";
import phase2 from "../assets/phase2.svg";
import phase3 from "../assets/phase3.svg";
import phase4 from "../assets/phase4.svg";
import leftArrow from "../assets/leftarrow.png";
import rightArrow from "../assets/rightarrow.png";
import token1 from "../assets/mobtoken1.png";
import token2 from "../assets/mobtoken2.png";
import tvgif from "../assets/animation.gif";

import clickSound from "../assets/clicksound.mp3";

// Blockchain -Integration
import {
  ConnectWallet,
  useAddress,
  useChain,
  ThirdwebProvider,
  useSigner,
} from "@thirdweb-dev/react";
import config from "../config/config";
import { ethers } from "ethers";

const Coin = () => {
  const [showConnectWalletMessage, setShowConnectWalletMessage] =
    useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  const [showVideo, setShowVideo] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [key, setKey] = useState(0); //animation text loop
  const [tokenButtonText, setTokenButtonText] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [playPauseCounter, setPlaypauseCounter] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasClaimed, setHasClaimed] = useState(false);
  const [infoIcon, setInfoicon] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [responce, setResponce] = useState("");
  const images = [doge, frog, shibu]; // Array of image imports
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageTexts = ["Doge", "Pepe", "Shibu"];
  const [showContent, setShowContent] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [showGlitchGif, setShowGlitchGif] = useState(true);
  const [activeButton, setActiveButton] = useState("");
  const [button, setButton] = useState("play");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [showDonothingMessage, setshowDonothingMessage] = useState(true);
  const [showConnectScreen, setShowConnectScreen] = useState(false);
  const [showclaimedText, setShowClaimedText] = useState(false);
  const [currentIndexSlider, setCurrentIndexSlider] = useState(0);
  const [Claim, isClaim] = useState(false);
  const videoRef = useRef(null);
  const address = useAddress();
  const chain = useChain();
  const [currentIndexDesk, setCurrentIndexDesk] = useState(0);
  const [isGifOn, setIsGifOn] = useState(false);
  const [tapAnimations, setTapAnimations] = useState([]);

  const slider = [phase1, phase2, phase3, phase4];
  const tokenSlider = [token2, token1];

  const sliderDesk = [phase1, phase2, phase3, phase4];
  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth > window.innerHeight
  );
  const updateOrientation = () => {
    setIsLandscape(window.innerWidth > window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener("resize", updateOrientation);
    return () => {
      window.removeEventListener("resize", updateOrientation);
    };
  }, []);

  useEffect(() => {
    const disableContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disableContextMenu);
    return () =>
      document.removeEventListener("contextmenu", disableContextMenu);
  }, []);

  useEffect(() => {
    const blockDevTools = (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey &&
          e.shiftKey &&
          ["I", "J", "C"].includes(e.key.toUpperCase()))
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", blockDevTools);
    return () => document.removeEventListener("keydown", blockDevTools);
  }, []);

  useEffect(() => {
    const updateVh = () => {
      const vh = window.innerHeight * 0.01; // 1% of the viewport height
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    updateVh(); // Initial calculation
    window.addEventListener("resize", updateVh); // Update on resize

    return () => {
      window.removeEventListener("resize", updateVh);
    };
  }, []);

  const styles = {
    warning: {
      textAlign: "center",
      padding: "20px",
      backgroundColor: "#f44336",
      color: "black",
      fontSize: "18px",
    },
  };

  const handleNextDeskSlider = () => {
    if (currentIndexDesk < sliderDesk.length - 1) {
      setCurrentIndexDesk(currentIndexDesk + 1);
    }
  };
  const handlePreviousDeskSlider = () => {
    if (currentIndexDesk > 0) {
      setCurrentIndexDesk(currentIndexDesk - 1);
    }
  };

  const handleNextSlider = () => {
    setCurrentIndexSlider((prevIndex) =>
      prevIndex === slider.length - 1 ? 0 : prevIndex + 1
    );
  };
  const handlePreviousSlider = () => {
    setCurrentIndexSlider((prevIndex) =>
      prevIndex === 0 ? slider.length - 1 : prevIndex - 1
    );
  };

  const handleNextToken = () => {
    setCurrentIndexSlider((prevIndex) =>
      prevIndex === tokenSlider.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousToken = () => {
    setCurrentIndexSlider((prevIndex) =>
      prevIndex === 0 ? tokenSlider.length - 1 : prevIndex - 1
    );
  };

  const handleTap = (e) => {
    // Determine if the event is from a touch or mouse
    const touches = e.touches
      ? Array.from(e.touches)
      : [{ clientX: e.clientX, clientY: e.clientY }];

    // Get the bounding rectangle of the image
    const rect = e.currentTarget.getBoundingClientRect();

    // Calculate the relative position of the tap
    const newAnimations = touches.map((touch) => ({
      id: Date.now() + Math.random(), // Unique ID for the animation
      x: touch.clientX - rect.left, // Adjust for image's position
      y: touch.clientY - rect.top, // Adjust for image's position
    }));

    // Update the state with the new animations
    setTapAnimations((prev) => [...prev, ...newAnimations]);

    // Remove the animations after 3 seconds
    setTimeout(() => {
      setTapAnimations((prev) =>
        prev.filter(
          (animation) =>
            !newAnimations.some((newAnim) => newAnim.id === animation.id)
        )
      );
    }, 3000); // Match the animation duration
  };

  // document.addEventListener("visibilitychange", function () {
  //   if (document.hidden) {
  //     console.log("Browser tab is hidden");
  //     // togglePlayPause();
  //     videoRef.current.pause();
  //     setButton("play");
  //     setIsActive(false);
  //   } else {
  //     // console.log("Browser tab is visible")
  //     //     togglePlayPause();
  //     // setIsActive(true);
  //   }
  // });

  const [activeUsers, setActiveUsers] = useState(0);

  // Blockchain -Integration
  const { contract_Address, contract_ABI } = config;
  const [mTVContract, setMTVContract] = useState();
  const [signer, setSigner] = useState();
  const [signerAddress, setSignerAddress] = useState();
  const [error, setError] = useState();

  //animation text token
  useEffect(() => {
    // Set a timeout to reset the animation by changing the key
    const timeout = setTimeout(() => {
      setKey((prevKey) => prevKey + 1); // Increment the key to force re-render
    }, 45000); // Duration of the animation
    return () => clearTimeout(timeout);
  }, [key]);

  // State to hold the random number
  const [randomNumber, setRandomNumber] = useState("");

  // Function to generate a random 11-digit number
  const generateRandomNumber = () => {
    // Generate random 11-digit number
    const number = Math.floor(100000000000 + Math.random() * 900000000000);
    // Format the number with commas
    const formattedNumber = new Intl.NumberFormat("en-US").format(number);
    setRandomNumber(formattedNumber);
  };

  useEffect(() => {
    // Generate an initial random number
    generateRandomNumber();
    // Set up an interval to update the random number every 5 seconds
    const interval = setInterval(generateRandomNumber, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (address) {
      loadAndResumePlayback();
      setSeconds(0);
      setIsActive(false);
    }
    if (!address) {
      savePlaybackPosition(videoRef?.current?.currentTime);
    }
  }, [address]);

  function loadAndResumePlayback() {
    const savedPosition = localStorage.getItem("videoPlaybackPosition");
    if (savedPosition) {
      videoRef.current.currentTime = savedPosition;
      // videoRef.current.play();
    }
  }

  function savePlaybackPosition(time) {
    // console.log(time);
    localStorage.setItem("videoPlaybackPosition", time);
  }

  const playClickSound = () => {
    const sound = new Audio(clickSound);
    sound.play();
  };

  function ButtonTextChange() {
    if (button == "pause") {
      setButton("play");

      setShowVideo(true);
    } else if (button == "play") {
      setButton("pause");
      setShowVideo(true);
      handlePause();
    }
  }

  // useEffect(() => {
  //   togglePlayPause();
  // }, [button]);

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    } else {
      console.log("noynot");
    }
  };

  const handleWelcomeDismiss = () => {
    setShowWelcomeMessage(false); // Hide welcome message and start showing Connect button
  };

  useEffect(() => {
    setShowGlitchGif(true); // Initially show the glitch GIF
    setTimeout(() => {
      setShowGlitchGif(false);
      // setShowVideo(true); // Show the video component
      setIsVideoPlaying(false); // Automatically start playing the video
    }, 1000); // Glitch GIF displays for 1 second
  }, []);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (!isActive && interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .join(":");
  };

  const handleClick = () => {
    playClickSound();
    if (!isActive) {
      setIsActive(true); // Only activate the timer, no deactivation
    }
  };

  const getButtonDetails = (buttonName) => {
    if (buttonName === activeButton) {
      // if (buttonName !== "play") {
      //   togglePlayPause();
      // }
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
      // videoRef.current.src = videos[videoIndex];
      videoRef.current.load(); // Load the video after changing the source
      videoRef.current
        .play() // Attempt to play the video
        .then(() => {
          setIsVideoPlaying(true); // Update state to reflect that video is playing
        })
        .catch((error) => {
          console.error("Error attempting to play the video: ", error);
          setIsVideoPlaying(false); // Update state to reflect that video is not playing
        });
    }
  };
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = false; // Mute the video initially
      videoRef.current
        .play() // Attempt to autoplay the video when component mounts
        .then(() => {
          // Video is playing muted
          setIsVideoPlaying(true);
        })
        .catch((error) => {
          console.error("Error attempting to autoplay the video: ", error);
          setIsVideoPlaying(false);
        });
    }
  }, []);

  const updateUserDetails = async () => {
    const url = "https://hippie-pepe-be.onrender.com/setUserdetail";
    const body = {
      userPublicKey: address,
      userSeconds: String(playPauseCounter),
      userReward: String(Number(playPauseCounter) * 50),
    };

    try {
      const response = await fetch(url, {
        method: "PUT", // Specify the method
        headers: {
          "Content-Type": "application/json", // Specify the content type
        },
        body: JSON.stringify(body), // Convert the JavaScript object to a JSON string
      });

      if (response.ok) {
        const data = await response.json(); // Parse JSON response if successful
        console.log("Success:", data);
        setPlaypauseCounter(0);
        // isClaim(!Claim);
        return data;
      } else {
        throw new Error("Failed to update user details");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true); // Set video playing state to true
    // Only attempt to show the message if the wallet is not connected
    if (!walletConnected) {
      setTimeout(() => {
        // Double-check the wallet connection status and if the video is still playing
        if (!walletConnected && isVideoPlaying) {
          setShowConnectWalletMessage(true);
        }
      }, 5000);
    }
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
  };

  // const togglePlayPause = () => {
  //   if (videoRef.current) {
  //     if (videoRef.current.paused) {
  //       console.log("Runnningg");
  //       videoRef.current
  //         .play()
  //         .then(() => {
  //           setIsVideoPlaying(true); // Ensure the state is correctly set when video plays
  //           handleClick();
  //           setButton("pause"); // Change button text to "pause"
  //         })
  //         .catch((error) => console.error("Error playing the video:", error));
  //       if (isFirstTime) {
  //         // setTimeout(() => {
  //         if (!address) {
  //           setIsFirstTime(false);
  //           videoRef.current.pause();
  //           setIsVideoPlaying(false); // Ensure the state is correctly set when video is paused
  //           setButton("play"); // Change button text to "play"
  //           setShowConnectWalletMessage(true);
  //         }
  //         // }, 30000);
  //       }
  //     } else {
  //       videoRef.current.pause();
  //       setIsVideoPlaying(false); // Ensure the state is correctly set when video is paused
  //       setButton("play"); // Change button text to "play"
  //     }
  //   }
  // };

  // const handleConnectWallet = () => {
  //   setWalletConnected(true);
  //   localStorage.setItem("walletConnected", "true");
  //   setShowConnectWalletMessage(false);
  // };

  // When connecting the wallet

  // !No wallet
  // useEffect(() => {
  //   const isConnected = localStorage.getItem("walletConnected") === "true";
  //   console.log("Wallet connected from storage:", isConnected); // Check what is being read from local storage
  //   setWalletConnected(isConnected);
  // }, []);

  //****************** */
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (isVideoPlaying && !walletConnected) {
  //       setShowConnectWalletMessage(true);
  //     }
  //   }, 5000);

  //   return () => clearTimeout(timer);
  // }, [isVideoPlaying, walletConnected]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        // Play the video
        videoRef.current
          .play()
          .then(() => {
            setIsVideoPlaying(true); // Update the state to indicate the video is playing
          })
          .catch((error) => console.error("Error playing the video:", error));
      } else {
        // Pause the video
        videoRef.current.pause();
        setIsVideoPlaying(false); // Update the state to indicate the video is paused
      }
    }
  };

  // To ensure the video pauses when navigating away and resumes when returning:
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else if (!document.hidden && videoRef.current && isVideoPlaying) {
        videoRef.current.play().catch((error) => {
          console.error("Error resuming video:", error);
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isVideoPlaying]);

  const claimToken = async () => {
    const url = "https://hippie-pepe-be.onrender.com/setUserdetail";
    const body = {
      publicKey: address,
      userWatchSeconds: seconds,
    };

    try {
      const response = await fetch(url, {
        method: "PUT", // Specify the method
        headers: {
          "Content-Type": "application/json", // Specify the content type
        },
        body: JSON.stringify(body), // Convert the JavaScript object to a JSON string
      });

      if (response.ok) {
        const data = await response.json(); // Parse JSON response if successful
        console.log("Success:", data);
        // setPlaypauseCounter(0);
        // isClaim(!Claim);
        setResponce(data);
        handleClickclaimedToken();
        return data;
      } else {
        throw new Error("Failed to update user details");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClickclaimedToken = () => {
    setPlaypauseCounter(0);
    setSeconds(0);
    setShowClaimedText(true);
    playClickSound(false);
    setActiveButton("roadmap");
    setshowDonothingMessage(false);
    setShowAbout(false);
    setShowVideo(false);
    // setShowConnectWalletMessage(false);
    setShowConnectScreen(false); // Correct usage of the state setter function
    setIsActive(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsVideoPlaying(false);
    setButton("play");
    setShowToken(false);
    setShowSocial(false);
    setShowRoadmap(false);
    setShowWelcomeMessage(false);
    setshowDonothingMessage(false);
    setShowGlitchGif(true);
    setTokenButtonText(false);
    setTimeout(() => {
      setShowGlitchGif(false);
      setShowRoadmap(false); // Toggle the visibility based on previous state
      setShowAbout(false);
      setshowDonothingMessage(false);
      setShowSocial(false);
      setShowToken(false);
    }, 200);
  };

  const handlePlayClick = () => {
    console.log("Play clicked");
    playClickSound();
    // alert("all")
    setActiveButton("play");
    setShowClaimedText(false);
    setShowAbout(false);
    setIsGifOn(false);
    ButtonTextChange();
    // setShowVideo(false);
    // setIsVideoPlaying(false);
    setShowToken(false);
    setShowSocial(false);
    setShowRoadmap(false);
    setShowConnectScreen(false);
    setShowWelcomeMessage(false);
    setshowDonothingMessage(false);
    if (!isVideoPlaying) {
      // If the video is not playing, start it and the timer.
      setIsActive(true); // Start the timer
      if (!showConnectWalletMessage) {
        togglePlayPause();
      }
      setShowConnectScreen(false); // This will start the video and update `isVideoPlaying` to true.
      // Set a timeout to display the message after 5 seconds
    } else {
      // If the video is playing, pause it and stop the timer.
      setIsActive(false); // Stop the timer
      if (!showConnectWalletMessage) {
        togglePlayPause();
      }
      setShowConnectScreen(false);
    }
  };

  const handleAboutClick = () => {
    // setShowConnectWalletMessage(false);
    playClickSound();
    setShowClaimedText(false);
    setIsGifOn(true);
    setActiveButton("about");
    // Immediately hide the content and start the glitch effect
    setShowAbout(false);
    setShowVideo(false);
    setIsActive(false);
    setshowDonothingMessage(false);
    setIsVideoPlaying(false);
    setShowToken(false);
    setShowSocial(false);
    setShowRoadmap(false);
    setShowConnectScreen(false); // Correct usage of the state setter function
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsVideoPlaying(false);
    setButton("play");
    setShowWelcomeMessage(false);
    setShowConnectScreen(false);
    setShowGlitchGif(true);
    // After the glitch effect, toggle the content
    setTimeout(() => {
      setShowGlitchGif(false);
      setShowAbout(true); // Toggle the visibility based on previous state
      setShowRoadmap(false);
      setShowSocial(false);
      setShowToken(false);
      setshowDonothingMessage(false);
      setTokenButtonText(false);
    }, 200);
  };

  const handleOffclickinToken = () => {
    setTokenButtonText(false);
    setShowToken(true);
    setIsGifOn(true);
    setshowDonothingMessage(false);
  };
  const handleTokenClick = () => {
    playClickSound(false);
    setActiveButton("token");
    setShowClaimedText(false);
    setshowDonothingMessage(false);
    setIsActive(false);
    setIsGifOn(true);
    // setShowConnectWalletMessage(false);
    // Hide all content and trigger the glitch effect
    setShowAbout(false);
    setShowVideo(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsVideoPlaying(false);
    setShowConnectScreen(false); // Corrected from showConnectScreen to setShowConnectScreen
    setButton("play");
    setIsVideoPlaying(false);
    setShowToken(false);
    setShowSocial(false);
    setShowRoadmap(false);
    setTokenButtonText(false);
    setShowWelcomeMessage(false);
    setShowGlitchGif(true);
    setTimeout(() => {
      setShowGlitchGif(false);
      setShowToken(true); // Toggle the visibility based on previous state
      setShowAbout(false);
      setShowSocial(false);
      setShowRoadmap(false);
    }, 200);
  };
  const handleSocialClick = () => {
    playClickSound();
    setActiveButton("social");
    setIsGifOn(true);
    setShowClaimedText(false);
    setshowDonothingMessage(false);
    setShowAbout(false);
    setShowVideo(false);
    // setShowConnectWalletMessage(false);
    setShowConnectScreen(false); // Correct usage of the state setter function
    setIsActive(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsVideoPlaying(false);
    setButton("play");
    setShowToken(false);
    setShowSocial(false);
    setShowRoadmap(false);
    setShowWelcomeMessage(false);
    setShowGlitchGif(true);
    setTokenButtonText(false);
    setTimeout(() => {
      setShowGlitchGif(false);
      setShowSocial(true); // Toggle the visibility based on previous state
      setShowAbout(false);
      setShowRoadmap(false);
      setShowToken(false);
    }, 200);
  };

  const handleRoadmapClick = () => {
    playClickSound();
    setActiveButton("roadmap");
    setIsGifOn(true);
    setshowDonothingMessage(false);
    setShowAbout(false);
    setShowClaimedText(false);
    setShowVideo(false);
    // setShowConnectWalletMessage(false);
    setShowConnectScreen(false); // Correct usage of the state setter function
    setIsActive(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsVideoPlaying(false);
    setButton("play");
    setShowToken(false);
    setShowSocial(false);
    setShowRoadmap(false);
    setShowWelcomeMessage(false);
    setShowGlitchGif(true);
    setTokenButtonText(false);
    setTimeout(() => {
      setShowGlitchGif(false);
      setShowRoadmap(true); // Toggle the visibility based on previous state
      setShowAbout(false);
      setShowSocial(false);
      setShowToken(false);
    }, 200);
  };

  const handleDonothingClick = () => {
    // setShowConnectWalletMessage(false);
    playClickSound();
    setShowClaimedText(false);
    setActiveButton("about");
    // Immediately hide the content and start the glitch effect
    setShowAbout(false);
    setShowVideo(false);
    setIsActive(false);
    setIsVideoPlaying(false);
    setShowToken(false);
    setShowSocial(false);
    setShowRoadmap(false);
    setShowConnectScreen(false); // Correct usage of the state setter function
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsVideoPlaying(false);
    setButton("play");
    setShowWelcomeMessage(false);
    setshowDonothingMessage(true);
    setShowConnectScreen(false);
    setShowGlitchGif(true);
    // After the glitch effect, toggle the content
    setTimeout(() => {
      setShowGlitchGif(false);
      setShowAbout(false); // Toggle the visibility based on previous state
      setShowRoadmap(false);
      setShowSocial(false);
      setShowToken(false);
      setTokenButtonText(false);
    }, 200);
  };

  //********************************* */
  useEffect(() => {
    if (currentIndex !== undefined && [currentIndex]) {
      handleVideoLoadAndPlay(currentIndex);
    }
  }, [currentIndex]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const claimRewards = () => {
    setHasClaimed(true);
    setSeconds(0);

    setTimeout(() => {
      setHasClaimed(false);
    }, 5000);

    const updateUserDetails = async () => {
      const url = "https://hippie-pepe-be.onrender.com/setUserdetail";
      const body = {
        userPublicKey: address,
        userSeconds: String(playPauseCounter),
        userReward: String(Number(playPauseCounter) * 50),
      };

      try {
        const response = await fetch(url, {
          method: "PUT", // Specify the method
          headers: {
            "Content-Type": "application/json", // Specify the content type
          },
          body: JSON.stringify(body), // Convert the JavaScript object to a JSON string
        });

        if (response.ok) {
          const data = await response.json(); // Parse JSON response if successful
          console.log("Success:", data);
          isClaim(!Claim);
          return data;
        } else {
          throw new Error("Failed to update user details");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    updateUserDetails(); // Call the function to make the request
  };

  useEffect(() => {
    fetchUserDetails();
  }, [address]);
  const fetchUserDetails = async () => {
    try {
      console.log(address);
      // Make the GET request using fetch
      const response = await fetch(
        `https://hippie-pepe-be.onrender.com/getUserdetail/${address}`
      );

      // Check if the response is successful (status code 200)
      if (response.ok) {
        // Parse the response JSON data
        const data = await response.json();
        // Set the user details in state
        setSeconds(Number(data.user.userSeconds));
        console.log(JSON.stringify(data) + "Datadatadata");
      } else {
        // Handle error if response is not successful
        console.error("Error fetching user details:", response.statusText);
      }
    } catch (error) {
      // Handle any network errors
      console.error("Network error:", error);
    }
  };

  const thirdwebSigner = useSigner();

  const getSignerAddress = useCallback(async () => {
    if (thirdwebSigner && !signer) {
      try {
        const address = await thirdwebSigner.getAddress();
        setSigner(thirdwebSigner);
        setSignerAddress(address);
        console.log("Signer address:", address);
        console.log(contract_Address);
        const contract = new ethers.Contract(
          contract_Address,
          contract_ABI,
          thirdwebSigner
        );
        setMTVContract(contract);
        console.log("Contract:", contract);
      } catch (error) {
        console.error("Error getting signer address:", error);
      }
    }
  }, [thirdwebSigner, signer]);

  useEffect(() => {
    getSignerAddress();
  }, [getSignerAddress]);

  const claimTokensFromBlockchain = async () => {
    console.log("Inside Claim Tokens from  blockchain function");
    togglePlayPause();
    setIsActive(false);
    if (!signer) {
      // Check if signer is available
      alert("Please connect your wallet first");
      return;
    }
    try {
      console.log("inside try");
      const tx = await mTVContract.mintWithWatchTime([seconds]);
      await tx.wait();
      console.log(tx.hash);
      if (tx.hash) {
        claimToken();
      }
      console.log(
        `The transaction hash for minting tokens from memeTV is ${tx.hash}`
      );
    } catch (error) {
      if (error.message.search("The Array lengths can't be different") !== -1)
        setError("The Array lengths can't be different");
      else if (
        error.message.search("User Cooldown time has not expired") !== -1
      )
        setError("User Cooldown time has not expired");
      else setError(error.message);
    }
  };

  // Event handler for when the element is hovered over
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Event handler for when the mouse leaves the element
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div>
      {isLandscape && isMobile ? (
        <div className="landscape-warning" style={styles.warning}>
          Please switch back to portrait mode for the best experience.
        </div>
      ) : (
        <div className="memetv">
          <div className="row right-align small-d">
            <div className="col-6 col-sm-8">
              <div
                className="mob-desk"
                style={{ position: "relative", float: "left" }}
              >
                <div
                  style={{
                    position: "relative",
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img draggable="false" src={meme} />
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-4 navbar-1">
              <nav className="navbar navbar-light">
                <div className="container-fluid">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleMenu}
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                </div>
              </nav>
            </div>
            <div className="tv">
              <div className="col-3 social-mob col-sm-3 col-md-12 col-xl-12">
                <div className="social-links">
                  <ul>
                    <li>
                      <a
                        href="https://t.me/thememetvcommunity"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img draggable="false" src={telegram} alt="telegram" />
                      </a>{" "}
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/thememe.tv_/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img draggable="false" src={snap} alt="instagram" />
                      </a>
                    </li>

                    <li>
                      <a
                        href="https://x.com/thememe_tv"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img draggable="false" src={twitter} alt="Twitter" />
                      </a>
                    </li>

                    {/* <li>
                  <a
                    href="https://www.youtube.com/@HippiePepe"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img draggable="false"draggable="false"src={youtube} alt="youtube" />
                  </a>
                </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3 col-sm-2 navbar-1">
            {isOpen && (
              <div className="overlay">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div className="overlay-content">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                      }}
                    >
                      <ul
                        className="ul-button"
                        style={{
                          zIndex: 100000,
                        }}
                      >
                        <li
                          style={getButtonDetails("play").style}
                          onClick={() => {
                            handlePlayClick();
                            toggleMenu();
                          }}
                        >
                          <img
                            src={getButtonDetails("play").icon}
                            alt="Play Icon"
                          />
                          <span onClick={ButtonTextChange}>
                            &nbsp;&nbsp;{button}
                          </span>
                        </li>
                        <li
                          style={getButtonDetails("about").style}
                          onClick={() => {
                            handleAboutClick();
                            toggleMenu();
                          }}
                        >
                          <img
                            src={getButtonDetails("about").icon}
                            alt="About Icon"
                          />
                          <span>&nbsp;&nbsp;About</span>
                        </li>
                        <li
                          style={getButtonDetails("roadmap").style}
                          onClick={() => {
                            handleRoadmapClick();
                            toggleMenu();
                          }}
                        >
                          <img
                            src={getButtonDetails("roadmap").icon}
                            alt="Roadmap Icon"
                          />
                          <span>&nbsp;&nbsp;Roadmap</span>
                        </li>
                        <li
                          style={getButtonDetails("token").style}
                          onClick={() => {
                            handleTokenClick();
                            toggleMenu();
                          }}
                        >
                          <img
                            src={getButtonDetails("token").icon}
                            alt="Token Icon"
                          />
                          <span>&nbsp;&nbsp;Token</span>
                        </li>
                        <li
                          style={getButtonDetails("social").style}
                          onClick={() => {
                            handleSocialClick();
                            toggleMenu();
                          }}
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
                  {/* <div
                    className="social-links"
                    style={{ marginTop: "50px", zIndex: 10000000 }}
                  > */}
                  {/* <ul>
                  <li>
                    <a
                      href="https://x.com/thememe_tv"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img draggable="false"draggable="false"src={twitter} alt="Twitter" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/thememe.tv_/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img draggable="false"draggable="false"src={snap} alt="instagram" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://t.me/thememetvcommunity"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img draggable="false"draggable="false"src={telegram} alt="telegram" />
                    </a>
                  </li>
                  
                </ul> */}
                  {/* </div> */}
                </div>
                <div className="overlay-close" onClick={toggleMenu}></div>
              </div>
            )}
          </div>
          <div id="tv" className="memetv">
            <div id="screen">
              <div id="glass">
                <div className="inner-glass">
                  <div class="noise"></div>
                  {/* <div className="nav-1">
                  <img draggable="false"draggable="false"src={meme} />
                </div> */}
                  <div
                    className={
                      showWelcomeMessage ? " inner-text1" : "inner-text"
                    }
                  >
                    {/* {showGlitchGif && (
                  <img
                    src={glitch}
                    alt="Glitch Effect"
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                )} */}

                    {infoIcon && (
                      <div
                        // className="card"
                        id="glitch-background"
                        style={{
                          zIndex: 1000000,
                          position: "absolute",
                          backgroundColor: "black",
                          height: "100%",
                          width: "100%",
                        }}
                      >
                        <div className="row img-res">
                          <div className="col-md-12 ">
                            <div className="row justify-items-center">
                              <div className="col-md-12 wel-trasition-1 ">
                                <div className="col-md-8">
                                  <h2 className="text-head text-left pb-4">
                                    RULES FOR PARTICIPATION
                                  </h2>
                                  <p className="text-head text-left pb-0">
                                    1.Connect the wallet
                                  </p>
                                  <p className="text-head  text-left pb-0">
                                    2.Start watching the video by clicking start
                                    button
                                  </p>
                                  <p className="text-head  text-left pb-0">
                                    3.Receive TheMEMETv tokens for every second
                                    you watch
                                  </p>
                                  <p className="text-head  text-left pb-0">
                                    MOST IMPORTANT: doNothing else while
                                    watching the Meme Lords.{" "}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {showWelcomeMessage && (
                      <div className="row img-res">
                        <div className="col-md-12 ">
                          <div>
                            <img
                              draggable="false"
                              className="animation-logo"
                              src={welcome}
                            />{" "}
                          </div>
                        </div>
                        {/*<span className='shadow'>About HippiePepeMemeTV</span>  */}
                        <div className="text-head pt-1"></div>
                      </div>
                    )}
                    {showConnectScreen && (
                      <div className="row img-res">
                        <div className="col-md-12 ">
                          <div className="row justify-items-center">
                            <div className="col-md-12 wel-trasition-1 ">
                              <div className="col-md-8">
                                <h2 className="text-head text-left pb-4">
                                  RULES FOR PARTICIPATION
                                </h2>
                                <p className="text-head text-left pb-0">
                                  1.Connect the wallet
                                </p>
                                <p className="text-head  text-left pb-0">
                                  2.Start watching the video by clicking start
                                  button
                                </p>
                                <p className="text-head  text-left pb-0">
                                  3.Receive TheMEMETv tokens for every second
                                  you watch
                                </p>
                                <p className="text-head  text-left pb-0">
                                  MOST IMPORTANT: doNothing else while watching
                                  the Meme Lords.{" "}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div>
                      {!showConnectWalletMessage &&
                        activeButton == "play" &&
                        !address && (
                          <div
                            style={{
                              zIndex: 10000,
                            }}
                          >
                            <div className="intro-wallet">
                              <div class="welcome-info1">
                                {/* <div class="text-head pt-2">
                              <h2 id="textcolorabout" class="welcome-para">
                              </h2>
                              <p class="about-para2 pb-2">
                              </p>
                            </div> */}
                                <div className="">
                                  {/* <button
                                  className="btn-outline"
                                >
                                </button> &nbsp;
                                <button style={{
                                   border:"2px solid #4CB04F",
                                }}
                                  className="cnt-wallet"
                                >
                                </button> */}
                                </div>
                              </div>
                              <div></div>
                            </div>
                          </div>
                        )}

                      <video
                        className={showVideo ? "playvideo" : "hidevideo"}
                        onWaiting={() => console.log("Buffering...")}
                        onCanPlay={() => console.log("Playback can continue.")}
                        ref={videoRef}
                        // width={showVideo ? "100%" : "0%"}
                        // height={showVideo ? "100%" : "0%"}
                        style={{ objectFit: "cover" }}
                        loop
                      >
                        <source
                          className=""
                          src="https://res.cloudinary.com/dhebiyrep/video/upload/v1715257036/kbld2jankfvu2d8wvixj.mp4"
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>

                    {showAbout && (
                      <div id="glitch-background" className=" center-content">
                        <div className="about-trasition-1">
                          {/*<span className='shadow'>About HippiePepeMemeTV</span>  */}
                          <div className="pt-3 pb-5 about-pad">
                            <h3
                              id="textcolorabout"
                              className="about-para1 header-line  mb-2"
                            >
                              About TheMemeTV{" "}
                            </h3>
                            <p className="about-para2 pb-0 text-head">
                              We were all born Memes. We were all born to Memes.
                              We were all born to meme.The world seems to have
                              forgotten this and taken itself too seriously.
                              TheMemeTV is here to spread joy and to spread
                              other things also, I think but mostimportantly to
                            </p>
                            <p className="pb-0 f18"> #doNothing</p>
                            <div className="rope-img">
                              <img draggable="false" src={aboutgif} />
                            </div>
                            <p className="text-1">
                              So, you also watch{" "}
                              <span className="bg-span">TheMemeTv</span> and
                              #doNothing. Okay??
                            </p>
                          </div>
                          {/* <div className="about-gif-part">
                        <img draggable="false"draggable="false"src={aboutgif} />{" "}
                      </div> */}
                        </div>
                      </div>
                    )}

                    {showDonothingMessage && (
                      <div id="glitch-background" className=" center-content">
                        <div className="about-trasition-1">
                          {/*<span className='shadow'>About HippiePepeMemeTV</span>  */}
                          <div className="pt-2 pb-1 about-pad">
                            <h3
                              id="textcolorabout"
                              className="about-para1 header-line  mb-2"
                            >
                              Welcome to TheMeme Tv{" "}
                            </h3>
                            <p className="about-para2 pb-0 text-head p50 pt-2 pb-1">
                              Get ready to watch hilarious stuff, play some
                              silly games and earn tokens while you #doNothing.
                            </p>
                            <p className="text-ab pb0">
                              Click on the button below to be notified when its
                              time
                            </p>

                            <div className="row justify-content pt-2">
                              <div className="col-md-4 col-8 col-lg-3">
                                <div id="donothing" className="do-nothing">
                                  <a
                                    href="https://t.me/the_meme_tv_bot"
                                    target="blank"
                                  >
                                    <button className="donothing">
                                      #doNothing
                                    </button>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <div className="about-gif-part">
                        <img draggable="false"draggable="false"src={aboutgif} />{" "}
                      </div> */}
                        </div>
                      </div>
                    )}
                    {showToken && (
                      <div id="glitch-background" className=" center-content">
                        <div className="trasition-2">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="supply-part">
                                <h2
                                  id="textcolortoken"
                                  className="header-line text-center pb-3"
                                >
                                  Total supply
                                  {/* <span>(coz is’s a formality)</span> */}
                                </h2>
                                {/* <img draggable="false"draggable="false"src={supplygif} />{" "} */}
                              </div>
                              <h2
                                id="textcolorsocial"
                                className="supply-p txt-white"
                              >
                                100,000,000,021 TMTV
                              </h2>
                            </div>
                          </div>

                          <div>
                            <div className="mob-res row justify-content-center">
                              <div className="col-12 ">
                                <img
                                  draggable="false"
                                  src={tokenSlider[currentIndexSlider]}
                                />
                              </div>
                              <div className="col-12">
                                <button
                                  onClick={handlePreviousToken}
                                  className="slider-arrow left-arrow"
                                ></button>
                              </div>
                              <div className="col-12">
                                <button
                                  onClick={handleNextToken}
                                  className="slider-arrow right-arrow"
                                >
                                  <div className="slider">
                                    <img
                                      draggable="false"
                                      src={leftArrow}
                                      alt="Previous"
                                    />
                                    <img
                                      draggable="false"
                                      src={rightArrow}
                                      alt="Next"
                                    />
                                  </div>
                                </button>
                              </div>
                            </div>

                            <div className="desk row justify-content-center">
                              <div className="col-md-3 col-6 ">
                                <img draggable="false" src={one} />
                              </div>
                              <div className="col-md-3 col-6">
                                {" "}
                                <img draggable="false" src={two} />
                              </div>
                              <div className="col-md-3 col-6">
                                {" "}
                                <img draggable="false" src={three} />
                              </div>
                              <div className="col-md-3 col-6">
                                {" "}
                                <img draggable="false" src={four} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {tokenButtonText && (
                      <div className="row token-read1">
                        <div className="rope-img"></div>
                        {/*<span className='shadow'>About HippiePepeMemeTV</span>  */}
                        <div className="col-md-12" style={{ zIndex: 1000000 }}>
                          <span
                            className="text-right text-head fnt-back"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handleOffclickinToken();
                            }}
                          >
                            <img draggable="false" src={tokenarrow} />
                          </span>
                        </div>
                        {/* <div className=" col-md-12 text-head pt-2">
                      <h5 id="textcolorabout" className="about-para1">
                        It is a little complicated. If you are not so smart,
                        just skip it.It’s cool{" "}
                      </h5>
                      <p className="about-para2 ">
                        So, some% of all the tokens are kept aside for you all
                        to watch the HippiePepe TV and earn. A total of ’we
                        don’t know yet’ seconds of total watch time is available
                        across ‘x’ Phases of ‘some beautiful’ seconds each. In
                        the first phase, for every second you watch, you will
                        receive a ‘large number’ of HPTV tokens. After you all
                        have cumulatively watched those ‘beautiful’ seconds, the
                        first Reward halving will happen. Then it becomes half
                        of ‘a large number’ HPTV tokens per second. And
                        then....so on and so forth. You get the drift. This was
                        Reward Halving.
                      </p>{" "}
                      <p>
                        Now, time for reward doubling. During the ’we don’t know
                        yet’ seconds of the Watch and Earn phase, the content
                        owners of the videos that are played on the HippiePepe
                        TV will be paid from the some% kept aside for them. In
                        the initial phases we believe it is us that wil mostly
                        put up the content. So, the creator royalty starts at a
                        ‘very low’ HPTV tokens per second in Phase 1 of Watch
                        and Earn.It keeps doubling till it Phase M when the
                        reward would have increased to a ‘large number’ of HPTV
                        tokens per second.The deal is that every time you watch
                        the the HippiePepe TV, the creator of what you are
                        watching will also be rewarded.
                      </p>
                      <p>
                        If you read the whole thing, we love you. And if you
                        read the whole thing, you love us.
                      </p>
                    </div> */}
                        {activeButton == "token" && (
                          <>
                            <section class="intro text-head">
                              It is a little complicated. If you are not so
                              smart, just skip it.It’s cool
                            </section>
                            <div id="scroller" key={key}>
                              <div id="content">
                                <p id="title"></p>
                                <br />
                                <p className="text-head">
                                  So, some % of all the tokens are kept aside
                                  for you all to watch the HippiePepe TV and
                                  earn. A total of ’we don’t know yet’ seconds
                                  of total watch time is available across ‘x’
                                  Phases of ‘some beautiful’ seconds each. In
                                  the first phase, for every second you watch,
                                  you will receive a ‘large number’ of HPTV
                                  tokens. After you all have cumulatively
                                  watched those ‘beautiful’ seconds, the first
                                  Reward halving will happen. Then it becomes
                                  half of ‘a large number’ HPTV tokens per
                                  second. And then....so on and so forth. You
                                  get the drift. This was Reward Halving.
                                </p>
                                <p className="text-head">
                                  Now, time for reward doubling. During the ’we
                                  don’t know yet’ seconds of the Watch and Earn
                                  phase, the content owners of the videos that
                                  are played on the HippiePepe TV will be paid
                                  from the some% kept aside for them. In the
                                  initial phases we believe it is us that wil
                                  mostly put up the content. So, the creator
                                  royalty starts at a ‘very low’ HPTV tokens per
                                  second in Phase 1 of Watch and Earn.It keeps
                                  doubling till it Phase M when the reward would
                                  have increased to a ‘large number’ of HPTV
                                  tokens per second.The deal is that every time
                                  you watch the the HippiePepe TV, the creator
                                  of what you are watching will also be
                                  rewarded.
                                </p>
                                <p className="text-head">
                                  If you read the whole thing, we love you. And
                                  if you read the whole thing, you love us.
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                    {showSocial && (
                      <div id="glitch-background" className=" center-content">
                        <div className="trasition-1">
                          <img
                            draggable="false"
                            className="pb-2 gif-img"
                            src={socialimg}
                          />
                          <h3>Watch TheMemeTv and doNothing</h3>

                          <div className="text-head">
                            <h2
                              id="textcolorsocial"
                              className="header-line h-size"
                            >
                              Ashte,Go now!!!
                            </h2>
                            <div className="img-social">
                              <ul>
                                <li>
                                  <a
                                    href="https://x.com/thememe_tv"
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
                                    href="https://www.instagram.com/thememe.tv_/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <img
                                      draggable="false"
                                      src={snap}
                                      alt="instagram"
                                    />
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="https://t.me/thememetvcommunity"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <img
                                      draggable="false"
                                      src={telegram}
                                      alt="telegram"
                                    />
                                  </a>{" "}
                                </li>
                                {/* <li>
                              <a
                                href="https://www.youtube.com/@HippiePepe"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <img draggable="false"src={youtube} alt="youtube" />
                              </a>
                            </li> */}
                              </ul>
                            </div>
                            <span className="hippe text-head">TheMemeTV</span>
                            <p className="social-tag pb-5">
                              <p>
                                TheMemeTv is a meme coin with no intrinsic value
                                or expectation of financial return. The road map
                                is only indicative beyond Phase 3. The platform
                                is for entertainment purposes only.
                              </p>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    {showclaimedText && (
                      <div className="trasition-3">
                        <img draggable="false" src={claimTokenn} />
                        {responce.message ==
                        ("User has Reached the Maximum WatchSeconds Limit" ||
                          "All Phases have been completed") ? (
                          <p className="text-head1 pt-2 claim-reward">
                            {responce.message}
                          </p>
                        ) : (
                          <>
                            <p className="text-head1 pt-2 claim-reward">
                              Collect Your Reward
                            </p>
                            <p className="text-head1">
                              You earned {responce.user.yourReward} MEMETV Token
                            </p>
                            <p className="text-head2">
                              {" "}
                              {responce.phaseMessage}{" "}
                            </p>
                          </>
                        )}
                      </div>
                    )}
                    {showRoadmap && (
                      <div id="glitch-background" className="road-map-text">
                        <h2
                          id="textcolorroadmap"
                          className="header-line text-left pb-3"
                        >
                          Road map
                          {/* <span>(coz is’s a formality)</span> */}
                        </h2>
                        <div className="mob-res">
                          <div className="row road1 trasition-4">
                            <div className="col-12 col-lg-4 pb-2 col-md-4 road-min ">
                              <img
                                draggable="false"
                                className="w100"
                                src={slider[currentIndexSlider]}
                                alt="Slider Image"
                              />
                            </div>
                            <div className="col-12 col-lg-4 col-md-4 pb-2 road-min"></div>
                            <div className="col-12 col-lg-4 col-md-4 pb-2">
                              <button className="slider-arrow right-arrow">
                                <div className="slider">
                                  <img
                                    draggable="false"
                                    onClick={handlePreviousSlider}
                                    src={leftArrow}
                                    alt="Previous"
                                  />
                                  <img
                                    draggable="false"
                                    onClick={handleNextSlider}
                                    src={rightArrow}
                                    alt="Next"
                                  />
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="desk">
                          <div className="row road1 trasition-4">
                            <div
                              className="slider-track"
                              style={{
                                transform: `translateX(-${
                                  currentIndexDesk * 15
                                }%)`,
                              }}
                            >
                              <div className="col-12 col-lg-4 col-md-4 pb-2 road-min">
                                <img
                                  className="img-desk"
                                  src={sliderDesk[0]}
                                  alt="Image 1"
                                />
                              </div>
                              <div className="col-12 col-lg-4 pb-2 col-md-4 road-min">
                                <img
                                  className="img-desk"
                                  src={sliderDesk[1]}
                                  alt="Image 2"
                                />
                              </div>
                              <div className="col-12 col-lg-4 col-md-4 pb-2">
                                <img
                                  className="img-desk"
                                  src={sliderDesk[2]}
                                  alt="Image 3"
                                />
                              </div>
                              <div className="col-12 col-lg-4 col-md-4 pb-2">
                                <img
                                  className="img-desk"
                                  src={sliderDesk[3]}
                                  alt="Image 4"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <button
                                onClick={handlePreviousDeskSlider}
                                className="slider-arrow left-arrow"
                              >
                                <img
                                  draggable="false"
                                  src={leftArrow}
                                  alt="Previous"
                                />
                              </button>
                              <button
                                onClick={handleNextDeskSlider}
                                className="slider-arrow right-arrow"
                              >
                                <img
                                  draggable="false"
                                  src={rightArrow}
                                  alt="Next"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div id="controls">
              <ul className="social-1">
                <li>{/* <img draggable="false"src={sociallinks} /> */}</li>
              </ul>
              <div id="panel">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <ul className="ul-button">
                    <li
                      style={getButtonDetails("play").style}
                      onClick={handlePlayClick}
                    >
                      <img
                        draggable="false"
                        src={getButtonDetails("play").icon}
                        alt="Play Icon"
                      />
                      <span onClick={ButtonTextChange}>
                        &nbsp;&nbsp;{button}
                      </span>
                    </li>
                    <li
                      style={getButtonDetails("about").style}
                      onClick={handleAboutClick}
                    >
                      <img
                        draggable="false"
                        src={getButtonDetails("about").icon}
                        alt="About Icon"
                      />
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
                      <img
                        draggable="false"
                        src={getButtonDetails("token").icon}
                        alt="Token Icon"
                      />
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
              <div>
                <div>
                  <div id="navi-video" className="wallet-desk">
                    <button
                      onClick={handleDonothingClick}
                      className="donothing"
                    >
                      #doNothing
                    </button>
                  </div>
                </div>
              </div>

              <div className="control-1">
                <div>
                  <div id="speaker">
                    <div className="navi">
                      {address ? (
                        // Conditional rendering based on whether the rewards have been claimed
                        hasClaimed ? (
                          // Display "Congratulations" message if rewards have been claimed
                          <button
                            className="btn-color flex flex-col justify-center items-center gap-1"
                            onClick={claimRewards}
                          >
                            <h3 className="text-sm">
                              {" You claimed your token & restart the minting."}
                            </h3>
                          </button>
                        ) : (
                          <div className="row">
                            <div className="text-right icon-1 col-12">
                              <img
                                className="h-8 img-icon"
                                src={info}
                                alt="My GIF"
                                onMouseEnter={() => setInfoicon(true)}
                                onMouseLeave={() => setInfoicon(false)}
                              />
                              {infoIcon}
                            </div>
                            <div className="handgif text-c">
                              <img draggable="false" src={handgif} />
                            </div>
                            <div
                              className="row"
                              style={{
                                marginLeft: "0",
                              }}
                            >
                              <div className="col-5 col-xl-12 col-lg-12 col-sm-6 col-xl-12">
                                <div>
                                  <button className="btn-color">
                                    <h3>
                                      <div>Time </div>
                                      {formatTime(seconds)}
                                    </h3>
                                  </button>
                                </div>
                              </div>
                              <div className="col-5 col-xl-12 col-sm-6 col-lg-12">
                                <div>
                                  <button className="btn-color">
                                    {/* <h3> {seconds * 50} MMT Tokens</h3> */}
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-xl-12 col-md-12">
                              <button className="btn-color mar-top">
                                <div className="w-[160.50px] h-10 relative">
                                  <div className="left-[15px] top-[12px] absolute text-center text-green-600 text-base font-normal font-['VCR OSD Mono'] ">
                                    <div
                                      className="cardd text-center"
                                      style={{ position: "relative" }}
                                    >
                                      <img
                                        className="h-10"
                                        src={btn}
                                        alt="My button"
                                      />
                                      <div
                                        className="claim-1"
                                        style={{
                                          position: "absolute",
                                          marginLeft: "8px",
                                        }}
                                      >
                                        {/* <h3
                                            className="claim-h3"
                                            onClick={
                                              chain.chain == "BSC" &&
                                              seconds !== 0
                                                ? claimTokensFromBlockchain
                                                : null
                                            }
                                          >
                                            claim token
                                          </h3> */}
                                        {/* <p> */}
                                        <h6>Live Users: {activeUsers}</h6>
                                        {/* </p> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </button>
                            </div>
                          </div>
                        )
                      ) : (
                        <>
                          <button
                            onClick={handleDonothingClick}
                            className="mob-res btn-color flex flex-col justify-center items-center"
                          >
                            <img
                              draggable="false"
                              className="h-20 cnt-gif"
                              src={arrow}
                              alt="My GIF"
                            />
                            <h3 className="mob-res donothing">#doNothing</h3>
                          </button>
                          {isGifOn ? (
                            <div className="flex flex-col justify-center items-center">
                              <div className="container">
                                <img
                                  onClick={handleTap}
                                  src={tvgif}
                                  className="gif-size"
                                  alt="Clickable GIF"
                                />
                                {tapAnimations.map((animation) => (
                                  <div
                                    key={animation.id}
                                    className="tap-point"
                                    style={{
                                      left: animation.x,
                                      top: animation.y,
                                    }}
                                  >
                                    +5
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <>
                              {/* <button
                                  onClick={handleDonothingClick}
                                  className="mob-res btn-color flex flex-col justify-center items-center"
                                >
                                  <img
                                    draggable="false"
                                    className="h-20 cnt-gif"
                                    src={arrow}
                                    alt="My GIF"
                                  />
                                  <h3 className="mob-res donothing">
                                    #doNothing
                                  </h3>
                                </button> */}
                              <button
                                onClick={() => {
                                  setIsGifOn(true);
                                }}
                                className="desk btn-color flex flex-col justify-center items-center"
                              >
                                <img
                                  draggable="false"
                                  className="h-20 cnt-gif"
                                  src={arrow}
                                  alt="My GIF"
                                />
                                <h3> Watch,Tap,Play Repeat</h3>
                                <h3 className="mob-res donothing">
                                  #doNothing
                                </h3>
                              </button>
                            </>
                          )}
                          {/* */}
                        </>
                      )}
                      <div
                        className="video-play"
                        id="imagetext"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "10px",
                          marginTop: "2px",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div class="meme-img">
                  <img draggable="false" src={image1} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coin;
