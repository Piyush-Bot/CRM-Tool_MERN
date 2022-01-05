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
  FormControlLabel,
  FormLabel,
  FormControl,
  RadioGroup,
  Radio,
  Paper,
  Box,
  Grid,
  Typography,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";

const EmployeeReg = () => {
  const [value, setValue] = React.useState(new Date("2021-08-18T21:11:54"));
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="main_wrapper">
      <Typography gutterBottom variant="h5">
        Employee Registration
      </Typography>
      <div className="empreghr">
        <Grid item xs={12} component={Paper} elevation={6} square>
          {/* <h5>Fill the details.</h5> */}
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
                  <TextField
                    required
                    fullWidth
                    type="email"
                    name="email"
                    label="Email Address"

                    // value={user.email}
                    // onChange={handleInputs}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Account access</InputLabel>
                    <Select
                      label="account_access"
                      name="account_access"
                      // value={age}
                      // onChange={handleChange}
                    >
                      <MenuItem>Admin</MenuItem>
                      <MenuItem>HR</MenuItem>
                      <MenuItem>Employee</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="firstname"
                    label="First Name"
                    // value={user.email}
                    // onChange={handleInputs}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="lastname"
                    required
                    fullWidth
                    // value={user.name}
                    // onChange={handleInputs}
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
                    // value={user.phone}
                    // onChange={handleInputs}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Department</InputLabel>
                    <Select
                      required
                      name="department"
                      label="Department"
                      // value={age}
                      // onChange={handleChange}
                    >
                      <MenuItem>BD</MenuItem>
                      <MenuItem>IRM</MenuItem>
                      <MenuItem>Tech.</MenuItem>
                      <MenuItem>Opps.</MenuItem>
                      <MenuItem>Content</MenuItem>
                      <MenuItem>Production</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup
                      row
                      aria-label="type"
                      name="gender"
                      // value={userType}
                      // onChange={handleInputs}
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

                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="DOB"
                      name="dob"
                      inputFormat="MM/dd/yyyy"
                      value={value}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      name="doj"
                      label="Date of joining"
                      inputFormat="MM/dd/yyyy"
                      value={value}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>

                <Stack direction="row" spacing={2}>
                  <Button variant="contained" endIcon={<SendIcon />}>
                    Send
                  </Button>
                  <Button variant="outlined" startIcon={<DeleteIcon />}>
                    Delete
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

export default EmployeeReg;
