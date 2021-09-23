import React, { useState } from "react";
import { /* NavLink, */ useHistory } from "react-router-dom";
// import signpic from "./images/signup.svg";
import "./css/Login.css";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const Signup = () => {
  const [userType, setuserType] = React.useState("user");
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
    type: "user",
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

  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, phone, work, password, cpassword, type } = user;
    console.log(user);
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
        type,
      }),
    });

    const data = await res.json();

    // I need to change the data to res
    if (data.status === 422 || !data) {
      window.alert("INvalid Registration");
      console.log("INvalid Registration");
    } else {
      window.alert(" Registration Successfull");
      console.log("Successfull Registration");

      history.push("/login");
    }
  };

  return (
    <>
      <section className="signup">
        <div className="container mt-5">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign Up</h2>
              <form method="POST" className="register-form" id="register-form">
                <div className="form-group">
                  <label htmlFor="name"></label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    value={user.name}
                    onChange={handleInputs}
                    placeholder="Your Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="zmdi zmdi-email material-icons-name"></i>
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    value={user.email}
                    onChange={handleInputs}
                    placeholder="Your Email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">
                    <i className="zmdi zmdi-phone-in-talk material-icons-name"></i>
                  </label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    autoComplete="off"
                    value={user.phone}
                    onChange={handleInputs}
                    placeholder="Your Phone"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="work">
                    <i className="zmdi zmdi-slideshow material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="work"
                    id="work"
                    autoComplete="off"
                    value={user.work}
                    onChange={handleInputs}
                    placeholder="Your Profession"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    <i className="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInputs}
                    placeholder="Your Password"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cpassword">
                    <i className="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    autoComplete="off"
                    value={user.cpassword}
                    onChange={handleInputs}
                    placeholder="Confirm Your Password"
                  />
                </div>

                <FormControl component="fieldset">
                  <FormLabel component="legend">Type</FormLabel>
                  <RadioGroup
                    aria-label="type"
                    name="type"
                    value={userType}
                    onChange={handleInputs}
                  >
                    <FormControlLabel
                      value="admin"
                      control={<Radio />}
                      label="Admin"
                    />
                    <FormControlLabel
                      value="user"
                      control={<Radio />}
                      label="User"
                    />
                  </RadioGroup>
                </FormControl>

                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    className="form-submit"
                    value="register"
                    onClick={PostData}
                  />
                </div>
              </form>
            </div>

            {/* <div className="signup-image">
              <figure>
                <img src={signpic} alt="registration pic" />
              </figure>
              <NavLink to="/login" className="signup-image-link">
                I am already register
              </NavLink>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
