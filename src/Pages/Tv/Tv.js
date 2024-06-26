import React, { useRef, useEffect } from "react";

const Tv = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = false; // Mute the video initially
      videoRef.current
        .play() // Attempt to autoplay the video when component mounts
        .then(() => {
          // Video is playing muted
          //   setIsVideoPlaying(true);
        })
        .catch((error) => {
          console.error("Error attempting to autoplay the video: ", error);
          //   setIsVideoPlaying(false);
        });
    }
  }, []);

  return (
    <div className="tvContainer" style={{ height: "100%", width: "100%" }}>
      <video
        // className={showVideo ? "playvideo" : "hidevideo"}
        style={{ height: "100%", width: "100%" }}
        ref={videoRef}
        // width={showVideo ? "100%" : "0%"}
        // height={showVideo ? "100%" : "0%"}
        // style={{ objectFit: "cover" }}
        loop
      >
        <source
          //   className=""
          src="https://res.cloudinary.com/dhebiyrep/video/upload/v1715257036/kbld2jankfvu2d8wvixj.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Tv;
