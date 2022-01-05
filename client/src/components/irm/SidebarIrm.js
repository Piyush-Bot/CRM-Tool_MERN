import React from "react";
import {
  Container,
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
  Typography,
} from "@material-ui/core";

import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { AddCircleOutlineOutlined, ImportantDevices } from "@material-ui/icons";
import MailIcon from "@material-ui/icons/Mail";
import ManageAccountsSharpIcon from "@mui/icons-material/ManageAccountsSharp";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: "100%",
    color: "white",
    backgroundColor: "#2d2d2d",
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
    color: "#ffffff",
  },
  iconirm: {
    marginRight: "10px",
    color: "#EcE42d",
  },
}));

const menuItems = [
  { text: "Dashboard", icon: <InboxIcon />, path: "/layoutirm/dashboard" },
  { text: "IRM Tool", icon: <MailIcon />, path: "/layoutirm/irmtool" },
  { text: "Purchase Order", icon: <MailIcon />, path: "/layoutirm/invoicegen" },
  {
    text: "Reports",
    icon: <AddCircleOutlineOutlined />,
    path: "/layoutirm/irmreport",
  },
];

const SidebarIrm = () => {
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
            <ManageAccountsSharpIcon
              fontSize="large"
              className={classes.iconirm}
            />
            IRM
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

export default SidebarIrm;
