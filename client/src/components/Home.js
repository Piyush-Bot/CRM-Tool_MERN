import React from "react";
//import "./App.css"; giving error

import HeroSection from "./home/HeroSection";
import Cards from "./home/Cards";
import { Review } from "./home/review/Review";

const Home = () => {
  return (
    <>
      <HeroSection />
      <Cards />
      <Review />
    </>
  );
};

export default Home;
