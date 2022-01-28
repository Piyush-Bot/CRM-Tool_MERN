import React from "react";
import { Grid, Paper } from "@mui/material";
import EmployeeForm from "./EmployeeForm";

const basicEmployeeModel = {
  email: "",
  accountAccess: "",
  firstName: "",
  lastName: "",
  phone: "",
  gender: "",
  department: "",
  dob: "",
  doj: "",
};

const EmployeeReg = () => {
  return (
    <div className="empReg_wrapper">
      <Grid container className="section_reg">
        <Grid items xs={5} className="section_reg_titleBox">
          <div className="section_reg_title">
            <hr className="divLine" />
            REGISTRATION
          </div>
          <div className="section_reg_title2">Add New Employee</div>
        </Grid>

        <Grid items xs={7} component={Paper} elevation={6} className="empreghr">
          <EmployeeForm isEdit={false} employeeDetails={basicEmployeeModel} />
        </Grid>
      </Grid>
    </div>
  );
};

export default EmployeeReg;
