import React, { useState, useEffect } from "react";
import { Toolbar, AppBar, Avatar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { format } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  logoLg: {
    flexGrow: 1,
    display: "none",
    // [theme.breakpoints.up("sm")]: { display: "block" },
  },
  logoSm: {
    flexGrow: 1,
    display: "block",
    // [theme.breakpoints.up("sm")]: { display: "none" },
  },
  logo: {
    marginRight: "20px",
    display: "block",
  },

  // icons: {
  //   alignItems: "center",
  //   display: (props) => (props.open ? "none" : "flex"),
  // },
  // badge: {
  //   marginRight: "20px",
  // },
  name: { paddingRight: "20px" },
}));

const AppbarHr = () => {
  const classes = useStyles();
  let navigate = useNavigate();
  //Get dynamic User name
  const [userName, setUserName] = useState("");
  //const [show, setShow] = useState(false);
  const userNamedata = async () => {
    try {
      const res = await fetch("/getData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setUserName(data.name);
      //setShow(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userNamedata();
  }, []);

  const logout = () => {
    axios
      .get("/logout")
      .then(function (response) {
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <AppBar position="fixed" elevation={3} color="primary">
        <Toolbar className={classes.toolbar}>
          <Avatar className={classes.logo} src={logo} />
          <Typography className={classes.logoLg}>
            {format(new Date(), "do MMMM Y")}
          </Typography>
          <Typography className={classes.logoSm}>
            {format(new Date(), "do MMMM Y")}
          </Typography>
          {/*<div className={classes.icons}>
            <Badge badgeContent={4} color="secondary" className={classes.badge}>
              <Mail />
            </Badge>
            <Badge badgeContent={2} color="secondary" className={classes.badge}>
              <Notifications />
            </Badge>
             <Avatar src={logo} /> 
          </div>*/}
          <Typography className={classes.name}>{userName}</Typography>
          <span onClick={logout}>Logout</span>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppbarHr;
