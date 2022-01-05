import React from "react";
import { Grid } from "@material-ui/core";
import SidebarBd from "./bd/SidebarBd";
import DashboardBd from "./bd/DashboardBd";
import AppbarBd from "./bd/AppbarBd";
import Footer from "./Footer";
import { Routes, Route, Navigate } from "react-router-dom";
// import Employee from "./bd/Employee";
import EmployeeTable from "./bd/EmployeeTable";
import EmployeeFormEdit from "./bd/EmployeeFormEdit";

const LayoutBd = () => {
  return (
    <>
      <AppbarBd />
      <Grid container>
        <Grid item sm={2} xs={2}>
          <SidebarBd />
        </Grid>
        <Grid item sm={10} xs={10}>
          <Routes>
            <Route path="/dashboardbd" element={<DashboardBd />} />
            <Route path="/employee" element={<EmployeeTable />} />
            <Route path="/employeeformedit" element={<EmployeeFormEdit />} />
            <Route path="" element={<Navigate to="dashboardbd" />} />
          </Routes>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default LayoutBd;
