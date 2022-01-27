import React from "react";
import { Grid } from "@mui/material";
import "../home/HeroSection.css";
import lxw from "../images/lxw_logo.png";
import SM_logo from "../images/sm_logo.png";
import Fsog from "../images/fsog.png";
import Gcc from "../images/GCC1.png";
import Laudco from "../images/laudco_logo.png";
import Cards from "../home/Cards";

const HomeContent = () => {
  return (
    <>
      <div className="Home_content">
        <Grid container>
          <Grid item xs={5}>
            <div className="Home_description">
              <h1>What We Do!</h1>
              <h3>
                Driving Forward Digital Transformation Across Your Business
              </h3>
              <h6>
                Our team, our services and our solutions are designed to enable
                integration of digital technology to support all aspects of a
                business and to inform processes and activities with data
                literacy to fuel exponential growth.
              </h6>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="Home_content_image">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=820&q=80"
              />
            </div>
          </Grid>

          <Grid container className="logo_wrapper">
            <Grid item xs={12} className="logoHeading">
              Some of Our Partners
            </Grid>
            <Grid item xs={12} className="logoAlign">
              <a href="https://laudco.com/">
                <img alt="" src={Laudco} width="175" height="75" />{" "}
              </a>
              <a href="https://shubhammehrotra.com/">
                <img alt="" src={SM_logo} width="85" height="85" />
              </a>
              <img alt="" src={Fsog} width="95" height="75" />
              <a href="https://thelxw.com/">
                <img alt="" src={lxw} width="100" height="75" />{" "}
              </a>
              <a href="http://www.globalchambercommerce.com/">
                <img alt="" src={Gcc} width="175" height="75" />{" "}
              </a>
            </Grid>
          </Grid>

          <Grid container className="tool_wrapper">
            <div className="toolheading">
              <h1>Powerful tool </h1>
              <h3>That help you build all types of user interfaces</h3>
              <Cards />
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default HomeContent;
