import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import section2_img from "../../images/po.jpg";
import Gallery from "./Gallery";

const HeroSection2 = () => {
  return (
    <>
      <div className="home__hero-section">
        <div className="container">
          <div
            className="row home__hero-row"
            style={{
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            <div className="col">
              <div className="home__hero-text-wrapper">
                <div className="top-line">EASY SETUP</div>
                <h1 className="heading dark">
                  Super fast and simple onboarding process
                </h1>
                <p className="home__hero-subtitle dark">
                  Get everything set up and ready in under 10 minutes. All you
                  need to do is add your information and you're ready to go.
                </p>
              </div>
            </div>
            <div className="col">
              <div className="home__hero-img-wrapper">
                <img
                  src={section2_img}
                  alt="Vault"
                  className="home__hero-img"
                />
              </div>
            </div>
            <Gallery />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection2;
