import React, { useState } from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  TextField,
  FormControlLabel,
  FormLabel,
  FormControl,
  RadioGroup,
  Radio,
  Box,
  Select,
  InputLabel,
  MenuItem,
  Grid,
} from "@mui/material";

const EmployeeForm = (props) => {
  let navigate = useNavigate();
  // const [value, setValue] = React.useState(new Date());
  const [employee, setEmployee] = useState(props.employeeDetails);

  const addEmployeeData = (e) => {
    e.preventDefault();
    const isPhoneValid = phoneValidation();
    if (isPhoneValid) {
      axios
        .post("/addemployee", {
          ...employee,
        })
        .then(function (response) {
          navigate("/layouthr/employee");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const handleInputs = (event) => {
    const { name, value } = event.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleDateInputs = (newDate, name) => {
    setEmployee((prevState) => ({
      ...prevState,
      [name]: new Date(newDate).getTime(),
    }));
  };
  const clearForm = () => {
    setEmployee({
      email: "",
      accountAccess: "",
      firstName: "",
      lastName: "",
      phone: "",
      gender: "",
      department: "",
      dob: "",
      doj: "",
    });
  };

  const phoneValidation = () => {
    const regex = /^[0-9]{10}$/i;
    return !(!employee.phone || regex.test(employee.phone) === false);
  };

  const editEmployeeData = (e) => {
    e.preventDefault();
    const payload = {
      ...employee,
      dob: new Date(employee.dob).getTime(),
      doj: new Date(employee.doj).getTime(),
    };
    delete payload["_id"];
    axios
      .put(`/getEmployees/${employee._id}`, payload)
      .then(function (response) {
        props.onClick();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Box
      sx={{
        my: 2,
        mx: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 5px",
      }}
    >
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              type="email"
              name="email"
              label="Email Address"
              value={employee.email}
              onChange={handleInputs}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              name="firstName"
              label="First Name"
              value={employee.firstName}
              onChange={handleInputs}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="lastName"
              required
              fullWidth
              value={employee.lastName}
              onChange={handleInputs}
              label="Last Name"
              autoFocus
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Phone"
              name="phone"
              type="number"
              value={employee.phone}
              onChange={handleInputs}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                row
                aria-label="type"
                name="gender"
                value={employee.gender}
                onChange={handleInputs}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Date of Birth"
                name="dob"
                inputFormat="MM/dd/yyyy"
                value={employee.dob}
                onChange={(newDate) => handleDateInputs(newDate, "dob")}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                name="doj"
                label="Date of joining"
                inputFormat="MM/dd/yyyy"
                value={employee.doj}
                onChange={(newDate) => handleDateInputs(newDate, "doj")}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Account access</InputLabel>
              <Select
                label="accountAccess"
                name="accountAccess"
                value={employee.accountAccess}
                onChange={handleInputs}
              >
                <MenuItem value={"Admin"}>Admin</MenuItem>
                <MenuItem value={"HR"}>HR</MenuItem>
                <MenuItem value={"Employee"}>Employee</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select
                required
                name="department"
                label="Department"
                value={employee.department}
                onChange={handleInputs}
              >
                <MenuItem value={"BD"}>BD</MenuItem>
                <MenuItem value={"IRM"}>IRM</MenuItem>
                <MenuItem value={"Tech"}>Tech.</MenuItem>
                <MenuItem value={"Opps"}>Opps.</MenuItem>
                <MenuItem value={"Content"}>Content</MenuItem>
                <MenuItem value={"Production"}>Production</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} className="actionButtons">
            {props.isEdit ? (
              <Button
                variant="contained"
                endIcon={<EditIcon />}
                onClick={editEmployeeData}
              >
                Update
              </Button>
            ) : (
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={addEmployeeData}
              >
                Send
              </Button>
            )}
            {props.isEdit ? (
              <Button
                onClick={props.onClick}
                variant="outlined"
                startIcon={<DeleteIcon />}
              >
                Cancel
              </Button>
            ) : (
              <Button
                onClick={clearForm}
                variant="outlined"
                startIcon={<DeleteIcon />}
              >
                Reset
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EmployeeForm;
