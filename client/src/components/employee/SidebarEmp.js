import React from "react";
import {
  Container,
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useNavigate, useLocation } from "react-router-dom";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { BsPersonLinesFill } from "react-icons/bs";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    color: "white",
    backgroundColor: "#495159",
    position: "sticky",
    top: 0,
    padding: "73px 5px",
    margin: 0,
    border: "0px 1px solid #ece7e7",
    // [theme.breakpoints.up("sm")]: {
    //   backgroundColor: "#2d2d2d",
    //   color: "#ffffff",
    //   border: "0px 1px solid #ece7e7",
    // },
  },
  icon: {
    marginRight: "20px",
    textAlign: "center",
  },
  iconhr: {
    marginRight: "10px",
    color: "#EcE42d",
  },
}));

const menuItems = [
  { text: "LeaveForm", icon: <MailIcon />, path: "/layoutemp/leaveappform" },
];

const SidebarEmp = () => {
  const classes = useStyles();
  const history = useNavigate();
  const location = useLocation();

  const navigateToItems = (path) => {
    history(path);
  };
  return (
    <>
      <Container className={classes.container}>
        <div>
          <Typography style={{ textAlign: "center", fontSize: "30px" }}>
            <BsPersonLinesFill className={classes.iconhr} /> Employee
          </Typography>
          <hr />
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => navigateToItems(item.path)}
                className={
                  location.pathname === item.path ? classes.active : null
                }
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Container>
    </>
  );
};

export default SidebarEmp;
