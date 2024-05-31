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
import meme from "../assets/Memetv.png";
import roadmap1 from "../assets/a.png";
import roadmap2 from "../assets/c.png";
import roadmap3 from "../assets/W.png";
import sociallinks from "../assets/social-links.png";
import glitch from "../assets/757Y.gif";
import leftarrow from "../assets/Group 20592 (1).png";
import rightarrow from "../assets/Group 20601 (1).png";
import twitter from "../assets/x.png";
import snap from "../assets/snap.png";
import telegram from "../assets/telegram.png";
import youtube from "../assets/yt.png";
import aboutgif from "../assets/about-gif.gif";
import supplygif from "../assets/supply-gif.gif";
import supplygif1 from "../assets/supply-gif1.gif";
import socialimg from "../assets/social-gif.gif";
import aboutimg from "../assets/Rope.png";
import welcome from "../assets/logo-welcome.png";
import info from "../assets/info.png";
import btn from "../assets/btn.png";
import yo from "../assets/yo.gif";
import arrow from "../assets/arrow.gif";
import tokenarrow from "../assets/Vector 1.png";
import handgif from "../assets/handgif.gif";
import claimTokenn from "../assets/claim-token.gif";

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
  const [showConnectScreen, setShowConnectScreen] = useState(false);
  const [showclaimedText, setShowClaimedText] = useState(false);
  const [Claim, isClaim] = useState(false);
  const videoRef = useRef(null);
  const address = useAddress();
  const chain = useChain();

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      console.log("Browser tab is hidden");
      // togglePlayPause();
      videoRef.current.pause();
      setButton("play");
      setIsActive(false);
    } else {
      // console.log("Browser tab is visible")
      //     togglePlayPause();
      // setIsActive(true);
    }
  });

  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(async () => {
    const ws = new WebSocket("ws://localhost:8081");

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      setActiveUsers(data.activeUsers);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.close();
    };
  }, []);

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
      savePlaybackPosition(videoRef.current.currentTime);
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

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current
          .play()
          .then(() => {
            setIsVideoPlaying(true); // Ensure the state is correctly set when video plays
            handleClick();
            setButton("pause"); // Change button text to "pause"
          })
          .catch((error) => console.error("Error playing the video:", error));
        if (isFirstTime) {
          setTimeout(() => {
            if (!address) {
              setIsFirstTime(false);
              videoRef.current.pause();
              setIsVideoPlaying(false); // Ensure the state is correctly set when video is paused
              setButton("play"); // Change button text to "play"
              setShowConnectWalletMessage(true);
            }
          }, 30000);
        }
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false); // Ensure the state is correctly set when video is paused
        setButton("play"); // Change button text to "play"
      }
    }
  };

  const handleCloseMessage = () => {
    setShowConnectWalletMessage(false);
    videoRef.current.currentTime = 0;
    videoRef.current
      .play()
      .then(() => {
        setIsVideoPlaying(true); // Ensure the state is correctly set when video plays
        handleClick();
        setButton("pause"); // Change button text to "pause"
      })
      .catch((error) => console.error("Error playing the video:", error));
    setTimeoutofvideo();
  };

  const setTimeoutofvideo = () => {
    setTimeout(() => {
      if (!address) {
        videoRef.current.pause();
        setIsVideoPlaying(false); // Ensure the state is correctly set when video is paused
        setButton("play"); // Change button text to "play"
        setShowConnectWalletMessage(true);
      }
    }, 30000); // 30 seconds delay
  };

  // const handleConnectWallet = () => {
  //   setWalletConnected(true);
  //   localStorage.setItem("walletConnected", "true");
  //   setShowConnectWalletMessage(false);
  // };

  // When connecting the wallet
  const handleConnectWallet = () => {
    setWalletConnected(true);
    localStorage.setItem("walletConnected", "true");
    setShowConnectWalletMessage(false);
  };

  useEffect(() => {
    const isConnected = localStorage.getItem("walletConnected") === "true";
    console.log("Wallet connected from storage:", isConnected); // Check what is being read from local storage
    setWalletConnected(isConnected);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isVideoPlaying && !walletConnected) {
        setShowConnectWalletMessage(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isVideoPlaying, walletConnected]);

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
    playClickSound();
    setActiveButton("roadmap");
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
      setShowRoadmap(false); // Toggle the visibility based on previous state
      setShowAbout(false);
      setShowSocial(false);
      setShowToken(false);
    }, 1000);
  };

  const handlePlayClick = () => {
    // console.log('Play clicked');
    playClickSound();
    // alert("all")
    setActiveButton("play");
    setShowClaimedText(false);
    setShowAbout(false);
    ButtonTextChange();
    // setShowVideo(false);
    // setIsVideoPlaying(false);
    setShowToken(false);
    setShowSocial(false);
    setShowRoadmap(false);
    setShowConnectScreen(false);
    setShowWelcomeMessage(false);
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
    setShowConnectScreen(false);
    setShowGlitchGif(true);
    // After the glitch effect, toggle the content
    setTimeout(() => {
      setShowGlitchGif(false);
      setShowAbout(true); // Toggle the visibility based on previous state
      setShowRoadmap(false);
      setShowSocial(false);
      setShowToken(false);
      setTokenButtonText(false);
    }, 1000);
  };
  const handleOnclickinToken = () => {
    setTokenButtonText(true);
    setShowToken(false);
  };
  const handleOffclickinToken = () => {
    setTokenButtonText(false);
    setShowToken(true);
  };
  const handleTokenClick = () => {
    playClickSound();
    setActiveButton("token");
    setShowClaimedText(false);
    setIsActive(false);
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
    }, 1000);
  };
  const handleSocialClick = () => {
    playClickSound();
    setActiveButton("social");
    setShowClaimedText(false);
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
    }, 1000);
  };
  const handleRoadmapClick = () => {
    playClickSound();
    setActiveButton("roadmap");
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
    }, 1000);
  };

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
      <div className="row right-align small-d">
        <div className="col-6 col-sm-8">
          <div
            className="mob-desk"
            style={{ position: "relative", float: "left" }}
          >
            <div
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ConnectWallet
                switchToActiveChain={true}
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  color: "rgb(26 179 34)",
                  border: "none",
                }}
              />
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="201"
              height="57"
              viewBox="0 0 201 57"
              fill="none"
            >
              <rect width="201" height="57" fill="black" />
              <rect
                x="1"
                y="1"
                width="199"
                height="55"
                stroke="#01F128"
                strokeOpacity="0.25"
                strokeWidth="2"
              />
              <path
                opacity="0.75"
                d="M163.438 9H169.971H194.831V42.7347L188.547 49H8V9H74.9965"
                stroke="url(#paint0_linear_1235_2507)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M149.74 9H158.588"
                stroke="url(#paint1_linear_1235_2507)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M98.2988 9H111.615H136.513"
                stroke="url(#paint2_linear_1235_2507)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                opacity="0.5"
                d="M193.067 36.6534V41.3985L187.22 47.2295H9.75928V23.8017"
                stroke="url(#paint3_linear_1235_2507)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M176.472 10.7658H193.067V18.0038"
                stroke="url(#paint4_linear_1235_2507)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                opacity="0.26"
                d="M21.8968 14H189.856V39.831L184.677 44.9915H12V24.1086L15.3962 20.695H17.3012L20.1611 17.8244V16.0538L21.8968 14Z"
                fill="url(#paint5_linear_1235_2507)"
              />
              <path
                d="M110.962 33.3078C110.873 33.3078 110.802 33.3787 110.802 33.4684C110.802 33.5581 110.873 33.6289 110.962 33.6289C111.051 33.6289 111.122 33.5581 111.122 33.4684C111.122 33.3787 111.051 33.3078 110.962 33.3078ZM110.962 35.1209C110.873 35.1209 110.802 35.1917 110.802 35.2814C110.802 35.3711 110.873 35.4419 110.962 35.4419C111.051 35.4419 111.122 35.3711 111.122 35.2814C111.122 35.1917 111.051 35.1209 110.962 35.1209ZM110.962 24.2474C110.873 24.2474 110.802 24.3182 110.802 24.4079C110.802 24.4976 110.873 24.5685 110.962 24.5685C111.051 24.5685 111.122 24.4976 111.122 24.4079C111.122 24.3182 111.051 24.2474 110.962 24.2474ZM110.962 31.4948C110.873 31.4948 110.802 31.5656 110.802 31.6553C110.802 31.745 110.873 31.8159 110.962 31.8159C111.051 31.8159 111.122 31.745 111.122 31.6553C111.122 31.5656 111.051 31.4948 110.962 31.4948ZM110.962 38.7422C110.873 38.7422 110.802 38.813 110.802 38.9027C110.802 38.9924 110.873 39.0633 110.962 39.0633C111.051 39.0633 111.122 38.9924 111.122 38.9027C111.122 38.813 111.051 38.7422 110.962 38.7422ZM110.962 26.0604C110.873 26.0604 110.802 26.1313 110.802 26.221C110.802 26.3107 110.873 26.3815 110.962 26.3815C111.051 26.3815 111.122 26.3107 111.122 26.221C111.122 26.1313 111.051 26.0604 110.962 26.0604ZM110.962 27.8735C110.873 27.8735 110.802 27.9443 110.802 28.034C110.802 28.1237 110.873 28.1945 110.962 28.1945C111.051 28.1945 111.122 28.1237 111.122 28.034C111.122 27.9443 111.051 27.8735 110.962 27.8735ZM110.962 29.6865C110.873 29.6865 110.802 29.7573 110.802 29.847C110.802 29.9367 110.873 30.0076 110.962 30.0076C111.051 30.0076 111.122 29.9367 111.122 29.847C111.122 29.7573 111.051 29.6865 110.962 29.6865ZM110.962 36.9339C110.873 36.9339 110.802 37.0047 110.802 37.0944C110.802 37.1841 110.873 37.255 110.962 37.255C111.051 37.255 111.122 37.1841 111.122 37.0944C111.122 37.0047 111.051 36.9339 110.962 36.9339ZM109.283 26.0604C109.193 26.0604 109.123 26.1313 109.123 26.221C109.123 26.3107 109.193 26.3815 109.283 26.3815C109.372 26.3815 109.443 26.3107 109.443 26.221C109.443 26.1313 109.372 26.0604 109.283 26.0604ZM109.283 24.2474C109.193 24.2474 109.123 24.3182 109.123 24.4079C109.123 24.4976 109.193 24.5685 109.283 24.5685C109.372 24.5685 109.443 24.4976 109.443 24.4079C109.443 24.3182 109.372 24.2474 109.283 24.2474ZM109.283 27.8735C109.193 27.8735 109.123 27.9443 109.123 28.034C109.123 28.1237 109.193 28.1945 109.283 28.1945C109.372 28.1945 109.443 28.1237 109.443 28.034C109.443 27.9443 109.372 27.8735 109.283 27.8735ZM110.962 40.5552C110.873 40.5552 110.802 40.6261 110.802 40.7158C110.802 40.8055 110.873 40.8763 110.962 40.8763C111.051 40.8763 111.122 40.8055 111.122 40.7158C111.122 40.6261 111.051 40.5552 110.962 40.5552ZM109.283 22.4344C109.193 22.4344 109.123 22.5052 109.123 22.5949C109.123 22.6846 109.193 22.7554 109.283 22.7554C109.372 22.7554 109.443 22.6846 109.443 22.5949C109.443 22.5052 109.372 22.4344 109.283 22.4344ZM109.283 17C109.193 17 109.123 17.0708 109.123 17.1605C109.123 17.2502 109.193 17.3211 109.283 17.3211C109.372 17.3211 109.443 17.2502 109.443 17.1605C109.443 17.0708 109.372 17 109.283 17ZM109.283 18.813C109.193 18.813 109.123 18.8839 109.123 18.9736C109.123 19.0633 109.193 19.1341 109.283 19.1341C109.372 19.1341 109.443 19.0633 109.443 18.9736C109.443 18.8839 109.372 18.813 109.283 18.813ZM109.283 20.6261C109.193 20.6261 109.123 20.6969 109.123 20.7866C109.123 20.8763 109.193 20.9471 109.283 20.9471C109.372 20.9471 109.443 20.8763 109.443 20.7866C109.443 20.6969 109.372 20.6261 109.283 20.6261ZM112.641 38.7469C112.552 38.7469 112.481 38.8178 112.481 38.9075C112.481 38.9972 112.552 39.068 112.641 39.068C112.731 39.068 112.801 38.9972 112.801 38.9075C112.801 38.8178 112.731 38.7469 112.641 38.7469ZM112.641 27.8735C112.552 27.8735 112.481 27.9443 112.481 28.034C112.481 28.1237 112.552 28.1945 112.641 28.1945C112.731 28.1945 112.801 28.1237 112.801 28.034C112.801 27.9443 112.731 27.8735 112.641 27.8735ZM112.641 24.2474C112.552 24.2474 112.481 24.3182 112.481 24.4079C112.481 24.4976 112.552 24.5685 112.641 24.5685C112.731 24.5685 112.801 24.4976 112.801 24.4079C112.801 24.3182 112.731 24.2474 112.641 24.2474ZM112.641 26.0604C112.552 26.0604 112.481 26.1313 112.481 26.221C112.481 26.3107 112.552 26.3815 112.641 26.3815C112.731 26.3815 112.801 26.3107 112.801 26.221C112.801 26.1313 112.731 26.0604 112.641 26.0604ZM112.641 29.6865C112.552 29.6865 112.481 29.7573 112.481 29.847C112.481 29.9367 112.552 30.0076 112.641 30.0076C112.731 30.0076 112.801 29.9367 112.801 29.847C112.801 29.7573 112.731 29.6865 112.641 29.6865ZM112.641 31.4995C112.552 31.4995 112.481 31.5703 112.481 31.6601C112.481 31.7498 112.552 31.8206 112.641 31.8206C112.731 31.8206 112.801 31.7498 112.801 31.6601C112.801 31.5703 112.731 31.4995 112.641 31.4995ZM112.641 22.4391C112.552 22.4391 112.481 22.5099 112.481 22.5996C112.481 22.6893 112.552 22.7602 112.641 22.7602C112.731 22.7602 112.801 22.6893 112.801 22.5996C112.801 22.5099 112.731 22.4391 112.641 22.4391ZM110.962 22.4391C110.873 22.4391 110.802 22.5099 110.802 22.5996C110.802 22.6893 110.873 22.7602 110.962 22.7602C111.051 22.7602 111.122 22.6893 111.122 22.5996C111.122 22.5099 111.051 22.4391 110.962 22.4391ZM112.641 20.6261C112.552 20.6261 112.481 20.6969 112.481 20.7866C112.481 20.8763 112.552 20.9471 112.641 20.9471C112.731 20.9471 112.801 20.8763 112.801 20.7866C112.801 20.6969 112.731 20.6261 112.641 20.6261ZM112.641 18.813C112.552 18.813 112.481 18.8839 112.481 18.9736C112.481 19.0633 112.552 19.1341 112.641 19.1341C112.731 19.1341 112.801 19.0633 112.801 18.9736C112.801 18.8839 112.731 18.813 112.641 18.813ZM110.962 18.813C110.873 18.813 110.802 18.8839 110.802 18.9736C110.802 19.0633 110.873 19.1341 110.962 19.1341C111.051 19.1341 111.122 19.0633 111.122 18.9736C111.122 18.8839 111.051 18.813 110.962 18.813ZM110.962 17C110.873 17 110.802 17.0708 110.802 17.1605C110.802 17.2502 110.873 17.3211 110.962 17.3211C111.051 17.3211 111.122 17.2502 111.122 17.1605C111.122 17.0708 111.051 17 110.962 17ZM112.641 33.3078C112.552 33.3078 112.481 33.3787 112.481 33.4684C112.481 33.5581 112.552 33.6289 112.641 33.6289C112.731 33.6289 112.801 33.5581 112.801 33.4684C112.801 33.3787 112.731 33.3078 112.641 33.3078ZM110.962 20.6261C110.873 20.6261 110.802 20.6969 110.802 20.7866C110.802 20.8763 110.873 20.9471 110.962 20.9471C111.051 20.9471 111.122 20.8763 111.122 20.7866C111.122 20.6969 111.051 20.6261 110.962 20.6261ZM112.641 40.5552C112.552 40.5552 112.481 40.6261 112.481 40.7158C112.481 40.8055 112.552 40.8763 112.641 40.8763C112.731 40.8763 112.801 40.8055 112.801 40.7158C112.801 40.6261 112.731 40.5552 112.641 40.5552ZM109.283 29.6818C109.193 29.6818 109.123 29.7526 109.123 29.8423C109.123 29.932 109.193 30.0028 109.283 30.0028C109.372 30.0028 109.443 29.932 109.443 29.8423C109.443 29.7526 109.372 29.6818 109.283 29.6818ZM112.641 35.1161C112.552 35.1161 112.481 35.187 112.481 35.2767C112.481 35.3664 112.552 35.4372 112.641 35.4372C112.731 35.4372 112.801 35.3664 112.801 35.2767C112.801 35.187 112.731 35.1161 112.641 35.1161ZM112.641 36.9292C112.552 36.9292 112.481 37 112.481 37.0897C112.481 37.1794 112.552 37.2502 112.641 37.2502C112.731 37.2502 112.801 37.1794 112.801 37.0897C112.801 37 112.731 36.9292 112.641 36.9292ZM107.608 24.2474C107.519 24.2474 107.448 24.3182 107.448 24.4079C107.448 24.4976 107.519 24.5685 107.608 24.5685C107.698 24.5685 107.768 24.4976 107.768 24.4079C107.768 24.3182 107.698 24.2474 107.608 24.2474ZM105.929 18.813C105.84 18.813 105.769 18.8839 105.769 18.9736C105.769 19.0633 105.84 19.1341 105.929 19.1341C106.018 19.1341 106.089 19.0633 106.089 18.9736C106.089 18.8839 106.018 18.813 105.929 18.813ZM105.929 22.4391C105.84 22.4391 105.769 22.5099 105.769 22.5996C105.769 22.6893 105.84 22.7602 105.929 22.7602C106.018 22.7602 106.089 22.6893 106.089 22.5996C106.089 22.5099 106.018 22.4391 105.929 22.4391ZM105.929 26.0652C105.84 26.0652 105.769 26.136 105.769 26.2257C105.769 26.3154 105.84 26.3862 105.929 26.3862C106.018 26.3862 106.089 26.3154 106.089 26.2257C106.089 26.136 106.018 26.0652 105.929 26.0652ZM105.929 24.2521C105.84 24.2521 105.769 24.3229 105.769 24.4127C105.769 24.5024 105.84 24.5732 105.929 24.5732C106.018 24.5732 106.089 24.5024 106.089 24.4127C106.089 24.3229 106.018 24.2521 105.929 24.2521ZM105.929 20.6261C105.84 20.6261 105.769 20.6969 105.769 20.7866C105.769 20.8763 105.84 20.9471 105.929 20.9471C106.018 20.9471 106.089 20.8763 106.089 20.7866C106.089 20.6969 106.018 20.6261 105.929 20.6261ZM105.929 17C105.84 17 105.769 17.0708 105.769 17.1605C105.769 17.2502 105.84 17.3211 105.929 17.3211C106.018 17.3211 106.089 17.2502 106.089 17.1605C106.089 17.0708 106.018 17 105.929 17ZM107.608 38.7422C107.519 38.7422 107.448 38.813 107.448 38.9027C107.448 38.9924 107.519 39.0633 107.608 39.0633C107.698 39.0633 107.768 38.9924 107.768 38.9027C107.768 38.813 107.698 38.7422 107.608 38.7422ZM107.608 40.5552C107.519 40.5552 107.448 40.6261 107.448 40.7158C107.448 40.8055 107.519 40.8763 107.608 40.8763C107.698 40.8763 107.768 40.8055 107.768 40.7158C107.768 40.6261 107.698 40.5552 107.608 40.5552ZM105.929 35.1209C105.84 35.1209 105.769 35.1917 105.769 35.2814C105.769 35.3711 105.84 35.4419 105.929 35.4419C106.018 35.4419 106.089 35.3711 106.089 35.2814C106.089 35.1917 106.018 35.1209 105.929 35.1209ZM105.929 36.9339C105.84 36.9339 105.769 37.0047 105.769 37.0944C105.769 37.1841 105.84 37.255 105.929 37.255C106.018 37.255 106.089 37.1841 106.089 37.0944C106.089 37.0047 106.018 36.9339 105.929 36.9339ZM105.929 38.7469C105.84 38.7469 105.769 38.8178 105.769 38.9075C105.769 38.9972 105.84 39.068 105.929 39.068C106.018 39.068 106.089 38.9972 106.089 38.9075C106.089 38.8178 106.018 38.7469 105.929 38.7469ZM105.929 40.56C105.84 40.56 105.769 40.6308 105.769 40.7205C105.769 40.8102 105.84 40.881 105.929 40.881C106.018 40.881 106.089 40.8102 106.089 40.7205C106.089 40.6308 106.018 40.56 105.929 40.56ZM107.608 36.9339C107.519 36.9339 107.448 37.0047 107.448 37.0944C107.448 37.1841 107.519 37.255 107.608 37.255C107.698 37.255 107.768 37.1841 107.768 37.0944C107.768 37.0047 107.698 36.9339 107.608 36.9339ZM105.929 29.6865C105.84 29.6865 105.769 29.7573 105.769 29.847C105.769 29.9367 105.84 30.0076 105.929 30.0076C106.018 30.0076 106.089 29.9367 106.089 29.847C106.089 29.7573 106.018 29.6865 105.929 29.6865ZM105.929 33.3126C105.84 33.3126 105.769 33.3834 105.769 33.4731C105.769 33.5628 105.84 33.6336 105.929 33.6336C106.018 33.6336 106.089 33.5628 106.089 33.4731C106.089 33.3834 106.018 33.3126 105.929 33.3126ZM105.929 27.8782C105.84 27.8782 105.769 27.949 105.769 28.0387C105.769 28.1284 105.84 28.1992 105.929 28.1992C106.018 28.1992 106.089 28.1284 106.089 28.0387C106.089 27.949 106.018 27.8782 105.929 27.8782ZM105.929 31.5042C105.84 31.5042 105.769 31.5751 105.769 31.6648C105.769 31.7545 105.84 31.8253 105.929 31.8253C106.018 31.8253 106.089 31.7545 106.089 31.6648C106.089 31.5751 106.018 31.5042 105.929 31.5042ZM107.608 26.0699C107.519 26.0699 107.448 26.1407 107.448 26.2304C107.448 26.3201 107.519 26.3909 107.608 26.3909C107.698 26.3909 107.768 26.3201 107.768 26.2304C107.768 26.1407 107.698 26.0699 107.608 26.0699ZM107.608 17.0094C107.519 17.0094 107.448 17.0803 107.448 17.17C107.448 17.2597 107.519 17.3305 107.608 17.3305C107.698 17.3305 107.768 17.2597 107.768 17.17C107.768 17.0803 107.698 17.0094 107.608 17.0094ZM109.288 38.7517C109.198 38.7517 109.128 38.8225 109.128 38.9122C109.128 39.0019 109.198 39.0727 109.288 39.0727C109.377 39.0727 109.447 39.0019 109.447 38.9122C109.447 38.8225 109.377 38.7517 109.288 38.7517ZM109.288 40.5647C109.198 40.5647 109.128 40.6355 109.128 40.7252C109.128 40.8149 109.198 40.8857 109.288 40.8857C109.377 40.8857 109.447 40.8149 109.447 40.7252C109.447 40.6355 109.377 40.5647 109.288 40.5647ZM107.608 18.8225C107.519 18.8225 107.448 18.8933 107.448 18.983C107.448 19.0727 107.519 19.1435 107.608 19.1435C107.698 19.1435 107.768 19.0727 107.768 18.983C107.768 18.8933 107.698 18.8225 107.608 18.8225ZM109.288 35.1303C109.198 35.1303 109.128 35.2011 109.128 35.2908C109.128 35.3805 109.198 35.4514 109.288 35.4514C109.377 35.4514 109.447 35.3805 109.447 35.2908C109.447 35.2011 109.377 35.1303 109.288 35.1303ZM109.288 33.3173C109.198 33.3173 109.128 33.3881 109.128 33.4778C109.128 33.5675 109.198 33.6383 109.288 33.6383C109.377 33.6383 109.447 33.5675 109.447 33.4778C109.447 33.3881 109.377 33.3173 109.288 33.3173ZM107.608 35.1303C107.519 35.1303 107.448 35.2011 107.448 35.2908C107.448 35.3805 107.519 35.4514 107.608 35.4514C107.698 35.4514 107.768 35.3805 107.768 35.2908C107.768 35.2011 107.698 35.1303 107.608 35.1303ZM107.608 20.6355C107.519 20.6355 107.448 20.7063 107.448 20.796C107.448 20.8857 107.519 20.9566 107.608 20.9566C107.698 20.9566 107.768 20.8857 107.768 20.796C107.768 20.7063 107.698 20.6355 107.608 20.6355ZM109.288 36.9433C109.198 36.9433 109.128 37.0142 109.128 37.1039C109.128 37.1936 109.198 37.2644 109.288 37.2644C109.377 37.2644 109.447 37.1936 109.447 37.1039C109.447 37.0142 109.377 36.9433 109.288 36.9433ZM107.608 31.509C107.519 31.509 107.448 31.5798 107.448 31.6695C107.448 31.7592 107.519 31.83 107.608 31.83C107.698 31.83 107.768 31.7592 107.768 31.6695C107.768 31.5798 107.698 31.509 107.608 31.509ZM104.25 17.0142C104.16 17.0142 104.09 17.085 104.09 17.1747C104.09 17.2644 104.16 17.3352 104.25 17.3352C104.339 17.3352 104.41 17.2644 104.41 17.1747C104.41 17.085 104.339 17.0142 104.25 17.0142ZM107.608 29.6959C107.519 29.6959 107.448 29.7668 107.448 29.8565C107.448 29.9462 107.519 30.017 107.608 30.017C107.698 30.017 107.768 29.9462 107.768 29.8565C107.768 29.7668 107.698 29.6959 107.608 29.6959ZM109.288 31.509C109.198 31.509 109.128 31.5798 109.128 31.6695C109.128 31.7592 109.198 31.83 109.288 31.83C109.377 31.83 109.447 31.7592 109.447 31.6695C109.447 31.5798 109.377 31.509 109.288 31.509ZM112.646 17.0142C112.557 17.0142 112.486 17.085 112.486 17.1747C112.486 17.2644 112.557 17.3352 112.646 17.3352C112.735 17.3352 112.806 17.2644 112.806 17.1747C112.806 17.085 112.735 17.0142 112.646 17.0142ZM107.613 22.4485C107.524 22.4485 107.453 22.5194 107.453 22.6091C107.453 22.6988 107.524 22.7696 107.613 22.7696C107.702 22.7696 107.773 22.6988 107.773 22.6091C107.773 22.5194 107.702 22.4485 107.613 22.4485ZM107.613 27.8829C107.524 27.8829 107.453 27.9537 107.453 28.0434C107.453 28.1331 107.524 28.204 107.613 28.204C107.702 28.204 107.773 28.1331 107.773 28.0434C107.773 27.9537 107.702 27.8829 107.613 27.8829ZM107.613 33.3173C107.524 33.3173 107.453 33.3881 107.453 33.4778C107.453 33.5675 107.524 33.6383 107.613 33.6383C107.702 33.6383 107.773 33.5675 107.773 33.4778C107.773 33.3881 107.702 33.3173 107.613 33.3173ZM119.358 33.3173C119.269 33.3173 119.199 33.3881 119.199 33.4778C119.199 33.5675 119.269 33.6383 119.358 33.6383C119.448 33.6383 119.518 33.5675 119.518 33.4778C119.518 33.3881 119.448 33.3173 119.358 33.3173ZM119.358 31.5042C119.269 31.5042 119.199 31.5751 119.199 31.6648C119.199 31.7545 119.269 31.8253 119.358 31.8253C119.448 31.8253 119.518 31.7545 119.518 31.6648C119.518 31.5751 119.448 31.5042 119.358 31.5042ZM119.358 35.1303C119.269 35.1303 119.199 35.2011 119.199 35.2908C119.199 35.3805 119.269 35.4514 119.358 35.4514C119.448 35.4514 119.518 35.3805 119.518 35.2908C119.518 35.2011 119.448 35.1303 119.358 35.1303ZM119.358 36.9433C119.269 36.9433 119.199 37.0142 119.199 37.1039C119.199 37.1936 119.269 37.2644 119.358 37.2644C119.448 37.2644 119.518 37.1936 119.518 37.1039C119.518 37.0142 119.448 36.9433 119.358 36.9433ZM119.358 29.6959C119.269 29.6959 119.199 29.7668 119.199 29.8565C119.199 29.9462 119.269 30.017 119.358 30.017C119.448 30.017 119.518 29.9462 119.518 29.8565C119.518 29.7668 119.448 29.6959 119.358 29.6959ZM114.325 40.5694C114.236 40.5694 114.165 40.6402 114.165 40.7299C114.165 40.8196 114.236 40.8905 114.325 40.8905C114.415 40.8905 114.485 40.8196 114.485 40.7299C114.485 40.6402 114.415 40.5694 114.325 40.5694ZM117.684 27.8876C117.595 27.8876 117.524 27.9585 117.524 28.0482C117.524 28.1379 117.595 28.2087 117.684 28.2087C117.773 28.2087 117.844 28.1379 117.844 28.0482C117.844 27.9585 117.773 27.8876 117.684 27.8876ZM119.363 27.8876C119.274 27.8876 119.203 27.9585 119.203 28.0482C119.203 28.1379 119.274 28.2087 119.363 28.2087C119.453 28.2087 119.523 28.1379 119.523 28.0482C119.523 27.9585 119.453 27.8876 119.363 27.8876ZM119.363 38.7611C119.274 38.7611 119.203 38.8319 119.203 38.9216C119.203 39.0113 119.274 39.0822 119.363 39.0822C119.453 39.0822 119.523 39.0113 119.523 38.9216C119.523 38.8319 119.453 38.7611 119.363 38.7611ZM117.684 20.6402C117.595 20.6402 117.524 20.711 117.524 20.8008C117.524 20.8905 117.595 20.9613 117.684 20.9613C117.773 20.9613 117.844 20.8905 117.844 20.8008C117.844 20.711 117.773 20.6402 117.684 20.6402ZM119.363 22.4533C119.274 22.4533 119.203 22.5241 119.203 22.6138C119.203 22.7035 119.274 22.7743 119.363 22.7743C119.453 22.7743 119.523 22.7035 119.523 22.6138C119.523 22.5241 119.453 22.4533 119.363 22.4533ZM117.684 24.2663C117.595 24.2663 117.524 24.3371 117.524 24.4268C117.524 24.5165 117.595 24.5873 117.684 24.5873C117.773 24.5873 117.844 24.5165 117.844 24.4268C117.844 24.3371 117.773 24.2663 117.684 24.2663ZM117.684 26.0793C117.595 26.0793 117.524 26.1501 117.524 26.2398C117.524 26.3296 117.595 26.4004 117.684 26.4004C117.773 26.4004 117.844 26.3296 117.844 26.2398C117.844 26.1501 117.773 26.0793 117.684 26.0793ZM117.684 22.4533C117.595 22.4533 117.524 22.5241 117.524 22.6138C117.524 22.7035 117.595 22.7743 117.684 22.7743C117.773 22.7743 117.844 22.7035 117.844 22.6138C117.844 22.5241 117.773 22.4533 117.684 22.4533ZM117.684 18.8272C117.595 18.8272 117.524 18.898 117.524 18.9877C117.524 19.0774 117.595 19.1483 117.684 19.1483C117.773 19.1483 117.844 19.0774 117.844 18.9877C117.844 18.898 117.773 18.8272 117.684 18.8272ZM119.363 40.5694C119.274 40.5694 119.203 40.6402 119.203 40.7299C119.203 40.8196 119.274 40.8905 119.363 40.8905C119.453 40.8905 119.523 40.8196 119.523 40.7299C119.523 40.6402 119.453 40.5694 119.363 40.5694ZM117.684 17.0142C117.595 17.0142 117.524 17.085 117.524 17.1747C117.524 17.2644 117.595 17.3352 117.684 17.3352C117.773 17.3352 117.844 17.2644 117.844 17.1747C117.844 17.085 117.773 17.0142 117.684 17.0142ZM119.363 26.0746C119.274 26.0746 119.203 26.1454 119.203 26.2351C119.203 26.3248 119.274 26.3957 119.363 26.3957C119.453 26.3957 119.523 26.3248 119.523 26.2351C119.523 26.1454 119.453 26.0746 119.363 26.0746ZM121.042 26.0746C120.953 26.0746 120.882 26.1454 120.882 26.2351C120.882 26.3248 120.953 26.3957 121.042 26.3957C121.132 26.3957 121.202 26.3248 121.202 26.2351C121.202 26.1454 121.132 26.0746 121.042 26.0746ZM121.042 27.8876C120.953 27.8876 120.882 27.9585 120.882 28.0482C120.882 28.1379 120.953 28.2087 121.042 28.2087C121.132 28.2087 121.202 28.1379 121.202 28.0482C121.202 27.9585 121.132 27.8876 121.042 27.8876ZM121.042 29.7007C120.953 29.7007 120.882 29.7715 120.882 29.8612C120.882 29.9509 120.953 30.0217 121.042 30.0217C121.132 30.0217 121.202 29.9509 121.202 29.8612C121.202 29.7715 121.132 29.7007 121.042 29.7007ZM121.042 24.2663C120.953 24.2663 120.882 24.3371 120.882 24.4268C120.882 24.5165 120.953 24.5873 121.042 24.5873C121.132 24.5873 121.202 24.5165 121.202 24.4268C121.202 24.3371 121.132 24.2663 121.042 24.2663ZM121.042 18.8319C120.953 18.8319 120.882 18.9027 120.882 18.9924C120.882 19.0822 120.953 19.153 121.042 19.153C121.132 19.153 121.202 19.0822 121.202 18.9924C121.202 18.9027 121.132 18.8319 121.042 18.8319ZM121.042 31.5137C120.953 31.5137 120.882 31.5845 120.882 31.6742C120.882 31.7639 120.953 31.8348 121.042 31.8348C121.132 31.8348 121.202 31.7639 121.202 31.6742C121.202 31.5845 121.132 31.5137 121.042 31.5137ZM121.042 17.0189C120.953 17.0189 120.882 17.0897 120.882 17.1794C120.882 17.2691 120.953 17.3399 121.042 17.3399C121.132 17.3399 121.202 17.2691 121.202 17.1794C121.202 17.0897 121.132 17.0189 121.042 17.0189ZM119.363 20.6449C119.274 20.6449 119.203 20.7158 119.203 20.8055C119.203 20.8952 119.274 20.966 119.363 20.966C119.453 20.966 119.523 20.8952 119.523 20.8055C119.523 20.7158 119.453 20.6449 119.363 20.6449ZM121.042 22.458C120.953 22.458 120.882 22.5288 120.882 22.6185C120.882 22.7082 120.953 22.779 121.042 22.779C121.132 22.779 121.202 22.7082 121.202 22.6185C121.202 22.5288 121.132 22.458 121.042 22.458ZM119.363 17.0236C119.274 17.0236 119.203 17.0944 119.203 17.1841C119.203 17.2738 119.274 17.3447 119.363 17.3447C119.453 17.3447 119.523 17.2738 119.523 17.1841C119.523 17.0944 119.453 17.0236 119.363 17.0236ZM121.042 40.5788C120.953 40.5788 120.882 40.6497 120.882 40.7394C120.882 40.8291 120.953 40.8999 121.042 40.8999C121.132 40.8999 121.202 40.8291 121.202 40.7394C121.202 40.6497 121.132 40.5788 121.042 40.5788ZM121.042 33.3314C120.953 33.3314 120.882 33.4023 120.882 33.492C120.882 33.5817 120.953 33.6525 121.042 33.6525C121.132 33.6525 121.202 33.5817 121.202 33.492C121.202 33.4023 121.132 33.3314 121.042 33.3314ZM119.363 18.8366C119.274 18.8366 119.203 18.9075 119.203 18.9972C119.203 19.0869 119.274 19.1577 119.363 19.1577C119.453 19.1577 119.523 19.0869 119.523 18.9972C119.523 18.9075 119.453 18.8366 119.363 18.8366ZM121.042 35.1445C120.953 35.1445 120.882 35.2153 120.882 35.305C120.882 35.3947 120.953 35.4655 121.042 35.4655C121.132 35.4655 121.202 35.3947 121.202 35.305C121.202 35.2153 121.132 35.1445 121.042 35.1445ZM121.042 38.7705C120.953 38.7705 120.882 38.8414 120.882 38.9311C120.882 39.0208 120.953 39.0916 121.042 39.0916C121.132 39.0916 121.202 39.0208 121.202 38.9311C121.202 38.8414 121.132 38.7705 121.042 38.7705ZM121.042 36.9575C120.953 36.9575 120.882 37.0283 120.882 37.118C120.882 37.2077 120.953 37.2786 121.042 37.2786C121.132 37.2786 121.202 37.2077 121.202 37.118C121.202 37.0283 121.132 36.9575 121.042 36.9575ZM119.363 24.2757C119.274 24.2757 119.203 24.3466 119.203 24.4363C119.203 24.526 119.274 24.5968 119.363 24.5968C119.453 24.5968 119.523 24.526 119.523 24.4363C119.523 24.3466 119.453 24.2757 119.363 24.2757ZM114.33 18.8414C114.241 18.8414 114.17 18.9122 114.17 19.0019C114.17 19.0916 114.241 19.1624 114.33 19.1624C114.419 19.1624 114.49 19.0916 114.49 19.0019C114.49 18.9122 114.419 18.8414 114.33 18.8414ZM114.33 20.6544C114.241 20.6544 114.17 20.7252 114.17 20.8149C114.17 20.9046 114.241 20.9754 114.33 20.9754C114.419 20.9754 114.49 20.9046 114.49 20.8149C114.49 20.7252 114.419 20.6544 114.33 20.6544ZM116.009 35.1492C115.92 35.1492 115.849 35.22 115.849 35.3097C115.849 35.3994 115.92 35.4703 116.009 35.4703C116.099 35.4703 116.169 35.3994 116.169 35.3097C116.169 35.22 116.099 35.1492 116.009 35.1492ZM114.33 22.4674C114.241 22.4674 114.17 22.5382 114.17 22.628C114.17 22.7177 114.241 22.7885 114.33 22.7885C114.419 22.7885 114.49 22.7177 114.49 22.628C114.49 22.5382 114.419 22.4674 114.33 22.4674ZM114.33 17.033C114.241 17.033 114.17 17.1039 114.17 17.1936C114.17 17.2833 114.241 17.3541 114.33 17.3541C114.419 17.3541 114.49 17.2833 114.49 17.1936C114.49 17.1039 114.419 17.033 114.33 17.033ZM116.009 36.9622C115.92 36.9622 115.849 37.033 115.849 37.1228C115.849 37.2125 115.92 37.2833 116.009 37.2833C116.099 37.2833 116.169 37.2125 116.169 37.1228C116.169 37.033 116.099 36.9622 116.009 36.9622ZM116.009 38.7753C115.92 38.7753 115.849 38.8461 115.849 38.9358C115.849 39.0255 115.92 39.0963 116.009 39.0963C116.099 39.0963 116.169 39.0255 116.169 38.9358C116.169 38.8461 116.099 38.7753 116.009 38.7753ZM116.009 40.5883C115.92 40.5883 115.849 40.6591 115.849 40.7488C115.849 40.8385 115.92 40.9093 116.009 40.9093C116.099 40.9093 116.169 40.8385 116.169 40.7488C116.169 40.6591 116.099 40.5883 116.009 40.5883ZM114.33 24.2805C114.241 24.2805 114.17 24.3513 114.17 24.441C114.17 24.5307 114.241 24.6015 114.33 24.6015C114.419 24.6015 114.49 24.5307 114.49 24.441C114.49 24.3513 114.419 24.2805 114.33 24.2805ZM114.33 35.1539C114.241 35.1539 114.17 35.2247 114.17 35.3144C114.17 35.4042 114.241 35.475 114.33 35.475C114.419 35.475 114.49 35.4042 114.49 35.3144C114.49 35.2247 114.419 35.1539 114.33 35.1539ZM114.33 36.967C114.241 36.967 114.17 37.0378 114.17 37.1275C114.17 37.2172 114.241 37.288 114.33 37.288C114.419 37.288 114.49 37.2172 114.49 37.1275C114.49 37.0378 114.419 36.967 114.33 36.967ZM114.33 38.78C114.241 38.78 114.17 38.8508 114.17 38.9405C114.17 39.0302 114.241 39.101 114.33 39.101C114.419 39.101 114.49 39.0302 114.49 38.9405C114.49 38.8508 114.419 38.78 114.33 38.78ZM114.33 33.3456C114.241 33.3456 114.17 33.4164 114.17 33.5061C114.17 33.5958 114.241 33.6667 114.33 33.6667C114.419 33.6667 114.49 33.5958 114.49 33.5061C114.49 33.4164 114.419 33.3456 114.33 33.3456ZM114.33 26.0982C114.241 26.0982 114.17 26.169 114.17 26.2587C114.17 26.3484 114.241 26.4193 114.33 26.4193C114.419 26.4193 114.49 26.3484 114.49 26.2587C114.49 26.169 114.419 26.0982 114.33 26.0982ZM114.33 27.9112C114.241 27.9112 114.17 27.9821 114.17 28.0718C114.17 28.1615 114.241 28.2323 114.33 28.2323C114.419 28.2323 114.49 28.1615 114.49 28.0718C114.49 27.9821 114.419 27.9112 114.33 27.9112ZM117.689 29.7243C117.599 29.7243 117.529 29.7951 117.529 29.8848C117.529 29.9745 117.599 30.0453 117.689 30.0453C117.778 30.0453 117.849 29.9745 117.849 29.8848C117.849 29.7951 117.778 29.7243 117.689 29.7243ZM114.33 29.7243C114.241 29.7243 114.17 29.7951 114.17 29.8848C114.17 29.9745 114.241 30.0453 114.33 30.0453C114.419 30.0453 114.49 29.9745 114.49 29.8848C114.49 29.7951 114.419 29.7243 114.33 29.7243ZM114.33 31.5373C114.241 31.5373 114.17 31.6081 114.17 31.6978C114.17 31.7875 114.241 31.8584 114.33 31.8584C114.419 31.8584 114.49 31.7875 114.49 31.6978C114.49 31.6081 114.419 31.5373 114.33 31.5373ZM117.689 40.5977C117.599 40.5977 117.529 40.6686 117.529 40.7583C117.529 40.848 117.599 40.9188 117.689 40.9188C117.778 40.9188 117.849 40.848 117.849 40.7583C117.849 40.6686 117.778 40.5977 117.689 40.5977ZM116.009 18.8555C115.92 18.8555 115.849 18.9263 115.849 19.0161C115.849 19.1058 115.92 19.1766 116.009 19.1766C116.099 19.1766 116.169 19.1058 116.169 19.0161C116.169 18.9263 116.099 18.8555 116.009 18.8555ZM116.009 17.0425C115.92 17.0425 115.849 17.1133 115.849 17.203C115.849 17.2927 115.92 17.3636 116.009 17.3636C116.099 17.3636 116.169 17.2927 116.169 17.203C116.169 17.1133 116.099 17.0425 116.009 17.0425ZM117.689 36.9717C117.599 36.9717 117.529 37.0425 117.529 37.1322C117.529 37.2219 117.599 37.2927 117.689 37.2927C117.778 37.2927 117.849 37.2219 117.849 37.1322C117.849 37.0425 117.778 36.9717 117.689 36.9717ZM116.009 33.3456C115.92 33.3456 115.849 33.4164 115.849 33.5061C115.849 33.5958 115.92 33.6667 116.009 33.6667C116.099 33.6667 116.169 33.5958 116.169 33.5061C116.169 33.4164 116.099 33.3456 116.009 33.3456ZM117.689 31.5326C117.599 31.5326 117.529 31.6034 117.529 31.6931C117.529 31.7828 117.599 31.8536 117.689 31.8536C117.778 31.8536 117.849 31.7828 117.849 31.6931C117.849 31.6034 117.778 31.5326 117.689 31.5326ZM117.689 35.1586C117.599 35.1586 117.529 35.2295 117.529 35.3192C117.529 35.4089 117.599 35.4797 117.689 35.4797C117.778 35.4797 117.849 35.4089 117.849 35.3192C117.849 35.2295 117.778 35.1586 117.689 35.1586ZM117.689 33.3456C117.599 33.3456 117.529 33.4164 117.529 33.5061C117.529 33.5958 117.599 33.6667 117.689 33.6667C117.778 33.6667 117.849 33.5958 117.849 33.5061C117.849 33.4164 117.778 33.3456 117.689 33.3456ZM117.689 38.78C117.599 38.78 117.529 38.8508 117.529 38.9405C117.529 39.0302 117.599 39.101 117.689 39.101C117.778 39.101 117.849 39.0302 117.849 38.9405C117.849 38.8508 117.778 38.78 117.689 38.78ZM116.009 29.7195C115.92 29.7195 115.849 29.7904 115.849 29.8801C115.849 29.9698 115.92 30.0406 116.009 30.0406C116.099 30.0406 116.169 29.9698 116.169 29.8801C116.169 29.7904 116.099 29.7195 116.009 29.7195ZM116.009 20.6591C115.92 20.6591 115.849 20.7299 115.849 20.8196C115.849 20.9093 115.92 20.9802 116.009 20.9802C116.099 20.9802 116.169 20.9093 116.169 20.8196C116.169 20.7299 116.099 20.6591 116.009 20.6591ZM116.009 27.9065C115.92 27.9065 115.849 27.9773 115.849 28.067C115.849 28.1568 115.92 28.2276 116.009 28.2276C116.099 28.2276 116.169 28.1568 116.169 28.067C116.169 27.9773 116.099 27.9065 116.009 27.9065ZM116.009 31.5326C115.92 31.5326 115.849 31.6034 115.849 31.6931C115.849 31.7828 115.92 31.8536 116.009 31.8536C116.099 31.8536 116.169 31.7828 116.169 31.6931C116.169 31.6034 116.099 31.5326 116.009 31.5326ZM116.009 22.4721C115.92 22.4721 115.849 22.543 115.849 22.6327C115.849 22.7224 115.92 22.7932 116.009 22.7932C116.099 22.7932 116.169 22.7224 116.169 22.6327C116.169 22.543 116.099 22.4721 116.009 22.4721ZM116.009 26.0982C115.92 26.0982 115.849 26.169 115.849 26.2587C115.849 26.3484 115.92 26.4193 116.009 26.4193C116.099 26.4193 116.169 26.3484 116.169 26.2587C116.169 26.169 116.099 26.0982 116.009 26.0982ZM116.009 24.2852C115.92 24.2852 115.849 24.356 115.849 24.4457C115.849 24.5354 115.92 24.6062 116.009 24.6062C116.099 24.6062 116.169 24.5354 116.169 24.4457C116.169 24.356 116.099 24.2852 116.009 24.2852ZM92.5138 33.3456C92.4244 33.3456 92.3538 33.4164 92.3538 33.5061C92.3538 33.5958 92.4244 33.6667 92.5138 33.6667C92.6031 33.6667 92.6737 33.5958 92.6737 33.5061C92.6737 33.4164 92.6031 33.3456 92.5138 33.3456ZM94.193 36.9717C94.1036 36.9717 94.0331 37.0425 94.0331 37.1322C94.0331 37.2219 94.1036 37.2927 94.193 37.2927C94.2824 37.2927 94.3529 37.2219 94.3529 37.1322C94.3529 37.0425 94.2824 36.9717 94.193 36.9717ZM94.193 35.1586C94.1036 35.1586 94.0331 35.2295 94.0331 35.3192C94.0331 35.4089 94.1036 35.4797 94.193 35.4797C94.2824 35.4797 94.3529 35.4089 94.3529 35.3192C94.3529 35.2295 94.2824 35.1586 94.193 35.1586ZM94.193 33.3456C94.1036 33.3456 94.0331 33.4164 94.0331 33.5061C94.0331 33.5958 94.1036 33.6667 94.193 33.6667C94.2824 33.6667 94.3529 33.5958 94.3529 33.5061C94.3529 33.4164 94.2824 33.3456 94.193 33.3456ZM94.193 38.78C94.1036 38.78 94.0331 38.8508 94.0331 38.9405C94.0331 39.0302 94.1036 39.101 94.193 39.101C94.2824 39.101 94.3529 39.0302 94.3529 38.9405C94.3529 38.8508 94.2824 38.78 94.193 38.78ZM94.193 29.7195C94.1036 29.7195 94.0331 29.7904 94.0331 29.8801C94.0331 29.9698 94.1036 30.0406 94.193 30.0406C94.2824 30.0406 94.3529 29.9698 94.3529 29.8801C94.3529 29.7904 94.2824 29.7195 94.193 29.7195ZM94.193 27.9065C94.1036 27.9065 94.0331 27.9773 94.0331 28.067C94.0331 28.1568 94.1036 28.2276 94.193 28.2276C94.2824 28.2276 94.3529 28.1568 94.3529 28.067C94.3529 27.9773 94.2824 27.9065 94.193 27.9065ZM92.5138 31.5326C92.4244 31.5326 92.3538 31.6034 92.3538 31.6931C92.3538 31.7828 92.4244 31.8536 92.5138 31.8536C92.6031 31.8536 92.6737 31.7828 92.6737 31.6931C92.6737 31.6034 92.6031 31.5326 92.5138 31.5326ZM94.193 31.5326C94.1036 31.5326 94.0331 31.6034 94.0331 31.6931C94.0331 31.7828 94.1036 31.8536 94.193 31.8536C94.2824 31.8536 94.3529 31.7828 94.3529 31.6931C94.3529 31.6034 94.2824 31.5326 94.193 31.5326ZM92.5138 27.9065C92.4244 27.9065 92.3538 27.9773 92.3538 28.067C92.3538 28.1568 92.4244 28.2276 92.5138 28.2276C92.6031 28.2276 92.6737 28.1568 92.6737 28.067C92.6737 27.9773 92.6031 27.9065 92.5138 27.9065ZM92.5138 26.0935C92.4244 26.0935 92.3538 26.1643 92.3538 26.254C92.3538 26.3437 92.4244 26.4145 92.5138 26.4145C92.6031 26.4145 92.6737 26.3437 92.6737 26.254C92.6737 26.1643 92.6031 26.0935 92.5138 26.0935ZM92.5138 17.033C92.4244 17.033 92.3538 17.1039 92.3538 17.1936C92.3538 17.2833 92.4244 17.3541 92.5138 17.3541C92.6031 17.3541 92.6737 17.2833 92.6737 17.1936C92.6737 17.1039 92.6031 17.033 92.5138 17.033ZM92.5138 24.2805C92.4244 24.2805 92.3538 24.3513 92.3538 24.441C92.3538 24.5307 92.4244 24.6015 92.5138 24.6015C92.6031 24.6015 92.6737 24.5307 92.6737 24.441C92.6737 24.3513 92.6031 24.2805 92.5138 24.2805ZM92.5138 29.7148C92.4244 29.7148 92.3538 29.7856 92.3538 29.8754C92.3538 29.9651 92.4244 30.0359 92.5138 30.0359C92.6031 30.0359 92.6737 29.9651 92.6737 29.8754C92.6737 29.7856 92.6031 29.7148 92.5138 29.7148ZM94.193 26.0888C94.1036 26.0888 94.0331 26.1596 94.0331 26.2493C94.0331 26.339 94.1036 26.4098 94.193 26.4098C94.2824 26.4098 94.3529 26.339 94.3529 26.2493C94.3529 26.1596 94.2824 26.0888 94.193 26.0888ZM92.5138 22.4627C92.4244 22.4627 92.3538 22.5335 92.3538 22.6232C92.3538 22.7129 92.4244 22.7838 92.5138 22.7838C92.6031 22.7838 92.6737 22.7129 92.6737 22.6232C92.6737 22.5335 92.6031 22.4627 92.5138 22.4627ZM92.5138 18.8366C92.4244 18.8366 92.3538 18.9075 92.3538 18.9972C92.3538 19.0869 92.4244 19.1577 92.5138 19.1577C92.6031 19.1577 92.6737 19.0869 92.6737 18.9972C92.6737 18.9075 92.6031 18.8366 92.5138 18.8366ZM92.5138 20.6497C92.4244 20.6497 92.3538 20.7205 92.3538 20.8102C92.3538 20.8999 92.4244 20.9707 92.5138 20.9707C92.6031 20.9707 92.6737 20.8999 92.6737 20.8102C92.6737 20.7205 92.6031 20.6497 92.5138 20.6497ZM94.193 40.5788C94.1036 40.5788 94.0331 40.6497 94.0331 40.7394C94.0331 40.8291 94.1036 40.8999 94.193 40.8999C94.2824 40.8999 94.3529 40.8291 94.3529 40.7394C94.3529 40.6497 94.2824 40.5788 94.193 40.5788ZM95.8723 29.7054C95.7829 29.7054 95.7123 29.7762 95.7123 29.8659C95.7123 29.9556 95.7829 30.0264 95.8723 30.0264C95.9617 30.0264 96.0322 29.9556 96.0322 29.8659C96.0322 29.7762 95.9617 29.7054 95.8723 29.7054ZM95.8723 27.8924C95.7829 27.8924 95.7123 27.9632 95.7123 28.0529C95.7123 28.1426 95.7829 28.2134 95.8723 28.2134C95.9617 28.2134 96.0322 28.1426 96.0322 28.0529C96.0322 27.9632 95.9617 27.8924 95.8723 27.8924ZM95.8723 33.3267C95.7829 33.3267 95.7123 33.3975 95.7123 33.4873C95.7123 33.577 95.7829 33.6478 95.8723 33.6478C95.9617 33.6478 96.0322 33.577 96.0322 33.4873C96.0322 33.3975 95.9617 33.3267 95.8723 33.3267ZM94.193 24.2663C94.1036 24.2663 94.0331 24.3371 94.0331 24.4268C94.0331 24.5165 94.1036 24.5873 94.193 24.5873C94.2824 24.5873 94.3529 24.5165 94.3529 24.4268C94.3529 24.3371 94.2824 24.2663 94.193 24.2663ZM95.8723 26.0793C95.7829 26.0793 95.7123 26.1501 95.7123 26.2398C95.7123 26.3296 95.7829 26.4004 95.8723 26.4004C95.9617 26.4004 96.0322 26.3296 96.0322 26.2398C96.0322 26.1501 95.9617 26.0793 95.8723 26.0793ZM95.8723 20.6449C95.7829 20.6449 95.7123 20.7158 95.7123 20.8055C95.7123 20.8952 95.7829 20.966 95.8723 20.966C95.9617 20.966 96.0322 20.8952 96.0322 20.8055C96.0322 20.7158 95.9617 20.6449 95.8723 20.6449ZM95.8723 24.271C95.7829 24.271 95.7123 24.3418 95.7123 24.4315C95.7123 24.5212 95.7829 24.5921 95.8723 24.5921C95.9617 24.5921 96.0322 24.5212 96.0322 24.4315C96.0322 24.3418 95.9617 24.271 95.8723 24.271ZM95.8723 22.458C95.7829 22.458 95.7123 22.5288 95.7123 22.6185C95.7123 22.7082 95.7829 22.779 95.8723 22.779C95.9617 22.779 96.0322 22.7082 96.0322 22.6185C96.0322 22.5288 95.9617 22.458 95.8723 22.458ZM95.8723 31.5184C95.7829 31.5184 95.7123 31.5892 95.7123 31.6789C95.7123 31.7686 95.7829 31.8395 95.8723 31.8395C95.9617 31.8395 96.0322 31.7686 96.0322 31.6789C96.0322 31.5892 95.9617 31.5184 95.8723 31.5184ZM94.193 20.6449C94.1036 20.6449 94.0331 20.7158 94.0331 20.8055C94.0331 20.8952 94.1036 20.966 94.193 20.966C94.2824 20.966 94.3529 20.8952 94.3529 20.8055C94.3529 20.7158 94.2824 20.6449 94.193 20.6449ZM94.193 18.8319C94.1036 18.8319 94.0331 18.9027 94.0331 18.9924C94.0331 19.0822 94.1036 19.153 94.193 19.153C94.2824 19.153 94.3529 19.0822 94.3529 18.9924C94.3529 18.9027 94.2824 18.8319 94.193 18.8319ZM94.193 17.0189C94.1036 17.0189 94.0331 17.0897 94.0331 17.1794C94.0331 17.2691 94.1036 17.3399 94.193 17.3399C94.2824 17.3399 94.3529 17.2691 94.3529 17.1794C94.3529 17.0897 94.2824 17.0189 94.193 17.0189ZM95.8723 35.1398C95.7829 35.1398 95.7123 35.2106 95.7123 35.3003C95.7123 35.39 95.7829 35.4608 95.8723 35.4608C95.9617 35.4608 96.0322 35.39 96.0322 35.3003C96.0322 35.2106 95.9617 35.1398 95.8723 35.1398ZM94.193 22.458C94.1036 22.458 94.0331 22.5288 94.0331 22.6185C94.0331 22.7082 94.1036 22.779 94.193 22.779C94.2824 22.779 94.3529 22.7082 94.3529 22.6185C94.3529 22.5288 94.2824 22.458 94.193 22.458ZM95.8723 36.9528C95.7829 36.9528 95.7123 37.0236 95.7123 37.1133C95.7123 37.203 95.7829 37.2738 95.8723 37.2738C95.9617 37.2738 96.0322 37.203 96.0322 37.1133C96.0322 37.0236 95.9617 36.9528 95.8723 36.9528ZM95.8723 40.5788C95.7829 40.5788 95.7123 40.6497 95.7123 40.7394C95.7123 40.8291 95.7829 40.8999 95.8723 40.8999C95.9617 40.8999 96.0322 40.8291 96.0322 40.7394C96.0322 40.6497 95.9617 40.5788 95.8723 40.5788ZM95.8723 38.7658C95.7829 38.7658 95.7123 38.8366 95.7123 38.9263C95.7123 39.0161 95.7829 39.0869 95.8723 39.0869C95.9617 39.0869 96.0322 39.0161 96.0322 38.9263C96.0322 38.8366 95.9617 38.7658 95.8723 38.7658ZM89.1599 26.084C89.0706 26.084 89 26.1549 89 26.2446C89 26.3343 89.0706 26.4051 89.1599 26.4051C89.2493 26.4051 89.3199 26.3343 89.3199 26.2446C89.3199 26.1549 89.2493 26.084 89.1599 26.084ZM89.1599 27.8971C89.0706 27.8971 89 27.9679 89 28.0576C89 28.1473 89.0706 28.2181 89.1599 28.2181C89.2493 28.2181 89.3199 28.1473 89.3199 28.0576C89.3199 27.9679 89.2493 27.8971 89.1599 27.8971ZM89.1599 22.4627C89.0706 22.4627 89 22.5335 89 22.6232C89 22.7129 89.0706 22.7838 89.1599 22.7838C89.2493 22.7838 89.3199 22.7129 89.3199 22.6232C89.3199 22.5335 89.2493 22.4627 89.1599 22.4627ZM95.8723 18.8366C95.7829 18.8366 95.7123 18.9075 95.7123 18.9972C95.7123 19.0869 95.7829 19.1577 95.8723 19.1577C95.9617 19.1577 96.0322 19.0869 96.0322 18.9972C96.0322 18.9075 95.9617 18.8366 95.8723 18.8366ZM89.1599 20.6497C89.0706 20.6497 89 20.7205 89 20.8102C89 20.8999 89.0706 20.9707 89.1599 20.9707C89.2493 20.9707 89.3199 20.8999 89.3199 20.8102C89.3199 20.7205 89.2493 20.6497 89.1599 20.6497ZM89.1599 24.2757C89.0706 24.2757 89 24.3466 89 24.4363C89 24.526 89.0706 24.5968 89.1599 24.5968C89.2493 24.5968 89.3199 24.526 89.3199 24.4363C89.3199 24.3466 89.2493 24.2757 89.1599 24.2757ZM89.1599 18.8414C89.0706 18.8414 89 18.9122 89 19.0019C89 19.0916 89.0706 19.1624 89.1599 19.1624C89.2493 19.1624 89.3199 19.0916 89.3199 19.0019C89.3199 18.9122 89.2493 18.8414 89.1599 18.8414ZM90.8392 40.5836C90.7498 40.5836 90.6793 40.6544 90.6793 40.7441C90.6793 40.8338 90.7498 40.9046 90.8392 40.9046C90.9286 40.9046 90.9991 40.8338 90.9991 40.7441C90.9991 40.6544 90.9286 40.5836 90.8392 40.5836ZM121.047 20.6544C120.958 20.6544 120.887 20.7252 120.887 20.8149C120.887 20.9046 120.958 20.9754 121.047 20.9754C121.136 20.9754 121.207 20.9046 121.207 20.8149C121.207 20.7252 121.136 20.6544 121.047 20.6544ZM104.264 18.8414C104.175 18.8414 104.104 18.9122 104.104 19.0019C104.104 19.0916 104.175 19.1624 104.264 19.1624C104.353 19.1624 104.424 19.0916 104.424 19.0019C104.424 18.9122 104.353 18.8414 104.264 18.8414ZM89.1599 40.5836C89.0706 40.5836 89 40.6544 89 40.7441C89 40.8338 89.0706 40.9046 89.1599 40.9046C89.2493 40.9046 89.3199 40.8338 89.3199 40.7441C89.3199 40.6544 89.2493 40.5836 89.1599 40.5836ZM89.1599 38.7705C89.0706 38.7705 89 38.8414 89 38.9311C89 39.0208 89.0706 39.0916 89.1599 39.0916C89.2493 39.0916 89.3199 39.0208 89.3199 38.9311C89.3199 38.8414 89.2493 38.7705 89.1599 38.7705ZM90.8392 38.7705C90.7498 38.7705 90.6793 38.8414 90.6793 38.9311C90.6793 39.0208 90.7498 39.0916 90.8392 39.0916C90.9286 39.0916 90.9991 39.0208 90.9991 38.9311C90.9991 38.8414 90.9286 38.7705 90.8392 38.7705ZM89.1599 36.9575C89.0706 36.9575 89 37.0283 89 37.118C89 37.2077 89.0706 37.2786 89.1599 37.2786C89.2493 37.2786 89.3199 37.2077 89.3199 37.118C89.3199 37.0283 89.2493 36.9575 89.1599 36.9575ZM89.1599 33.3314C89.0706 33.3314 89 33.4023 89 33.492C89 33.5817 89.0706 33.6525 89.1599 33.6525C89.2493 33.6525 89.3199 33.5817 89.3199 33.492C89.3199 33.4023 89.2493 33.3314 89.1599 33.3314ZM89.1599 31.5184C89.0706 31.5184 89 31.5892 89 31.6789C89 31.7686 89.0706 31.8395 89.1599 31.8395C89.2493 31.8395 89.3199 31.7686 89.3199 31.6789C89.3199 31.5892 89.2493 31.5184 89.1599 31.5184ZM89.1599 35.1445C89.0706 35.1445 89 35.2153 89 35.305C89 35.3947 89.0706 35.4655 89.1599 35.4655C89.2493 35.4655 89.3199 35.3947 89.3199 35.305C89.3199 35.2153 89.2493 35.1445 89.1599 35.1445ZM89.1599 29.7101C89.0706 29.7101 89 29.7809 89 29.8706C89 29.9603 89.0706 30.0312 89.1599 30.0312C89.2493 30.0312 89.3199 29.9603 89.3199 29.8706C89.3199 29.7809 89.2493 29.7101 89.1599 29.7101ZM89.1599 17.0283C89.0706 17.0283 89 17.0991 89 17.1889C89 17.2786 89.0706 17.3494 89.1599 17.3494C89.2493 17.3494 89.3199 17.2786 89.3199 17.1889C89.3199 17.0991 89.2493 17.0283 89.1599 17.0283ZM92.5185 40.5836C92.4291 40.5836 92.3585 40.6544 92.3585 40.7441C92.3585 40.8338 92.4291 40.9046 92.5185 40.9046C92.6078 40.9046 92.6784 40.8338 92.6784 40.7441C92.6784 40.6544 92.6078 40.5836 92.5185 40.5836ZM90.8392 17.0283C90.7498 17.0283 90.6793 17.0991 90.6793 17.1889C90.6793 17.2786 90.7498 17.3494 90.8392 17.3494C90.9286 17.3494 90.9991 17.2786 90.9991 17.1889C90.9991 17.0991 90.9286 17.0283 90.8392 17.0283ZM90.8392 18.8414C90.7498 18.8414 90.6793 18.9122 90.6793 19.0019C90.6793 19.0916 90.7498 19.1624 90.8392 19.1624C90.9286 19.1624 90.9991 19.0916 90.9991 19.0019C90.9991 18.9122 90.9286 18.8414 90.8392 18.8414ZM90.8392 20.6544C90.7498 20.6544 90.6793 20.7252 90.6793 20.8149C90.6793 20.9046 90.7498 20.9754 90.8392 20.9754C90.9286 20.9754 90.9991 20.9046 90.9991 20.8149C90.9991 20.7252 90.9286 20.6544 90.8392 20.6544ZM90.8392 22.4674C90.7498 22.4674 90.6793 22.5382 90.6793 22.628C90.6793 22.7177 90.7498 22.7885 90.8392 22.7885C90.9286 22.7885 90.9991 22.7177 90.9991 22.628C90.9991 22.5382 90.9286 22.4674 90.8392 22.4674ZM92.5185 38.7753C92.4291 38.7753 92.3585 38.8461 92.3585 38.9358C92.3585 39.0255 92.4291 39.0963 92.5185 39.0963C92.6078 39.0963 92.6784 39.0255 92.6784 38.9358C92.6784 38.8461 92.6078 38.7753 92.5185 38.7753ZM92.5185 35.1492C92.4291 35.1492 92.3585 35.22 92.3585 35.3097C92.3585 35.3994 92.4291 35.4703 92.5185 35.4703C92.6078 35.4703 92.6784 35.3994 92.6784 35.3097C92.6784 35.22 92.6078 35.1492 92.5185 35.1492ZM92.5185 36.9622C92.4291 36.9622 92.3585 37.033 92.3585 37.1228C92.3585 37.2125 92.4291 37.2833 92.5185 37.2833C92.6078 37.2833 92.6784 37.2125 92.6784 37.1228C92.6784 37.033 92.6078 36.9622 92.5185 36.9622ZM90.8392 24.2805C90.7498 24.2805 90.6793 24.3513 90.6793 24.441C90.6793 24.5307 90.7498 24.6015 90.8392 24.6015C90.9286 24.6015 90.9991 24.5307 90.9991 24.441C90.9991 24.3513 90.9286 24.2805 90.8392 24.2805ZM90.8392 31.5279C90.7498 31.5279 90.6793 31.5987 90.6793 31.6884C90.6793 31.7781 90.7498 31.8489 90.8392 31.8489C90.9286 31.8489 90.9991 31.7781 90.9991 31.6884C90.9991 31.5987 90.9286 31.5279 90.8392 31.5279ZM90.8392 33.3409C90.7498 33.3409 90.6793 33.4117 90.6793 33.5014C90.6793 33.5911 90.7498 33.6619 90.8392 33.6619C90.9286 33.6619 90.9991 33.5911 90.9991 33.5014C90.9991 33.4117 90.9286 33.3409 90.8392 33.3409ZM90.8392 35.1539C90.7498 35.1539 90.6793 35.2247 90.6793 35.3144C90.6793 35.4042 90.7498 35.475 90.8392 35.475C90.9286 35.475 90.9991 35.4042 90.9991 35.3144C90.9991 35.2247 90.9286 35.1539 90.8392 35.1539ZM90.8392 29.7195C90.7498 29.7195 90.6793 29.7904 90.6793 29.8801C90.6793 29.9698 90.7498 30.0406 90.8392 30.0406C90.9286 30.0406 90.9991 29.9698 90.9991 29.8801C90.9991 29.7904 90.9286 29.7195 90.8392 29.7195ZM90.8392 26.0935C90.7498 26.0935 90.6793 26.1643 90.6793 26.254C90.6793 26.3437 90.7498 26.4145 90.8392 26.4145C90.9286 26.4145 90.9991 26.3437 90.9991 26.254C90.9991 26.1643 90.9286 26.0935 90.8392 26.0935ZM90.8392 36.967C90.7498 36.967 90.6793 37.0378 90.6793 37.1275C90.6793 37.2172 90.7498 37.288 90.8392 37.288C90.9286 37.288 90.9991 37.2172 90.9991 37.1275C90.9991 37.0378 90.9286 36.967 90.8392 36.967ZM90.8392 27.9065C90.7498 27.9065 90.6793 27.9773 90.6793 28.067C90.6793 28.1568 90.7498 28.2276 90.8392 28.2276C90.9286 28.2276 90.9991 28.1568 90.9991 28.067C90.9991 27.9773 90.9286 27.9065 90.8392 27.9065ZM97.5515 27.9065C97.4622 27.9065 97.3916 27.9773 97.3916 28.067C97.3916 28.1568 97.4622 28.2276 97.5515 28.2276C97.6409 28.2276 97.7115 28.1568 97.7115 28.067C97.7115 27.9773 97.6409 27.9065 97.5515 27.9065ZM102.585 35.1539C102.495 35.1539 102.425 35.2247 102.425 35.3144C102.425 35.4042 102.495 35.475 102.585 35.475C102.674 35.475 102.745 35.4042 102.745 35.3144C102.745 35.2247 102.674 35.1539 102.585 35.1539ZM102.585 31.5279C102.495 31.5279 102.425 31.5987 102.425 31.6884C102.425 31.7781 102.495 31.8489 102.585 31.8489C102.674 31.8489 102.745 31.7781 102.745 31.6884C102.745 31.5987 102.674 31.5279 102.585 31.5279ZM102.585 33.3409C102.495 33.3409 102.425 33.4117 102.425 33.5014C102.425 33.5911 102.495 33.6619 102.585 33.6619C102.674 33.6619 102.745 33.5911 102.745 33.5014C102.745 33.4117 102.674 33.3409 102.585 33.3409ZM102.585 36.967C102.495 36.967 102.425 37.0378 102.425 37.1275C102.425 37.2172 102.495 37.288 102.585 37.288C102.674 37.288 102.745 37.2172 102.745 37.1275C102.745 37.0378 102.674 36.967 102.585 36.967ZM102.585 38.78C102.495 38.78 102.425 38.8508 102.425 38.9405C102.425 39.0302 102.495 39.101 102.585 39.101C102.674 39.101 102.745 39.0302 102.745 38.9405C102.745 38.8508 102.674 38.78 102.585 38.78ZM102.585 26.0982C102.495 26.0982 102.425 26.169 102.425 26.2587C102.425 26.3484 102.495 26.4193 102.585 26.4193C102.674 26.4193 102.745 26.3484 102.745 26.2587C102.745 26.169 102.674 26.0982 102.585 26.0982ZM100.905 29.7243C100.816 29.7243 100.745 29.7951 100.745 29.8848C100.745 29.9745 100.816 30.0453 100.905 30.0453C100.995 30.0453 101.065 29.9745 101.065 29.8848C101.065 29.7951 100.995 29.7243 100.905 29.7243ZM102.585 27.9112C102.495 27.9112 102.425 27.9821 102.425 28.0718C102.425 28.1615 102.495 28.2323 102.585 28.2323C102.674 28.2323 102.745 28.1615 102.745 28.0718C102.745 27.9821 102.674 27.9112 102.585 27.9112ZM100.905 22.4769C100.816 22.4769 100.745 22.5477 100.745 22.6374C100.745 22.7271 100.816 22.7979 100.905 22.7979C100.995 22.7979 101.065 22.7271 101.065 22.6374C101.065 22.5477 100.995 22.4769 100.905 22.4769ZM100.905 24.2899C100.816 24.2899 100.745 24.3607 100.745 24.4504C100.745 24.5401 100.816 24.611 100.905 24.611C100.995 24.611 101.065 24.5401 101.065 24.4504C101.065 24.3607 100.995 24.2899 100.905 24.2899ZM100.905 26.1029C100.816 26.1029 100.745 26.1737 100.745 26.2635C100.745 26.3532 100.816 26.424 100.905 26.424C100.995 26.424 101.065 26.3532 101.065 26.2635C101.065 26.1737 100.995 26.1029 100.905 26.1029ZM100.905 27.916C100.816 27.916 100.745 27.9868 100.745 28.0765C100.745 28.1662 100.816 28.237 100.905 28.237C100.995 28.237 101.065 28.1662 101.065 28.0765C101.065 27.9868 100.995 27.916 100.905 27.916ZM102.585 24.2899C102.495 24.2899 102.425 24.3607 102.425 24.4504C102.425 24.5401 102.495 24.611 102.585 24.611C102.674 24.611 102.745 24.5401 102.745 24.4504C102.745 24.3607 102.674 24.2899 102.585 24.2899ZM100.905 20.6638C100.816 20.6638 100.745 20.7347 100.745 20.8244C100.745 20.9141 100.816 20.9849 100.905 20.9849C100.995 20.9849 101.065 20.9141 101.065 20.8244C101.065 20.7347 100.995 20.6638 100.905 20.6638ZM100.905 17.0378C100.816 17.0378 100.745 17.1086 100.745 17.1983C100.745 17.288 100.816 17.3588 100.905 17.3588C100.995 17.3588 101.065 17.288 101.065 17.1983C101.065 17.1086 100.995 17.0378 100.905 17.0378ZM100.905 18.8508C100.816 18.8508 100.745 18.9216 100.745 19.0113C100.745 19.101 100.816 19.1719 100.905 19.1719C100.995 19.1719 101.065 19.101 101.065 19.0113C101.065 18.9216 100.995 18.8508 100.905 18.8508ZM102.585 40.593C102.495 40.593 102.425 40.6638 102.425 40.7535C102.425 40.8432 102.495 40.9141 102.585 40.9141C102.674 40.9141 102.745 40.8432 102.745 40.7535C102.745 40.6638 102.674 40.593 102.585 40.593ZM102.585 29.7195C102.495 29.7195 102.425 29.7904 102.425 29.8801C102.425 29.9698 102.495 30.0406 102.585 30.0406C102.674 30.0406 102.745 29.9698 102.745 29.8801C102.745 29.7904 102.674 29.7195 102.585 29.7195ZM104.264 26.0935C104.175 26.0935 104.104 26.1643 104.104 26.254C104.104 26.3437 104.175 26.4145 104.264 26.4145C104.353 26.4145 104.424 26.3437 104.424 26.254C104.424 26.1643 104.353 26.0935 104.264 26.0935ZM104.264 27.9065C104.175 27.9065 104.104 27.9773 104.104 28.067C104.104 28.1568 104.175 28.2276 104.264 28.2276C104.353 28.2276 104.424 28.1568 104.424 28.067C104.424 27.9773 104.353 27.9065 104.264 27.9065ZM102.585 20.6591C102.495 20.6591 102.425 20.7299 102.425 20.8196C102.425 20.9093 102.495 20.9802 102.585 20.9802C102.674 20.9802 102.745 20.9093 102.745 20.8196C102.745 20.7299 102.674 20.6591 102.585 20.6591ZM104.264 31.5326C104.175 31.5326 104.104 31.6034 104.104 31.6931C104.104 31.7828 104.175 31.8536 104.264 31.8536C104.353 31.8536 104.424 31.7828 104.424 31.6931C104.424 31.6034 104.353 31.5326 104.264 31.5326ZM104.264 24.2852C104.175 24.2852 104.104 24.356 104.104 24.4457C104.104 24.5354 104.175 24.6062 104.264 24.6062C104.353 24.6062 104.424 24.5354 104.424 24.4457C104.424 24.356 104.353 24.2852 104.264 24.2852ZM95.8723 17.0378C95.7829 17.0378 95.7123 17.1086 95.7123 17.1983C95.7123 17.288 95.7829 17.3588 95.8723 17.3588C95.9617 17.3588 96.0322 17.288 96.0322 17.1983C96.0322 17.1086 95.9617 17.0378 95.8723 17.0378ZM104.264 22.4721C104.175 22.4721 104.104 22.543 104.104 22.6327C104.104 22.7224 104.175 22.7932 104.264 22.7932C104.353 22.7932 104.424 22.7224 104.424 22.6327C104.424 22.543 104.353 22.4721 104.264 22.4721ZM104.264 20.6591C104.175 20.6591 104.104 20.7299 104.104 20.8196C104.104 20.9093 104.175 20.9802 104.264 20.9802C104.353 20.9802 104.424 20.9093 104.424 20.8196C104.424 20.7299 104.353 20.6591 104.264 20.6591ZM104.264 29.7195C104.175 29.7195 104.104 29.7904 104.104 29.8801C104.104 29.9698 104.175 30.0406 104.264 30.0406C104.353 30.0406 104.424 29.9698 104.424 29.8801C104.424 29.7904 104.353 29.7195 104.264 29.7195ZM102.585 17.0378C102.495 17.0378 102.425 17.1086 102.425 17.1983C102.425 17.288 102.495 17.3588 102.585 17.3588C102.674 17.3588 102.745 17.288 102.745 17.1983C102.745 17.1086 102.674 17.0378 102.585 17.0378ZM102.585 18.8508C102.495 18.8508 102.425 18.9216 102.425 19.0113C102.425 19.101 102.495 19.1719 102.585 19.1719C102.674 19.1719 102.745 19.101 102.745 19.0113C102.745 18.9216 102.674 18.8508 102.585 18.8508ZM104.264 33.3456C104.175 33.3456 104.104 33.4164 104.104 33.5061C104.104 33.5958 104.175 33.6667 104.264 33.6667C104.353 33.6667 104.424 33.5958 104.424 33.5061C104.424 33.4164 104.353 33.3456 104.264 33.3456ZM104.264 40.593C104.175 40.593 104.104 40.6638 104.104 40.7535C104.104 40.8432 104.175 40.9141 104.264 40.9141C104.353 40.9141 104.424 40.8432 104.424 40.7535C104.424 40.6638 104.353 40.593 104.264 40.593ZM104.264 35.1586C104.175 35.1586 104.104 35.2295 104.104 35.3192C104.104 35.4089 104.175 35.4797 104.264 35.4797C104.353 35.4797 104.424 35.4089 104.424 35.3192C104.424 35.2295 104.353 35.1586 104.264 35.1586ZM104.264 38.7847C104.175 38.7847 104.104 38.8555 104.104 38.9452C104.104 39.0349 104.175 39.1058 104.264 39.1058C104.353 39.1058 104.424 39.0349 104.424 38.9452C104.424 38.8555 104.353 38.7847 104.264 38.7847ZM104.264 36.9717C104.175 36.9717 104.104 37.0425 104.104 37.1322C104.104 37.2219 104.175 37.2927 104.264 37.2927C104.353 37.2927 104.424 37.2219 104.424 37.1322C104.424 37.0425 104.353 36.9717 104.264 36.9717ZM102.585 22.4769C102.495 22.4769 102.425 22.5477 102.425 22.6374C102.425 22.7271 102.495 22.7979 102.585 22.7979C102.674 22.7979 102.745 22.7271 102.745 22.6374C102.745 22.5477 102.674 22.4769 102.585 22.4769ZM97.5515 22.4769C97.4622 22.4769 97.3916 22.5477 97.3916 22.6374C97.3916 22.7271 97.4622 22.7979 97.5515 22.7979C97.6409 22.7979 97.7115 22.7271 97.7115 22.6374C97.7115 22.5477 97.6409 22.4769 97.5515 22.4769ZM97.5515 20.6638C97.4622 20.6638 97.3916 20.7347 97.3916 20.8244C97.3916 20.9141 97.4622 20.9849 97.5515 20.9849C97.6409 20.9849 97.7115 20.9141 97.7115 20.8244C97.7115 20.7347 97.6409 20.6638 97.5515 20.6638ZM97.5515 18.8508C97.4622 18.8508 97.3916 18.9216 97.3916 19.0113C97.3916 19.101 97.4622 19.1719 97.5515 19.1719C97.6409 19.1719 97.7115 19.101 97.7115 19.0113C97.7115 18.9216 97.6409 18.8508 97.5515 18.8508ZM97.5515 24.2852C97.4622 24.2852 97.3916 24.356 97.3916 24.4457C97.3916 24.5354 97.4622 24.6062 97.5515 24.6062C97.6409 24.6062 97.7115 24.5354 97.7115 24.4457C97.7115 24.356 97.6409 24.2852 97.5515 24.2852ZM99.2308 40.593C99.1414 40.593 99.0709 40.6638 99.0709 40.7535C99.0709 40.8432 99.1414 40.9141 99.2308 40.9141C99.3202 40.9141 99.3907 40.8432 99.3907 40.7535C99.3907 40.6638 99.3202 40.593 99.2308 40.593ZM99.2308 36.967C99.1414 36.967 99.0709 37.0378 99.0709 37.1275C99.0709 37.2172 99.1414 37.288 99.2308 37.288C99.3202 37.288 99.3907 37.2172 99.3907 37.1275C99.3907 37.0378 99.3202 36.967 99.2308 36.967ZM99.2308 38.78C99.1414 38.78 99.0709 38.8508 99.0709 38.9405C99.0709 39.0302 99.1414 39.101 99.2308 39.101C99.3202 39.101 99.3907 39.0302 99.3907 38.9405C99.3907 38.8508 99.3202 38.78 99.2308 38.78ZM97.5515 26.0982C97.4622 26.0982 97.3916 26.169 97.3916 26.2587C97.3916 26.3484 97.4622 26.4193 97.5515 26.4193C97.6409 26.4193 97.7115 26.3484 97.7115 26.2587C97.7115 26.169 97.6409 26.0982 97.5515 26.0982ZM97.5515 17.0378C97.4622 17.0378 97.3916 17.1086 97.3916 17.1983C97.3916 17.288 97.4622 17.3588 97.5515 17.3588C97.6409 17.3588 97.7115 17.288 97.7115 17.1983C97.7115 17.1086 97.6409 17.0378 97.5515 17.0378ZM97.5515 40.593C97.4622 40.593 97.3916 40.6638 97.3916 40.7535C97.3916 40.8432 97.4622 40.9141 97.5515 40.9141C97.6409 40.9141 97.7115 40.8432 97.7115 40.7535C97.7115 40.6638 97.6409 40.593 97.5515 40.593ZM97.5515 36.967C97.4622 36.967 97.3916 37.0378 97.3916 37.1275C97.3916 37.2172 97.4622 37.288 97.5515 37.288C97.6409 37.288 97.7115 37.2172 97.7115 37.1275C97.7115 37.0378 97.6409 36.967 97.5515 36.967ZM97.5515 35.1539C97.4622 35.1539 97.3916 35.2247 97.3916 35.3144C97.3916 35.4042 97.4622 35.475 97.5515 35.475C97.6409 35.475 97.7115 35.4042 97.7115 35.3144C97.7115 35.2247 97.6409 35.1539 97.5515 35.1539ZM97.5515 38.78C97.4622 38.78 97.3916 38.8508 97.3916 38.9405C97.3916 39.0302 97.4622 39.101 97.5515 39.101C97.6409 39.101 97.7115 39.0302 97.7115 38.9405C97.7115 38.8508 97.6409 38.78 97.5515 38.78ZM100.91 31.5326C100.821 31.5326 100.75 31.6034 100.75 31.6931C100.75 31.7828 100.821 31.8536 100.91 31.8536C100.999 31.8536 101.07 31.7828 101.07 31.6931C101.07 31.6034 100.999 31.5326 100.91 31.5326ZM97.5515 33.3456C97.4622 33.3456 97.3916 33.4164 97.3916 33.5061C97.3916 33.5958 97.4622 33.6667 97.5515 33.6667C97.6409 33.6667 97.7115 33.5958 97.7115 33.5061C97.7115 33.4164 97.6409 33.3456 97.5515 33.3456ZM97.5515 29.7195C97.4622 29.7195 97.3916 29.7904 97.3916 29.8801C97.3916 29.9698 97.4622 30.0406 97.5515 30.0406C97.6409 30.0406 97.7115 29.9698 97.7115 29.8801C97.7115 29.7904 97.6409 29.7195 97.5515 29.7195ZM97.5515 31.5326C97.4622 31.5326 97.3916 31.6034 97.3916 31.6931C97.3916 31.7828 97.4622 31.8536 97.5515 31.8536C97.6409 31.8536 97.7115 31.7828 97.7115 31.6931C97.7115 31.6034 97.6409 31.5326 97.5515 31.5326ZM100.91 33.3456C100.821 33.3456 100.75 33.4164 100.75 33.5061C100.75 33.5958 100.821 33.6667 100.91 33.6667C100.999 33.6667 101.07 33.5958 101.07 33.5061C101.07 33.4164 100.999 33.3456 100.91 33.3456ZM99.2308 22.4721C99.1414 22.4721 99.0709 22.543 99.0709 22.6327C99.0709 22.7224 99.1414 22.7932 99.2308 22.7932C99.3202 22.7932 99.3907 22.7224 99.3907 22.6327C99.3907 22.543 99.3202 22.4721 99.2308 22.4721ZM99.2308 18.8461C99.1414 18.8461 99.0709 18.9169 99.0709 19.0066C99.0709 19.0963 99.1414 19.1671 99.2308 19.1671C99.3202 19.1671 99.3907 19.0963 99.3907 19.0066C99.3907 18.9169 99.3202 18.8461 99.2308 18.8461ZM100.91 40.5883C100.821 40.5883 100.75 40.6591 100.75 40.7488C100.75 40.8385 100.821 40.9093 100.91 40.9093C100.999 40.9093 101.07 40.8385 101.07 40.7488C101.07 40.6591 100.999 40.5883 100.91 40.5883ZM99.2308 17.033C99.1414 17.033 99.0709 17.1039 99.0709 17.1936C99.0709 17.2833 99.1414 17.3541 99.2308 17.3541C99.3202 17.3541 99.3907 17.2833 99.3907 17.1936C99.3907 17.1039 99.3202 17.033 99.2308 17.033ZM100.91 35.1539C100.821 35.1539 100.75 35.2247 100.75 35.3144C100.75 35.4042 100.821 35.475 100.91 35.475C100.999 35.475 101.07 35.4042 101.07 35.3144C101.07 35.2247 100.999 35.1539 100.91 35.1539ZM100.91 36.967C100.821 36.967 100.75 37.0378 100.75 37.1275C100.75 37.2172 100.821 37.288 100.91 37.288C100.999 37.288 101.07 37.2172 101.07 37.1275C101.07 37.0378 100.999 36.967 100.91 36.967ZM100.91 38.78C100.821 38.78 100.75 38.8508 100.75 38.9405C100.75 39.0302 100.821 39.101 100.91 39.101C100.999 39.101 101.07 39.0302 101.07 38.9405C101.07 38.8508 100.999 38.78 100.91 38.78ZM99.2308 20.6591C99.1414 20.6591 99.0709 20.7299 99.0709 20.8196C99.0709 20.9093 99.1414 20.9802 99.2308 20.9802C99.3202 20.9802 99.3907 20.9093 99.3907 20.8196C99.3907 20.7299 99.3202 20.6591 99.2308 20.6591ZM99.2308 31.5326C99.1414 31.5326 99.0709 31.6034 99.0709 31.6931C99.0709 31.7828 99.1414 31.8536 99.2308 31.8536C99.3202 31.8536 99.3907 31.7828 99.3907 31.6931C99.3907 31.6034 99.3202 31.5326 99.2308 31.5326ZM99.2308 35.1586C99.1414 35.1586 99.0709 35.2295 99.0709 35.3192C99.0709 35.4089 99.1414 35.4797 99.2308 35.4797C99.3202 35.4797 99.3907 35.4089 99.3907 35.3192C99.3907 35.2295 99.3202 35.1586 99.2308 35.1586ZM99.2308 33.3456C99.1414 33.3456 99.0709 33.4164 99.0709 33.5061C99.0709 33.5958 99.1414 33.6667 99.2308 33.6667C99.3202 33.6667 99.3907 33.5958 99.3907 33.5061C99.3907 33.4164 99.3202 33.3456 99.2308 33.3456ZM99.2308 29.7195C99.1414 29.7195 99.0709 29.7904 99.0709 29.8801C99.0709 29.9698 99.1414 30.0406 99.2308 30.0406C99.3202 30.0406 99.3907 29.9698 99.3907 29.8801C99.3907 29.7904 99.3202 29.7195 99.2308 29.7195ZM99.2308 24.2852C99.1414 24.2852 99.0709 24.356 99.0709 24.4457C99.0709 24.5354 99.1414 24.6062 99.2308 24.6062C99.3202 24.6062 99.3907 24.5354 99.3907 24.4457C99.3907 24.356 99.3202 24.2852 99.2308 24.2852ZM99.2308 26.0982C99.1414 26.0982 99.0709 26.169 99.0709 26.2587C99.0709 26.3484 99.1414 26.4193 99.2308 26.4193C99.3202 26.4193 99.3907 26.3484 99.3907 26.2587C99.3907 26.169 99.3202 26.0982 99.2308 26.0982ZM99.2308 27.9112C99.1414 27.9112 99.0709 27.9821 99.0709 28.0718C99.0709 28.1615 99.1414 28.2323 99.2308 28.2323C99.3202 28.2323 99.3907 28.1615 99.3907 28.0718C99.3907 27.9821 99.3202 27.9112 99.2308 27.9112ZM132.934 26.0982C132.844 26.0982 132.774 26.169 132.774 26.2587C132.774 26.3484 132.844 26.4193 132.934 26.4193C133.023 26.4193 133.094 26.3484 133.094 26.2587C133.094 26.169 133.023 26.0982 132.934 26.0982ZM132.934 35.1586C132.844 35.1586 132.774 35.2295 132.774 35.3192C132.774 35.4089 132.844 35.4797 132.934 35.4797C133.023 35.4797 133.094 35.4089 133.094 35.3192C133.094 35.2295 133.023 35.1586 132.934 35.1586ZM132.934 20.6638C132.844 20.6638 132.774 20.7347 132.774 20.8244C132.774 20.9141 132.844 20.9849 132.934 20.9849C133.023 20.9849 133.094 20.9141 133.094 20.8244C133.094 20.7347 133.023 20.6638 132.934 20.6638ZM132.934 33.3456C132.844 33.3456 132.774 33.4164 132.774 33.5061C132.774 33.5958 132.844 33.6667 132.934 33.6667C133.023 33.6667 133.094 33.5958 133.094 33.5061C133.094 33.4164 133.023 33.3456 132.934 33.3456ZM132.934 31.5326C132.844 31.5326 132.774 31.6034 132.774 31.6931C132.774 31.7828 132.844 31.8536 132.934 31.8536C133.023 31.8536 133.094 31.7828 133.094 31.6931C133.094 31.6034 133.023 31.5326 132.934 31.5326ZM132.934 27.9065C132.844 27.9065 132.774 27.9773 132.774 28.067C132.774 28.1568 132.844 28.2276 132.934 28.2276C133.023 28.2276 133.094 28.1568 133.094 28.067C133.094 27.9773 133.023 27.9065 132.934 27.9065ZM132.934 29.7195C132.844 29.7195 132.774 29.7904 132.774 29.8801C132.774 29.9698 132.844 30.0406 132.934 30.0406C133.023 30.0406 133.094 29.9698 133.094 29.8801C133.094 29.7904 133.023 29.7195 132.934 29.7195ZM132.934 24.2852C132.844 24.2852 132.774 24.356 132.774 24.4457C132.774 24.5354 132.844 24.6062 132.934 24.6062C133.023 24.6062 133.094 24.5354 133.094 24.4457C133.094 24.356 133.023 24.2852 132.934 24.2852ZM134.613 31.5326C134.524 31.5326 134.453 31.6034 134.453 31.6931C134.453 31.7828 134.524 31.8536 134.613 31.8536C134.702 31.8536 134.773 31.7828 134.773 31.6931C134.773 31.6034 134.702 31.5326 134.613 31.5326ZM134.613 35.1586C134.524 35.1586 134.453 35.2295 134.453 35.3192C134.453 35.4089 134.524 35.4797 134.613 35.4797C134.702 35.4797 134.773 35.4089 134.773 35.3192C134.773 35.2295 134.702 35.1586 134.613 35.1586ZM134.613 36.9717C134.524 36.9717 134.453 37.0425 134.453 37.1322C134.453 37.2219 134.524 37.2927 134.613 37.2927C134.702 37.2927 134.773 37.2219 134.773 37.1322C134.773 37.0425 134.702 36.9717 134.613 36.9717ZM134.613 33.3456C134.524 33.3456 134.453 33.4164 134.453 33.5061C134.453 33.5958 134.524 33.6667 134.613 33.6667C134.702 33.6667 134.773 33.5958 134.773 33.5061C134.773 33.4164 134.702 33.3456 134.613 33.3456ZM134.613 40.593C134.524 40.593 134.453 40.6638 134.453 40.7535C134.453 40.8432 134.524 40.9141 134.613 40.9141C134.702 40.9141 134.773 40.8432 134.773 40.7535C134.773 40.6638 134.702 40.593 134.613 40.593ZM134.613 38.78C134.524 38.78 134.453 38.8508 134.453 38.9405C134.453 39.0302 134.524 39.101 134.613 39.101C134.702 39.101 134.773 39.0302 134.773 38.9405C134.773 38.8508 134.702 38.78 134.613 38.78ZM132.934 17.0378C132.844 17.0378 132.774 17.1086 132.774 17.1983C132.774 17.288 132.844 17.3588 132.934 17.3588C133.023 17.3588 133.094 17.288 133.094 17.1983C133.094 17.1086 133.023 17.0378 132.934 17.0378ZM132.934 18.8508C132.844 18.8508 132.774 18.9216 132.774 19.0113C132.774 19.101 132.844 19.1719 132.934 19.1719C133.023 19.1719 133.094 19.101 133.094 19.0113C133.094 18.9216 133.023 18.8508 132.934 18.8508ZM132.934 22.4769C132.844 22.4769 132.774 22.5477 132.774 22.6374C132.774 22.7271 132.844 22.7979 132.934 22.7979C133.023 22.7979 133.094 22.7271 133.094 22.6374C133.094 22.5477 133.023 22.4769 132.934 22.4769ZM131.254 33.3503C131.165 33.3503 131.094 33.4212 131.094 33.5109C131.094 33.6006 131.165 33.6714 131.254 33.6714C131.344 33.6714 131.414 33.6006 131.414 33.5109C131.414 33.4212 131.344 33.3503 131.254 33.3503ZM131.254 31.5373C131.165 31.5373 131.094 31.6081 131.094 31.6978C131.094 31.7875 131.165 31.8584 131.254 31.8584C131.344 31.8584 131.414 31.7875 131.414 31.6978C131.414 31.6081 131.344 31.5373 131.254 31.5373ZM131.254 29.7243C131.165 29.7243 131.094 29.7951 131.094 29.8848C131.094 29.9745 131.165 30.0453 131.254 30.0453C131.344 30.0453 131.414 29.9745 131.414 29.8848C131.414 29.7951 131.344 29.7243 131.254 29.7243ZM131.254 27.9112C131.165 27.9112 131.094 27.9821 131.094 28.0718C131.094 28.1615 131.165 28.2323 131.254 28.2323C131.344 28.2323 131.414 28.1615 131.414 28.0718C131.414 27.9821 131.344 27.9112 131.254 27.9112ZM131.254 35.1586C131.165 35.1586 131.094 35.2295 131.094 35.3192C131.094 35.4089 131.165 35.4797 131.254 35.4797C131.344 35.4797 131.414 35.4089 131.414 35.3192C131.414 35.2295 131.344 35.1586 131.254 35.1586ZM132.934 36.9717C132.844 36.9717 132.774 37.0425 132.774 37.1322C132.774 37.2219 132.844 37.2927 132.934 37.2927C133.023 37.2927 133.094 37.2219 133.094 37.1322C133.094 37.0425 133.023 36.9717 132.934 36.9717ZM131.254 26.0982C131.165 26.0982 131.094 26.169 131.094 26.2587C131.094 26.3484 131.165 26.4193 131.254 26.4193C131.344 26.4193 131.414 26.3484 131.414 26.2587C131.414 26.169 131.344 26.0982 131.254 26.0982ZM131.254 36.9717C131.165 36.9717 131.094 37.0425 131.094 37.1322C131.094 37.2219 131.165 37.2927 131.254 37.2927C131.344 37.2927 131.414 37.2219 131.414 37.1322C131.414 37.0425 131.344 36.9717 131.254 36.9717ZM131.254 40.5977C131.165 40.5977 131.094 40.6686 131.094 40.7583C131.094 40.848 131.165 40.9188 131.254 40.9188C131.344 40.9188 131.414 40.848 131.414 40.7583C131.414 40.6686 131.344 40.5977 131.254 40.5977ZM132.934 40.5977C132.844 40.5977 132.774 40.6686 132.774 40.7583C132.774 40.848 132.844 40.9188 132.934 40.9188C133.023 40.9188 133.094 40.848 133.094 40.7583C133.094 40.6686 133.023 40.5977 132.934 40.5977ZM131.254 17.0425C131.165 17.0425 131.094 17.1133 131.094 17.203C131.094 17.2927 131.165 17.3636 131.254 17.3636C131.344 17.3636 131.414 17.2927 131.414 17.203C131.414 17.1133 131.344 17.0425 131.254 17.0425ZM132.934 38.7847C132.844 38.7847 132.774 38.8555 132.774 38.9452C132.774 39.0349 132.844 39.1058 132.934 39.1058C133.023 39.1058 133.094 39.0349 133.094 38.9452C133.094 38.8555 133.023 38.7847 132.934 38.7847ZM131.254 22.4769C131.165 22.4769 131.094 22.5477 131.094 22.6374C131.094 22.7271 131.165 22.7979 131.254 22.7979C131.344 22.7979 131.414 22.7271 131.414 22.6374C131.414 22.5477 131.344 22.4769 131.254 22.4769ZM131.254 24.2899C131.165 24.2899 131.094 24.3607 131.094 24.4504C131.094 24.5401 131.165 24.611 131.254 24.611C131.344 24.611 131.414 24.5401 131.414 24.4504C131.414 24.3607 131.344 24.2899 131.254 24.2899ZM131.254 20.6638C131.165 20.6638 131.094 20.7347 131.094 20.8244C131.094 20.9141 131.165 20.9849 131.254 20.9849C131.344 20.9849 131.414 20.9141 131.414 20.8244C131.414 20.7347 131.344 20.6638 131.254 20.6638ZM131.254 18.8508C131.165 18.8508 131.094 18.9216 131.094 19.0113C131.094 19.101 131.165 19.1719 131.254 19.1719C131.344 19.1719 131.414 19.101 131.414 19.0113C131.414 18.9216 131.344 18.8508 131.254 18.8508ZM137.967 27.9112C137.877 27.9112 137.807 27.9821 137.807 28.0718C137.807 28.1615 137.877 28.2323 137.967 28.2323C138.056 28.2323 138.127 28.1615 138.127 28.0718C138.127 27.9821 138.056 27.9112 137.967 27.9112ZM137.967 38.7847C137.877 38.7847 137.807 38.8555 137.807 38.9452C137.807 39.0349 137.877 39.1058 137.967 39.1058C138.056 39.1058 138.127 39.0349 138.127 38.9452C138.127 38.8555 138.056 38.7847 137.967 38.7847ZM136.287 24.2899C136.198 24.2899 136.128 24.3607 136.128 24.4504C136.128 24.5401 136.198 24.611 136.287 24.611C136.377 24.611 136.447 24.5401 136.447 24.4504C136.447 24.3607 136.377 24.2899 136.287 24.2899ZM137.967 36.9717C137.877 36.9717 137.807 37.0425 137.807 37.1322C137.807 37.2219 137.877 37.2927 137.967 37.2927C138.056 37.2927 138.127 37.2219 138.127 37.1322C138.127 37.0425 138.056 36.9717 137.967 36.9717ZM136.287 17.0425C136.198 17.0425 136.128 17.1133 136.128 17.203C136.128 17.2927 136.198 17.3636 136.287 17.3636C136.377 17.3636 136.447 17.2927 136.447 17.203C136.447 17.1133 136.377 17.0425 136.287 17.0425ZM136.287 22.4769C136.198 22.4769 136.128 22.5477 136.128 22.6374C136.128 22.7271 136.198 22.7979 136.287 22.7979C136.377 22.7979 136.447 22.7271 136.447 22.6374C136.447 22.5477 136.377 22.4769 136.287 22.4769ZM137.967 35.1586C137.877 35.1586 137.807 35.2295 137.807 35.3192C137.807 35.4089 137.877 35.4797 137.967 35.4797C138.056 35.4797 138.127 35.4089 138.127 35.3192C138.127 35.2295 138.056 35.1586 137.967 35.1586ZM134.608 29.7243C134.519 29.7243 134.448 29.7951 134.448 29.8848C134.448 29.9745 134.519 30.0453 134.608 30.0453C134.698 30.0453 134.768 29.9745 134.768 29.8848C134.768 29.7951 134.698 29.7243 134.608 29.7243ZM136.287 18.8508C136.198 18.8508 136.128 18.9216 136.128 19.0113C136.128 19.101 136.198 19.1719 136.287 19.1719C136.377 19.1719 136.447 19.101 136.447 19.0113C136.447 18.9216 136.377 18.8508 136.287 18.8508ZM137.967 40.593C137.877 40.593 137.807 40.6638 137.807 40.7535C137.807 40.8432 137.877 40.9141 137.967 40.9141C138.056 40.9141 138.127 40.8432 138.127 40.7535C138.127 40.6638 138.056 40.593 137.967 40.593ZM137.967 20.6638C137.877 20.6638 137.807 20.7347 137.807 20.8244C137.807 20.9141 137.877 20.9849 137.967 20.9849C138.056 20.9849 138.127 20.9141 138.127 20.8244C138.127 20.7347 138.056 20.6638 137.967 20.6638ZM137.967 22.4769C137.877 22.4769 137.807 22.5477 137.807 22.6374C137.807 22.7271 137.877 22.7979 137.967 22.7979C138.056 22.7979 138.127 22.7271 138.127 22.6374C138.127 22.5477 138.056 22.4769 137.967 22.4769ZM137.967 24.2899C137.877 24.2899 137.807 24.3607 137.807 24.4504C137.807 24.5401 137.877 24.611 137.967 24.611C138.056 24.611 138.127 24.5401 138.127 24.4504C138.127 24.3607 138.056 24.2899 137.967 24.2899ZM129.575 17.0425C129.486 17.0425 129.415 17.1133 129.415 17.203C129.415 17.2927 129.486 17.3636 129.575 17.3636C129.665 17.3636 129.735 17.2927 129.735 17.203C129.735 17.1133 129.665 17.0425 129.575 17.0425ZM137.967 29.7243C137.877 29.7243 137.807 29.7951 137.807 29.8848C137.807 29.9745 137.877 30.0453 137.967 30.0453C138.056 30.0453 138.127 29.9745 138.127 29.8848C138.127 29.7951 138.056 29.7243 137.967 29.7243ZM137.967 31.5373C137.877 31.5373 137.807 31.6081 137.807 31.6978C137.807 31.7875 137.877 31.8584 137.967 31.8584C138.056 31.8584 138.127 31.7875 138.127 31.6978C138.127 31.6081 138.056 31.5373 137.967 31.5373ZM137.967 33.3503C137.877 33.3503 137.807 33.4212 137.807 33.5109C137.807 33.6006 137.877 33.6714 137.967 33.6714C138.056 33.6714 138.127 33.6006 138.127 33.5109C138.127 33.4212 138.056 33.3503 137.967 33.3503ZM137.967 26.1029C137.877 26.1029 137.807 26.1737 137.807 26.2635C137.807 26.3532 137.877 26.424 137.967 26.424C138.056 26.424 138.127 26.3532 138.127 26.2635C138.127 26.1737 138.056 26.1029 137.967 26.1029ZM136.287 20.6686C136.198 20.6686 136.128 20.7394 136.128 20.8291C136.128 20.9188 136.198 20.9896 136.287 20.9896C136.377 20.9896 136.447 20.9188 136.447 20.8291C136.447 20.7394 136.377 20.6686 136.287 20.6686ZM134.608 20.6686C134.519 20.6686 134.448 20.7394 134.448 20.8291C134.448 20.9188 134.519 20.9896 134.608 20.9896C134.698 20.9896 134.768 20.9188 134.768 20.8291C134.768 20.7394 134.698 20.6686 134.608 20.6686ZM134.608 18.8555C134.519 18.8555 134.448 18.9263 134.448 19.0161C134.448 19.1058 134.519 19.1766 134.608 19.1766C134.698 19.1766 134.768 19.1058 134.768 19.0161C134.768 18.9263 134.698 18.8555 134.608 18.8555ZM134.608 22.4816C134.519 22.4816 134.448 22.5524 134.448 22.6421C134.448 22.7318 134.519 22.8026 134.608 22.8026C134.698 22.8026 134.768 22.7318 134.768 22.6421C134.768 22.5524 134.698 22.4816 134.608 22.4816ZM134.608 17.0472C134.519 17.0472 134.448 17.118 134.448 17.2077C134.448 17.2975 134.519 17.3683 134.608 17.3683C134.698 17.3683 134.768 17.2975 134.768 17.2077C134.768 17.118 134.698 17.0472 134.608 17.0472ZM134.608 27.9207C134.519 27.9207 134.448 27.9915 134.448 28.0812C134.448 28.1709 134.519 28.2417 134.608 28.2417C134.698 28.2417 134.768 28.1709 134.768 28.0812C134.768 27.9915 134.698 27.9207 134.608 27.9207ZM134.608 24.2946C134.519 24.2946 134.448 24.3654 134.448 24.4551C134.448 24.5449 134.519 24.6157 134.608 24.6157C134.698 24.6157 134.768 24.5449 134.768 24.4551C134.768 24.3654 134.698 24.2946 134.608 24.2946ZM136.287 40.6025C136.198 40.6025 136.128 40.6733 136.128 40.763C136.128 40.8527 136.198 40.9235 136.287 40.9235C136.377 40.9235 136.447 40.8527 136.447 40.763C136.447 40.6733 136.377 40.6025 136.287 40.6025ZM134.608 26.1076C134.519 26.1076 134.448 26.1785 134.448 26.2682C134.448 26.3579 134.519 26.4287 134.608 26.4287C134.698 26.4287 134.768 26.3579 134.768 26.2682C134.768 26.1785 134.698 26.1076 134.608 26.1076ZM136.287 35.1681C136.198 35.1681 136.128 35.2389 136.128 35.3286C136.128 35.4183 136.198 35.4891 136.287 35.4891C136.377 35.4891 136.447 35.4183 136.447 35.3286C136.447 35.2389 136.377 35.1681 136.287 35.1681ZM136.287 31.542C136.198 31.542 136.128 31.6128 136.128 31.7025C136.128 31.7923 136.198 31.8631 136.287 31.8631C136.377 31.8631 136.447 31.7923 136.447 31.7025C136.447 31.6128 136.377 31.542 136.287 31.542ZM136.287 38.7894C136.198 38.7894 136.128 38.8602 136.128 38.95C136.128 39.0397 136.198 39.1105 136.287 39.1105C136.377 39.1105 136.447 39.0397 136.447 38.95C136.447 38.8602 136.377 38.7894 136.287 38.7894ZM136.287 27.916C136.198 27.916 136.128 27.9868 136.128 28.0765C136.128 28.1662 136.198 28.237 136.287 28.237C136.377 28.237 136.447 28.1662 136.447 28.0765C136.447 27.9868 136.377 27.916 136.287 27.916ZM136.287 29.729C136.198 29.729 136.128 29.7998 136.128 29.8895C136.128 29.9792 136.198 30.05 136.287 30.05C136.377 30.05 136.447 29.9792 136.447 29.8895C136.447 29.7998 136.377 29.729 136.287 29.729ZM136.287 33.3551C136.198 33.3551 136.128 33.4259 136.128 33.5156C136.128 33.6053 136.198 33.6761 136.287 33.6761C136.377 33.6761 136.447 33.6053 136.447 33.5156C136.447 33.4259 136.377 33.3551 136.287 33.3551ZM136.287 36.9811C136.198 36.9811 136.128 37.0519 136.128 37.1416C136.128 37.2314 136.198 37.3022 136.287 37.3022C136.377 37.3022 136.447 37.2314 136.447 37.1416C136.447 37.0519 136.377 36.9811 136.287 36.9811ZM136.287 26.1076C136.198 26.1076 136.128 26.1785 136.128 26.2682C136.128 26.3579 136.198 26.4287 136.287 26.4287C136.377 26.4287 136.447 26.3579 136.447 26.2682C136.447 26.1785 136.377 26.1076 136.287 26.1076ZM131.254 38.7894C131.165 38.7894 131.094 38.8602 131.094 38.95C131.094 39.0397 131.165 39.1105 131.254 39.1105C131.344 39.1105 131.414 39.0397 131.414 38.95C131.414 38.8602 131.344 38.7894 131.254 38.7894ZM124.542 26.1076C124.453 26.1076 124.382 26.1785 124.382 26.2682C124.382 26.3579 124.453 26.4287 124.542 26.4287C124.631 26.4287 124.702 26.3579 124.702 26.2682C124.702 26.1785 124.631 26.1076 124.542 26.1076ZM124.542 27.9207C124.453 27.9207 124.382 27.9915 124.382 28.0812C124.382 28.1709 124.453 28.2417 124.542 28.2417C124.631 28.2417 124.702 28.1709 124.702 28.0812C124.702 27.9915 124.631 27.9207 124.542 27.9207ZM124.542 29.7337C124.453 29.7337 124.382 29.8045 124.382 29.8942C124.382 29.9839 124.453 30.0548 124.542 30.0548C124.631 30.0548 124.702 29.9839 124.702 29.8942C124.702 29.8045 124.631 29.7337 124.542 29.7337ZM124.542 22.4863C124.453 22.4863 124.382 22.5571 124.382 22.6468C124.382 22.7365 124.453 22.8074 124.542 22.8074C124.631 22.8074 124.702 22.7365 124.702 22.6468C124.702 22.5571 124.631 22.4863 124.542 22.4863ZM124.542 24.2993C124.453 24.2993 124.382 24.3702 124.382 24.4599C124.382 24.5496 124.453 24.6204 124.542 24.6204C124.631 24.6204 124.702 24.5496 124.702 24.4599C124.702 24.3702 124.631 24.2993 124.542 24.2993ZM124.542 31.5467C124.453 31.5467 124.382 31.6176 124.382 31.7073C124.382 31.797 124.453 31.8678 124.542 31.8678C124.631 31.8678 124.702 31.797 124.702 31.7073C124.702 31.6176 124.631 31.5467 124.542 31.5467ZM124.542 35.1728C124.453 35.1728 124.382 35.2436 124.382 35.3333C124.382 35.423 124.453 35.4939 124.542 35.4939C124.631 35.4939 124.702 35.423 124.702 35.3333C124.702 35.2436 124.631 35.1728 124.542 35.1728ZM124.542 33.3598C124.453 33.3598 124.382 33.4306 124.382 33.5203C124.382 33.61 124.453 33.6808 124.542 33.6808C124.631 33.6808 124.702 33.61 124.702 33.5203C124.702 33.4306 124.631 33.3598 124.542 33.3598ZM126.221 35.1728C126.132 35.1728 126.061 35.2436 126.061 35.3333C126.061 35.423 126.132 35.4939 126.221 35.4939C126.311 35.4939 126.381 35.423 126.381 35.3333C126.381 35.2436 126.311 35.1728 126.221 35.1728ZM124.542 36.9858C124.453 36.9858 124.382 37.0567 124.382 37.1464C124.382 37.2361 124.453 37.3069 124.542 37.3069C124.631 37.3069 124.702 37.2361 124.702 37.1464C124.702 37.0567 124.631 36.9858 124.542 36.9858ZM126.221 36.9858C126.132 36.9858 126.061 37.0567 126.061 37.1464C126.061 37.2361 126.132 37.3069 126.221 37.3069C126.311 37.3069 126.381 37.2361 126.381 37.1464C126.381 37.0567 126.311 36.9858 126.221 36.9858ZM126.221 33.3598C126.132 33.3598 126.061 33.4306 126.061 33.5203C126.061 33.61 126.132 33.6808 126.221 33.6808C126.311 33.6808 126.381 33.61 126.381 33.5203C126.381 33.4306 126.311 33.3598 126.221 33.3598ZM126.221 38.7941C126.132 38.7941 126.061 38.865 126.061 38.9547C126.061 39.0444 126.132 39.1152 126.221 39.1152C126.311 39.1152 126.381 39.0444 126.381 38.9547C126.381 38.865 126.311 38.7941 126.221 38.7941ZM124.542 20.6733C124.453 20.6733 124.382 20.7441 124.382 20.8338C124.382 20.9235 124.453 20.9943 124.542 20.9943C124.631 20.9943 124.702 20.9235 124.702 20.8338C124.702 20.7441 124.631 20.6733 124.542 20.6733ZM126.221 40.6025C126.132 40.6025 126.061 40.6733 126.061 40.763C126.061 40.8527 126.132 40.9235 126.221 40.9235C126.311 40.9235 126.381 40.8527 126.381 40.763C126.381 40.6733 126.311 40.6025 126.221 40.6025ZM124.542 18.8602C124.453 18.8602 124.382 18.9311 124.382 19.0208C124.382 19.1105 124.453 19.1813 124.542 19.1813C124.631 19.1813 124.702 19.1105 124.702 19.0208C124.702 18.9311 124.631 18.8602 124.542 18.8602ZM124.542 17.0472C124.453 17.0472 124.382 17.118 124.382 17.2077C124.382 17.2975 124.453 17.3683 124.542 17.3683C124.631 17.3683 124.702 17.2975 124.702 17.2077C124.702 17.118 124.631 17.0472 124.542 17.0472ZM122.863 38.7894C122.773 38.7894 122.703 38.8602 122.703 38.95C122.703 39.0397 122.773 39.1105 122.863 39.1105C122.952 39.1105 123.023 39.0397 123.023 38.95C123.023 38.8602 122.952 38.7894 122.863 38.7894ZM124.542 38.7894C124.453 38.7894 124.382 38.8602 124.382 38.95C124.382 39.0397 124.453 39.1105 124.542 39.1105C124.631 39.1105 124.702 39.0397 124.702 38.95C124.702 38.8602 124.631 38.7894 124.542 38.7894ZM122.863 33.3551C122.773 33.3551 122.703 33.4259 122.703 33.5156C122.703 33.6053 122.773 33.6761 122.863 33.6761C122.952 33.6761 123.023 33.6053 123.023 33.5156C123.023 33.4259 122.952 33.3551 122.863 33.3551ZM122.863 29.729C122.773 29.729 122.703 29.7998 122.703 29.8895C122.703 29.9792 122.773 30.05 122.863 30.05C122.952 30.05 123.023 29.9792 123.023 29.8895C123.023 29.7998 122.952 29.729 122.863 29.729ZM122.863 31.542C122.773 31.542 122.703 31.6128 122.703 31.7025C122.703 31.7923 122.773 31.8631 122.863 31.8631C122.952 31.8631 123.023 31.7923 123.023 31.7025C123.023 31.6128 122.952 31.542 122.863 31.542ZM122.863 35.1681C122.773 35.1681 122.703 35.2389 122.703 35.3286C122.703 35.4183 122.773 35.4891 122.863 35.4891C122.952 35.4891 123.023 35.4183 123.023 35.3286C123.023 35.2389 122.952 35.1681 122.863 35.1681ZM126.221 31.542C126.132 31.542 126.061 31.6128 126.061 31.7025C126.061 31.7923 126.132 31.8631 126.221 31.8631C126.311 31.8631 126.381 31.7923 126.381 31.7025C126.381 31.6128 126.311 31.542 126.221 31.542ZM137.967 18.8602C137.877 18.8602 137.807 18.9311 137.807 19.0208C137.807 19.1105 137.877 19.1813 137.967 19.1813C138.056 19.1813 138.127 19.1105 138.127 19.0208C138.127 18.9311 138.056 18.8602 137.967 18.8602ZM122.863 40.6025C122.773 40.6025 122.703 40.6733 122.703 40.763C122.703 40.8527 122.773 40.9235 122.863 40.9235C122.952 40.9235 123.023 40.8527 123.023 40.763C123.023 40.6733 122.952 40.6025 122.863 40.6025ZM122.863 36.9764C122.773 36.9764 122.703 37.0472 122.703 37.1369C122.703 37.2266 122.773 37.2975 122.863 37.2975C122.952 37.2975 123.023 37.2266 123.023 37.1369C123.023 37.0472 122.952 36.9764 122.863 36.9764ZM122.863 17.0472C122.773 17.0472 122.703 17.118 122.703 17.2077C122.703 17.2975 122.773 17.3683 122.863 17.3683C122.952 17.3683 123.023 17.2975 123.023 17.2077C123.023 17.118 122.952 17.0472 122.863 17.0472ZM122.863 18.8602C122.773 18.8602 122.703 18.9311 122.703 19.0208C122.703 19.1105 122.773 19.1813 122.863 19.1813C122.952 19.1813 123.023 19.1105 123.023 19.0208C123.023 18.9311 122.952 18.8602 122.863 18.8602ZM122.863 20.6733C122.773 20.6733 122.703 20.7441 122.703 20.8338C122.703 20.9235 122.773 20.9943 122.863 20.9943C122.952 20.9943 123.023 20.9235 123.023 20.8338C123.023 20.7441 122.952 20.6733 122.863 20.6733ZM124.542 40.6025C124.453 40.6025 124.382 40.6733 124.382 40.763C124.382 40.8527 124.453 40.9235 124.542 40.9235C124.631 40.9235 124.702 40.8527 124.702 40.763C124.702 40.6733 124.631 40.6025 124.542 40.6025ZM122.863 22.4816C122.773 22.4816 122.703 22.5524 122.703 22.6421C122.703 22.7318 122.773 22.8026 122.863 22.8026C122.952 22.8026 123.023 22.7318 123.023 22.6421C123.023 22.5524 122.952 22.4816 122.863 22.4816ZM122.863 26.1076C122.773 26.1076 122.703 26.1785 122.703 26.2682C122.703 26.3579 122.773 26.4287 122.863 26.4287C122.952 26.4287 123.023 26.3579 123.023 26.2682C123.023 26.1785 122.952 26.1076 122.863 26.1076ZM122.863 24.2946C122.773 24.2946 122.703 24.3654 122.703 24.4551C122.703 24.5449 122.773 24.6157 122.863 24.6157C122.952 24.6157 123.023 24.5449 123.023 24.4551C123.023 24.3654 122.952 24.2946 122.863 24.2946ZM122.863 27.9207C122.773 27.9207 122.703 27.9915 122.703 28.0812C122.703 28.1709 122.773 28.2417 122.863 28.2417C122.952 28.2417 123.023 28.1709 123.023 28.0812C123.023 27.9915 122.952 27.9207 122.863 27.9207ZM126.221 18.8602C126.132 18.8602 126.061 18.9311 126.061 19.0208C126.061 19.1105 126.132 19.1813 126.221 19.1813C126.311 19.1813 126.381 19.1105 126.381 19.0208C126.381 18.9311 126.311 18.8602 126.221 18.8602ZM129.58 40.6025C129.49 40.6025 129.42 40.6733 129.42 40.763C129.42 40.8527 129.49 40.9235 129.58 40.9235C129.669 40.9235 129.74 40.8527 129.74 40.763C129.74 40.6733 129.669 40.6025 129.58 40.6025ZM129.58 38.7894C129.49 38.7894 129.42 38.8602 129.42 38.95C129.42 39.0397 129.49 39.1105 129.58 39.1105C129.669 39.1105 129.74 39.0397 129.74 38.95C129.74 38.8602 129.669 38.7894 129.58 38.7894ZM129.58 36.9764C129.49 36.9764 129.42 37.0472 129.42 37.1369C129.42 37.2266 129.49 37.2975 129.58 37.2975C129.669 37.2975 129.74 37.2266 129.74 37.1369C129.74 37.0472 129.669 36.9764 129.58 36.9764ZM127.901 17.0472C127.811 17.0472 127.741 17.118 127.741 17.2077C127.741 17.2975 127.811 17.3683 127.901 17.3683C127.99 17.3683 128.06 17.2975 128.06 17.2077C128.06 17.118 127.99 17.0472 127.901 17.0472ZM129.58 35.1681C129.49 35.1681 129.42 35.2389 129.42 35.3286C129.42 35.4183 129.49 35.4891 129.58 35.4891C129.669 35.4891 129.74 35.4183 129.74 35.3286C129.74 35.2389 129.669 35.1681 129.58 35.1681ZM127.901 22.4863C127.811 22.4863 127.741 22.5571 127.741 22.6468C127.741 22.7365 127.811 22.8074 127.901 22.8074C127.99 22.8074 128.06 22.7365 128.06 22.6468C128.06 22.5571 127.99 22.4863 127.901 22.4863ZM127.901 18.8602C127.811 18.8602 127.741 18.9311 127.741 19.0208C127.741 19.1105 127.811 19.1813 127.901 19.1813C127.99 19.1813 128.06 19.1105 128.06 19.0208C128.06 18.9311 127.99 18.8602 127.901 18.8602ZM127.901 24.2946C127.811 24.2946 127.741 24.3654 127.741 24.4551C127.741 24.5449 127.811 24.6157 127.901 24.6157C127.99 24.6157 128.06 24.5449 128.06 24.4551C128.06 24.3654 127.99 24.2946 127.901 24.2946ZM127.901 20.6686C127.811 20.6686 127.741 20.7394 127.741 20.8291C127.741 20.9188 127.811 20.9896 127.901 20.9896C127.99 20.9896 128.06 20.9188 128.06 20.8291C128.06 20.7394 127.99 20.6686 127.901 20.6686ZM129.58 24.2946C129.49 24.2946 129.42 24.3654 129.42 24.4551C129.42 24.5449 129.49 24.6157 129.58 24.6157C129.669 24.6157 129.74 24.5449 129.74 24.4551C129.74 24.3654 129.669 24.2946 129.58 24.2946ZM129.58 26.1076C129.49 26.1076 129.42 26.1785 129.42 26.2682C129.42 26.3579 129.49 26.4287 129.58 26.4287C129.669 26.4287 129.74 26.3579 129.74 26.2682C129.74 26.1785 129.669 26.1076 129.58 26.1076ZM129.58 22.4816C129.49 22.4816 129.42 22.5524 129.42 22.6421C129.42 22.7318 129.49 22.8026 129.58 22.8026C129.669 22.8026 129.74 22.7318 129.74 22.6421C129.74 22.5524 129.669 22.4816 129.58 22.4816ZM129.58 20.6686C129.49 20.6686 129.42 20.7394 129.42 20.8291C129.42 20.9188 129.49 20.9896 129.58 20.9896C129.669 20.9896 129.74 20.9188 129.74 20.8291C129.74 20.7394 129.669 20.6686 129.58 20.6686ZM129.58 31.542C129.49 31.542 129.42 31.6128 129.42 31.7025C129.42 31.7923 129.49 31.8631 129.58 31.8631C129.669 31.8631 129.74 31.7923 129.74 31.7025C129.74 31.6128 129.669 31.542 129.58 31.542ZM129.58 27.916C129.49 27.916 129.42 27.9868 129.42 28.0765C129.42 28.1662 129.49 28.237 129.58 28.237C129.669 28.237 129.74 28.1662 129.74 28.0765C129.74 27.9868 129.669 27.916 129.58 27.916ZM129.58 33.3503C129.49 33.3503 129.42 33.4212 129.42 33.5109C129.42 33.6006 129.49 33.6714 129.58 33.6714C129.669 33.6714 129.74 33.6006 129.74 33.5109C129.74 33.4212 129.669 33.3503 129.58 33.3503ZM126.221 29.7243C126.132 29.7243 126.061 29.7951 126.061 29.8848C126.061 29.9745 126.132 30.0453 126.221 30.0453C126.311 30.0453 126.381 29.9745 126.381 29.8848C126.381 29.7951 126.311 29.7243 126.221 29.7243ZM129.58 29.7243C129.49 29.7243 129.42 29.7951 129.42 29.8848C129.42 29.9745 129.49 30.0453 129.58 30.0453C129.669 30.0453 129.74 29.9745 129.74 29.8848C129.74 29.7951 129.669 29.7243 129.58 29.7243ZM126.221 22.4769C126.132 22.4769 126.061 22.5477 126.061 22.6374C126.061 22.7271 126.132 22.7979 126.221 22.7979C126.311 22.7979 126.381 22.7271 126.381 22.6374C126.381 22.5477 126.311 22.4769 126.221 22.4769ZM129.58 18.8508C129.49 18.8508 129.42 18.9216 129.42 19.0113C129.42 19.101 129.49 19.1719 129.58 19.1719C129.669 19.1719 129.74 19.101 129.74 19.0113C129.74 18.9216 129.669 18.8508 129.58 18.8508ZM127.901 40.593C127.811 40.593 127.741 40.6638 127.741 40.7535C127.741 40.8432 127.811 40.9141 127.901 40.9141C127.99 40.9141 128.06 40.8432 128.06 40.7535C128.06 40.6638 127.99 40.593 127.901 40.593ZM126.221 17.0378C126.132 17.0378 126.061 17.1086 126.061 17.1983C126.061 17.288 126.132 17.3588 126.221 17.3588C126.311 17.3588 126.381 17.288 126.381 17.1983C126.381 17.1086 126.311 17.0378 126.221 17.0378ZM126.221 20.6638C126.132 20.6638 126.061 20.7347 126.061 20.8244C126.061 20.9141 126.132 20.9849 126.221 20.9849C126.311 20.9849 126.381 20.9141 126.381 20.8244C126.381 20.7347 126.311 20.6638 126.221 20.6638ZM126.221 27.9112C126.132 27.9112 126.061 27.9821 126.061 28.0718C126.061 28.1615 126.132 28.2323 126.221 28.2323C126.311 28.2323 126.381 28.1615 126.381 28.0718C126.381 27.9821 126.311 27.9112 126.221 27.9112ZM126.221 26.0982C126.132 26.0982 126.061 26.169 126.061 26.2587C126.061 26.3484 126.132 26.4193 126.221 26.4193C126.311 26.4193 126.381 26.3484 126.381 26.2587C126.381 26.169 126.311 26.0982 126.221 26.0982ZM127.901 26.0982C127.811 26.0982 127.741 26.169 127.741 26.2587C127.741 26.3484 127.811 26.4193 127.901 26.4193C127.99 26.4193 128.06 26.3484 128.06 26.2587C128.06 26.169 127.99 26.0982 127.901 26.0982ZM126.221 24.2852C126.132 24.2852 126.061 24.356 126.061 24.4457C126.061 24.5354 126.132 24.6062 126.221 24.6062C126.311 24.6062 126.381 24.5354 126.381 24.4457C126.381 24.356 126.311 24.2852 126.221 24.2852ZM127.901 29.7195C127.811 29.7195 127.741 29.7904 127.741 29.8801C127.741 29.9698 127.811 30.0406 127.901 30.0406C127.99 30.0406 128.06 29.9698 128.06 29.8801C128.06 29.7904 127.99 29.7195 127.901 29.7195ZM127.901 27.9065C127.811 27.9065 127.741 27.9773 127.741 28.067C127.741 28.1568 127.811 28.2276 127.901 28.2276C127.99 28.2276 128.06 28.1568 128.06 28.067C128.06 27.9773 127.99 27.9065 127.901 27.9065ZM127.901 31.5326C127.811 31.5326 127.741 31.6034 127.741 31.6931C127.741 31.7828 127.811 31.8536 127.901 31.8536C127.99 31.8536 128.06 31.7828 128.06 31.6931C128.06 31.6034 127.99 31.5326 127.901 31.5326ZM127.901 36.967C127.811 36.967 127.741 37.0378 127.741 37.1275C127.741 37.2172 127.811 37.288 127.901 37.288C127.99 37.288 128.06 37.2172 128.06 37.1275C128.06 37.0378 127.99 36.967 127.901 36.967ZM127.901 33.3409C127.811 33.3409 127.741 33.4117 127.741 33.5014C127.741 33.5911 127.811 33.6619 127.901 33.6619C127.99 33.6619 128.06 33.5911 128.06 33.5014C128.06 33.4117 127.99 33.3409 127.901 33.3409ZM127.901 38.7753C127.811 38.7753 127.741 38.8461 127.741 38.9358C127.741 39.0255 127.811 39.0963 127.901 39.0963C127.99 39.0963 128.06 39.0255 128.06 38.9358C128.06 38.8461 127.99 38.7753 127.901 38.7753ZM127.901 35.1492C127.811 35.1492 127.741 35.22 127.741 35.3097C127.741 35.3994 127.811 35.4703 127.901 35.4703C127.99 35.4703 128.06 35.3994 128.06 35.3097C128.06 35.22 127.99 35.1492 127.901 35.1492ZM143.005 36.9622C142.915 36.9622 142.845 37.033 142.845 37.1228C142.845 37.2125 142.915 37.2833 143.005 37.2833C143.094 37.2833 143.164 37.2125 143.164 37.1228C143.164 37.033 143.094 36.9622 143.005 36.9622ZM149.717 24.2805C149.628 24.2805 149.557 24.3513 149.557 24.441C149.557 24.5307 149.628 24.6015 149.717 24.6015C149.806 24.6015 149.877 24.5307 149.877 24.441C149.877 24.3513 149.806 24.2805 149.717 24.2805ZM149.717 26.0935C149.628 26.0935 149.557 26.1643 149.557 26.254C149.557 26.3437 149.628 26.4145 149.717 26.4145C149.806 26.4145 149.877 26.3437 149.877 26.254C149.877 26.1643 149.806 26.0935 149.717 26.0935ZM149.717 18.8461C149.628 18.8461 149.557 18.9169 149.557 19.0066C149.557 19.0963 149.628 19.1671 149.717 19.1671C149.806 19.1671 149.877 19.0963 149.877 19.0066C149.877 18.9169 149.806 18.8461 149.717 18.8461ZM149.717 20.6591C149.628 20.6591 149.557 20.7299 149.557 20.8196C149.557 20.9093 149.628 20.9802 149.717 20.9802C149.806 20.9802 149.877 20.9093 149.877 20.8196C149.877 20.7299 149.806 20.6591 149.717 20.6591ZM149.717 22.4721C149.628 22.4721 149.557 22.543 149.557 22.6327C149.557 22.7224 149.628 22.7932 149.717 22.7932C149.806 22.7932 149.877 22.7224 149.877 22.6327C149.877 22.543 149.806 22.4721 149.717 22.4721ZM149.717 27.9065C149.628 27.9065 149.557 27.9773 149.557 28.067C149.557 28.1568 149.628 28.2276 149.717 28.2276C149.806 28.2276 149.877 28.1568 149.877 28.067C149.877 27.9773 149.806 27.9065 149.717 27.9065ZM149.717 31.5326C149.628 31.5326 149.557 31.6034 149.557 31.6931C149.557 31.7828 149.628 31.8536 149.717 31.8536C149.806 31.8536 149.877 31.7828 149.877 31.6931C149.877 31.6034 149.806 31.5326 149.717 31.5326ZM149.717 29.7195C149.628 29.7195 149.557 29.7904 149.557 29.8801C149.557 29.9698 149.628 30.0406 149.717 30.0406C149.806 30.0406 149.877 29.9698 149.877 29.8801C149.877 29.7904 149.806 29.7195 149.717 29.7195ZM149.717 33.3456C149.628 33.3456 149.557 33.4164 149.557 33.5061C149.557 33.5958 149.628 33.6667 149.717 33.6667C149.806 33.6667 149.877 33.5958 149.877 33.5061C149.877 33.4164 149.806 33.3456 149.717 33.3456ZM151.396 31.5326C151.307 31.5326 151.236 31.6034 151.236 31.6931C151.236 31.7828 151.307 31.8536 151.396 31.8536C151.486 31.8536 151.556 31.7828 151.556 31.6931C151.556 31.6034 151.486 31.5326 151.396 31.5326ZM151.396 35.1586C151.307 35.1586 151.236 35.2295 151.236 35.3192C151.236 35.4089 151.307 35.4797 151.396 35.4797C151.486 35.4797 151.556 35.4089 151.556 35.3192C151.556 35.2295 151.486 35.1586 151.396 35.1586ZM151.396 33.3456C151.307 33.3456 151.236 33.4164 151.236 33.5061C151.236 33.5958 151.307 33.6667 151.396 33.6667C151.486 33.6667 151.556 33.5958 151.556 33.5061C151.556 33.4164 151.486 33.3456 151.396 33.3456ZM149.717 17.0378C149.628 17.0378 149.557 17.1086 149.557 17.1983C149.557 17.288 149.628 17.3588 149.717 17.3588C149.806 17.3588 149.877 17.288 149.877 17.1983C149.877 17.1086 149.806 17.0378 149.717 17.0378ZM151.396 29.7195C151.307 29.7195 151.236 29.7904 151.236 29.8801C151.236 29.9698 151.307 30.0406 151.396 30.0406C151.486 30.0406 151.556 29.9698 151.556 29.8801C151.556 29.7904 151.486 29.7195 151.396 29.7195ZM151.396 27.9065C151.307 27.9065 151.236 27.9773 151.236 28.067C151.236 28.1568 151.307 28.2276 151.396 28.2276C151.486 28.2276 151.556 28.1568 151.556 28.067C151.556 27.9773 151.486 27.9065 151.396 27.9065ZM151.396 38.78C151.307 38.78 151.236 38.8508 151.236 38.9405C151.236 39.0302 151.307 39.101 151.396 39.101C151.486 39.101 151.556 39.0302 151.556 38.9405C151.556 38.8508 151.486 38.78 151.396 38.78ZM151.396 36.967C151.307 36.967 151.236 37.0378 151.236 37.1275C151.236 37.2172 151.307 37.288 151.396 37.288C151.486 37.288 151.556 37.2172 151.556 37.1275C151.556 37.0378 151.486 36.967 151.396 36.967ZM151.396 40.593C151.307 40.593 151.236 40.6638 151.236 40.7535C151.236 40.8432 151.307 40.9141 151.396 40.9141C151.486 40.9141 151.556 40.8432 151.556 40.7535C151.556 40.6638 151.486 40.593 151.396 40.593ZM148.038 33.3456C147.948 33.3456 147.878 33.4164 147.878 33.5061C147.878 33.5958 147.948 33.6667 148.038 33.6667C148.127 33.6667 148.198 33.5958 148.198 33.5061C148.198 33.4164 148.127 33.3456 148.038 33.3456ZM148.038 29.7195C147.948 29.7195 147.878 29.7904 147.878 29.8801C147.878 29.9698 147.948 30.0406 148.038 30.0406C148.127 30.0406 148.198 29.9698 148.198 29.8801C148.198 29.7904 148.127 29.7195 148.038 29.7195ZM148.038 31.5326C147.948 31.5326 147.878 31.6034 147.878 31.6931C147.878 31.7828 147.948 31.8536 148.038 31.8536C148.127 31.8536 148.198 31.7828 148.198 31.6931C148.198 31.6034 148.127 31.5326 148.038 31.5326ZM148.038 27.9065C147.948 27.9065 147.878 27.9773 147.878 28.067C147.878 28.1568 147.948 28.2276 148.038 28.2276C148.127 28.2276 148.198 28.1568 148.198 28.067C148.198 27.9773 148.127 27.9065 148.038 27.9065ZM148.038 38.78C147.948 38.78 147.878 38.8508 147.878 38.9405C147.878 39.0302 147.948 39.101 148.038 39.101C148.127 39.101 148.198 39.0302 148.198 38.9405C148.198 38.8508 148.127 38.78 148.038 38.78ZM148.038 26.0982C147.948 26.0982 147.878 26.169 147.878 26.2587C147.878 26.3484 147.948 26.4193 148.038 26.4193C148.127 26.4193 148.198 26.3484 148.198 26.2587C148.198 26.169 148.127 26.0982 148.038 26.0982ZM148.038 36.9717C147.948 36.9717 147.878 37.0425 147.878 37.1322C147.878 37.2219 147.948 37.2927 148.038 37.2927C148.127 37.2927 148.198 37.2219 148.198 37.1322C148.198 37.0425 148.127 36.9717 148.038 36.9717ZM148.038 35.1586C147.948 35.1586 147.878 35.2295 147.878 35.3192C147.878 35.4089 147.948 35.4797 148.038 35.4797C148.127 35.4797 148.198 35.4089 148.198 35.3192C148.198 35.2295 148.127 35.1586 148.038 35.1586ZM148.038 22.4769C147.948 22.4769 147.878 22.5477 147.878 22.6374C147.878 22.7271 147.948 22.7979 148.038 22.7979C148.127 22.7979 148.198 22.7271 148.198 22.6374C148.198 22.5477 148.127 22.4769 148.038 22.4769ZM149.717 40.5977C149.628 40.5977 149.557 40.6686 149.557 40.7583C149.557 40.848 149.628 40.9188 149.717 40.9188C149.806 40.9188 149.877 40.848 149.877 40.7583C149.877 40.6686 149.806 40.5977 149.717 40.5977ZM149.717 38.7847C149.628 38.7847 149.557 38.8555 149.557 38.9452C149.557 39.0349 149.628 39.1058 149.717 39.1058C149.806 39.1058 149.877 39.0349 149.877 38.9452C149.877 38.8555 149.806 38.7847 149.717 38.7847ZM149.717 36.9717C149.628 36.9717 149.557 37.0425 149.557 37.1322C149.557 37.2219 149.628 37.2927 149.717 37.2927C149.806 37.2927 149.877 37.2219 149.877 37.1322C149.877 37.0425 149.806 36.9717 149.717 36.9717ZM148.038 17.0425C147.948 17.0425 147.878 17.1133 147.878 17.203C147.878 17.2927 147.948 17.3636 148.038 17.3636C148.127 17.3636 148.198 17.2927 148.198 17.203C148.198 17.1133 148.127 17.0425 148.038 17.0425ZM148.038 24.2899C147.948 24.2899 147.878 24.3607 147.878 24.4504C147.878 24.5401 147.948 24.611 148.038 24.611C148.127 24.611 148.198 24.5401 148.198 24.4504C148.198 24.3607 148.127 24.2899 148.038 24.2899ZM149.717 35.1634C149.628 35.1634 149.557 35.2342 149.557 35.3239C149.557 35.4136 149.628 35.4844 149.717 35.4844C149.806 35.4844 149.877 35.4136 149.877 35.3239C149.877 35.2342 149.806 35.1634 149.717 35.1634ZM148.038 18.8555C147.948 18.8555 147.878 18.9263 147.878 19.0161C147.878 19.1058 147.948 19.1766 148.038 19.1766C148.127 19.1766 148.198 19.1058 148.198 19.0161C148.198 18.9263 148.127 18.8555 148.038 18.8555ZM148.038 20.6686C147.948 20.6686 147.878 20.7394 147.878 20.8291C147.878 20.9188 147.948 20.9896 148.038 20.9896C148.127 20.9896 148.198 20.9188 148.198 20.8291C148.198 20.7394 148.127 20.6686 148.038 20.6686ZM153.071 20.6686C152.981 20.6686 152.911 20.7394 152.911 20.8291C152.911 20.9188 152.981 20.9896 153.071 20.9896C153.16 20.9896 153.231 20.9188 153.231 20.8291C153.231 20.7394 153.16 20.6686 153.071 20.6686ZM154.75 36.9764C154.661 36.9764 154.59 37.0472 154.59 37.1369C154.59 37.2266 154.661 37.2975 154.75 37.2975C154.839 37.2975 154.91 37.2266 154.91 37.1369C154.91 37.0472 154.839 36.9764 154.75 36.9764ZM154.75 38.7894C154.661 38.7894 154.59 38.8602 154.59 38.95C154.59 39.0397 154.661 39.1105 154.75 39.1105C154.839 39.1105 154.91 39.0397 154.91 38.95C154.91 38.8602 154.839 38.7894 154.75 38.7894ZM154.75 35.1634C154.661 35.1634 154.59 35.2342 154.59 35.3239C154.59 35.4136 154.661 35.4844 154.75 35.4844C154.839 35.4844 154.91 35.4136 154.91 35.3239C154.91 35.2342 154.839 35.1634 154.75 35.1634ZM154.75 33.3503C154.661 33.3503 154.59 33.4212 154.59 33.5109C154.59 33.6006 154.661 33.6714 154.75 33.6714C154.839 33.6714 154.91 33.6006 154.91 33.5109C154.91 33.4212 154.839 33.3503 154.75 33.3503ZM154.75 40.5977C154.661 40.5977 154.59 40.6686 154.59 40.7583C154.59 40.848 154.661 40.9188 154.75 40.9188C154.839 40.9188 154.91 40.848 154.91 40.7583C154.91 40.6686 154.839 40.5977 154.75 40.5977ZM153.071 18.8555C152.981 18.8555 152.911 18.9263 152.911 19.0161C152.911 19.1058 152.981 19.1766 153.071 19.1766C153.16 19.1766 153.231 19.1058 153.231 19.0161C153.231 18.9263 153.16 18.8555 153.071 18.8555ZM154.75 31.5373C154.661 31.5373 154.59 31.6081 154.59 31.6978C154.59 31.7875 154.661 31.8584 154.75 31.8584C154.839 31.8584 154.91 31.7875 154.91 31.6978C154.91 31.6081 154.839 31.5373 154.75 31.5373ZM148.038 40.5977C147.948 40.5977 147.878 40.6686 147.878 40.7583C147.878 40.848 147.948 40.9188 148.038 40.9188C148.127 40.9188 148.198 40.848 148.198 40.7583C148.198 40.6686 148.127 40.5977 148.038 40.5977ZM153.071 17.0425C152.981 17.0425 152.911 17.1133 152.911 17.203C152.911 17.2927 152.981 17.3636 153.071 17.3636C153.16 17.3636 153.231 17.2927 153.231 17.203C153.231 17.1133 153.16 17.0425 153.071 17.0425ZM154.75 18.8555C154.661 18.8555 154.59 18.9263 154.59 19.0161C154.59 19.1058 154.661 19.1766 154.75 19.1766C154.839 19.1766 154.91 19.1058 154.91 19.0161C154.91 18.9263 154.839 18.8555 154.75 18.8555ZM154.75 29.729C154.661 29.729 154.59 29.7998 154.59 29.8895C154.59 29.9792 154.661 30.05 154.75 30.05C154.839 30.05 154.91 29.9792 154.91 29.8895C154.91 29.7998 154.839 29.729 154.75 29.729ZM154.75 22.4816C154.661 22.4816 154.59 22.5524 154.59 22.6421C154.59 22.7318 154.661 22.8026 154.75 22.8026C154.839 22.8026 154.91 22.7318 154.91 22.6421C154.91 22.5524 154.839 22.4816 154.75 22.4816ZM154.75 17.0472C154.661 17.0472 154.59 17.118 154.59 17.2077C154.59 17.2975 154.661 17.3683 154.75 17.3683C154.839 17.3683 154.91 17.2975 154.91 17.2077C154.91 17.118 154.839 17.0472 154.75 17.0472ZM154.75 20.6733C154.661 20.6733 154.59 20.7441 154.59 20.8338C154.59 20.9235 154.661 20.9943 154.75 20.9943C154.839 20.9943 154.91 20.9235 154.91 20.8338C154.91 20.7441 154.839 20.6733 154.75 20.6733ZM154.75 27.9207C154.661 27.9207 154.59 27.9915 154.59 28.0812C154.59 28.1709 154.661 28.2417 154.75 28.2417C154.839 28.2417 154.91 28.1709 154.91 28.0812C154.91 27.9915 154.839 27.9207 154.75 27.9207ZM154.75 26.1076C154.661 26.1076 154.59 26.1785 154.59 26.2682C154.59 26.3579 154.661 26.4287 154.75 26.4287C154.839 26.4287 154.91 26.3579 154.91 26.2682C154.91 26.1785 154.839 26.1076 154.75 26.1076ZM154.75 24.2946C154.661 24.2946 154.59 24.3654 154.59 24.4551C154.59 24.5449 154.661 24.6157 154.75 24.6157C154.839 24.6157 154.91 24.5449 154.91 24.4551C154.91 24.3654 154.839 24.2946 154.75 24.2946ZM151.391 17.0472C151.302 17.0472 151.232 17.118 151.232 17.2077C151.232 17.2975 151.302 17.3683 151.391 17.3683C151.481 17.3683 151.551 17.2975 151.551 17.2077C151.551 17.118 151.481 17.0472 151.391 17.0472ZM153.071 40.6025C152.981 40.6025 152.911 40.6733 152.911 40.763C152.911 40.8527 152.981 40.9235 153.071 40.9235C153.16 40.9235 153.231 40.8527 153.231 40.763C153.231 40.6733 153.16 40.6025 153.071 40.6025ZM151.391 26.1076C151.302 26.1076 151.232 26.1785 151.232 26.2682C151.232 26.3579 151.302 26.4287 151.391 26.4287C151.481 26.4287 151.551 26.3579 151.551 26.2682C151.551 26.1785 151.481 26.1076 151.391 26.1076ZM151.391 18.8602C151.302 18.8602 151.232 18.9311 151.232 19.0208C151.232 19.1105 151.302 19.1813 151.391 19.1813C151.481 19.1813 151.551 19.1105 151.551 19.0208C151.551 18.9311 151.481 18.8602 151.391 18.8602ZM153.071 38.7941C152.981 38.7941 152.911 38.865 152.911 38.9547C152.911 39.0444 152.981 39.1152 153.071 39.1152C153.16 39.1152 153.231 39.0444 153.231 38.9547C153.231 38.865 153.16 38.7941 153.071 38.7941ZM151.391 24.2993C151.302 24.2993 151.232 24.3702 151.232 24.4599C151.232 24.5496 151.302 24.6204 151.391 24.6204C151.481 24.6204 151.551 24.5496 151.551 24.4599C151.551 24.3702 151.481 24.2993 151.391 24.2993ZM153.071 36.9811C152.981 36.9811 152.911 37.0519 152.911 37.1416C152.911 37.2314 152.981 37.3022 153.071 37.3022C153.16 37.3022 153.231 37.2314 153.231 37.1416C153.231 37.0519 153.16 36.9811 153.071 36.9811ZM151.391 20.6733C151.302 20.6733 151.232 20.7441 151.232 20.8338C151.232 20.9235 151.302 20.9943 151.391 20.9943C151.481 20.9943 151.551 20.9235 151.551 20.8338C151.551 20.7441 151.481 20.6733 151.391 20.6733ZM151.391 22.4863C151.302 22.4863 151.232 22.5571 151.232 22.6468C151.232 22.7365 151.302 22.8074 151.391 22.8074C151.481 22.8074 151.551 22.7365 151.551 22.6468C151.551 22.5571 151.481 22.4863 151.391 22.4863ZM153.071 33.3598C152.981 33.3598 152.911 33.4306 152.911 33.5203C152.911 33.61 152.981 33.6808 153.071 33.6808C153.16 33.6808 153.231 33.61 153.231 33.5203C153.231 33.4306 153.16 33.3598 153.071 33.3598ZM153.071 26.1124C152.981 26.1124 152.911 26.1832 152.911 26.2729C152.911 26.3626 152.981 26.4334 153.071 26.4334C153.16 26.4334 153.231 26.3626 153.231 26.2729C153.231 26.1832 153.16 26.1124 153.071 26.1124ZM153.071 24.2993C152.981 24.2993 152.911 24.3702 152.911 24.4599C152.911 24.5496 152.981 24.6204 153.071 24.6204C153.16 24.6204 153.231 24.5496 153.231 24.4599C153.231 24.3702 153.16 24.2993 153.071 24.2993ZM153.071 27.9254C152.981 27.9254 152.911 27.9962 152.911 28.0859C152.911 28.1756 152.981 28.2465 153.071 28.2465C153.16 28.2465 153.231 28.1756 153.231 28.0859C153.231 27.9962 153.16 27.9254 153.071 27.9254ZM153.071 31.5515C152.981 31.5515 152.911 31.6223 152.911 31.712C152.911 31.8017 152.981 31.8725 153.071 31.8725C153.16 31.8725 153.231 31.8017 153.231 31.712C153.231 31.6223 153.16 31.5515 153.071 31.5515ZM153.071 22.491C152.981 22.491 152.911 22.5619 152.911 22.6516C152.911 22.7413 152.981 22.8121 153.071 22.8121C153.16 22.8121 153.231 22.7413 153.231 22.6516C153.231 22.5619 153.16 22.491 153.071 22.491ZM153.071 35.1728C152.981 35.1728 152.911 35.2436 152.911 35.3333C152.911 35.423 152.981 35.4939 153.071 35.4939C153.16 35.4939 153.231 35.423 153.231 35.3333C153.231 35.2436 153.16 35.1728 153.071 35.1728ZM153.071 29.7384C152.981 29.7384 152.911 29.8093 152.911 29.899C152.911 29.9887 152.981 30.0595 153.071 30.0595C153.16 30.0595 153.231 29.9887 153.231 29.899C153.231 29.8093 153.16 29.7384 153.071 29.7384ZM146.358 24.3041C146.269 24.3041 146.198 24.3749 146.198 24.4646C146.198 24.5543 146.269 24.6251 146.358 24.6251C146.448 24.6251 146.518 24.5543 146.518 24.4646C146.518 24.3749 146.448 24.3041 146.358 24.3041ZM141.325 27.9301C141.236 27.9301 141.165 28.0009 141.165 28.0907C141.165 28.1804 141.236 28.2512 141.325 28.2512C141.415 28.2512 141.485 28.1804 141.485 28.0907C141.485 28.0009 141.415 27.9301 141.325 27.9301ZM143.005 29.7432C142.915 29.7432 142.845 29.814 142.845 29.9037C142.845 29.9934 142.915 30.0642 143.005 30.0642C143.094 30.0642 143.164 29.9934 143.164 29.9037C143.164 29.814 143.094 29.7432 143.005 29.7432ZM141.325 26.1171C141.236 26.1171 141.165 26.1879 141.165 26.2776C141.165 26.3673 141.236 26.4381 141.325 26.4381C141.415 26.4381 141.485 26.3673 141.485 26.2776C141.485 26.1879 141.415 26.1171 141.325 26.1171ZM141.325 24.3041C141.236 24.3041 141.165 24.3749 141.165 24.4646C141.165 24.5543 141.236 24.6251 141.325 24.6251C141.415 24.6251 141.485 24.5543 141.485 24.4646C141.485 24.3749 141.415 24.3041 141.325 24.3041ZM141.325 29.7384C141.236 29.7384 141.165 29.8093 141.165 29.899C141.165 29.9887 141.236 30.0595 141.325 30.0595C141.415 30.0595 141.485 29.9887 141.485 29.899C141.485 29.8093 141.415 29.7384 141.325 29.7384ZM141.325 35.1728C141.236 35.1728 141.165 35.2436 141.165 35.3333C141.165 35.423 141.236 35.4939 141.325 35.4939C141.415 35.4939 141.485 35.423 141.485 35.3333C141.485 35.2436 141.415 35.1728 141.325 35.1728ZM141.325 31.5467C141.236 31.5467 141.165 31.6176 141.165 31.7073C141.165 31.797 141.236 31.8678 141.325 31.8678C141.415 31.8678 141.485 31.797 141.485 31.7073C141.485 31.6176 141.415 31.5467 141.325 31.5467ZM141.325 33.3598C141.236 33.3598 141.165 33.4306 141.165 33.5203C141.165 33.61 141.236 33.6808 141.325 33.6808C141.415 33.6808 141.485 33.61 141.485 33.5203C141.485 33.4306 141.415 33.3598 141.325 33.3598ZM143.005 35.1728C142.915 35.1728 142.845 35.2436 142.845 35.3333C142.845 35.423 142.915 35.4939 143.005 35.4939C143.094 35.4939 143.164 35.423 143.164 35.3333C143.164 35.2436 143.094 35.1728 143.005 35.1728ZM141.325 36.9858C141.236 36.9858 141.165 37.0567 141.165 37.1464C141.165 37.2361 141.236 37.3069 141.325 37.3069C141.415 37.3069 141.485 37.2361 141.485 37.1464C141.485 37.0567 141.415 36.9858 141.325 36.9858ZM143.005 33.3598C142.915 33.3598 142.845 33.4306 142.845 33.5203C142.845 33.61 142.915 33.6808 143.005 33.6808C143.094 33.6808 143.164 33.61 143.164 33.5203C143.164 33.4306 143.094 33.3598 143.005 33.3598ZM141.325 20.678C141.236 20.678 141.165 20.7488 141.165 20.8385C141.165 20.9282 141.236 20.9991 141.325 20.9991C141.415 20.9991 141.485 20.9282 141.485 20.8385C141.485 20.7488 141.415 20.678 141.325 20.678ZM143.005 31.5515C142.915 31.5515 142.845 31.6223 142.845 31.712C142.845 31.8017 142.915 31.8725 143.005 31.8725C143.094 31.8725 143.164 31.8017 143.164 31.712C143.164 31.6223 143.094 31.5515 143.005 31.5515ZM143.005 38.7989C142.915 38.7989 142.845 38.8697 142.845 38.9594C142.845 39.0491 142.915 39.1199 143.005 39.1199C143.094 39.1199 143.164 39.0491 143.164 38.9594C143.164 38.8697 143.094 38.7989 143.005 38.7989ZM141.325 18.865C141.236 18.865 141.165 18.9358 141.165 19.0255C141.165 19.1152 141.236 19.186 141.325 19.186C141.415 19.186 141.485 19.1152 141.485 19.0255C141.485 18.9358 141.415 18.865 141.325 18.865ZM141.325 17.0519C141.236 17.0519 141.165 17.1228 141.165 17.2125C141.165 17.3022 141.236 17.373 141.325 17.373C141.415 17.373 141.485 17.3022 141.485 17.2125C141.485 17.1228 141.415 17.0519 141.325 17.0519ZM143.005 40.6072C142.915 40.6072 142.845 40.678 142.845 40.7677C142.845 40.8574 142.915 40.9282 143.005 40.9282C143.094 40.9282 143.164 40.8574 143.164 40.7677C143.164 40.678 143.094 40.6072 143.005 40.6072ZM141.325 22.4863C141.236 22.4863 141.165 22.5571 141.165 22.6468C141.165 22.7365 141.236 22.8074 141.325 22.8074C141.415 22.8074 141.485 22.7365 141.485 22.6468C141.485 22.5571 141.415 22.4863 141.325 22.4863ZM139.646 35.1681C139.557 35.1681 139.486 35.2389 139.486 35.3286C139.486 35.4183 139.557 35.4891 139.646 35.4891C139.735 35.4891 139.806 35.4183 139.806 35.3286C139.806 35.2389 139.735 35.1681 139.646 35.1681ZM139.646 31.542C139.557 31.542 139.486 31.6128 139.486 31.7025C139.486 31.7923 139.557 31.8631 139.646 31.8631C139.735 31.8631 139.806 31.7923 139.806 31.7025C139.806 31.6128 139.735 31.542 139.646 31.542ZM139.646 33.3551C139.557 33.3551 139.486 33.4259 139.486 33.5156C139.486 33.6053 139.557 33.6761 139.646 33.6761C139.735 33.6761 139.806 33.6053 139.806 33.5156C139.806 33.4259 139.735 33.3551 139.646 33.3551ZM139.646 27.9207C139.557 27.9207 139.486 27.9915 139.486 28.0812C139.486 28.1709 139.557 28.2417 139.646 28.2417C139.735 28.2417 139.806 28.1709 139.806 28.0812C139.806 27.9915 139.735 27.9207 139.646 27.9207ZM139.646 29.7337C139.557 29.7337 139.486 29.8045 139.486 29.8942C139.486 29.9839 139.557 30.0548 139.646 30.0548C139.735 30.0548 139.806 29.9839 139.806 29.8942C139.806 29.8045 139.735 29.7337 139.646 29.7337ZM141.325 38.7941C141.236 38.7941 141.165 38.865 141.165 38.9547C141.165 39.0444 141.236 39.1152 141.325 39.1152C141.415 39.1152 141.485 39.0444 141.485 38.9547C141.485 38.865 141.415 38.7941 141.325 38.7941ZM139.646 40.6072C139.557 40.6072 139.486 40.678 139.486 40.7677C139.486 40.8574 139.557 40.9282 139.646 40.9282C139.735 40.9282 139.806 40.8574 139.806 40.7677C139.806 40.678 139.735 40.6072 139.646 40.6072ZM139.646 38.7941C139.557 38.7941 139.486 38.865 139.486 38.9547C139.486 39.0444 139.557 39.1152 139.646 39.1152C139.735 39.1152 139.806 39.0444 139.806 38.9547C139.806 38.865 139.735 38.7941 139.646 38.7941ZM139.646 36.9811C139.557 36.9811 139.486 37.0519 139.486 37.1416C139.486 37.2314 139.557 37.3022 139.646 37.3022C139.735 37.3022 139.806 37.2314 139.806 37.1416C139.806 37.0519 139.735 36.9811 139.646 36.9811ZM139.646 17.0519C139.557 17.0519 139.486 17.1228 139.486 17.2125C139.486 17.3022 139.557 17.373 139.646 17.373C139.735 17.373 139.806 17.3022 139.806 17.2125C139.806 17.1228 139.735 17.0519 139.646 17.0519ZM139.646 18.865C139.557 18.865 139.486 18.9358 139.486 19.0255C139.486 19.1152 139.557 19.186 139.646 19.186C139.735 19.186 139.806 19.1152 139.806 19.0255C139.806 18.9358 139.735 18.865 139.646 18.865ZM141.325 40.6072C141.236 40.6072 141.165 40.678 141.165 40.7677C141.165 40.8574 141.236 40.9282 141.325 40.9282C141.415 40.9282 141.485 40.8574 141.485 40.7677C141.485 40.678 141.415 40.6072 141.325 40.6072ZM139.646 26.1124C139.557 26.1124 139.486 26.1832 139.486 26.2729C139.486 26.3626 139.557 26.4334 139.646 26.4334C139.735 26.4334 139.806 26.3626 139.806 26.2729C139.806 26.1832 139.735 26.1124 139.646 26.1124ZM139.646 24.2993C139.557 24.2993 139.486 24.3702 139.486 24.4599C139.486 24.5496 139.557 24.6204 139.646 24.6204C139.735 24.6204 139.806 24.5496 139.806 24.4599C139.806 24.3702 139.735 24.2993 139.646 24.2993ZM139.646 20.6733C139.557 20.6733 139.486 20.7441 139.486 20.8338C139.486 20.9235 139.557 20.9943 139.646 20.9943C139.735 20.9943 139.806 20.9235 139.806 20.8338C139.806 20.7441 139.735 20.6733 139.646 20.6733ZM139.646 22.4863C139.557 22.4863 139.486 22.5571 139.486 22.6468C139.486 22.7365 139.557 22.8074 139.646 22.8074C139.735 22.8074 139.806 22.7365 139.806 22.6468C139.806 22.5571 139.735 22.4863 139.646 22.4863ZM144.679 38.7941C144.59 38.7941 144.519 38.865 144.519 38.9547C144.519 39.0444 144.59 39.1152 144.679 39.1152C144.768 39.1152 144.839 39.0444 144.839 38.9547C144.839 38.865 144.768 38.7941 144.679 38.7941ZM146.358 36.9811C146.269 36.9811 146.198 37.0519 146.198 37.1416C146.198 37.2314 146.269 37.3022 146.358 37.3022C146.448 37.3022 146.518 37.2314 146.518 37.1416C146.518 37.0519 146.448 36.9811 146.358 36.9811ZM146.358 38.7941C146.269 38.7941 146.198 38.865 146.198 38.9547C146.198 39.0444 146.269 39.1152 146.358 39.1152C146.448 39.1152 146.518 39.0444 146.518 38.9547C146.518 38.865 146.448 38.7941 146.358 38.7941ZM146.358 35.1681C146.269 35.1681 146.198 35.2389 146.198 35.3286C146.198 35.4183 146.269 35.4891 146.358 35.4891C146.448 35.4891 146.518 35.4183 146.518 35.3286C146.518 35.2389 146.448 35.1681 146.358 35.1681ZM146.358 40.6025C146.269 40.6025 146.198 40.6733 146.198 40.763C146.198 40.8527 146.269 40.9235 146.358 40.9235C146.448 40.9235 146.518 40.8527 146.518 40.763C146.518 40.6733 146.448 40.6025 146.358 40.6025ZM144.679 20.6733C144.59 20.6733 144.519 20.7441 144.519 20.8338C144.519 20.9235 144.59 20.9943 144.679 20.9943C144.768 20.9943 144.839 20.9235 144.839 20.8338C144.839 20.7441 144.768 20.6733 144.679 20.6733ZM146.358 33.3551C146.269 33.3551 146.198 33.4259 146.198 33.5156C146.198 33.6053 146.269 33.6761 146.358 33.6761C146.448 33.6761 146.518 33.6053 146.518 33.5156C146.518 33.4259 146.448 33.3551 146.358 33.3551ZM144.679 17.0472C144.59 17.0472 144.519 17.118 144.519 17.2077C144.519 17.2975 144.59 17.3683 144.679 17.3683C144.768 17.3683 144.839 17.2975 144.839 17.2077C144.839 17.118 144.768 17.0472 144.679 17.0472ZM144.679 18.8602C144.59 18.8602 144.519 18.9311 144.519 19.0208C144.519 19.1105 144.59 19.1813 144.679 19.1813C144.768 19.1813 144.839 19.1105 144.839 19.0208C144.839 18.9311 144.768 18.8602 144.679 18.8602ZM137.967 17.0472C137.877 17.0472 137.807 17.118 137.807 17.2077C137.807 17.2975 137.877 17.3683 137.967 17.3683C138.056 17.3683 138.127 17.2975 138.127 17.2077C138.127 17.118 138.056 17.0472 137.967 17.0472ZM144.679 22.4816C144.59 22.4816 144.519 22.5524 144.519 22.6421C144.519 22.7318 144.59 22.8026 144.679 22.8026C144.768 22.8026 144.839 22.7318 144.839 22.6421C144.839 22.5524 144.768 22.4816 144.679 22.4816ZM146.358 22.4816C146.269 22.4816 146.198 22.5524 146.198 22.6421C146.198 22.7318 146.269 22.8026 146.358 22.8026C146.448 22.8026 146.518 22.7318 146.518 22.6421C146.518 22.5524 146.448 22.4816 146.358 22.4816ZM146.358 20.6686C146.269 20.6686 146.198 20.7394 146.198 20.8291C146.198 20.9188 146.269 20.9896 146.358 20.9896C146.448 20.9896 146.518 20.9188 146.518 20.8291C146.518 20.7394 146.448 20.6686 146.358 20.6686ZM146.358 18.8555C146.269 18.8555 146.198 18.9263 146.198 19.0161C146.198 19.1058 146.269 19.1766 146.358 19.1766C146.448 19.1766 146.518 19.1058 146.518 19.0161C146.518 18.9263 146.448 18.8555 146.358 18.8555ZM146.358 26.1029C146.269 26.1029 146.198 26.1737 146.198 26.2635C146.198 26.3532 146.269 26.424 146.358 26.424C146.448 26.424 146.518 26.3532 146.518 26.2635C146.518 26.1737 146.448 26.1029 146.358 26.1029ZM146.358 31.5373C146.269 31.5373 146.198 31.6081 146.198 31.6978C146.198 31.7875 146.269 31.8584 146.358 31.8584C146.448 31.8584 146.518 31.7875 146.518 31.6978C146.518 31.6081 146.448 31.5373 146.358 31.5373ZM146.358 29.7243C146.269 29.7243 146.198 29.7951 146.198 29.8848C146.198 29.9745 146.269 30.0453 146.358 30.0453C146.448 30.0453 146.518 29.9745 146.518 29.8848C146.518 29.7951 146.448 29.7243 146.358 29.7243ZM146.358 27.9112C146.269 27.9112 146.198 27.9821 146.198 28.0718C146.198 28.1615 146.269 28.2323 146.358 28.2323C146.448 28.2323 146.518 28.1615 146.518 28.0718C146.518 27.9821 146.448 27.9112 146.358 27.9112ZM144.679 31.5373C144.59 31.5373 144.519 31.6081 144.519 31.6978C144.519 31.7875 144.59 31.8584 144.679 31.8584C144.768 31.8584 144.839 31.7875 144.839 31.6978C144.839 31.6081 144.768 31.5373 144.679 31.5373ZM143 18.8555C142.91 18.8555 142.84 18.9263 142.84 19.0161C142.84 19.1058 142.91 19.1766 143 19.1766C143.089 19.1766 143.16 19.1058 143.16 19.0161C143.16 18.9263 143.089 18.8555 143 18.8555ZM143 17.0425C142.91 17.0425 142.84 17.1133 142.84 17.203C142.84 17.2927 142.91 17.3636 143 17.3636C143.089 17.3636 143.16 17.2927 143.16 17.203C143.16 17.1133 143.089 17.0425 143 17.0425ZM144.679 40.5977C144.59 40.5977 144.519 40.6686 144.519 40.7583C144.519 40.848 144.59 40.9188 144.679 40.9188C144.768 40.9188 144.839 40.848 144.839 40.7583C144.839 40.6686 144.768 40.5977 144.679 40.5977ZM143 20.6686C142.91 20.6686 142.84 20.7394 142.84 20.8291C142.84 20.9188 142.91 20.9896 143 20.9896C143.089 20.9896 143.16 20.9188 143.16 20.8291C143.16 20.7394 143.089 20.6686 143 20.6686ZM143 24.2946C142.91 24.2946 142.84 24.3654 142.84 24.4551C142.84 24.5449 142.91 24.6157 143 24.6157C143.089 24.6157 143.16 24.5449 143.16 24.4551C143.16 24.3654 143.089 24.2946 143 24.2946ZM143 22.4816C142.91 22.4816 142.84 22.5524 142.84 22.6421C142.84 22.7318 142.91 22.8026 143 22.8026C143.089 22.8026 143.16 22.7318 143.16 22.6421C143.16 22.5524 143.089 22.4816 143 22.4816ZM143 26.1076C142.91 26.1076 142.84 26.1785 142.84 26.2682C142.84 26.3579 142.91 26.4287 143 26.4287C143.089 26.4287 143.16 26.3579 143.16 26.2682C143.16 26.1785 143.089 26.1076 143 26.1076ZM146.358 17.0472C146.269 17.0472 146.198 17.118 146.198 17.2077C146.198 17.2975 146.269 17.3683 146.358 17.3683C146.448 17.3683 146.518 17.2975 146.518 17.2077C146.518 17.118 146.448 17.0472 146.358 17.0472ZM144.679 35.1681C144.59 35.1681 144.519 35.2389 144.519 35.3286C144.519 35.4183 144.59 35.4891 144.679 35.4891C144.768 35.4891 144.839 35.4183 144.839 35.3286C144.839 35.2389 144.768 35.1681 144.679 35.1681ZM144.679 27.9207C144.59 27.9207 144.519 27.9915 144.519 28.0812C144.519 28.1709 144.59 28.2417 144.679 28.2417C144.768 28.2417 144.839 28.1709 144.839 28.0812C144.839 27.9915 144.768 27.9207 144.679 27.9207ZM144.679 26.1076C144.59 26.1076 144.519 26.1785 144.519 26.2682C144.519 26.3579 144.59 26.4287 144.679 26.4287C144.768 26.4287 144.839 26.3579 144.839 26.2682C144.839 26.1785 144.768 26.1076 144.679 26.1076ZM144.679 29.7337C144.59 29.7337 144.519 29.8045 144.519 29.8942C144.519 29.9839 144.59 30.0548 144.679 30.0548C144.768 30.0548 144.839 29.9839 144.839 29.8942C144.839 29.8045 144.768 29.7337 144.679 29.7337ZM144.679 24.2993C144.59 24.2993 144.519 24.3702 144.519 24.4599C144.519 24.5496 144.59 24.6204 144.679 24.6204C144.768 24.6204 144.839 24.5496 144.839 24.4599C144.839 24.3702 144.768 24.2993 144.679 24.2993ZM144.679 36.9811C144.59 36.9811 144.519 37.0519 144.519 37.1416C144.519 37.2314 144.59 37.3022 144.679 37.3022C144.768 37.3022 144.839 37.2314 144.839 37.1416C144.839 37.0519 144.768 36.9811 144.679 36.9811ZM144.679 33.3551C144.59 33.3551 144.519 33.4259 144.519 33.5156C144.519 33.6053 144.59 33.6761 144.679 33.6761C144.768 33.6761 144.839 33.6053 144.839 33.5156C144.839 33.4259 144.768 33.3551 144.679 33.3551ZM143 27.9207C142.91 27.9207 142.84 27.9915 142.84 28.0812C142.84 28.1709 142.91 28.2417 143 28.2417C143.089 28.2417 143.16 28.1709 143.16 28.0812C143.16 27.9915 143.089 27.9207 143 27.9207ZM188.448 17.3683C188.537 17.3683 188.608 17.2975 188.608 17.2077C188.608 17.118 188.537 17.0472 188.448 17.0472C188.359 17.0472 188.288 17.118 188.288 17.2077C188.288 17.2975 188.359 17.3683 188.448 17.3683ZM159.919 38.7894C159.83 38.7894 159.76 38.8602 159.76 38.95C159.76 39.0397 159.83 39.1105 159.919 39.1105C160.009 39.1105 160.079 39.0397 160.079 38.95C160.079 38.8602 160.009 38.7894 159.919 38.7894ZM180.057 17.0472C179.967 17.0472 179.897 17.118 179.897 17.2077C179.897 17.2975 179.967 17.3683 180.057 17.3683C180.146 17.3683 180.216 17.2975 180.216 17.2077C180.216 17.118 180.146 17.0472 180.057 17.0472ZM178.377 33.3551C178.288 33.3551 178.217 33.4259 178.217 33.5156C178.217 33.6053 178.288 33.6761 178.377 33.6761C178.467 33.6761 178.537 33.6053 178.537 33.5156C178.537 33.4259 178.467 33.3551 178.377 33.3551ZM178.377 29.729C178.288 29.729 178.217 29.7998 178.217 29.8895C178.217 29.9792 178.288 30.05 178.377 30.05C178.467 30.05 178.537 29.9792 178.537 29.8895C178.537 29.7998 178.467 29.729 178.377 29.729ZM178.377 35.1634C178.288 35.1634 178.217 35.2342 178.217 35.3239C178.217 35.4136 178.288 35.4844 178.377 35.4844C178.467 35.4844 178.537 35.4136 178.537 35.3239C178.537 35.2342 178.467 35.1634 178.377 35.1634ZM178.377 26.1029C178.288 26.1029 178.217 26.1737 178.217 26.2635C178.217 26.3532 178.288 26.424 178.377 26.424C178.467 26.424 178.537 26.3532 178.537 26.2635C178.537 26.1737 178.467 26.1029 178.377 26.1029ZM178.377 24.2899C178.288 24.2899 178.217 24.3607 178.217 24.4504C178.217 24.5401 178.288 24.611 178.377 24.611C178.467 24.611 178.537 24.5401 178.537 24.4504C178.537 24.3607 178.467 24.2899 178.377 24.2899ZM178.377 27.916C178.288 27.916 178.217 27.9868 178.217 28.0765C178.217 28.1662 178.288 28.237 178.377 28.237C178.467 28.237 178.537 28.1662 178.537 28.0765C178.537 27.9868 178.467 27.916 178.377 27.916ZM178.377 36.9764C178.288 36.9764 178.217 37.0472 178.217 37.1369C178.217 37.2266 178.288 37.2975 178.377 37.2975C178.467 37.2975 178.537 37.2266 178.537 37.1369C178.537 37.0472 178.467 36.9764 178.377 36.9764ZM178.377 38.7894C178.288 38.7894 178.217 38.8602 178.217 38.95C178.217 39.0397 178.288 39.1105 178.377 39.1105C178.467 39.1105 178.537 39.0397 178.537 38.95C178.537 38.8602 178.467 38.7894 178.377 38.7894ZM176.698 22.4816C176.609 22.4816 176.538 22.5524 176.538 22.6421C176.538 22.7318 176.609 22.8026 176.698 22.8026C176.787 22.8026 176.858 22.7318 176.858 22.6421C176.858 22.5524 176.787 22.4816 176.698 22.4816ZM176.698 20.6686C176.609 20.6686 176.538 20.7394 176.538 20.8291C176.538 20.9188 176.609 20.9896 176.698 20.9896C176.787 20.9896 176.858 20.9188 176.858 20.8291C176.858 20.7394 176.787 20.6686 176.698 20.6686ZM176.698 24.2946C176.609 24.2946 176.538 24.3654 176.538 24.4551C176.538 24.5449 176.609 24.6157 176.698 24.6157C176.787 24.6157 176.858 24.5449 176.858 24.4551C176.858 24.3654 176.787 24.2946 176.698 24.2946ZM176.698 26.1076C176.609 26.1076 176.538 26.1785 176.538 26.2682C176.538 26.3579 176.609 26.4287 176.698 26.4287C176.787 26.4287 176.858 26.3579 176.858 26.2682C176.858 26.1785 176.787 26.1076 176.698 26.1076ZM176.698 17.0472C176.609 17.0472 176.538 17.118 176.538 17.2077C176.538 17.2975 176.609 17.3683 176.698 17.3683C176.787 17.3683 176.858 17.2975 176.858 17.2077C176.858 17.118 176.787 17.0472 176.698 17.0472ZM176.698 27.9207C176.609 27.9207 176.538 27.9915 176.538 28.0812C176.538 28.1709 176.609 28.2417 176.698 28.2417C176.787 28.2417 176.858 28.1709 176.858 28.0812C176.858 27.9915 176.787 27.9207 176.698 27.9207ZM178.377 22.4863C178.288 22.4863 178.217 22.5571 178.217 22.6468C178.217 22.7365 178.288 22.8074 178.377 22.8074C178.467 22.8074 178.537 22.7365 178.537 22.6468C178.537 22.5571 178.467 22.4863 178.377 22.4863ZM176.698 18.8602C176.609 18.8602 176.538 18.9311 176.538 19.0208C176.538 19.1105 176.609 19.1813 176.698 19.1813C176.787 19.1813 176.858 19.1105 176.858 19.0208C176.858 18.9311 176.787 18.8602 176.698 18.8602ZM178.377 40.6025C178.288 40.6025 178.217 40.6733 178.217 40.763C178.217 40.8527 178.288 40.9235 178.377 40.9235C178.467 40.9235 178.537 40.8527 178.537 40.763C178.537 40.6733 178.467 40.6025 178.377 40.6025ZM180.057 31.542C179.967 31.542 179.897 31.6128 179.897 31.7025C179.897 31.7923 179.967 31.8631 180.057 31.8631C180.146 31.8631 180.216 31.7923 180.216 31.7025C180.216 31.6128 180.146 31.542 180.057 31.542ZM180.057 24.2946C179.967 24.2946 179.897 24.3654 179.897 24.4551C179.897 24.5449 179.967 24.6157 180.057 24.6157C180.146 24.6157 180.216 24.5449 180.216 24.4551C180.216 24.3654 180.146 24.2946 180.057 24.2946ZM178.377 20.6686C178.288 20.6686 178.217 20.7394 178.217 20.8291C178.217 20.9188 178.288 20.9896 178.377 20.9896C178.467 20.9896 178.537 20.9188 178.537 20.8291C178.537 20.7394 178.467 20.6686 178.377 20.6686ZM180.057 29.729C179.967 29.729 179.897 29.7998 179.897 29.8895C179.897 29.9792 179.967 30.05 180.057 30.05C180.146 30.05 180.216 29.9792 180.216 29.8895C180.216 29.7998 180.146 29.729 180.057 29.729ZM180.057 27.916C179.967 27.916 179.897 27.9868 179.897 28.0765C179.897 28.1662 179.967 28.237 180.057 28.237C180.146 28.237 180.216 28.1662 180.216 28.0765C180.216 27.9868 180.146 27.916 180.057 27.916ZM180.057 18.8555C179.967 18.8555 179.897 18.9263 179.897 19.0161C179.897 19.1058 179.967 19.1766 180.057 19.1766C180.146 19.1766 180.216 19.1058 180.216 19.0161C180.216 18.9263 180.146 18.8555 180.057 18.8555ZM180.057 20.6686C179.967 20.6686 179.897 20.7394 179.897 20.8291C179.897 20.9188 179.967 20.9896 180.057 20.9896C180.146 20.9896 180.216 20.9188 180.216 20.8291C180.216 20.7394 180.146 20.6686 180.057 20.6686ZM180.057 22.4816C179.967 22.4816 179.897 22.5524 179.897 22.6421C179.897 22.7318 179.967 22.8026 180.057 22.8026C180.146 22.8026 180.216 22.7318 180.216 22.6421C180.216 22.5524 180.146 22.4816 180.057 22.4816ZM180.057 26.1076C179.967 26.1076 179.897 26.1785 179.897 26.2682C179.897 26.3579 179.967 26.4287 180.057 26.4287C180.146 26.4287 180.216 26.3579 180.216 26.2682C180.216 26.1785 180.146 26.1076 180.057 26.1076ZM180.057 40.6025C179.967 40.6025 179.897 40.6733 179.897 40.763C179.897 40.8527 179.967 40.9235 180.057 40.9235C180.146 40.9235 180.216 40.8527 180.216 40.763C180.216 40.6733 180.146 40.6025 180.057 40.6025ZM178.377 17.0472C178.288 17.0472 178.217 17.118 178.217 17.2077C178.217 17.2975 178.288 17.3683 178.377 17.3683C178.467 17.3683 178.537 17.2975 178.537 17.2077C178.537 17.118 178.467 17.0472 178.377 17.0472ZM178.377 18.8602C178.288 18.8602 178.217 18.9311 178.217 19.0208C178.217 19.1105 178.288 19.1813 178.377 19.1813C178.467 19.1813 178.537 19.1105 178.537 19.0208C178.537 18.9311 178.467 18.8602 178.377 18.8602ZM180.057 33.3551C179.967 33.3551 179.897 33.4259 179.897 33.5156C179.897 33.6053 179.967 33.6761 180.057 33.6761C180.146 33.6761 180.216 33.6053 180.216 33.5156C180.216 33.4259 180.146 33.3551 180.057 33.3551ZM180.057 35.1681C179.967 35.1681 179.897 35.2389 179.897 35.3286C179.897 35.4183 179.967 35.4891 180.057 35.4891C180.146 35.4891 180.216 35.4183 180.216 35.3286C180.216 35.2389 180.146 35.1681 180.057 35.1681ZM180.057 36.9811C179.967 36.9811 179.897 37.0519 179.897 37.1416C179.897 37.2314 179.967 37.3022 180.057 37.3022C180.146 37.3022 180.216 37.2314 180.216 37.1416C180.216 37.0519 180.146 36.9811 180.057 36.9811ZM180.057 38.7941C179.967 38.7941 179.897 38.865 179.897 38.9547C179.897 39.0444 179.967 39.1152 180.057 39.1152C180.146 39.1152 180.216 39.0444 180.216 38.9547C180.216 38.865 180.146 38.7941 180.057 38.7941ZM178.377 31.5467C178.288 31.5467 178.217 31.6176 178.217 31.7073C178.217 31.797 178.288 31.8678 178.377 31.8678C178.467 31.8678 178.537 31.797 178.537 31.7073C178.537 31.6176 178.467 31.5467 178.377 31.5467ZM173.344 18.865C173.255 18.865 173.184 18.9358 173.184 19.0255C173.184 19.1152 173.255 19.186 173.344 19.186C173.434 19.186 173.504 19.1152 173.504 19.0255C173.504 18.9358 173.434 18.865 173.344 18.865ZM173.344 20.678C173.255 20.678 173.184 20.7488 173.184 20.8385C173.184 20.9282 173.255 20.9991 173.344 20.9991C173.434 20.9991 173.504 20.9282 173.504 20.8385C173.504 20.7488 173.434 20.678 173.344 20.678ZM173.344 17.0519C173.255 17.0519 173.184 17.1228 173.184 17.2125C173.184 17.3022 173.255 17.373 173.344 17.373C173.434 17.373 173.504 17.3022 173.504 17.2125C173.504 17.1228 173.434 17.0519 173.344 17.0519ZM173.344 22.4863C173.255 22.4863 173.184 22.5571 173.184 22.6468C173.184 22.7365 173.255 22.8074 173.344 22.8074C173.434 22.8074 173.504 22.7365 173.504 22.6468C173.504 22.5571 173.434 22.4863 173.344 22.4863ZM175.023 36.9811C174.934 36.9811 174.863 37.0519 174.863 37.1416C174.863 37.2314 174.934 37.3022 175.023 37.3022C175.113 37.3022 175.183 37.2314 175.183 37.1416C175.183 37.0519 175.113 36.9811 175.023 36.9811ZM175.023 35.1681C174.934 35.1681 174.863 35.2389 174.863 35.3286C174.863 35.4183 174.934 35.4891 175.023 35.4891C175.113 35.4891 175.183 35.4183 175.183 35.3286C175.183 35.2389 175.113 35.1681 175.023 35.1681ZM175.023 40.6025C174.934 40.6025 174.863 40.6733 174.863 40.763C174.863 40.8527 174.934 40.9235 175.023 40.9235C175.113 40.9235 175.183 40.8527 175.183 40.763C175.183 40.6733 175.113 40.6025 175.023 40.6025ZM175.023 38.7894C174.934 38.7894 174.863 38.8602 174.863 38.95C174.863 39.0397 174.934 39.1105 175.023 39.1105C175.113 39.1105 175.183 39.0397 175.183 38.95C175.183 38.8602 175.113 38.7894 175.023 38.7894ZM173.344 24.2946C173.255 24.2946 173.184 24.3654 173.184 24.4551C173.184 24.5449 173.255 24.6157 173.344 24.6157C173.434 24.6157 173.504 24.5449 173.504 24.4551C173.504 24.3654 173.434 24.2946 173.344 24.2946ZM173.344 26.1076C173.255 26.1076 173.184 26.1785 173.184 26.2682C173.184 26.3579 173.255 26.4287 173.344 26.4287C173.434 26.4287 173.504 26.3579 173.504 26.2682C173.504 26.1785 173.434 26.1076 173.344 26.1076ZM173.344 35.1681C173.255 35.1681 173.184 35.2389 173.184 35.3286C173.184 35.4183 173.255 35.4891 173.344 35.4891C173.434 35.4891 173.504 35.4183 173.504 35.3286C173.504 35.2389 173.434 35.1681 173.344 35.1681ZM156.561 40.6025C156.472 40.6025 156.401 40.6733 156.401 40.763C156.401 40.8527 156.472 40.9235 156.561 40.9235C156.65 40.9235 156.721 40.8527 156.721 40.763C156.721 40.6733 156.65 40.6025 156.561 40.6025ZM173.344 33.3551C173.255 33.3551 173.184 33.4259 173.184 33.5156C173.184 33.6053 173.255 33.6761 173.344 33.6761C173.434 33.6761 173.504 33.6053 173.504 33.5156C173.504 33.4259 173.434 33.3551 173.344 33.3551ZM173.344 36.9811C173.255 36.9811 173.184 37.0519 173.184 37.1416C173.184 37.2314 173.255 37.3022 173.344 37.3022C173.434 37.3022 173.504 37.2314 173.504 37.1416C173.504 37.0519 173.434 36.9811 173.344 36.9811ZM173.344 27.9207C173.255 27.9207 173.184 27.9915 173.184 28.0812C173.184 28.1709 173.255 28.2417 173.344 28.2417C173.434 28.2417 173.504 28.1709 173.504 28.0812C173.504 27.9915 173.434 27.9207 173.344 27.9207ZM173.344 31.5467C173.255 31.5467 173.184 31.6176 173.184 31.7073C173.184 31.797 173.255 31.8678 173.344 31.8678C173.434 31.8678 173.504 31.797 173.504 31.7073C173.504 31.6176 173.434 31.5467 173.344 31.5467ZM173.344 29.7337C173.255 29.7337 173.184 29.8045 173.184 29.8942C173.184 29.9839 173.255 30.0548 173.344 30.0548C173.434 30.0548 173.504 29.9839 173.504 29.8942C173.504 29.8045 173.434 29.7337 173.344 29.7337ZM176.703 35.1681C176.613 35.1681 176.543 35.2389 176.543 35.3286C176.543 35.4183 176.613 35.4891 176.703 35.4891C176.792 35.4891 176.863 35.4183 176.863 35.3286C176.863 35.2389 176.792 35.1681 176.703 35.1681ZM176.703 38.7941C176.613 38.7941 176.543 38.865 176.543 38.9547C176.543 39.0444 176.613 39.1152 176.703 39.1152C176.792 39.1152 176.863 39.0444 176.863 38.9547C176.863 38.865 176.792 38.7941 176.703 38.7941ZM176.703 36.9811C176.613 36.9811 176.543 37.0519 176.543 37.1416C176.543 37.2314 176.613 37.3022 176.703 37.3022C176.792 37.3022 176.863 37.2314 176.863 37.1416C176.863 37.0519 176.792 36.9811 176.703 36.9811ZM176.703 40.6072C176.613 40.6072 176.543 40.678 176.543 40.7677C176.543 40.8574 176.613 40.9282 176.703 40.9282C176.792 40.9282 176.863 40.8574 176.863 40.7677C176.863 40.678 176.792 40.6072 176.703 40.6072ZM175.023 17.0519C174.934 17.0519 174.863 17.1228 174.863 17.2125C174.863 17.3022 174.934 17.373 175.023 17.373C175.113 17.373 175.183 17.3022 175.183 17.2125C175.183 17.1228 175.113 17.0519 175.023 17.0519ZM176.703 31.5467C176.613 31.5467 176.543 31.6176 176.543 31.7073C176.543 31.797 176.613 31.8678 176.703 31.8678C176.792 31.8678 176.863 31.797 176.863 31.7073C176.863 31.6176 176.792 31.5467 176.703 31.5467ZM175.023 18.865C174.934 18.865 174.863 18.9358 174.863 19.0255C174.863 19.1152 174.934 19.186 175.023 19.186C175.113 19.186 175.183 19.1152 175.183 19.0255C175.183 18.9358 175.113 18.865 175.023 18.865ZM176.703 33.3598C176.613 33.3598 176.543 33.4306 176.543 33.5203C176.543 33.61 176.613 33.6808 176.703 33.6808C176.792 33.6808 176.863 33.61 176.863 33.5203C176.863 33.4306 176.792 33.3598 176.703 33.3598ZM176.703 29.7337C176.613 29.7337 176.543 29.8045 176.543 29.8942C176.543 29.9839 176.613 30.0548 176.703 30.0548C176.792 30.0548 176.863 29.9839 176.863 29.8942C176.863 29.8045 176.792 29.7337 176.703 29.7337ZM175.023 26.1076C174.934 26.1076 174.863 26.1785 174.863 26.2682C174.863 26.3579 174.934 26.4287 175.023 26.4287C175.113 26.4287 175.183 26.3579 175.183 26.2682C175.183 26.1785 175.113 26.1076 175.023 26.1076ZM175.023 29.7337C174.934 29.7337 174.863 29.8045 174.863 29.8942C174.863 29.9839 174.934 30.0548 175.023 30.0548C175.113 30.0548 175.183 29.9839 175.183 29.8942C175.183 29.8045 175.113 29.7337 175.023 29.7337ZM175.023 20.6733C174.934 20.6733 174.863 20.7441 174.863 20.8338C174.863 20.9235 174.934 20.9943 175.023 20.9943C175.113 20.9943 175.183 20.9235 175.183 20.8338C175.183 20.7441 175.113 20.6733 175.023 20.6733ZM175.023 31.5467C174.934 31.5467 174.863 31.6176 174.863 31.7073C174.863 31.797 174.934 31.8678 175.023 31.8678C175.113 31.8678 175.183 31.797 175.183 31.7073C175.183 31.6176 175.113 31.5467 175.023 31.5467ZM173.344 40.6072C173.255 40.6072 173.184 40.678 173.184 40.7677C173.184 40.8574 173.255 40.9282 173.344 40.9282C173.434 40.9282 173.504 40.8574 173.504 40.7677C173.504 40.678 173.434 40.6072 173.344 40.6072ZM175.023 22.4863C174.934 22.4863 174.863 22.5571 174.863 22.6468C174.863 22.7365 174.934 22.8074 175.023 22.8074C175.113 22.8074 175.183 22.7365 175.183 22.6468C175.183 22.5571 175.113 22.4863 175.023 22.4863ZM175.023 24.2993C174.934 24.2993 174.863 24.3702 174.863 24.4599C174.863 24.5496 174.934 24.6204 175.023 24.6204C175.113 24.6204 175.183 24.5496 175.183 24.4599C175.183 24.3702 175.113 24.2993 175.023 24.2993ZM175.023 33.3598C174.934 33.3598 174.863 33.4306 174.863 33.5203C174.863 33.61 174.934 33.6808 175.023 33.6808C175.113 33.6808 175.183 33.61 175.183 33.5203C175.183 33.4306 175.113 33.3598 175.023 33.3598ZM175.023 27.9254C174.934 27.9254 174.863 27.9962 174.863 28.0859C174.863 28.1756 174.934 28.2465 175.023 28.2465C175.113 28.2465 175.183 28.1756 175.183 28.0859C175.183 27.9962 175.113 27.9254 175.023 27.9254ZM186.769 22.491C186.679 22.491 186.609 22.5619 186.609 22.6516C186.609 22.7413 186.679 22.8121 186.769 22.8121C186.858 22.8121 186.929 22.7413 186.929 22.6516C186.929 22.5619 186.858 22.491 186.769 22.491ZM186.769 29.7384C186.679 29.7384 186.609 29.8093 186.609 29.899C186.609 29.9887 186.679 30.0595 186.769 30.0595C186.858 30.0595 186.929 29.9887 186.929 29.899C186.929 29.8093 186.858 29.7384 186.769 29.7384ZM186.769 31.5515C186.679 31.5515 186.609 31.6223 186.609 31.712C186.609 31.8017 186.679 31.8725 186.769 31.8725C186.858 31.8725 186.929 31.8017 186.929 31.712C186.929 31.6223 186.858 31.5515 186.769 31.5515ZM186.769 35.1775C186.679 35.1775 186.609 35.2483 186.609 35.3381C186.609 35.4278 186.679 35.4986 186.769 35.4986C186.858 35.4986 186.929 35.4278 186.929 35.3381C186.929 35.2483 186.858 35.1775 186.769 35.1775ZM186.769 36.9906C186.679 36.9906 186.609 37.0614 186.609 37.1511C186.609 37.2408 186.679 37.3116 186.769 37.3116C186.858 37.3116 186.929 37.2408 186.929 37.1511C186.929 37.0614 186.858 36.9906 186.769 36.9906ZM186.769 24.3088C186.679 24.3088 186.609 24.3796 186.609 24.4693C186.609 24.559 186.679 24.6298 186.769 24.6298C186.858 24.6298 186.929 24.559 186.929 24.4693C186.929 24.3796 186.858 24.3088 186.769 24.3088ZM186.769 26.1218C186.679 26.1218 186.609 26.1926 186.609 26.2823C186.609 26.372 186.679 26.4429 186.769 26.4429C186.858 26.4429 186.929 26.372 186.929 26.2823C186.929 26.1926 186.858 26.1218 186.769 26.1218ZM186.769 27.9348C186.679 27.9348 186.609 28.0057 186.609 28.0954C186.609 28.1851 186.679 28.2559 186.769 28.2559C186.858 28.2559 186.929 28.1851 186.929 28.0954C186.929 28.0057 186.858 27.9348 186.769 27.9348ZM186.769 33.3692C186.679 33.3692 186.609 33.44 186.609 33.5297C186.609 33.6195 186.679 33.6903 186.769 33.6903C186.858 33.6903 186.929 33.6195 186.929 33.5297C186.929 33.44 186.858 33.3692 186.769 33.3692ZM186.769 38.8036C186.679 38.8036 186.609 38.8744 186.609 38.9641C186.609 39.0538 186.679 39.1246 186.769 39.1246C186.858 39.1246 186.929 39.0538 186.929 38.9641C186.929 38.8744 186.858 38.8036 186.769 38.8036ZM185.09 24.3088C185 24.3088 184.93 24.3796 184.93 24.4693C184.93 24.559 185 24.6298 185.09 24.6298C185.179 24.6298 185.25 24.559 185.25 24.4693C185.25 24.3796 185.179 24.3088 185.09 24.3088ZM185.09 20.6827C185 20.6827 184.93 20.7535 184.93 20.8432C184.93 20.933 185 21.0038 185.09 21.0038C185.179 21.0038 185.25 20.933 185.25 20.8432C185.25 20.7535 185.179 20.6827 185.09 20.6827ZM185.09 26.1171C185 26.1171 184.93 26.1879 184.93 26.2776C184.93 26.3673 185 26.4381 185.09 26.4381C185.179 26.4381 185.25 26.3673 185.25 26.2776C185.25 26.1879 185.179 26.1171 185.09 26.1171ZM185.09 22.491C185 22.491 184.93 22.5619 184.93 22.6516C184.93 22.7413 185 22.8121 185.09 22.8121C185.179 22.8121 185.25 22.7413 185.25 22.6516C185.25 22.5619 185.179 22.491 185.09 22.491ZM185.09 18.865C185 18.865 184.93 18.9358 184.93 19.0255C184.93 19.1152 185 19.186 185.09 19.186C185.179 19.186 185.25 19.1152 185.25 19.0255C185.25 18.9358 185.179 18.865 185.09 18.865ZM186.769 40.6072C186.679 40.6072 186.609 40.678 186.609 40.7677C186.609 40.8574 186.679 40.9282 186.769 40.9282C186.858 40.9282 186.929 40.8574 186.929 40.7677C186.929 40.678 186.858 40.6072 186.769 40.6072ZM185.09 17.0519C185 17.0519 184.93 17.1228 184.93 17.2125C184.93 17.3022 185 17.373 185.09 17.373C185.179 17.373 185.25 17.3022 185.25 17.2125C185.25 17.1228 185.179 17.0519 185.09 17.0519ZM188.448 27.9254C188.359 27.9254 188.288 27.9962 188.288 28.0859C188.288 28.1756 188.359 28.2465 188.448 28.2465C188.537 28.2465 188.608 28.1756 188.608 28.0859C188.608 27.9962 188.537 27.9254 188.448 27.9254ZM188.448 26.1124C188.359 26.1124 188.288 26.1832 188.288 26.2729C188.288 26.3626 188.359 26.4334 188.448 26.4334C188.537 26.4334 188.608 26.3626 188.608 26.2729C188.608 26.1832 188.537 26.1124 188.448 26.1124ZM181.736 40.6072C181.646 40.6072 181.576 40.678 181.576 40.7677C181.576 40.8574 181.646 40.9282 181.736 40.9282C181.825 40.9282 181.896 40.8574 181.896 40.7677C181.896 40.678 181.825 40.6072 181.736 40.6072ZM188.448 29.7337C188.359 29.7337 188.288 29.8045 188.288 29.8942C188.288 29.9839 188.359 30.0548 188.448 30.0548C188.537 30.0548 188.608 29.9839 188.608 29.8942C188.608 29.8045 188.537 29.7337 188.448 29.7337ZM188.448 24.2993C188.359 24.2993 188.288 24.3702 188.288 24.4599C188.288 24.5496 188.359 24.6204 188.448 24.6204C188.537 24.6204 188.608 24.5496 188.608 24.4599C188.608 24.3702 188.537 24.2993 188.448 24.2993ZM188.448 22.4863C188.359 22.4863 188.288 22.5571 188.288 22.6468C188.288 22.7365 188.359 22.8074 188.448 22.8074C188.537 22.8074 188.608 22.7365 188.608 22.6468C188.608 22.5571 188.537 22.4863 188.448 22.4863ZM188.448 31.5467C188.359 31.5467 188.288 31.6176 188.288 31.7073C188.288 31.797 188.359 31.8678 188.448 31.8678C188.537 31.8678 188.608 31.797 188.608 31.7073C188.608 31.6176 188.537 31.5467 188.448 31.5467ZM188.448 18.865C188.359 18.865 188.288 18.9358 188.288 19.0255C188.288 19.1152 188.359 19.186 188.448 19.186C188.537 19.186 188.608 19.1152 188.608 19.0255C188.608 18.9358 188.537 18.865 188.448 18.865ZM188.448 20.678C188.359 20.678 188.288 20.7488 188.288 20.8385C188.288 20.9282 188.359 20.9991 188.448 20.9991C188.537 20.9991 188.608 20.9282 188.608 20.8385C188.608 20.7488 188.537 20.678 188.448 20.678ZM188.448 35.1728C188.359 35.1728 188.288 35.2436 188.288 35.3333C188.288 35.423 188.359 35.4939 188.448 35.4939C188.537 35.4939 188.608 35.423 188.608 35.3333C188.608 35.2436 188.537 35.1728 188.448 35.1728ZM188.448 40.6072C188.359 40.6072 188.288 40.678 188.288 40.7677C188.288 40.8574 188.359 40.9282 188.448 40.9282C188.537 40.9282 188.608 40.8574 188.608 40.7677C188.608 40.678 188.537 40.6072 188.448 40.6072ZM186.769 17.0519C186.679 17.0519 186.609 17.1228 186.609 17.2125C186.609 17.3022 186.679 17.373 186.769 17.373C186.858 17.373 186.929 17.3022 186.929 17.2125C186.929 17.1228 186.858 17.0519 186.769 17.0519ZM186.769 18.865C186.679 18.865 186.609 18.9358 186.609 19.0255C186.609 19.1152 186.679 19.186 186.769 19.186C186.858 19.186 186.929 19.1152 186.929 19.0255C186.929 18.9358 186.858 18.865 186.769 18.865ZM188.448 36.9858C188.359 36.9858 188.288 37.0567 188.288 37.1464C188.288 37.2361 188.359 37.3069 188.448 37.3069C188.537 37.3069 188.608 37.2361 188.608 37.1464C188.608 37.0567 188.537 36.9858 188.448 36.9858ZM188.448 38.7989C188.359 38.7989 188.288 38.8697 188.288 38.9594C188.288 39.0491 188.359 39.1199 188.448 39.1199C188.537 39.1199 188.608 39.0491 188.608 38.9594C188.608 38.8697 188.537 38.7989 188.448 38.7989ZM186.769 20.678C186.679 20.678 186.609 20.7488 186.609 20.8385C186.609 20.9282 186.679 20.9991 186.769 20.9991C186.858 20.9991 186.929 20.9282 186.929 20.8385C186.929 20.7488 186.858 20.678 186.769 20.678ZM188.448 33.3598C188.359 33.3598 188.288 33.4306 188.288 33.5203C188.288 33.61 188.359 33.6808 188.448 33.6808C188.537 33.6808 188.608 33.61 188.608 33.5203C188.608 33.4306 188.537 33.3598 188.448 33.3598ZM185.09 27.9254C185 27.9254 184.93 27.9962 184.93 28.0859C184.93 28.1756 185 28.2465 185.09 28.2465C185.179 28.2465 185.25 28.1756 185.25 28.0859C185.25 27.9962 185.179 27.9254 185.09 27.9254ZM181.731 17.0519C181.642 17.0519 181.571 17.1228 181.571 17.2125C181.571 17.3022 181.642 17.373 181.731 17.373C181.82 17.373 181.891 17.3022 181.891 17.2125C181.891 17.1228 181.82 17.0519 181.731 17.0519ZM181.731 18.865C181.642 18.865 181.571 18.9358 181.571 19.0255C181.571 19.1152 181.642 19.186 181.731 19.186C181.82 19.186 181.891 19.1152 181.891 19.0255C181.891 18.9358 181.82 18.865 181.731 18.865ZM181.731 24.2993C181.642 24.2993 181.571 24.3702 181.571 24.4599C181.571 24.5496 181.642 24.6204 181.731 24.6204C181.82 24.6204 181.891 24.5496 181.891 24.4599C181.891 24.3702 181.82 24.2993 181.731 24.2993ZM181.731 22.4863C181.642 22.4863 181.571 22.5571 181.571 22.6468C181.571 22.7365 181.642 22.8074 181.731 22.8074C181.82 22.8074 181.891 22.7365 181.891 22.6468C181.891 22.5571 181.82 22.4863 181.731 22.4863ZM181.731 20.6733C181.642 20.6733 181.571 20.7441 181.571 20.8338C181.571 20.9235 181.642 20.9943 181.731 20.9943C181.82 20.9943 181.891 20.9235 181.891 20.8338C181.891 20.7441 181.82 20.6733 181.731 20.6733ZM183.41 36.9811C183.321 36.9811 183.25 37.0519 183.25 37.1416C183.25 37.2314 183.321 37.3022 183.41 37.3022C183.5 37.3022 183.57 37.2314 183.57 37.1416C183.57 37.0519 183.5 36.9811 183.41 36.9811ZM183.41 38.7941C183.321 38.7941 183.25 38.865 183.25 38.9547C183.25 39.0444 183.321 39.1152 183.41 39.1152C183.5 39.1152 183.57 39.0444 183.57 38.9547C183.57 38.865 183.5 38.7941 183.41 38.7941ZM183.41 40.6072C183.321 40.6072 183.25 40.678 183.25 40.7677C183.25 40.8574 183.321 40.9282 183.41 40.9282C183.5 40.9282 183.57 40.8574 183.57 40.7677C183.57 40.678 183.5 40.6072 183.41 40.6072ZM181.731 33.3598C181.642 33.3598 181.571 33.4306 181.571 33.5203C181.571 33.61 181.642 33.6808 181.731 33.6808C181.82 33.6808 181.891 33.61 181.891 33.5203C181.891 33.4306 181.82 33.3598 181.731 33.3598ZM181.731 26.1124C181.642 26.1124 181.571 26.1832 181.571 26.2729C181.571 26.3626 181.642 26.4334 181.731 26.4334C181.82 26.4334 181.891 26.3626 181.891 26.2729C181.891 26.1832 181.82 26.1124 181.731 26.1124ZM181.731 36.9858C181.642 36.9858 181.571 37.0567 181.571 37.1464C181.571 37.2361 181.642 37.3069 181.731 37.3069C181.82 37.3069 181.891 37.2361 181.891 37.1464C181.891 37.0567 181.82 36.9858 181.731 36.9858ZM181.731 35.1728C181.642 35.1728 181.571 35.2436 181.571 35.3333C181.571 35.423 181.642 35.4939 181.731 35.4939C181.82 35.4939 181.891 35.423 181.891 35.3333C181.891 35.2436 181.82 35.1728 181.731 35.1728ZM181.731 38.7989C181.642 38.7989 181.571 38.8697 181.571 38.9594C181.571 39.0491 181.642 39.1199 181.731 39.1199C181.82 39.1199 181.891 39.0491 181.891 38.9594C181.891 38.8697 181.82 38.7989 181.731 38.7989ZM183.41 35.1728C183.321 35.1728 183.25 35.2436 183.25 35.3333C183.25 35.423 183.321 35.4939 183.41 35.4939C183.5 35.4939 183.57 35.423 183.57 35.3333C183.57 35.2436 183.5 35.1728 183.41 35.1728ZM181.731 27.9254C181.642 27.9254 181.571 27.9962 181.571 28.0859C181.571 28.1756 181.642 28.2465 181.731 28.2465C181.82 28.2465 181.891 28.1756 181.891 28.0859C181.891 27.9962 181.82 27.9254 181.731 27.9254ZM181.731 29.7384C181.642 29.7384 181.571 29.8093 181.571 29.899C181.571 29.9887 181.642 30.0595 181.731 30.0595C181.82 30.0595 181.891 29.9887 181.891 29.899C181.891 29.8093 181.82 29.7384 181.731 29.7384ZM181.731 31.5515C181.642 31.5515 181.571 31.6223 181.571 31.712C181.571 31.8017 181.642 31.8725 181.731 31.8725C181.82 31.8725 181.891 31.8017 181.891 31.712C181.891 31.6223 181.82 31.5515 181.731 31.5515ZM185.09 29.7384C185 29.7384 184.93 29.8093 184.93 29.899C184.93 29.9887 185 30.0595 185.09 30.0595C185.179 30.0595 185.25 29.9887 185.25 29.899C185.25 29.8093 185.179 29.7384 185.09 29.7384ZM185.09 36.9858C185 36.9858 184.93 37.0567 184.93 37.1464C184.93 37.2361 185 37.3069 185.09 37.3069C185.179 37.3069 185.25 37.2361 185.25 37.1464C185.25 37.0567 185.179 36.9858 185.09 36.9858ZM185.09 38.7989C185 38.7989 184.93 38.8697 184.93 38.9594C184.93 39.0491 185 39.1199 185.09 39.1199C185.179 39.1199 185.25 39.0491 185.25 38.9594C185.25 38.8697 185.179 38.7989 185.09 38.7989ZM185.09 40.6119C185 40.6119 184.93 40.6827 184.93 40.7724C184.93 40.8621 185 40.933 185.09 40.933C185.179 40.933 185.25 40.8621 185.25 40.7724C185.25 40.6827 185.179 40.6119 185.09 40.6119ZM183.41 17.0567C183.321 17.0567 183.25 17.1275 183.25 17.2172C183.25 17.3069 183.321 17.3777 183.41 17.3777C183.5 17.3777 183.57 17.3069 183.57 17.2172C183.57 17.1275 183.5 17.0567 183.41 17.0567ZM185.09 35.1775C185 35.1775 184.93 35.2483 184.93 35.3381C184.93 35.4278 185 35.4986 185.09 35.4986C185.179 35.4986 185.25 35.4278 185.25 35.3381C185.25 35.2483 185.179 35.1775 185.09 35.1775ZM185.09 31.5515C185 31.5515 184.93 31.6223 184.93 31.712C184.93 31.8017 185 31.8725 185.09 31.8725C185.179 31.8725 185.25 31.8017 185.25 31.712C185.25 31.6223 185.179 31.5515 185.09 31.5515ZM183.41 18.8697C183.321 18.8697 183.25 18.9405 183.25 19.0302C183.25 19.1199 183.321 19.1907 183.41 19.1907C183.5 19.1907 183.57 19.1199 183.57 19.0302C183.57 18.9405 183.5 18.8697 183.41 18.8697ZM185.09 33.3645C185 33.3645 184.93 33.4353 184.93 33.525C184.93 33.6147 185 33.6856 185.09 33.6856C185.179 33.6856 185.25 33.6147 185.25 33.525C185.25 33.4353 185.179 33.3645 185.09 33.3645ZM183.41 27.9301C183.321 27.9301 183.25 28.0009 183.25 28.0907C183.25 28.1804 183.321 28.2512 183.41 28.2512C183.5 28.2512 183.57 28.1804 183.57 28.0907C183.57 28.0009 183.5 27.9301 183.41 27.9301ZM183.41 33.3645C183.321 33.3645 183.25 33.4353 183.25 33.525C183.25 33.6147 183.321 33.6856 183.41 33.6856C183.5 33.6856 183.57 33.6147 183.57 33.525C183.57 33.4353 183.5 33.3645 183.41 33.3645ZM183.41 29.7384C183.321 29.7384 183.25 29.8093 183.25 29.899C183.25 29.9887 183.321 30.0595 183.41 30.0595C183.5 30.0595 183.57 29.9887 183.57 29.899C183.57 29.8093 183.5 29.7384 183.41 29.7384ZM183.41 20.678C183.321 20.678 183.25 20.7488 183.25 20.8385C183.25 20.9282 183.321 20.9991 183.41 20.9991C183.5 20.9991 183.57 20.9282 183.57 20.8385C183.57 20.7488 183.5 20.678 183.41 20.678ZM183.41 31.5515C183.321 31.5515 183.25 31.6223 183.25 31.712C183.25 31.8017 183.321 31.8725 183.41 31.8725C183.5 31.8725 183.57 31.8017 183.57 31.712C183.57 31.6223 183.5 31.5515 183.41 31.5515ZM183.41 26.1171C183.321 26.1171 183.25 26.1879 183.25 26.2776C183.25 26.3673 183.321 26.4381 183.41 26.4381C183.5 26.4381 183.57 26.3673 183.57 26.2776C183.57 26.1879 183.5 26.1171 183.41 26.1171ZM183.41 22.491C183.321 22.491 183.25 22.5619 183.25 22.6516C183.25 22.7413 183.321 22.8121 183.41 22.8121C183.5 22.8121 183.57 22.7413 183.57 22.6516C183.57 22.5619 183.5 22.491 183.41 22.491ZM183.41 24.3041C183.321 24.3041 183.25 24.3749 183.25 24.4646C183.25 24.5543 183.321 24.6251 183.41 24.6251C183.5 24.6251 183.57 24.5543 183.57 24.4646C183.57 24.3749 183.5 24.3041 183.41 24.3041ZM173.339 38.7989C173.25 38.7989 173.18 38.8697 173.18 38.9594C173.18 39.0491 173.25 39.1199 173.339 39.1199C173.429 39.1199 173.499 39.0491 173.499 38.9594C173.499 38.8697 173.429 38.7989 173.339 38.7989ZM161.594 27.9254C161.505 27.9254 161.434 27.9962 161.434 28.0859C161.434 28.1756 161.505 28.2465 161.594 28.2465C161.683 28.2465 161.754 28.1756 161.754 28.0859C161.754 27.9962 161.683 27.9254 161.594 27.9254ZM161.594 29.7384C161.505 29.7384 161.434 29.8093 161.434 29.899C161.434 29.9887 161.505 30.0595 161.594 30.0595C161.683 30.0595 161.754 29.9887 161.754 29.899C161.754 29.8093 161.683 29.7384 161.594 29.7384ZM161.594 31.5515C161.505 31.5515 161.434 31.6223 161.434 31.712C161.434 31.8017 161.505 31.8725 161.594 31.8725C161.683 31.8725 161.754 31.8017 161.754 31.712C161.754 31.6223 161.683 31.5515 161.594 31.5515ZM161.594 35.1775C161.505 35.1775 161.434 35.2483 161.434 35.3381C161.434 35.4278 161.505 35.4986 161.594 35.4986C161.683 35.4986 161.754 35.4278 161.754 35.3381C161.754 35.2483 161.683 35.1775 161.594 35.1775ZM161.594 33.3645C161.505 33.3645 161.434 33.4353 161.434 33.525C161.434 33.6147 161.505 33.6856 161.594 33.6856C161.683 33.6856 161.754 33.6147 161.754 33.525C161.754 33.4353 161.683 33.3645 161.594 33.3645ZM161.594 26.1171C161.505 26.1171 161.434 26.1879 161.434 26.2776C161.434 26.3673 161.505 26.4381 161.594 26.4381C161.683 26.4381 161.754 26.3673 161.754 26.2776C161.754 26.1879 161.683 26.1171 161.594 26.1171ZM161.594 22.491C161.505 22.491 161.434 22.5619 161.434 22.6516C161.434 22.7413 161.505 22.8121 161.594 22.8121C161.683 22.8121 161.754 22.7413 161.754 22.6516C161.754 22.5619 161.683 22.491 161.594 22.491ZM161.594 20.678C161.505 20.678 161.434 20.7488 161.434 20.8385C161.434 20.9282 161.505 20.9991 161.594 20.9991C161.683 20.9991 161.754 20.9282 161.754 20.8385C161.754 20.7488 161.683 20.678 161.594 20.678ZM161.594 24.3041C161.505 24.3041 161.434 24.3749 161.434 24.4646C161.434 24.5543 161.505 24.6251 161.594 24.6251C161.683 24.6251 161.754 24.5543 161.754 24.4646C161.754 24.3749 161.683 24.3041 161.594 24.3041ZM159.915 26.1171C159.825 26.1171 159.755 26.1879 159.755 26.2776C159.755 26.3673 159.825 26.4381 159.915 26.4381C160.004 26.4381 160.075 26.3673 160.075 26.2776C160.075 26.1879 160.004 26.1171 159.915 26.1171ZM159.915 18.8697C159.825 18.8697 159.755 18.9405 159.755 19.0302C159.755 19.1199 159.825 19.1907 159.915 19.1907C160.004 19.1907 160.075 19.1199 160.075 19.0302C160.075 18.9405 160.004 18.8697 159.915 18.8697ZM159.915 22.4958C159.825 22.4958 159.755 22.5666 159.755 22.6563C159.755 22.746 159.825 22.8168 159.915 22.8168C160.004 22.8168 160.075 22.746 160.075 22.6563C160.075 22.5666 160.004 22.4958 159.915 22.4958ZM159.915 24.3088C159.825 24.3088 159.755 24.3796 159.755 24.4693C159.755 24.559 159.825 24.6298 159.915 24.6298C160.004 24.6298 160.075 24.559 160.075 24.4693C160.075 24.3796 160.004 24.3088 159.915 24.3088ZM161.594 40.6166C161.505 40.6166 161.434 40.6874 161.434 40.7771C161.434 40.8669 161.505 40.9377 161.594 40.9377C161.683 40.9377 161.754 40.8669 161.754 40.7771C161.754 40.6874 161.683 40.6166 161.594 40.6166ZM161.594 38.8036C161.505 38.8036 161.434 38.8744 161.434 38.9641C161.434 39.0538 161.505 39.1246 161.594 39.1246C161.683 39.1246 161.754 39.0538 161.754 38.9641C161.754 38.8744 161.683 38.8036 161.594 38.8036ZM161.594 36.9906C161.505 36.9906 161.434 37.0614 161.434 37.1511C161.434 37.2408 161.505 37.3116 161.594 37.3116C161.683 37.3116 161.754 37.2408 161.754 37.1511C161.754 37.0614 161.683 36.9906 161.594 36.9906ZM159.915 17.0614C159.825 17.0614 159.755 17.1322 159.755 17.2219C159.755 17.3116 159.825 17.3824 159.915 17.3824C160.004 17.3824 160.075 17.3116 160.075 17.2219C160.075 17.1322 160.004 17.0614 159.915 17.0614ZM159.915 20.6874C159.825 20.6874 159.755 20.7583 159.755 20.848C159.755 20.9377 159.825 21.0085 159.915 21.0085C160.004 21.0085 160.075 20.9377 160.075 20.848C160.075 20.7583 160.004 20.6874 159.915 20.6874ZM163.273 26.1218C163.184 26.1218 163.113 26.1926 163.113 26.2823C163.113 26.372 163.184 26.4429 163.273 26.4429C163.363 26.4429 163.433 26.372 163.433 26.2823C163.433 26.1926 163.363 26.1218 163.273 26.1218ZM163.273 24.3088C163.184 24.3088 163.113 24.3796 163.113 24.4693C163.113 24.559 163.184 24.6298 163.273 24.6298C163.363 24.6298 163.433 24.559 163.433 24.4693C163.433 24.3796 163.363 24.3088 163.273 24.3088ZM163.273 27.9348C163.184 27.9348 163.113 28.0057 163.113 28.0954C163.113 28.1851 163.184 28.2559 163.273 28.2559C163.363 28.2559 163.433 28.1851 163.433 28.0954C163.433 28.0057 163.363 27.9348 163.273 27.9348ZM163.273 22.5005C163.184 22.5005 163.113 22.5713 163.113 22.661C163.113 22.7507 163.184 22.8215 163.273 22.8215C163.363 22.8215 163.433 22.7507 163.433 22.661C163.433 22.5713 163.363 22.5005 163.273 22.5005ZM163.273 20.6874C163.184 20.6874 163.113 20.7583 163.113 20.848C163.113 20.9377 163.184 21.0085 163.273 21.0085C163.363 21.0085 163.433 20.9377 163.433 20.848C163.433 20.7583 163.363 20.6874 163.273 20.6874ZM163.273 29.7479C163.184 29.7479 163.113 29.8187 163.113 29.9084C163.113 29.9981 163.184 30.0689 163.273 30.0689C163.363 30.0689 163.433 29.9981 163.433 29.9084C163.433 29.8187 163.363 29.7479 163.273 29.7479ZM161.594 18.8744C161.505 18.8744 161.434 18.9452 161.434 19.0349C161.434 19.1246 161.505 19.1955 161.594 19.1955C161.683 19.1955 161.754 19.1246 161.754 19.0349C161.754 18.9452 161.683 18.8744 161.594 18.8744ZM163.273 18.8744C163.184 18.8744 163.113 18.9452 163.113 19.0349C163.113 19.1246 163.184 19.1955 163.273 19.1955C163.363 19.1955 163.433 19.1246 163.433 19.0349C163.433 18.9452 163.363 18.8744 163.273 18.8744ZM163.273 17.0614C163.184 17.0614 163.113 17.1322 163.113 17.2219C163.113 17.3116 163.184 17.3824 163.273 17.3824C163.363 17.3824 163.433 17.3116 163.433 17.2219C163.433 17.1322 163.363 17.0614 163.273 17.0614ZM163.273 38.8036C163.184 38.8036 163.113 38.8744 163.113 38.9641C163.113 39.0538 163.184 39.1246 163.273 39.1246C163.363 39.1246 163.433 39.0538 163.433 38.9641C163.433 38.8744 163.363 38.8036 163.273 38.8036ZM163.273 40.6166C163.184 40.6166 163.113 40.6874 163.113 40.7771C163.113 40.8669 163.184 40.9377 163.273 40.9377C163.363 40.9377 163.433 40.8669 163.433 40.7771C163.433 40.6874 163.363 40.6166 163.273 40.6166ZM161.594 17.0614C161.505 17.0614 161.434 17.1322 161.434 17.2219C161.434 17.3116 161.505 17.3824 161.594 17.3824C161.683 17.3824 161.754 17.3116 161.754 17.2219C161.754 17.1322 161.683 17.0614 161.594 17.0614ZM163.273 36.9906C163.184 36.9906 163.113 37.0614 163.113 37.1511C163.113 37.2408 163.184 37.3116 163.273 37.3116C163.363 37.3116 163.433 37.2408 163.433 37.1511C163.433 37.0614 163.363 36.9906 163.273 36.9906ZM163.273 33.3645C163.184 33.3645 163.113 33.4353 163.113 33.525C163.113 33.6147 163.184 33.6856 163.273 33.6856C163.363 33.6856 163.433 33.6147 163.433 33.525C163.433 33.4353 163.363 33.3645 163.273 33.3645ZM163.273 31.5515C163.184 31.5515 163.113 31.6223 163.113 31.712C163.113 31.8017 163.184 31.8725 163.273 31.8725C163.363 31.8725 163.433 31.8017 163.433 31.712C163.433 31.6223 163.363 31.5515 163.273 31.5515ZM163.273 35.1775C163.184 35.1775 163.113 35.2483 163.113 35.3381C163.113 35.4278 163.184 35.4986 163.273 35.4986C163.363 35.4986 163.433 35.4278 163.433 35.3381C163.433 35.2483 163.363 35.1775 163.273 35.1775ZM158.24 35.1775C158.151 35.1775 158.08 35.2483 158.08 35.3381C158.08 35.4278 158.151 35.4986 158.24 35.4986C158.33 35.4986 158.4 35.4278 158.4 35.3381C158.4 35.2483 158.33 35.1775 158.24 35.1775ZM156.561 24.3041C156.472 24.3041 156.401 24.3749 156.401 24.4646C156.401 24.5543 156.472 24.6251 156.561 24.6251C156.65 24.6251 156.721 24.5543 156.721 24.4646C156.721 24.3749 156.65 24.3041 156.561 24.3041ZM156.561 17.0567C156.472 17.0567 156.401 17.1275 156.401 17.2172C156.401 17.3069 156.472 17.3777 156.561 17.3777C156.65 17.3777 156.721 17.3069 156.721 17.2172C156.721 17.1275 156.65 17.0567 156.561 17.0567ZM156.561 20.6827C156.472 20.6827 156.401 20.7535 156.401 20.8432C156.401 20.933 156.472 21.0038 156.561 21.0038C156.65 21.0038 156.721 20.933 156.721 20.8432C156.721 20.7535 156.65 20.6827 156.561 20.6827ZM156.561 22.4958C156.472 22.4958 156.401 22.5666 156.401 22.6563C156.401 22.746 156.472 22.8168 156.561 22.8168C156.65 22.8168 156.721 22.746 156.721 22.6563C156.721 22.5666 156.65 22.4958 156.561 22.4958ZM156.561 18.8697C156.472 18.8697 156.401 18.9405 156.401 19.0302C156.401 19.1199 156.472 19.1907 156.561 19.1907C156.65 19.1907 156.721 19.1199 156.721 19.0302C156.721 18.9405 156.65 18.8697 156.561 18.8697ZM158.24 36.9906C158.151 36.9906 158.08 37.0614 158.08 37.1511C158.08 37.2408 158.151 37.3116 158.24 37.3116C158.33 37.3116 158.4 37.2408 158.4 37.1511C158.4 37.0614 158.33 36.9906 158.24 36.9906ZM159.919 27.9301C159.83 27.9301 159.76 28.0009 159.76 28.0907C159.76 28.1804 159.83 28.2512 159.919 28.2512C160.009 28.2512 160.079 28.1804 160.079 28.0907C160.079 28.0009 160.009 27.9301 159.919 27.9301ZM158.24 40.6119C158.151 40.6119 158.08 40.6827 158.08 40.7724C158.08 40.8621 158.151 40.933 158.24 40.933C158.33 40.933 158.4 40.8621 158.4 40.7724C158.4 40.6827 158.33 40.6119 158.24 40.6119ZM156.561 31.5515C156.472 31.5515 156.401 31.6223 156.401 31.712C156.401 31.8017 156.472 31.8725 156.561 31.8725C156.65 31.8725 156.721 31.8017 156.721 31.712C156.721 31.6223 156.65 31.5515 156.561 31.5515ZM156.561 36.9858C156.472 36.9858 156.401 37.0567 156.401 37.1464C156.401 37.2361 156.472 37.3069 156.561 37.3069C156.65 37.3069 156.721 37.2361 156.721 37.1464C156.721 37.0567 156.65 36.9858 156.561 36.9858ZM156.561 35.1728C156.472 35.1728 156.401 35.2436 156.401 35.3333C156.401 35.423 156.472 35.4939 156.561 35.4939C156.65 35.4939 156.721 35.423 156.721 35.3333C156.721 35.2436 156.65 35.1728 156.561 35.1728ZM156.561 38.7989C156.472 38.7989 156.401 38.8697 156.401 38.9594C156.401 39.0491 156.472 39.1199 156.561 39.1199C156.65 39.1199 156.721 39.0491 156.721 38.9594C156.721 38.8697 156.65 38.7989 156.561 38.7989ZM156.561 33.3645C156.472 33.3645 156.401 33.4353 156.401 33.525C156.401 33.6147 156.472 33.6856 156.561 33.6856C156.65 33.6856 156.721 33.6147 156.721 33.525C156.721 33.4353 156.65 33.3645 156.561 33.3645ZM156.561 26.1171C156.472 26.1171 156.401 26.1879 156.401 26.2776C156.401 26.3673 156.472 26.4381 156.561 26.4381C156.65 26.4381 156.721 26.3673 156.721 26.2776C156.721 26.1879 156.65 26.1171 156.561 26.1171ZM164.953 40.6119C164.863 40.6119 164.793 40.6827 164.793 40.7724C164.793 40.8621 164.863 40.933 164.953 40.933C165.042 40.933 165.112 40.8621 165.112 40.7724C165.112 40.6827 165.042 40.6119 164.953 40.6119ZM156.561 27.9301C156.472 27.9301 156.401 28.0009 156.401 28.0907C156.401 28.1804 156.472 28.2512 156.561 28.2512C156.65 28.2512 156.721 28.1804 156.721 28.0907C156.721 28.0009 156.65 27.9301 156.561 27.9301ZM156.561 29.7432C156.472 29.7432 156.401 29.814 156.401 29.9037C156.401 29.9934 156.472 30.0642 156.561 30.0642C156.65 30.0642 156.721 29.9934 156.721 29.9037C156.721 29.814 156.65 29.7432 156.561 29.7432ZM158.24 38.8036C158.151 38.8036 158.08 38.8744 158.08 38.9641C158.08 39.0538 158.151 39.1246 158.24 39.1246C158.33 39.1246 158.4 39.0538 158.4 38.9641C158.4 38.8744 158.33 38.8036 158.24 38.8036ZM159.919 36.9906C159.83 36.9906 159.76 37.0614 159.76 37.1511C159.76 37.2408 159.83 37.3116 159.919 37.3116C160.009 37.3116 160.079 37.2408 160.079 37.1511C160.079 37.0614 160.009 36.9906 159.919 36.9906ZM159.919 40.6166C159.83 40.6166 159.76 40.6874 159.76 40.7771C159.76 40.8669 159.83 40.9377 159.919 40.9377C160.009 40.9377 160.079 40.8669 160.079 40.7771C160.079 40.6874 160.009 40.6166 159.919 40.6166ZM158.24 17.0614C158.151 17.0614 158.08 17.1322 158.08 17.2219C158.08 17.3116 158.151 17.3824 158.24 17.3824C158.33 17.3824 158.4 17.3116 158.4 17.2219C158.4 17.1322 158.33 17.0614 158.24 17.0614ZM159.919 35.1822C159.83 35.1822 159.76 35.2531 159.76 35.3428C159.76 35.4325 159.83 35.5033 159.919 35.5033C160.009 35.5033 160.079 35.4325 160.079 35.3428C160.079 35.2531 160.009 35.1822 159.919 35.1822ZM158.24 18.8744C158.151 18.8744 158.08 18.9452 158.08 19.0349C158.08 19.1246 158.151 19.1955 158.24 19.1955C158.33 19.1955 158.4 19.1246 158.4 19.0349C158.4 18.9452 158.33 18.8744 158.24 18.8744ZM158.24 33.3692C158.151 33.3692 158.08 33.44 158.08 33.5297C158.08 33.6195 158.151 33.6903 158.24 33.6903C158.33 33.6903 158.4 33.6195 158.4 33.5297C158.4 33.44 158.33 33.3692 158.24 33.3692ZM159.919 33.3692C159.83 33.3692 159.76 33.44 159.76 33.5297C159.76 33.6195 159.83 33.6903 159.919 33.6903C160.009 33.6903 160.079 33.6195 160.079 33.5297C160.079 33.44 160.009 33.3692 159.919 33.3692ZM159.919 31.5562C159.83 31.5562 159.76 31.627 159.76 31.7167C159.76 31.8064 159.83 31.8772 159.919 31.8772C160.009 31.8772 160.079 31.8064 160.079 31.7167C160.079 31.627 160.009 31.5562 159.919 31.5562ZM159.919 29.7432C159.83 29.7432 159.76 29.814 159.76 29.9037C159.76 29.9934 159.83 30.0642 159.919 30.0642C160.009 30.0642 160.079 29.9934 160.079 29.9037C160.079 29.814 160.009 29.7432 159.919 29.7432ZM158.24 29.7432C158.151 29.7432 158.08 29.814 158.08 29.9037C158.08 29.9934 158.151 30.0642 158.24 30.0642C158.33 30.0642 158.4 29.9934 158.4 29.9037C158.4 29.814 158.33 29.7432 158.24 29.7432ZM158.24 20.6827C158.151 20.6827 158.08 20.7535 158.08 20.8432C158.08 20.933 158.151 21.0038 158.24 21.0038C158.33 21.0038 158.4 20.933 158.4 20.8432C158.4 20.7535 158.33 20.6827 158.24 20.6827ZM158.24 31.5562C158.151 31.5562 158.08 31.627 158.08 31.7167C158.08 31.8064 158.151 31.8772 158.24 31.8772C158.33 31.8772 158.4 31.8064 158.4 31.7167C158.4 31.627 158.33 31.5562 158.24 31.5562ZM158.24 27.9301C158.151 27.9301 158.08 28.0009 158.08 28.0907C158.08 28.1804 158.151 28.2512 158.24 28.2512C158.33 28.2512 158.4 28.1804 158.4 28.0907C158.4 28.0009 158.33 27.9301 158.24 27.9301ZM171.665 17.0567C171.576 17.0567 171.505 17.1275 171.505 17.2172C171.505 17.3069 171.576 17.3777 171.665 17.3777C171.754 17.3777 171.825 17.3069 171.825 17.2172C171.825 17.1275 171.754 17.0567 171.665 17.0567ZM158.24 26.1171C158.151 26.1171 158.08 26.1879 158.08 26.2776C158.08 26.3673 158.151 26.4381 158.24 26.4381C158.33 26.4381 158.4 26.3673 158.4 26.2776C158.4 26.1879 158.33 26.1171 158.24 26.1171ZM158.24 24.3041C158.151 24.3041 158.08 24.3749 158.08 24.4646C158.08 24.5543 158.151 24.6251 158.24 24.6251C158.33 24.6251 158.4 24.5543 158.4 24.4646C158.4 24.3749 158.33 24.3041 158.24 24.3041ZM158.24 22.491C158.151 22.491 158.08 22.5619 158.08 22.6516C158.08 22.7413 158.151 22.8121 158.24 22.8121C158.33 22.8121 158.4 22.7413 158.4 22.6516C158.4 22.5619 158.33 22.491 158.24 22.491ZM169.986 31.5515C169.896 31.5515 169.826 31.6223 169.826 31.712C169.826 31.8017 169.896 31.8725 169.986 31.8725C170.075 31.8725 170.146 31.8017 170.146 31.712C170.146 31.6223 170.075 31.5515 169.986 31.5515ZM169.986 33.3645C169.896 33.3645 169.826 33.4353 169.826 33.525C169.826 33.6147 169.896 33.6856 169.986 33.6856C170.075 33.6856 170.146 33.6147 170.146 33.525C170.146 33.4353 170.075 33.3645 169.986 33.3645ZM169.986 29.7384C169.896 29.7384 169.826 29.8093 169.826 29.899C169.826 29.9887 169.896 30.0595 169.986 30.0595C170.075 30.0595 170.146 29.9887 170.146 29.899C170.146 29.8093 170.075 29.7384 169.986 29.7384ZM169.986 35.1728C169.896 35.1728 169.826 35.2436 169.826 35.3333C169.826 35.423 169.896 35.4939 169.986 35.4939C170.075 35.4939 170.146 35.423 170.146 35.3333C170.146 35.2436 170.075 35.1728 169.986 35.1728ZM169.986 26.1124C169.896 26.1124 169.826 26.1832 169.826 26.2729C169.826 26.3626 169.896 26.4334 169.986 26.4334C170.075 26.4334 170.146 26.3626 170.146 26.2729C170.146 26.1832 170.075 26.1124 169.986 26.1124ZM169.986 24.2993C169.896 24.2993 169.826 24.3702 169.826 24.4599C169.826 24.5496 169.896 24.6204 169.986 24.6204C170.075 24.6204 170.146 24.5496 170.146 24.4599C170.146 24.3702 170.075 24.2993 169.986 24.2993ZM169.986 27.9254C169.896 27.9254 169.826 27.9962 169.826 28.0859C169.826 28.1756 169.896 28.2465 169.986 28.2465C170.075 28.2465 170.146 28.1756 170.146 28.0859C170.146 27.9962 170.075 27.9254 169.986 27.9254ZM169.986 36.9858C169.896 36.9858 169.826 37.0567 169.826 37.1464C169.826 37.2361 169.896 37.3069 169.986 37.3069C170.075 37.3069 170.146 37.2361 170.146 37.1464C170.146 37.0567 170.075 36.9858 169.986 36.9858ZM168.306 26.1124C168.217 26.1124 168.146 26.1832 168.146 26.2729C168.146 26.3626 168.217 26.4334 168.306 26.4334C168.396 26.4334 168.466 26.3626 168.466 26.2729C168.466 26.1832 168.396 26.1124 168.306 26.1124ZM168.306 24.2993C168.217 24.2993 168.146 24.3702 168.146 24.4599C168.146 24.5496 168.217 24.6204 168.306 24.6204C168.396 24.6204 168.466 24.5496 168.466 24.4599C168.466 24.3702 168.396 24.2993 168.306 24.2993ZM168.306 20.6733C168.217 20.6733 168.146 20.7441 168.146 20.8338C168.146 20.9235 168.217 20.9943 168.306 20.9943C168.396 20.9943 168.466 20.9235 168.466 20.8338C168.466 20.7441 168.396 20.6733 168.306 20.6733ZM169.986 38.7941C169.896 38.7941 169.826 38.865 169.826 38.9547C169.826 39.0444 169.896 39.1152 169.986 39.1152C170.075 39.1152 170.146 39.0444 170.146 38.9547C170.146 38.865 170.075 38.7941 169.986 38.7941ZM169.986 22.4863C169.896 22.4863 169.826 22.5571 169.826 22.6468C169.826 22.7365 169.896 22.8074 169.986 22.8074C170.075 22.8074 170.146 22.7365 170.146 22.6468C170.146 22.5571 170.075 22.4863 169.986 22.4863ZM168.306 22.4863C168.217 22.4863 168.146 22.5571 168.146 22.6468C168.146 22.7365 168.217 22.8074 168.306 22.8074C168.396 22.8074 168.466 22.7365 168.466 22.6468C168.466 22.5571 168.396 22.4863 168.306 22.4863ZM168.306 18.8602C168.217 18.8602 168.146 18.9311 168.146 19.0208C168.146 19.1105 168.217 19.1813 168.306 19.1813C168.396 19.1813 168.466 19.1105 168.466 19.0208C168.466 18.9311 168.396 18.8602 168.306 18.8602ZM169.986 40.6025C169.896 40.6025 169.826 40.6733 169.826 40.763C169.826 40.8527 169.896 40.9235 169.986 40.9235C170.075 40.9235 170.146 40.8527 170.146 40.763C170.146 40.6733 170.075 40.6025 169.986 40.6025ZM168.306 17.0472C168.217 17.0472 168.146 17.118 168.146 17.2077C168.146 17.2975 168.217 17.3683 168.306 17.3683C168.396 17.3683 168.466 17.2975 168.466 17.2077C168.466 17.118 168.396 17.0472 168.306 17.0472ZM171.665 20.6733C171.576 20.6733 171.505 20.7441 171.505 20.8338C171.505 20.9235 171.576 20.9943 171.665 20.9943C171.754 20.9943 171.825 20.9235 171.825 20.8338C171.825 20.7441 171.754 20.6733 171.665 20.6733ZM169.986 20.6733C169.896 20.6733 169.826 20.7441 169.826 20.8338C169.826 20.9235 169.896 20.9943 169.986 20.9943C170.075 20.9943 170.146 20.9235 170.146 20.8338C170.146 20.7441 170.075 20.6733 169.986 20.6733ZM171.665 26.1076C171.576 26.1076 171.505 26.1785 171.505 26.2682C171.505 26.3579 171.576 26.4287 171.665 26.4287C171.754 26.4287 171.825 26.3579 171.825 26.2682C171.825 26.1785 171.754 26.1076 171.665 26.1076ZM171.665 31.542C171.576 31.542 171.505 31.6128 171.505 31.7025C171.505 31.7923 171.576 31.8631 171.665 31.8631C171.754 31.8631 171.825 31.7923 171.825 31.7025C171.825 31.6128 171.754 31.542 171.665 31.542ZM171.665 29.729C171.576 29.729 171.505 29.7998 171.505 29.8895C171.505 29.9792 171.576 30.05 171.665 30.05C171.754 30.05 171.825 29.9792 171.825 29.8895C171.825 29.7998 171.754 29.729 171.665 29.729ZM171.665 24.2946C171.576 24.2946 171.505 24.3654 171.505 24.4551C171.505 24.5449 171.576 24.6157 171.665 24.6157C171.754 24.6157 171.825 24.5449 171.825 24.4551C171.825 24.3654 171.754 24.2946 171.665 24.2946ZM171.665 18.8602C171.576 18.8602 171.505 18.9311 171.505 19.0208C171.505 19.1105 171.576 19.1813 171.665 19.1813C171.754 19.1813 171.825 19.1105 171.825 19.0208C171.825 18.9311 171.754 18.8602 171.665 18.8602ZM171.665 22.4863C171.576 22.4863 171.505 22.5571 171.505 22.6468C171.505 22.7365 171.576 22.8074 171.665 22.8074C171.754 22.8074 171.825 22.7365 171.825 22.6468C171.825 22.5571 171.754 22.4863 171.665 22.4863ZM168.306 27.9207C168.217 27.9207 168.146 27.9915 168.146 28.0812C168.146 28.1709 168.217 28.2417 168.306 28.2417C168.396 28.2417 168.466 28.1709 168.466 28.0812C168.466 27.9915 168.396 27.9207 168.306 27.9207ZM171.665 27.9207C171.576 27.9207 171.505 27.9915 171.505 28.0812C171.505 28.1709 171.576 28.2417 171.665 28.2417C171.754 28.2417 171.825 28.1709 171.825 28.0812C171.825 27.9915 171.754 27.9207 171.665 27.9207ZM171.665 33.3551C171.576 33.3551 171.505 33.4259 171.505 33.5156C171.505 33.6053 171.576 33.6761 171.665 33.6761C171.754 33.6761 171.825 33.6053 171.825 33.5156C171.825 33.4259 171.754 33.3551 171.665 33.3551ZM169.986 18.8602C169.896 18.8602 169.826 18.9311 169.826 19.0208C169.826 19.1105 169.896 19.1813 169.986 19.1813C170.075 19.1813 170.146 19.1105 170.146 19.0208C170.146 18.9311 170.075 18.8602 169.986 18.8602ZM171.665 40.6025C171.576 40.6025 171.505 40.6733 171.505 40.763C171.505 40.8527 171.576 40.9235 171.665 40.9235C171.754 40.9235 171.825 40.8527 171.825 40.763C171.825 40.6733 171.754 40.6025 171.665 40.6025ZM169.986 17.0472C169.896 17.0472 169.826 17.118 169.826 17.2077C169.826 17.2975 169.896 17.3683 169.986 17.3683C170.075 17.3683 170.146 17.2975 170.146 17.2077C170.146 17.118 170.075 17.0472 169.986 17.0472ZM171.665 38.7894C171.576 38.7894 171.505 38.8602 171.505 38.95C171.505 39.0397 171.576 39.1105 171.665 39.1105C171.754 39.1105 171.825 39.0397 171.825 38.95C171.825 38.8602 171.754 38.7894 171.665 38.7894ZM171.665 35.1634C171.576 35.1634 171.505 35.2342 171.505 35.3239C171.505 35.4136 171.576 35.4844 171.665 35.4844C171.754 35.4844 171.825 35.4136 171.825 35.3239C171.825 35.2342 171.754 35.1634 171.665 35.1634ZM171.665 36.9764C171.576 36.9764 171.505 37.0472 171.505 37.1369C171.505 37.2266 171.576 37.2975 171.665 37.2975C171.754 37.2975 171.825 37.2266 171.825 37.1369C171.825 37.0472 171.754 36.9764 171.665 36.9764ZM164.953 18.8555C164.863 18.8555 164.793 18.9263 164.793 19.0161C164.793 19.1058 164.863 19.1766 164.953 19.1766C165.042 19.1766 165.112 19.1058 165.112 19.0161C165.112 18.9263 165.042 18.8555 164.953 18.8555ZM164.953 38.7894C164.863 38.7894 164.793 38.8602 164.793 38.95C164.793 39.0397 164.863 39.1105 164.953 39.1105C165.042 39.1105 165.112 39.0397 165.112 38.95C165.112 38.8602 165.042 38.7894 164.953 38.7894ZM164.953 17.0472C164.863 17.0472 164.793 17.118 164.793 17.2077C164.793 17.2975 164.863 17.3683 164.953 17.3683C165.042 17.3683 165.112 17.2975 165.112 17.2077C165.112 17.118 165.042 17.0472 164.953 17.0472ZM164.953 20.6733C164.863 20.6733 164.793 20.7441 164.793 20.8338C164.793 20.9235 164.863 20.9943 164.953 20.9943C165.042 20.9943 165.112 20.9235 165.112 20.8338C165.112 20.7441 165.042 20.6733 164.953 20.6733ZM164.953 22.4863C164.863 22.4863 164.793 22.5571 164.793 22.6468C164.793 22.7365 164.863 22.8074 164.953 22.8074C165.042 22.8074 165.112 22.7365 165.112 22.6468C165.112 22.5571 165.042 22.4863 164.953 22.4863ZM166.632 36.9811C166.542 36.9811 166.472 37.0519 166.472 37.1416C166.472 37.2314 166.542 37.3022 166.632 37.3022C166.721 37.3022 166.792 37.2314 166.792 37.1416C166.792 37.0519 166.721 36.9811 166.632 36.9811ZM166.632 40.6072C166.542 40.6072 166.472 40.678 166.472 40.7677C166.472 40.8574 166.542 40.9282 166.632 40.9282C166.721 40.9282 166.792 40.8574 166.792 40.7677C166.792 40.678 166.721 40.6072 166.632 40.6072ZM164.953 24.2993C164.863 24.2993 164.793 24.3702 164.793 24.4599C164.793 24.5496 164.863 24.6204 164.953 24.6204C165.042 24.6204 165.112 24.5496 165.112 24.4599C165.112 24.3702 165.042 24.2993 164.953 24.2993ZM166.632 35.1728C166.542 35.1728 166.472 35.2436 166.472 35.3333C166.472 35.423 166.542 35.4939 166.632 35.4939C166.721 35.4939 166.792 35.423 166.792 35.3333C166.792 35.2436 166.721 35.1728 166.632 35.1728ZM166.632 38.7989C166.542 38.7989 166.472 38.8697 166.472 38.9594C166.472 39.0491 166.542 39.1199 166.632 39.1199C166.721 39.1199 166.792 39.0491 166.792 38.9594C166.792 38.8697 166.721 38.7989 166.632 38.7989ZM164.953 35.1728C164.863 35.1728 164.793 35.2436 164.793 35.3333C164.793 35.423 164.863 35.4939 164.953 35.4939C165.042 35.4939 165.112 35.423 165.112 35.3333C165.112 35.2436 165.042 35.1728 164.953 35.1728ZM164.953 33.3598C164.863 33.3598 164.793 33.4306 164.793 33.5203C164.793 33.61 164.863 33.6808 164.953 33.6808C165.042 33.6808 165.112 33.61 165.112 33.5203C165.112 33.4306 165.042 33.3598 164.953 33.3598ZM164.953 36.9858C164.863 36.9858 164.793 37.0567 164.793 37.1464C164.793 37.2361 164.863 37.3069 164.953 37.3069C165.042 37.3069 165.112 37.2361 165.112 37.1464C165.112 37.0567 165.042 36.9858 164.953 36.9858ZM164.953 31.5515C164.863 31.5515 164.793 31.6223 164.793 31.712C164.793 31.8017 164.863 31.8725 164.953 31.8725C165.042 31.8725 165.112 31.8017 165.112 31.712C165.112 31.6223 165.042 31.5515 164.953 31.5515ZM164.953 27.9254C164.863 27.9254 164.793 27.9962 164.793 28.0859C164.793 28.1756 164.863 28.2465 164.953 28.2465C165.042 28.2465 165.112 28.1756 165.112 28.0859C165.112 27.9962 165.042 27.9254 164.953 27.9254ZM164.953 29.7384C164.863 29.7384 164.793 29.8093 164.793 29.899C164.793 29.9887 164.863 30.0595 164.953 30.0595C165.042 30.0595 165.112 29.9887 165.112 29.899C165.112 29.8093 165.042 29.7384 164.953 29.7384ZM164.953 26.1124C164.863 26.1124 164.793 26.1832 164.793 26.2729C164.793 26.3626 164.863 26.4334 164.953 26.4334C165.042 26.4334 165.112 26.3626 165.112 26.2729C165.112 26.1832 165.042 26.1124 164.953 26.1124ZM166.632 20.678C166.542 20.678 166.472 20.7488 166.472 20.8385C166.472 20.9282 166.542 20.9991 166.632 20.9991C166.721 20.9991 166.792 20.9282 166.792 20.8385C166.792 20.7488 166.721 20.678 166.632 20.678ZM168.311 38.7989C168.222 38.7989 168.151 38.8697 168.151 38.9594C168.151 39.0491 168.222 39.1199 168.311 39.1199C168.4 39.1199 168.471 39.0491 168.471 38.9594C168.471 38.8697 168.4 38.7989 168.311 38.7989ZM168.311 36.9858C168.222 36.9858 168.151 37.0567 168.151 37.1464C168.151 37.2361 168.222 37.3069 168.311 37.3069C168.4 37.3069 168.471 37.2361 168.471 37.1464C168.471 37.0567 168.4 36.9858 168.311 36.9858ZM168.311 40.6119C168.222 40.6119 168.151 40.6827 168.151 40.7724C168.151 40.8621 168.222 40.933 168.311 40.933C168.4 40.933 168.471 40.8621 168.471 40.7724C168.471 40.6827 168.4 40.6119 168.311 40.6119ZM166.632 17.0567C166.542 17.0567 166.472 17.1275 166.472 17.2172C166.472 17.3069 166.542 17.3777 166.632 17.3777C166.721 17.3777 166.792 17.3069 166.792 17.2172C166.792 17.1275 166.721 17.0567 166.632 17.0567ZM166.632 18.8697C166.542 18.8697 166.472 18.9405 166.472 19.0302C166.472 19.1199 166.542 19.1907 166.632 19.1907C166.721 19.1907 166.792 19.1199 166.792 19.0302C166.792 18.9405 166.721 18.8697 166.632 18.8697ZM168.311 31.5515C168.222 31.5515 168.151 31.6223 168.151 31.712C168.151 31.8017 168.222 31.8725 168.311 31.8725C168.4 31.8725 168.471 31.8017 168.471 31.712C168.471 31.6223 168.4 31.5515 168.311 31.5515ZM168.311 35.1775C168.222 35.1775 168.151 35.2483 168.151 35.3381C168.151 35.4278 168.222 35.4986 168.311 35.4986C168.4 35.4986 168.471 35.4278 168.471 35.3381C168.471 35.2483 168.4 35.1775 168.311 35.1775ZM168.311 33.3645C168.222 33.3645 168.151 33.4353 168.151 33.525C168.151 33.6147 168.222 33.6856 168.311 33.6856C168.4 33.6856 168.471 33.6147 168.471 33.525C168.471 33.4353 168.4 33.3645 168.311 33.3645ZM166.632 29.7384C166.542 29.7384 166.472 29.8093 166.472 29.899C166.472 29.9887 166.542 30.0595 166.632 30.0595C166.721 30.0595 166.792 29.9887 166.792 29.899C166.792 29.8093 166.721 29.7384 166.632 29.7384ZM166.632 33.3645C166.542 33.3645 166.472 33.4353 166.472 33.525C166.472 33.6147 166.542 33.6856 166.632 33.6856C166.721 33.6856 166.792 33.6147 166.792 33.525C166.792 33.4353 166.721 33.3645 166.632 33.3645ZM166.632 27.9301C166.542 27.9301 166.472 28.0009 166.472 28.0907C166.472 28.1804 166.542 28.2512 166.632 28.2512C166.721 28.2512 166.792 28.1804 166.792 28.0907C166.792 28.0009 166.721 27.9301 166.632 27.9301ZM166.632 31.5562C166.542 31.5562 166.472 31.627 166.472 31.7167C166.472 31.8064 166.542 31.8772 166.632 31.8772C166.721 31.8772 166.792 31.8064 166.792 31.7167C166.792 31.627 166.721 31.5562 166.632 31.5562ZM166.632 24.3088C166.542 24.3088 166.472 24.3796 166.472 24.4693C166.472 24.559 166.542 24.6298 166.632 24.6298C166.721 24.6298 166.792 24.559 166.792 24.4693C166.792 24.3796 166.721 24.3088 166.632 24.3088ZM166.632 26.1218C166.542 26.1218 166.472 26.1926 166.472 26.2823C166.472 26.372 166.542 26.4429 166.632 26.4429C166.721 26.4429 166.792 26.372 166.792 26.2823C166.792 26.1926 166.721 26.1218 166.632 26.1218ZM166.632 22.4958C166.542 22.4958 166.472 22.5666 166.472 22.6563C166.472 22.746 166.542 22.8168 166.632 22.8168C166.721 22.8168 166.792 22.746 166.792 22.6563C166.792 22.5666 166.721 22.4958 166.632 22.4958ZM168.311 29.7432C168.222 29.7432 168.151 29.814 168.151 29.9037C168.151 29.9934 168.222 30.0642 168.311 30.0642C168.4 30.0642 168.471 29.9934 168.471 29.9037C168.471 29.814 168.4 29.7432 168.311 29.7432Z"
                fill="url(#paint6_linear_1235_2507)"
              />
              <path
                opacity="0.2"
                d="M8 18.0038L16.9702 9H8V18.0038Z"
                fill="#14FF00"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1235_2507"
                  x1="7.5442"
                  y1="29"
                  x2="195.287"
                  y2="29"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#00FF29" />
                  <stop offset="0.17" stop-color="#00E224" />
                  <stop offset="0.44" stop-color="#00B913" />
                  <stop offset="0.68" stop-color="#009C06" />
                  <stop offset="0.87" stop-color="#008A06" />
                  <stop offset="1" stop-color="#00840D" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_1235_2507"
                  x1="149.719"
                  y1="9.5"
                  x2="158.61"
                  y2="9.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#00FF29" />
                  <stop offset="0.17" stop-color="#00E224" />
                  <stop offset="0.44" stop-color="#00B913" />
                  <stop offset="0.68" stop-color="#009C06" />
                  <stop offset="0.87" stop-color="#008A06" />
                  <stop offset="1" stop-color="#00840D" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_1235_2507"
                  x1="98.2056"
                  y1="9.5"
                  x2="136.606"
                  y2="9.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#00FF29" />
                  <stop offset="0.17" stop-color="#00E224" />
                  <stop offset="0.44" stop-color="#00B913" />
                  <stop offset="0.68" stop-color="#009C06" />
                  <stop offset="0.87" stop-color="#008A06" />
                  <stop offset="1" stop-color="#00840D" />
                </linearGradient>
                <linearGradient
                  id="paint3_linear_1235_2507"
                  x1="9.31208"
                  y1="35.5156"
                  x2="193.514"
                  y2="35.5156"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#00FF29" />
                  <stop offset="0.17" stop-color="#00E224" />
                  <stop offset="0.44" stop-color="#00B913" />
                  <stop offset="0.68" stop-color="#009C06" />
                  <stop offset="0.87" stop-color="#008A06" />
                  <stop offset="1" stop-color="#00840D" />
                </linearGradient>
                <linearGradient
                  id="paint4_linear_1235_2507"
                  x1="176.432"
                  y1="14.3848"
                  x2="193.108"
                  y2="14.3848"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#00FF29" />
                  <stop offset="0.17" stop-color="#00E224" />
                  <stop offset="0.44" stop-color="#00B913" />
                  <stop offset="0.68" stop-color="#009C06" />
                  <stop offset="0.87" stop-color="#008A06" />
                  <stop offset="1" stop-color="#00840D" />
                </linearGradient>
                <linearGradient
                  id="paint5_linear_1235_2507"
                  x1="45.1102"
                  y1="-26.5288"
                  x2="145.714"
                  y2="73.6947"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#00FF1A" />
                  <stop offset="0.2" stop-color="#00DE24" stop-opacity="0.76" />
                  <stop
                    offset="0.41"
                    stop-color="#00BE1E"
                    stop-opacity="0.53"
                  />
                  <stop offset="0.6" stop-color="#03A500" stop-opacity="0.34" />
                  <stop
                    offset="0.77"
                    stop-color="#009318"
                    stop-opacity="0.21"
                  />
                  <stop
                    offset="0.91"
                    stop-color="#008805"
                    stop-opacity="0.13"
                  />
                  <stop offset="1" stop-color="#00841D" stop-opacity="0.1" />
                </linearGradient>
                <linearGradient
                  id="paint6_linear_1235_2507"
                  x1="88.9859"
                  y1="28.9358"
                  x2="188.599"
                  y2="28.9358"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#008405" stop-opacity="0.1" />
                  <stop
                    offset="0.09"
                    stop-color="#008805"
                    stop-opacity="0.13"
                  />
                  <stop
                    offset="0.23"
                    stop-color="#00930F"
                    stop-opacity="0.21"
                  />
                  <stop offset="0.4" stop-color="#00A507" stop-opacity="0.34" />
                  <stop
                    offset="0.59"
                    stop-color="#00BE13"
                    stop-opacity="0.53"
                  />
                  <stop offset="0.8" stop-color="#00DE16" stop-opacity="0.76" />
                  <stop offset="1" stop-color="#00FF0A" />
                </linearGradient>
              </defs>
            </svg>
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
              <div
                className="social-links"
                style={{ marginTop: "50px", zIndex: 10000000 }}
              >
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
            <div className="overlay-close" onClick={toggleMenu}></div>
          </div>
        )}
      </div>
      <div id="tv" className="memetv">
        <div id="screen">
          <div id="glass">
            <div className="inner-glass">
              <div class="noise"></div>
              <div
                className={showWelcomeMessage ? " inner-text1" : "inner-text"}
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
                                3.Receive TheMEMETv tokens for every second you
                                watch
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
                  </div>
                )}
                {showWelcomeMessage && (
                  <div className="row img-res">
                    <div className="col-md-12 ">
                      <div>
                        <img className="animation-logo" src={welcome} />{" "}
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
                              3.Receive TheMEMETv tokens for every second you
                              watch
                            </p>
                            <p className="text-head  text-left pb-0">
                              MOST IMPORTANT: doNothing else while watching the
                              Meme Lords.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div>
                  {showConnectWalletMessage &&
                    !address &&
                    activeButton == "play" && (
                      <div
                        style={{
                          zIndex: 1000000,
                        }}
                      >
                        <div className="intro-wallet">
                          <div class="welcome-info">
                            <div class="text-head pt-2">
                              <h2 id="textcolorabout" class="welcome-para">
                                Welcome to TheMemeTV!
                              </h2>
                              <p class="about-para2 pb-3">
                                Connect your crypto wallet to our platform now
                                and begin earning tokens while you indulge in
                                Meme videos.
                              </p>
                            </div>
                            <div className="mob-wel">
                              <button
                                onClick={handleCloseMessage}
                                className="btn-outline"
                              >
                                doNothing
                              </button>{" "}
                              &nbsp;
                              <button
                                style={{
                                  border: "2px solid #4CB04F",
                                }}
                                className="cnt-wallet"
                                onClick={handleConnectWallet}
                              >
                                <ConnectWallet
                                  switchToActiveChain={true}
                                  style={{
                                    backgroundColor: "rgba(0, 0, 0, 0)",
                                    color: "#0E4911",
                                  }}
                                />
                              </button>{" "}
                            </div>

                            <div className="row desk-wel">
                              <div className="col-12 pb-2">
                                <div className="">
                                  <button
                                    style={{
                                      border: "2px solid #4CB04F",
                                    }}
                                    className="cnt-wallet"
                                    onClick={handleConnectWallet}
                                  >
                                    <ConnectWallet
                                      switchToActiveChain={true}
                                      style={{
                                        backgroundColor: "rgba(0, 0, 0, 0)",
                                        color: "#0E4911",
                                      }}
                                    />
                                  </button>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="">
                                  <button
                                    onClick={handleCloseMessage}
                                    className="btn-outline"
                                  >
                                    doNothing
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div></div>
                        </div>
                      </div>
                    )}
                  {!showConnectWalletMessage &&
                    activeButton == "play" &&
                    address && (
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
                <div className="nav-1">
                  <img src={meme} />
                </div>
                {showAbout && (
                  <div id="glitch-background" className=" center-content">
                    <div className="about-trasition-1">
                      {/*<span className='shadow'>About HippiePepeMemeTV</span>  */}
                      <div className="pt-2 pb-5 about-pad">
                        <h3
                          id="textcolorabout"
                          className="about-para1 header-line  mb-2"
                        >
                          About TheMemeTV{" "}
                        </h3>
                        <p className="about-para2 pb-0 text-head">
                          We were all born Memes . We were all born to Memes. We
                          were all born to meme.
                        </p>
                        <p className="text-head pb-0">
                          {" "}
                          The world seems to have forgotten this and taken
                          itself too seriously.
                        </p>

                        <p className="text-head pb-0">
                          TheMemeTV is here- to spread joy, to spread other
                          things also I think but most importantly to #doNothing{" "}
                        </p>
                        <p className="text-head">
                          So, you also watch TheMemeTv and doNothing. Okay
                        </p>
                        <div className="rope-img">
                          {/* <img src={pepe} /> */}
                        </div>
                      </div>
                      {/* <div className="about-gif-part">
                        <img src={aboutgif} />{" "}
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
                            <h3 id="textcolorabout">Total Supply</h3>
                            <img src={supplygif} />{" "}
                          </div>
                          <h2
                            id="textcolorsocial"
                            className="supply-p head-dash header-line"
                          >
                            {randomNumber} HPTV{" "}
                          </h2>
                        </div>
                      </div>

                      <div>
                        <div className="row justify-content-center">
                          <div className="col-md-5">
                            <div className="supply-token">
                              <p className="text-head2">Development 10%</p>
                              <p className="text-head2">Team 5%</p>
                              <p className="text-head2">Charity 5%</p>
                              <p className="text-head2">Airdrops 10%</p>
                            </div>
                          </div>
                          <div className="col-md-5">
                            {" "}
                            <div className="supply-ocb">
                              <div className="supply-token">
                                <p className="text-head2">Watch & Earn 10%</p>
                                <p className="text-head2">
                                  Creator royalty 10%
                                </p>
                                <p className="text-head2">Liqudity Pool 50%</p>
                              </div>
                            </div>
                          </div>
                          <div className="pt-5 pb-5 col-md-12 text-head2">
                            <button
                              className="btn-line"
                              onClick={() => {
                                handleOnclickinToken();
                              }}
                            >
                              Read More About Token
                            </button>
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
                        <img src={tokenarrow} />
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
                          It is a little complicated. If you are not so smart,
                          just skip it.It’s cool
                        </section>
                        <div id="scroller" key={key}>
                          <div id="content">
                            <p id="title"></p>
                            <br />
                            <p className="text-head">
                              So, some % of all the tokens are kept aside for
                              you all to watch the HippiePepe TV and earn. A
                              total of ’we don’t know yet’ seconds of total
                              watch time is available across ‘x’ Phases of ‘some
                              beautiful’ seconds each. In the first phase, for
                              every second you watch, you will receive a ‘large
                              number’ of HPTV tokens. After you all have
                              cumulatively watched those ‘beautiful’ seconds,
                              the first Reward halving will happen. Then it
                              becomes half of ‘a large number’ HPTV tokens per
                              second. And then....so on and so forth. You get
                              the drift. This was Reward Halving.
                            </p>
                            <p className="text-head">
                              Now, time for reward doubling. During the ’we
                              don’t know yet’ seconds of the Watch and Earn
                              phase, the content owners of the videos that are
                              played on the HippiePepe TV will be paid from the
                              some% kept aside for them. In the initial phases
                              we believe it is us that wil mostly put up the
                              content. So, the creator royalty starts at a ‘very
                              low’ HPTV tokens per second in Phase 1 of Watch
                              and Earn.It keeps doubling till it Phase M when
                              the reward would have increased to a ‘large
                              number’ of HPTV tokens per second.The deal is that
                              every time you watch the the HippiePepe TV, the
                              creator of what you are watching will also be
                              rewarded.
                            </p>
                            <p className="text-head">
                              If you read the whole thing, we love you. And if
                              you read the whole thing, you love us.
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
                      <img className="pb-2" src={socialimg} />
                      <h3>Watch TheMemeTV and doNothing</h3>

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
                        <span className="hippe text-head">TheMemeTV</span>
                        <p className="social-tag pb-5">
                          <p>
                            TheMemeTV is a meme coin with no intrinsic value or
                            expectation of financial return. There is no formal
                            team or roadmap. the coin is completely useless and
                            for Entertainment purposes only.
                          </p>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {showclaimedText && (
                  <div className="trasition-3">
                    <img src={claimTokenn} />
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
                        <p className="text-head2"> {responce.phaseMessage} </p>
                      </>
                    )}
                  </div>
                )}
                {showRoadmap && (
                  <div id="glitch-background" className="road-map-text">
                    <p
                      id="textcolorroadmap"
                      className="header-line text-left pb-3"
                    >
                      Road map
                      {/* <span>(coz is’s a formality)</span> */}
                    </p>
                    <div className="">
                      <div className="row road1 trasition-4">
                        <div className="col-12 col-lg-4 pb-2 road-min">
                          <div className="road-map-dash">
                            <h2 className="road-map do1">Phase 1</h2>
                            <img className="roadmapimg" src={roadmap1} />
                            <p className="road-map-txt text-head">
                              Current phase. You are in it. Here, we doNothing
                            </p>
                          </div>
                        </div>
                        <div className="col-12 col-lg-4 pb-2 road-2">
                          <div className="road-map-dash">
                            <h2 className="road-map do2">Phase 2</h2>
                            <img className="roadmapimg" src={roadmap2} />
                            <p className="road-map-txt text-head">
                              We will decide the final name. Start releasing
                              claim tokens
                            </p>{" "}
                          </div>
                        </div>
                        <div className="col-12 col-lg-4 pb-2">
                          <div className="road-map-dash">
                            <h2 className="road-map do3">Phase 3</h2>
                            <img className="roadmapimg" src={roadmap3} />
                            <p className="road-map-txt text-head">
                              Decentralised Meme TV for all to watch and earn
                            </p>
                          </div>
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
                  <span onClick={ButtonTextChange}>&nbsp;&nbsp;{button}</span>
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
          <div>
            <div>
              <div id="navi-video" className="wallet-desk">
                <button className="btn-color" onClick={handleConnectWallet}>
                  <ConnectWallet
                    switchToActiveChain={true}
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0)",
                      color: "#09BD1B",
                      border: "none",
                      fontSize: "16px",
                    }}
                  />
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
                        <h3>{" Congratulations!"}</h3>
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
                          <img src={handgif} />
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
                                    <h3
                                      className="claim-h3"
                                      onClick={
                                        chain.chain == "BSC" && seconds !== 0
                                          ? claimTokensFromBlockchain
                                          : null
                                      }
                                    >
                                      claim token
                                    </h3>
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
                    <button className="btn-color flex flex-col justify-center items-center">
                      <img className="h-24 cnt-gif" src={arrow} alt="My GIF" />
                      <h3> Connect your wallet to mint</h3>
                    </button>
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
              <img src={image1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coin;
