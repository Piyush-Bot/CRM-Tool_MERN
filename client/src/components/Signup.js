import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  FormLabel,
  FormControl,
  RadioGroup,
  Radio,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const theme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Signup = () => {
  let navigate = useNavigate();
  const [userType, setuserType] = useState("user");
  const [showPassword, setshowPassword] = useState(false);
  const [openSnackbar, setopenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [timerOutRef, setTimerOutRef] = useState(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
    type: "emp",
  });

  let name, value;

  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    console.log(name, value);
    if (e.target.name === "type") {
      setuserType(e.target.value);
    }
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    return () => clearTimeout(timerOutRef);
  }, []);

  const PostData = (e) => {
    e.preventDefault();
    axios
      .post("/register", {
        ...user,
      })
      .then(function (response) {
        setopenSnackbar(true);
        setMessage(response.data.message);
        const timerOutRef = setTimeout(() => {
          navigate("/login");
        }, 3000);
        setTimerOutRef(timerOutRef);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //show password functions
  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //code for handling snackbar
  const handleClick = () => {
    setopenSnackbar(true);
  };
  const handleClose = () => {
    setopenSnackbar(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>🔒</Avatar>
            <Typography gutterBottom component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    value={user.name}
                    onChange={handleInputs}
                    label="Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="email"
                    name="email"
                    label="Email Address"
                    value={user.email}
                    onChange={handleInputs}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Phone"
                    name="phone"
                    type="number"
                    value={user.phone}
                    onChange={handleInputs}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Work"
                    name="work"
                    type="work"
                    value={user.work}
                    onChange={handleInputs}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={user.password}
                    onChange={handleInputs}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="cpassword"
                    label="Cpassword"
                    type={showPassword ? "text" : "password"}
                    value={user.cpassword}
                    onChange={handleInputs}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <FormControl component="fieldset">
                <FormLabel component="legend">Role_Type</FormLabel>
                <RadioGroup
                  row
                  aria-label="type"
                  name="type"
                  value={userType}
                  onChange={handleInputs}
                >
                  <FormControlLabel
                    value="irm"
                    control={<Radio />}
                    label="IRM"
                  />
                  <FormControlLabel value="bd" control={<Radio />} label="BD" />
                  <FormControlLabel value="hr" control={<Radio />} label="HR" />
                  <FormControlLabel
                    value="emp"
                    control={<Radio />}
                    label="EMP"
                  />
                </RadioGroup>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                name="signup"
                variant="contained"
                value="register"
                onClick={PostData}
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={
              message.includes("Registration Successful") ? "success" : "error"
            }
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Grid>
    </ThemeProvider>
  );
};
export default Signup;
