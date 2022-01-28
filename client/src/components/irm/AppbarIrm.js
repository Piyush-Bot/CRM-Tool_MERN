import React, { useState, useEffect } from "react";
import { Toolbar, AppBar, Avatar, Badge, Typography } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
// import { Mail, Notifications } from "@material-ui/icons";
import logo from "../images/logo.png";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  dateLg: {
    flexGrow: 1,
    display: "none",
    // [theme.breakpoints.up("sm")]: { display: "block" },
  },
  dateSm: {
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

const AppbarIrm = () => {
  const classes = useStyles();
  let navigate = useNavigate();
  //Get dynamic User name
  const [userName, setUserName] = useState("");
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
      <AppBar position="fixed" elevation={0} color="primary">
        <Toolbar className={classes.toolbar}>
          <Avatar className={classes.logo} src={logo} />
          <Typography className={classes.dateLg}>
            {format(new Date(), "do MMMM Y")}
          </Typography>
          <Typography className={classes.dateSm}>
            {format(new Date(), "do MMMM Y")}
          </Typography>
          {/* <div className={classes.icons}>
            <Badge badgeContent={4} color="secondary" className={classes.badge}>
              <Mail />
            </Badge>
            <Badge badgeContent={2} color="secondary" className={classes.badge}>
              <Notifications />
            </Badge>
            <Avatar src={logo} />
          </div> */}
          <Typography className={classes.name}>{userName}</Typography>
          <span onClick={logout}>Logout</span>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppbarIrm;
