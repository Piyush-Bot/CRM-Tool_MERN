import React from "react";
import Category from "./dashboard/Category";
import { Grid } from "@material-ui/core";
import Map from "./dashboard/Map";
import Chart from "./dashboard/chart";
import "./dashboard.css";
import PlatformInfo from "./dashboard/PlatformInfo";
import AA from "./dashboard/AA";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard_wrapper">
        <Grid container className="irmdb_section_one">
          <Grid item xs={6}>
            <h2>Influencer Category Info.</h2>
            <Category />
          </Grid>
          <Grid item xs={6} className="Map-chart">
            <Map />
          </Grid>
        </Grid>
        <hr />
        <Grid container className="irmdb_section_two">
          <Grid item xs={8} className="coloumBar">
            <AA />
            <div className="Campaign-heading">Campaigns-Table</div>
          </Grid>
          <Grid item xs={4}>
            <PlatformInfo />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Dashboard;
