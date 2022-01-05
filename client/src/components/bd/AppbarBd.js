import React, { useState, useEffect } from "react";
import { Toolbar, AppBar, Badge, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Mail, Notifications } from "@material-ui/icons";

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
  icons: {
    alignItems: "center",
    display: (props) => (props.open ? "none" : "flex"),
  },
  badge: {
    marginRight: "20px",
  },
  name: { paddingRight: "20px" },
}));

const AppbarBD = () => {
  const classes = useStyles();
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

  return (
    <>
      <AppBar position="fixed" elevation={6} color="primary">
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.logoLg}>
            {format(new Date(), "do MMMM Y")}
          </Typography>
          <Typography className={classes.logoSm}>
            {format(new Date(), "do MMMM Y")}
          </Typography>
          <div className={classes.icons}>
            <Badge badgeContent={4} color="secondary" className={classes.badge}>
              <Mail />
            </Badge>
            <Badge badgeContent={2} color="secondary" className={classes.badge}>
              <Notifications />
            </Badge>
          </div>
          <Typography className={classes.name}>{userName}</Typography>
          <Link to="/logout" className="app-links">
            Logout
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppbarBD;
