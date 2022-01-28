import React from "react";
import { Grid } from "@material-ui/core";
import { Routes, Route, Navigate } from "react-router-dom";
import SidebarEmp from "./SidebarEmp";
import AppbarEmp from "./AppbarEmp";
import LeaveAppForm from "./LeaveAppForm";
import Footer from "../Footer";

import "./Emp.css";
const LayoutEmp = () => {
  return (
    <>
      <AppbarEmp />
      <Grid container>
        <Grid item xs={2} sm={2}>
          <SidebarEmp />
        </Grid>
        <Grid item xs={10} sm={10}>
          <Routes>
            <Route path="leaveappform" element={<LeaveAppForm />} />
            <Route path="" element={<Navigate to="leaveappform" />} />
          </Routes>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default LayoutEmp;
