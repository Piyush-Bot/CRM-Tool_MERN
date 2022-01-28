import React from "react";
import "../home/HeroSection.css";
import { Link } from "react-router-dom";
const HeroSection = () => {
  return (
    <>
      <div className="hero-container">
        <video src="videos/video-2.mp4" autoPlay loop muted />
        <h1>Laudco Media</h1>
        <p>Data Driven Digital Marketing Solutions</p>
        <div>
          <Link to="/login">
            <button className="hero-btns">GET STARTED</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
