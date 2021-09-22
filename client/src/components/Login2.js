import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";
import "./css/Login2.css";

const Login2 = () => {
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
        ? history.push("/contact")
        : history.push("/dashboard");
    }
  };

  return (
    <>
      <section>
        <div className="main-container">
          <div className="logo">
            <img src="https://laudco.com/storage/companies/November2020/luiH5EoJoWEVqmMPC1Ys.png" />
          </div>

          <div className="login-inputs">
            <form>
              <div className="signin-form">
                <h3>Sign In</h3>
                <br />
                <div className="form-group">
                  {/* <label>Email address</label> */}
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
                  {/* <label>Password</label> */}
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
                <input
                  className="login-form-button"
                  type="submit"
                  name="signin"
                  id="signin"
                  value="SUBMIT"
                  onClick={loginUser}
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login2;
