import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const Signup = () => {
  const [userType, setuserType] = React.useState("user");
  const history = useNavigate();
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
      history("/login");
    }
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
            <Box method="POST">
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
                    type="password"
                    value={user.password}
                    onChange={handleInputs}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="cpassword"
                    label="Cpassword"
                    type="password"
                    value={user.cpassword}
                    onChange={handleInputs}
                  />
                </Grid>
              </Grid>

              <FormControl component="fieldset">
                <FormLabel component="legend">Type</FormLabel>
                <RadioGroup
                  row
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

              <Button
                type="submit"
                fullWidth
                name="signup"
                variant="contained"
                value="register"
                onClick={PostData}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
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
      </Grid>
    </ThemeProvider>
  );
};
export default Signup;

// import React, { useState } from "react";
// import { /* NavLink, */ useNavigate } from "react-router-dom";
// // import signpic from "./images/signup.svg";
// import "./css/Login.css";

// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormControl from "@material-ui/core/FormControl";
// import FormLabel from "@material-ui/core/FormLabel";

// const Signup = () => {
//   const [userType, setuserType] = React.useState("user");
//   const history = useNavigate();
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     work: "",
//     password: "",
//     cpassword: "",
//     type: "user",
//   });

//   let name, value;

//   const handleInputs = (e) => {
//     console.log(e);
//     name = e.target.name;
//     value = e.target.value;
//     console.log(name, value);
//     if (e.target.name === "type") {
//       setuserType(e.target.value);
//     }
//     setUser({ ...user, [name]: value });
//   };

//   const PostData = async (e) => {
//     e.preventDefault();

//     const { name, email, phone, work, password, cpassword, type } = user;
//     console.log(user);
//     const res = await fetch("/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name,
//         email,
//         phone,
//         work,
//         password,
//         cpassword,
//         type,
//       }),
//     });

//     const data = await res.json();

//     // I need to change the data to res
//     if (data.status === 422 || !data) {
//       window.alert("INvalid Registration");
//       console.log("INvalid Registration");
//     } else {
//       window.alert(" Registration Successfull");
//       console.log("Successfull Registration");

//       history("/login");
//     }
//   };

//   return (
//     <>
//       <section className="signup">
//         <div className="container mt-5">
//           <div className="signup-content">
//             <div className="signup-form">
//               <h2 className="form-title">Sign Up</h2>
//               <form method="POST" className="register-form" id="register-form">
//                 <div className="form-group">
//                   <label htmlFor="name"></label>
//                   <input
//                     className="form-control"
//                     type="text"
//                     name="name"
//                     id="name"
//                     autoComplete="off"
//                     value={user.name}
//                     onChange={handleInputs}
//                     placeholder="Your Name"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="email">
//                     <i className="zmdi zmdi-email material-icons-name"></i>
//                   </label>
//                   <input
//                     className="form-control"
//                     type="email"
//                     name="email"
//                     id="email"
//                     autoComplete="off"
//                     value={user.email}
//                     onChange={handleInputs}
//                     placeholder="Your Email"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="phone">
//                     <i className="zmdi zmdi-phone-in-talk material-icons-name"></i>
//                   </label>
//                   <input
//                     type="number"
//                     name="phone"
//                     id="phone"
//                     autoComplete="off"
//                     value={user.phone}
//                     onChange={handleInputs}
//                     placeholder="Your Phone"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="work">
//                     <i className="zmdi zmdi-slideshow material-icons-name"></i>
//                   </label>
//                   <input
//                     type="text"
//                     name="work"
//                     id="work"
//                     autoComplete="off"
//                     value={user.work}
//                     onChange={handleInputs}
//                     placeholder="Your Profession"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="password">
//                     <i className="zmdi zmdi-lock material-icons-name"></i>
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     id="password"
//                     autoComplete="off"
//                     value={user.password}
//                     onChange={handleInputs}
//                     placeholder="Your Password"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="cpassword">
//                     <i className="zmdi zmdi-lock material-icons-name"></i>
//                   </label>
//                   <input
//                     type="password"
//                     name="cpassword"
//                     id="cpassword"
//                     autoComplete="off"
//                     value={user.cpassword}
//                     onChange={handleInputs}
//                     placeholder="Confirm Your Password"
//                   />
//                 </div>

//                 <FormControl component="fieldset">
//                   <FormLabel component="legend">Type</FormLabel>
//                   <RadioGroup
//                     aria-label="type"
//                     name="type"
//                     value={userType}
//                     onChange={handleInputs}
//                   >
//                     <FormControlLabel
//                       value="admin"
//                       control={<Radio />}
//                       label="Admin"
//                     />
//                     <FormControlLabel
//                       value="user"
//                       control={<Radio />}
//                       label="User"
//                     />
//                   </RadioGroup>
//                 </FormControl>

//                 <div className="form-group form-button">
//                   <input
//                     type="submit"
//                     name="signup"
//                     id="signup"
//                     className="form-submit"
//                     value="register"
//                     onClick={PostData}
//                   />
//                 </div>
//               </form>
//             </div>

//             {/* <div className="signup-image">
//               <figure>
//                 <img src={signpic} alt="registration pic" />
//               </figure>
//               <NavLink to="/login" className="signup-image-link">
//                 I am already register
//               </NavLink>
//             </div> */}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Signup;
