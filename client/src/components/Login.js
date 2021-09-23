import React, { useState, useContext } from "react";
import { /* NavLink, */ useHistory } from "react-router-dom";
import { UserContext } from "../App";
import "./css/Login.css";
import loginImage from "./images/SC_logo.png";
import Button from "@mui/material/Button";
// import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);

  const history = useHistory();
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
        ? history.push("/dashboard")
        : history.push("/dashboardbd");
    }
  };

  return (
    <>
      <section>
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

                  {/* <div>
                    <input
                      className="login-form-button"
                      type="submit"
                      name="signin"
                      id="signin"
                      className="form-submit"
                      value="Log In"
                      onClick={loginUser}
                    />
                  </div> */}
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
                    {/* <Button variant="contained" endIcon={<SendIcon />}>
                      Send
                    </Button> */}
                  </Stack>
                </form>
                {/* <NavLink to="/signup" className="signup-image-link">
                  Create an Account
                </NavLink> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
