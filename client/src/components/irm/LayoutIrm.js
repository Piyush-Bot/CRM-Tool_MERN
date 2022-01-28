import React from "react";
import { Grid } from "@material-ui/core";
import SidebarIrm from "./SidebarIrm";
import Dashboard from "./Dashboard";
import AppbarIrm from "./AppbarIrm";
import Report from "./Report";
import InvoiceGenerator from "./purchaseOrder/InvoiceGenerator";
import InvoiceTemplate from "./purchaseOrder/InvoiceTemplate";
import Tool from "./Tool";
import Footer from "../Footer";
import { Routes, Route, Navigate } from "react-router-dom";

const LayoutIrm = () => {
  return (
    <>
      <AppbarIrm />
      <Grid container>
        <Grid item xs={2} sm={2}>
          <SidebarIrm />
        </Grid>
        <Grid item xs={10} sm={10}>
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
