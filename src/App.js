import React, { useEffect, useRef } from "react";
import "./App.css";

const CustomCamera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const videoConstraints = {
        width: window.innerWidth,
        height: window.innerHeight * 0.8,
        facingMode: "user",
      };

      navigator.mediaDevices
        .getUserMedia({ video: videoConstraints, audio: false })
        .then((stream) => {
          const video = videoRef.current;
          video.srcObject = stream;
          video.play();
        })
        .catch((error) => {
          console.error("Error accessing camera:", error);
        });
    } else {
      console.error("Camera not supported on this device");
    }
  }, []);

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set the canvas dimensions to match the video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    const imageSrc = canvas.toDataURL("image/jpeg");
    console.log(imageSrc); // Base64 encoded image
  };

  return (
    <div className="container">
      <video ref={videoRef} autoPlay />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <button onClick={captureImage}>Capture</button>
    </div>
  );
};

export default CustomCamera;
