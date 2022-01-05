import React from "react";
import "./Hr.css";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

import {
  Stack,
  Button,
  TextField,
  FormControl,
  Paper,
  Box,
  Grid,
  Typography,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";

const LeaveAppForm = () => {
  const [value, setValue] = React.useState(new Date("2021-08-18T21:11:54"));
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="main_wrapper">
      <Typography gutterBottom variant="h5">
        Add LeaveApplicationEmp Details
      </Typography>
      <div className="empreghr">
        <Grid item xs={12} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px 5px",
            }}
          >
            <Box method="POST">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Leave Type</InputLabel>
                    <Select
                      label="Select your option"
                      name="leave_type"
                      // value={age}
                      // onChange={handleChange}
                    >
                      <MenuItem>Sick Leave</MenuItem>
                      <MenuItem>Casual Leave</MenuItem>
                      <MenuItem>Privilege Leave</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="FromDate"
                      name="fdate"
                      inputFormat="MM/dd/yyyy"
                      // value={value}
                      // onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="ToDate"
                      name="tdate"
                      inputFormat="MM/dd/yyyy"
                      // value={value}
                      // onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid xs={12} item>
                  <TextField
                    required
                    fullWidth
                    label="Reason for leave"
                    name="reason"
                    // value={user.term}
                    // onChange={(event) => handleChangeInput(event)}
                    multiline
                    rows={2}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Leave Status</InputLabel>
                    <Select
                      required
                      name="lstatus"
                      label="Leave Status"
                      // value={age}
                      // onChange={handleChange}
                    >
                      <MenuItem>Pending</MenuItem>
                      <MenuItem>Approved</MenuItem>
                      <MenuItem>Rejected.</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Stack direction="row" spacing={2}>
                  <Button variant="contained" endIcon={<SendIcon />}>
                    Send
                  </Button>
                  <Button variant="outlined" startIcon={<DeleteIcon />}>
                    Cancel
                  </Button>
                </Stack>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </div>
    </div>
  );
};

export default LeaveAppForm;
