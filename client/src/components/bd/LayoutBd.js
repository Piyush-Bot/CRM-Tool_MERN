import React from "react";
import { Grid } from "@material-ui/core";
import SidebarBd from "./SidebarBd";
import DashboardBd from "./DashboardBd";
import AppbarBd from "./AppbarBd";
import Footer from "../Footer";
import { Routes, Route, Navigate } from "react-router-dom";

const LayoutBd = () => {
  return (
    <>
      <AppbarBd />
      <Grid container>
        <Grid item xs={2} sm={2}>
          <SidebarBd />
        </Grid>
        <Grid item xs={10} sm={10}>
          <Routes>
            <Route path="/dashboardbd" element={<DashboardBd />} />

            <Route path="" element={<Navigate to="dashboardbd" />} />
          </Routes>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default LayoutBd;
