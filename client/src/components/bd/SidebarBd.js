import React from "react";
import {
  Container,
  Typography,
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useNavigate, useLocation } from "react-router-dom";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import CasesSharpIcon from "@mui/icons-material/CasesSharp";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    color: "white",
    backgroundColor: "#495159",
    position: "sticky",
    top: 0,
    padding: "73px 5px",
    margin: 0,
    // [theme.breakpoints.up("sm")]: {
    //   backgroundColor: "white",
    //   color: "#555",
    //   border: "1px solid #ece7e7",
    // },
  },
  icon: {
    marginRight: "20px",
    textAlign: "center",
  },
  iconbd: {
    marginRight: "10px",
    color: "#EcE42d",
  },
}));

const menuItems = [
  { text: "Influencer", icon: <InboxIcon />, path: "/layoutbd/dashboardbd" },
];

const SidebarBd = () => {
  const classes = useStyles();
  const history = useNavigate();
  const location = useLocation();
  return (
    <>
      <Container className={classes.container}>
        <div>
          <div>
            <Typography style={{ textAlign: "center", fontSize: "30px" }}>
              <CasesSharpIcon fontSize="medium" className={classes.iconbd} /> BD
            </Typography>
            <hr />
          </div>

          {/* links/list section */}
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => history(item.path)}
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

export default SidebarBd;
