import React, { useState, useEffect } from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  FormControl,
  Paper,
  Box,
  Grid,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";

const LeaveAppForm = () => {
  let navigate = useNavigate();
  // const [value, setValue] = useState(new Date());
  const [approver, setApprover] = useState("");
  const [leave, setLeave] = useState({
    leaveType: "",
    fDate: "",
    tDate: "",
    reason: "",
    leaveStatus: "Pending",
    name: "",
  });

  useEffect(() => {
    getApprover();
  }, []);

  const getApprover = () => {
    axios
      .get(`/getApprover`)
      .then(function (response) {
        const approverId = response.data.data[0]["_id"] || "";
        setApprover(approverId);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/addleave", {
        ...leave,
        approver,
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
    navigate("/layouthr/leaveapp");
  };

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setLeave((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateInputs = (newDate, name) => {
    setLeave((prevState) => ({
      ...prevState,
      [name]: new Date(newDate).getTime(),
    }));
  };

  return (
    <div className="leaveForm_wrapper">
      <Grid container className="section_leave">
        <Grid items xs={5} className="section_leave_titleBox">
          <div className="section_leave_title">
            <hr className="divLine" />
            REGISTRATION
          </div>
          <div className="section_leave_title2">Add New Employee</div>
        </Grid>
        <Grid items xs={7} component={Paper} elevation={6} className="empreghr">
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
                    label="Name"
                    name="name"
                    value={leave.name}
                    onChange={handleInputs}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Leave Type</InputLabel>
                    <Select
                      label="Select your option"
                      name="leaveType"
                      value={leave.leaveType}
                      onChange={handleInputs}
                    >
                      <MenuItem value={"Sick Leave"}>Sick Leave</MenuItem>
                      <MenuItem value={"Casual Leave"}>Casual Leave</MenuItem>
                      <MenuItem value={"Privilege"}>Privilege Leave</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="From-Date"
                      name="fDate"
                      inputFormat="MM/dd/yyyy"
                      value={leave.fDate}
                      onChange={(newDate) => handleDateInputs(newDate, "fDate")}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="To-Date"
                      name="tdate"
                      inputFormat="MM/dd/yyyy"
                      value={leave.tDate}
                      onChange={(newDate) => handleDateInputs(newDate, "tDate")}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Reason for leave"
                    name="reason"
                    value={leave.reason}
                    onChange={handleInputs}
                    multiline
                    rows={2}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} className="actionButtons">
                  <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={handleSubmit}
                  >
                    Send
                  </Button>
                  <Button variant="outlined" startIcon={<DeleteIcon />}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default LeaveAppForm;
