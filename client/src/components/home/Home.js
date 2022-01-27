import React from "react";
import { Grid } from "@mui/material";
import HeroSection from "./HeroSection";
import HomeContent from "./HomeContent";

const Home = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <HeroSection />
        </Grid>
        <Grid item xs={12}>
          <HomeContent />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
