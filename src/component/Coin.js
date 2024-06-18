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
import playIcoN from "../assets/Path.png";
import peoplegrp from "../assets/peoplegrp.png";
import clickSound from "../assets/clicksound.mp3";
import coinLogo from "../assets/coinlogo.png";
import burgern from "../assets/burgerN.png";
import arrow1 from "../assets/Arrow 1.png";
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
  const [key, setKey] = useState(0);
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
  const images = [doge, frog, shibu];
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
      videoRef.current.pause();
      setButton("play");
      setIsActive(false);
    }
  });

  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    const ws = new WebSocket("https://hippie-pepe-be.onrender.com");

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

  const { contract_Address, contract_ABI } = config;
  const [mTVContract, setMTVContract] = useState();
  const [signer, setSigner] = useState();
  const [signerAddress, setSignerAddress] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setKey((prevKey) => prevKey + 1);
    }, 45000);
    return () => clearTimeout(timeout);
  }, [key]);

  const [randomNumber, setRandomNumber] = useState("");

  const generateRandomNumber = () => {
    const number = Math.floor(100000000000 + Math.random() * 900000000000);
    const formattedNumber = new Intl.NumberFormat("en-US").format(number);
    setRandomNumber(formattedNumber);
  };

  useEffect(() => {
    generateRandomNumber();
    const interval = setInterval(generateRandomNumber, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (address) {
      loadAndResumePlayback();
      setSeconds(0);
      setIsActive(false);
    } else {
      savePlaybackPosition(videoRef.current.currentTime);
    }
  }, [address]);

  function loadAndResumePlayback() {
    const savedPosition = localStorage.getItem("videoPlaybackPosition");
    if (savedPosition) {
      videoRef.current.currentTime = savedPosition;
    }
  }

  function savePlaybackPosition(time) {
    localStorage.setItem("videoPlaybackPosition", time);
  }

  const playClickSound = () => {
    const sound = new Audio(clickSound);
    sound.play();
  };

  function ButtonTextChange() {
    if (button === "pause") {
      setButton("play");
      setShowVideo(true);
    } else if (button === "play") {
      setButton("pause");
      setShowVideo(true);
      handlePause();
    }
  }

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleWelcomeDismiss = () => {
    setShowWelcomeMessage(false);
  };

  useEffect(() => {
    setShowGlitchGif(true);
    setTimeout(() => {
      setShowGlitchGif(false);
      setIsVideoPlaying(false);
    }, 1000);
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
      setIsActive(true);
    }
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
      videoRef.current.load();
      videoRef.current
        .play()
        .then(() => {
          setIsVideoPlaying(true);
        })
        .catch((error) => {
          console.error("Error attempting to play the video: ", error);
          setIsVideoPlaying(false);
        });
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current
        .play()
        .then(() => {
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
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
        setPlaypauseCounter(0);
        return data;
      } else {
        throw new Error("Failed to update user details");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    if (!walletConnected) {
      setTimeout(() => {
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
            setIsVideoPlaying(true);
            handleClick();
            setButton("pause");
          })
          .catch((error) => console.error("Error playing the video:", error));
        if (isFirstTime) {
          setTimeout(() => {
            if (!address) {
              setIsFirstTime(false);
              videoRef.current.pause();
              setIsVideoPlaying(false);
              setButton("play");
              setShowConnectWalletMessage(true);
            }
          }, 30000);
        }
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
        setButton("play");
      }
    }
  };

  const handleCloseMessage = () => {
    setShowConnectWalletMessage(false);
    videoRef.current.currentTime = 0;
    videoRef.current
      .play()
      .then(() => {
        setIsVideoPlaying(true);
        handleClick();
        setButton("pause");
      })
      .catch((error) => console.error("Error playing the video:", error));
    setTimeoutofvideo();
  };

  const setTimeoutofvideo = () => {
    setTimeout(() => {
      if (!address) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
        setButton("play");
        setShowConnectWalletMessage(true);
      }
    }, 30000);
  };

  const handleConnectWallet = () => {
    setWalletConnected(true);
    localStorage.setItem("walletConnected", "true");
    setShowConnectWalletMessage(false);
  };

  useEffect(() => {
    const isConnected = localStorage.getItem("walletConnected") === "true";
    console.log("Wallet connected from storage:", isConnected);
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
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
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
    setShowConnectScreen(false);
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
      setShowRoadmap(false);
      setShowAbout(false);
      setShowSocial(false);
      setShowToken(false);
    }, 1000);
  };

  const handlePlayClick = () => {
    playClickSound();
    setActiveButton("play");
    setShowClaimedText(false);
    setShowAbout(false);
    ButtonTextChange();
    setShowToken(false);
    setShowSocial(false);
    setShowRoadmap(false);
    setShowConnectScreen(false);
    setShowWelcomeMessage(false);
    if (!isVideoPlaying) {
      setIsActive(true);
      if (!showConnectWalletMessage) {
        togglePlayPause();
      }
      setShowConnectScreen(false);
    } else {
      setIsActive(false);
      if (!showConnectWalletMessage) {
        togglePlayPause();
      }
      setShowConnectScreen(false);
    }
  };

  const handleAboutClick = () => {
    playClickSound();
    setShowClaimedText(false);
    setActiveButton("about");
    setShowAbout(false);
    setShowVideo(false);
    setIsActive(false);
    setIsVideoPlaying(false);
    setShowToken(false);
    setShowSocial(false);
    setShowRoadmap(false);
    setShowConnectScreen(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsVideoPlaying(false);
    setButton("play");
    setShowWelcomeMessage(false);
    setShowConnectScreen(false);
    setShowGlitchGif(true);
    setTimeout(() => {
      setShowGlitchGif(false);
      setShowAbout(true);
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
    setShowAbout(false);
    setShowVideo(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsVideoPlaying(false);
    setShowConnectScreen(false);
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
      setShowToken(true);
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
    setShowConnectScreen(false);
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
      setShowSocial(true);
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
    setShowConnectScreen(false);
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
      setShowRoadmap(true);
      setShowAbout(false);
      setShowSocial(false);
      setShowToken(false);
    }, 1000);
  };

  useEffect(() => {
    if (currentIndex !== undefined) {
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
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          const data = await response.json();
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

    updateUserDetails();
  };

  useEffect(() => {
    fetchUserDetails();
  }, [address]);

  const fetchUserDetails = async () => {
    try {
      console.log(address);
      const response = await fetch(
        `https://hippie-pepe-be.onrender.com/getUserdetail/${address}`
      );

      if (response.ok) {
        const data = await response.json();
        setSeconds(Number(data.user.userSeconds));
        console.log(JSON.stringify(data) + "Datadatadata");
      } else {
        console.error("Error fetching user details:", response.statusText);
      }
    } catch (error) {
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
    console.log("Inside Claim Tokens from blockchain function");
    togglePlayPause();
    setIsActive(false);
    if (!signer) {
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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div>
      <div
        className="row right-align small-d"
        style={{ height: "66px", width: "422px" }}
      >
        <div className="col-6 col-sm-8">
          <div
            className="mob-desk"
            style={{ position: "relative", float: "left" }}
          >
            <div
              style={{
                // position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 43,
                width: 160,
                backgroundColor: "rgba(100, 76, 22, 1)",
                padding: 2,
                borderWidth: 1.5,
                borderRadius: 5,
                borderColor: "rgba(148, 148, 148, 1)",
              }}
            >
              <div
                style={{
                  width: "25%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={coinLogo}
                  style={{ width: "80%", height: "80%" }}
                  alt="coinLogo"
                />
              </div>
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // marginTop: 10,
                }}
              >
                <p
                  style={{
                    fontSize: "20px",
                    color: "rgba(255, 255, 255, 1)",
                    fontFamily: "VCR OSD Mono",
                  }}
                >
                  34541
                </p>
              </div>
              <div
                style={{
                  width: "25%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "center",
                  marginTop: 5,
                  color: "rgba(255, 255, 255, 1)",
                  fontFamily: "VCR OSD Mono",
                }}
              >
                <p
                  style={{
                    fontSize: "10px",
                  }}
                >
                  Mtv
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-sm-4 navbar-1">
          <nav className="navbar navbar-light">
            <div className="container-fluid" style={{ visibility: "hidden" }}>
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
        {/* {isOpen && (
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
        )} */}
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
                {showWelcomeMessage && !isOpen && (
                  <div className="row img-res">
                    <div className="col-md-12 ">
                      <div>
                        <img className="animation-logo" src={welcome} />
                      </div>
                    </div>
                    {/*<span className='shadow'>About HippiePepeMemeTV</span>  */}
                    <div className="text-head pt-1"></div>
                  </div>
                )}
                {isOpen && (
                  <div>
                    {/* <div className="col-md-12 "> */}
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
                              {/* <li
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
                              </li> */}
                              <li
                                style={getButtonDetails("about").style}
                                onClick={() => {
                                  handleAboutClick();
                                  toggleMenu();
                                }}
                              >
                                <span>About</span>
                              </li>
                              <li
                                style={getButtonDetails("roadmap").style}
                                onClick={() => {
                                  handleRoadmapClick();
                                  toggleMenu();
                                }}
                              >
                                <span>Roadmap</span>
                              </li>
                              <li
                                style={getButtonDetails("token").style}
                                onClick={() => {
                                  handleTokenClick();
                                  toggleMenu();
                                }}
                              >
                                <span>Token</span>
                              </li>
                              <li
                                style={getButtonDetails("social").style}
                                onClick={() => {
                                  handleSocialClick();
                                  toggleMenu();
                                }}
                              >
                                <span>Social</span>
                              </li>
                              <li
                                style={getButtonDetails("social").style}
                                onClick={() => {
                                  handleSocialClick();
                                  toggleMenu();
                                }}
                              >
                                <span>Refer & Earn</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        {/* <div
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
                        </div> */}
                      </div>
                      {/* <div className="overlay-close" onClick={toggleMenu}></div> */}
                    </div>
                    {/* </div> */}
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
                  {/* {showConnectWalletMessage &&
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
                              </button>
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
                              </button>
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
                    )} */}
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
                            <div className=""></div>
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
                            <img src={supplygif} />
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
                {/* {handlePlayClick();
                                  toggleMenu();} */}
                {/* <div
                  style={{
                    width: "20%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="buttonStyle"
                    style={{
                      height: "60%",
                      width: "70%",
                      borderRadius: 5,
                      borderBottomColor: "rgb(0, 0, 0,.4)",
                      borderBottomWidth: 5,
                      borderRightColor: "rgb(0, 0, 0,.4)",
                      borderRightWidth: 5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img src={playIcoN} style={{ height: 20, width: 20 }} />
                  </div>
                </div>
                <div
                  style={{
                    width: "60%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      borderWidth: 3,
                      borderColor: "#cccccc",

                      height: "80%",
                      width: "100%",
                      borderRadius: 5,
                      backgroundColor: "rgba(3, 72, 7, 1)",
                      padding: 3,
                    }}
                    // className="claimBox"
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        borderWidth: 1,
                        borderColor: "rgba(9, 189, 27, 1)",
                        width: "100%",
                        height: "100%",
                        padding: 3,
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: "20%",
                          backgroundColor: "rgba(0, 109, 4, 1)",
                          borderRadius: 5,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <img
                          src={peoplegrp}
                          style={{
                            height: 20,
                            width: 16,
                            objectFit: "contain",
                          }}
                        />
                        <p
                          style={{ marginTop: 3, fontSize: 10, color: "black" }}
                        >
                          234
                        </p>
                      </div>
                      <div
                        style={{
                          height: "100%",
                          width: "40%",
                          // backgroundColor: "blue",
                          flexDirection: "column",
                          paddingLeft: 5,
                          paddingRight: 5,
                        }}
                      >
                        <div
                          style={{
                            height: "40%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            padding: 2,
                          }}
                        >
                          <p style={{ fontSize: 12 }}> P1</p>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <p style={{ fontSize: 10, marginTop: 6 }}> 45%</p>
                            <img
                              src={arrow1}
                              style={{
                                height: 10,
                                width: "100%",
                                objectFit: "contain",
                                marginBottom: 12,
                              }}
                            />
                          </div>
                          <p style={{ fontSize: 12 }}>P2</p>
                        </div>
                        <div
                          style={{
                            height: "60%",
                            // backgroundColor: "blue",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                          }}
                        >
                          <p style={{ fontSize: 12, marginTop: 5 }}>16:09:38</p>
                          <p style={{ fontSize: 12, marginTop: -5 }}>
                            watch time
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          height: "100%",
                          width: "40%",
                          position: "relative",
                          // backgroundColor: "green",
                        }}
                      >
                        <div
                          // className="backrain"
                          style={{
                            // borderWidth: 1,
                            // borderColor: "rgba(212, 87, 255, 1)",
                            height: 1,
                            position: "absolute",
                            width: "100%",
                            backgroundColor: "rgba(253, 141, 35, 1)",
                            top: 0,
                          }}
                        ></div>

                        <div
                          // className="backrain"
                          style={{
                            // borderWidth: 1,
                            // borderColor: "rgba(212, 87, 255, 1)",
                            height: 1,
                            position: "absolute",
                            width: "100%",
                            backgroundColor: "rgba(212, 87, 255, 1)",
                            bottom: 0,
                          }}
                        ></div>
                        <div
                          className="backrain1"
                          style={{
                            // borderWidth: 1,
                            // borderColor: "rgba(212, 87, 255, 1)",
                            width: 1,
                            position: "absolute",
                            height: "100%",
                            backgroundColor: "red",
                            left: 0,
                          }}
                        ></div>
                        <div
                          className="backrain1"
                          style={{
                            // borderWidth: 1,
                            // borderColor: "rgba(212, 87, 255, 1)",
                            width: 1,
                            position: "absolute",
                            height: "100%",
                            backgroundColor: "red",
                            right: 0,
                          }}
                        ></div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            paddingLeft: 5,
                            paddingRight: 5,
                          }}
                        >
                          <div
                            style={{
                              height: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {seconds} Mtv
                          </div>
                          <div
                            className="backrain1"
                            style={{
                              height: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 5,
                            }}
                          >
                            <p style={{ color: "black" }}>claim</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: "20%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="buttonStyle"
                    style={{
                      height: "60%",
                      width: "70%",
                      borderRadius: 5,
                      borderBottomColor: "rgb(0, 0, 0,.4)",
                      borderBottomWidth: 5,
                      borderRightColor: "rgb(0, 0, 0,.4)",
                      borderRightWidth: 5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={toggleMenu}
                  >
                    <img src={burgern} style={{ height: 40, width: 40 }} />
                  </div>
                </div> */}

                <div
                  style={{
                    width: "20%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="buttonStyle"
                    style={{
                      height: "60%",
                      width: "70%",
                      borderRadius: 5,
                      borderBottomColor: "rgb(0, 0, 0,.4)",
                      borderBottomWidth: 5,
                      borderRightColor: "rgb(0, 0, 0,.4)",
                      borderRightWidth: 5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      onClick={() => {
                        handlePlayClick();
                      }}
                      src={playIcoN}
                      style={{ height: 20, width: 20 }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    width: "60%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      borderWidth: 3,
                      borderColor: "#cccccc",

                      height: "80%",
                      width: "100%",
                      borderRadius: 5,
                      backgroundColor: "rgba(3, 72, 7, 1)",
                      padding: 3,
                    }}
                    // className="claimBox"
                  >
                    {activeButton === "play" && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          borderWidth: 1,
                          borderColor: "rgba(9, 189, 27, 1)",
                          width: "100%",
                          height: "100%",
                          padding: 3,
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: "20%",
                            backgroundColor: "rgba(0, 109, 4, 1)",
                            borderRadius: 5,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                          }}
                        >
                          <img
                            src={peoplegrp}
                            style={{
                              height: 20,
                              width: 16,
                              objectFit: "contain",
                            }}
                          />
                          <p
                            style={{
                              marginTop: 3,
                              fontSize: 10,
                              color: "black",
                            }}
                          >
                            234
                          </p>
                        </div>
                        <div
                          style={{
                            height: "100%",
                            width: "40%",
                            // backgroundColor: "blue",
                            flexDirection: "column",
                            paddingLeft: 5,
                            paddingRight: 5,
                          }}
                        >
                          <div
                            style={{
                              height: "40%",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-evenly",
                              padding: 2,
                            }}
                          >
                            <p style={{ fontSize: 12 }}> P1</p>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <p style={{ fontSize: 10, marginTop: 6 }}> 45%</p>
                              <img
                                src={arrow1}
                                style={{
                                  height: 10,
                                  width: "100%",
                                  objectFit: "contain",
                                  marginBottom: 12,
                                }}
                              />
                            </div>
                            <p style={{ fontSize: 12 }}>P2</p>
                          </div>
                          <div
                            style={{
                              height: "60%",
                              // backgroundColor: "blue",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexDirection: "column",
                            }}
                          >
                            <p style={{ fontSize: 12, marginTop: 5 }}>
                              16:09:38
                            </p>
                            <p style={{ fontSize: 12, marginTop: -5 }}>
                              watch time
                            </p>
                          </div>
                        </div>
                        <div
                          style={{
                            height: "100%",
                            width: "40%",
                            position: "relative",
                            // backgroundColor: "green",
                          }}
                        >
                          <div
                            // className="backrain"
                            style={{
                              // borderWidth: 1,
                              // borderColor: "rgba(212, 87, 255, 1)",
                              height: 1,
                              position: "absolute",
                              width: "100%",
                              backgroundColor: "rgba(253, 141, 35, 1)",
                              top: 0,
                            }}
                          ></div>

                          <div
                            // className="backrain"
                            style={{
                              // borderWidth: 1,
                              // borderColor: "rgba(212, 87, 255, 1)",
                              height: 1,
                              position: "absolute",
                              width: "100%",
                              backgroundColor: "rgba(212, 87, 255, 1)",
                              bottom: 0,
                            }}
                          ></div>
                          <div
                            className="backrain1"
                            style={{
                              // borderWidth: 1,
                              // borderColor: "rgba(212, 87, 255, 1)",
                              width: 1,
                              position: "absolute",
                              height: "100%",
                              backgroundColor: "red",
                              left: 0,
                            }}
                          ></div>
                          <div
                            className="backrain1"
                            style={{
                              // borderWidth: 1,
                              // borderColor: "rgba(212, 87, 255, 1)",
                              width: 1,
                              position: "absolute",
                              height: "100%",
                              backgroundColor: "red",
                              right: 0,
                            }}
                          ></div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              height: "100%",
                              paddingLeft: 5,
                              paddingRight: 5,
                            }}
                          >
                            <div
                              style={{
                                height: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {seconds} Mtv
                            </div>
                            <div
                              className="backrain1"
                              style={{
                                height: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 5,
                              }}
                            >
                              <p style={{ color: "black" }}>claim</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeButton !== "play" && (
                      <div
                        onClick={() => {
                          handlePlayClick();
                          setIsOpen(false);
                          // toggleMenu();
                        }}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <p>Switch on the TV</p>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    width: "20%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="buttonStyle"
                    style={{
                      height: "60%",
                      width: "70%",
                      borderRadius: 5,
                      borderBottomColor: "rgb(0, 0, 0,.4)",
                      borderBottomWidth: 5,
                      borderRightColor: "rgb(0, 0, 0,.4)",
                      borderRightWidth: 5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      toggleMenu();
                      setActiveButton("");
                      togglePlayPause();
                    }}
                  >
                    <img src={burgern} style={{ height: 40, width: 40 }} />
                  </div>
                </div>
                {/* {isActive !== "Play" && (
                  <>
                    <div>
                      <h1>Switch on the TV</h1>
                    </div>
                  </>
                )} */}
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
