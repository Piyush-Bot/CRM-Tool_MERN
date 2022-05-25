import React from "react";
import { homeObjOne, homeObjThree } from "./HomeData";
import HeroSection from "./HeroSection";
import HeroSection3 from "./HeroSection3";
import Navbar from "./Navbar";
import HeroSection2 from "./HeroSection2";

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection {...homeObjOne} />
      <HeroSection2 />
      <HeroSection3 />
    </>
  );
};

export default Home;
