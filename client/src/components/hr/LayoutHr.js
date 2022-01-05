import React from "react";
import { Grid } from "@material-ui/core";
import { Routes, Route, Navigate } from "react-router-dom";
import SidebarHr from "./SidebarHr";
import AppBarHr from "./AppbarHr";
import Employee from "./Employee";
import EmployeeReg from "./EmployeeReg";

import LeaveAppForm from "./LeaveAppForm";
import Footer from "../Footer";
import LeaveDetails from "./LeaveDetails";
const LayoutBd = () => {
  return (
    <>
      <AppBarHr />
      <Grid container>
        <Grid item sm={2} xs={2}>
          <SidebarHr />
        </Grid>
        <Grid item sm={10} xs={10}>
          <Routes>
            <Route path="/employee" element={<Employee />} />
            <Route path="/employeereg" element={<EmployeeReg />} />
            <Route path="/leaveapp" element={<LeaveDetails />} />
            <Route path="/leaveappform" element={<LeaveAppForm />} />
            <Route path="" element={<Navigate to="employee" />} />
          </Routes>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default LayoutBd;
