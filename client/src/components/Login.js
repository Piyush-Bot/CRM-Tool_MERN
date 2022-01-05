// import React, { useState, useContext } from "react";
// import { /* NavLink, */ useNavigate } from "react-router-dom";
// import { UserContext } from "../App";
// import "./css/Login.css";
// import loginImage from "./images/logo.png";
// import Button from "@mui/material/Button";
// import SendIcon from "@mui/icons-material/Send";
// import Stack from "@mui/material/Stack";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";

import React, { useState, useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import loginImage from "./images/logo.png";
const theme = createTheme();

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = res.json();
    if (res.status === 400 || !data) {
      window.alert("Invalid Credentials");
    } else {
      dispatch({ type: "USER", payload: true });
      const fdata = await data;
      console.log(fdata);
      window.alert("Login Successfull");
      fdata.type === "admin"
        ? history("/layoutirm/dashboard")
        : history("/layoutbd/dashboardbd");
    }
  };

  return (
    <>
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
          >
            <img src={loginImage} alt="login logo" width={"100px"} />
          </Grid>

          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
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
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box method="POST" sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  name="signin"
                  value="Log In"
                  onClick={loginUser}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>

      {/* <section>
        <div className="main-conatiner">
          <div className="row">
            <div className="col-md-7">
              <div className="login-image">
                <figure>
                  <img src={loginImage} alt="login logo" />
                </figure>
              </div>
            </div>
            <div className="col-md-5">
              <div className="login-form">
                <h2 className="form-title">SIGN IN</h2>
                <form
                  method="POST"
                  className="register-form"
                  id="register-form"
                >
                  <div className="form-group">
                    <label htmlFor="email">
                      <i className="zmdi zmdi-email material-icons-name"></i>
                    </label>
                    <input
                      className="login-form-control"
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="off"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your Email"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">
                      <i className="zmdi zmdi-lock material-icons-name"></i>
                    </label>
                    <input
                      className="login-form-control"
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="off"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Your Password"
                    />
                  </div>

                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      color="success"
                      type="submit"
                      name="signin"
                      id="signin"
                      className="form-submit"
                      value="Log In"
                      onClick={loginUser}
                    >
                      Submit
                    </Button>
                  </Stack>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default Login;
