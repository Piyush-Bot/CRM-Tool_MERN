import React from "react";
import { Grid } from "@material-ui/core";
import SidebarIrm from "./irm/SidebarIrm";
import Dashboard from "./irm/Dashboard";
import AppbarIrm from "./irm/AppbarIrm";
import Report from "./irm/Report";
import InvoiceGenerator from "./irm/purchaseOrder/InvoiceGenerator";
import InvoiceTemplate from "./irm/purchaseOrder/InvoiceTemplate";
import Tool from "./irm/searchTool/Tool";
import Footer from "./Footer";
import { Routes, Route, Navigate } from "react-router-dom";

const LayoutIrm = () => {
  return (
    <>
      <AppbarIrm />
      <Grid container>
        <Grid item sm={2} xs={2}>
          <SidebarIrm />
        </Grid>
        <Grid item sm={10} xs={10}>
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="invoicegen" element={<InvoiceGenerator />} />
            <Route path="invoicetemp" element={<InvoiceTemplate />} />
            <Route path="irmtool" element={<Tool />} />
            <Route path="irmreport" element={<Report />} />
            <Route path="" element={<Navigate to="dashboard" />} />
          </Routes>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default LayoutIrm;
