import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import { useHistory, useLocation } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@material-ui/icons";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { format } from "date-fns";
import loginImage from "./images/SC_logo.png";
import "./css/sidedrawer.css";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
    },
    root: {
      display: "flex",
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      background: "#f4f4f4",
    },
    title: {
      padding: theme.spacing(1),
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    date: {
      flexGrow: 1,
    },
    name: {
      paddingRight: "20px",
    },

    icon: {
      display: "flex",
      justifyContent: "center",
    },
    toolbar: theme.mixins.toolbar,
  };
});

export default function SideDrawer() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  //Get dynamic User name
  const [userName, setUserName] = useState("");
  // const [show, setShow] = useState(false);
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

  const menuItems = [
    {
      text: "Dashboard",
      icon: <InboxIcon />,
      path: "/dashboard",
    },
    {
      text: "IRM Tool",
      icon: <MailIcon />,
      path: "/irmtool",
    },
    {
      text: "Reports",
      icon: <AddCircleOutlineOutlined />,
      path: "/irmreport",
    },
    {
      text: "Users",
      icon: <SubjectOutlined />,
    },
    {
      text: "Products",
      icon: <MailIcon />,
    },
    {
      text: "Transactions",
      icon: <MailIcon />,
    },
    {
      text: "Sales",
      icon: <MailIcon />,
    },
  ];

  return (
    <div className={classes.root}>
      {/* app bar */}
      <AppBar
        position="fixed"
        className={classes.appBar}
        elevation={0}
        color="primary"
      >
        <Toolbar>
          <Typography className={classes.date}>
            Today is the {format(new Date(), "do MMMM Y")}
          </Typography>
          <Typography className={classes.name}>{userName}</Typography>

          <Link to="/logout" className="app-links">
            Logout
          </Link>
        </Toolbar>
      </AppBar>

      {/* side drawer */}
      <div className="hello">
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
          anchor="left"
        >
          <div>
            <Typography variant="h5" className={classes.title}>
              <img
                className={classes.icon}
                src={loginImage}
                alt="login logo"
                width="140"
                height="80"
              />
            </Typography>
          </div>

          {/* links/list section */}
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => history.push(item.path)}
                className={
                  location.pathname == item.path ? classes.active : null
                }
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
      {/* main content */}
      {/* <div className={classes.page}></div> */}
      <div className={classes.toolbar}></div>
      {/* {children}*/}
    </div>
  );
}
