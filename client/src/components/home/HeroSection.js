import React from "react";
//import "../home/Home.css";
// import { Button } from "./Button";
import "../home/HeroSection.css";

const HeroSection = () => {
  return (
    <>
      <div className="hero-container">
        <video src="videos/video-2.mp4" autoPlay loop muted />
        <h1>Scroll Lab</h1>
        <p>What are you waiting for? (Hero Section)</p>
        <div className="hero-btns">
          <button
            className="btns"
            // buttonStyle="btn--outline"
            // buttonSize="btn--large"
          >
            GET STARTED
          </button>
          <button
            className="btns"
            // buttonStyle="btn--primary"
            // buttonSize="btn--large"
            onClick={console.log("hey")}
          >
            WATCH TRAILER <i className="far fa-play-circle" />
          </button>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
