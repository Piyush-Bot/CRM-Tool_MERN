import React from "react";
import {
  ListItem,
  List,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import Drawer from '@mui/material/Drawer';
import { makeStyles } from "@material-ui/core/styles";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
  drawer: {
    width: "250px"
  }
});

const SideDrawer = props => {
  const { history } = props;
  const classes = useStyles();
  const itemsList = [
    {
      text: "Dashboard",
      icon: <InboxIcon />,
      onClick: () => history.push("/dashboard")
    },
    {
      text: "IRM Tool",
      icon: <MailIcon />,
      onClick: () => history.push("/search")
    },
    {
      text: "Reports",
      icon: <MailIcon />,
      onClick: () => history.push("/irmreport")
    },
    {
      text: "Users",
      icon: <MailIcon />,
      onClick: () => history.push("/irmreport")
    },
    {
      text: "Products",
      icon: <MailIcon />,
      onClick: () => history.push("/irmreport")
    },
    {
      text: "Transactions",
      icon: <MailIcon />,
      onClick: () => history.push("/irmreport")
    },
    {
      text: "Sales",
      icon: <MailIcon />,
      onClick: () => history.push("/irmreport")
    }
  ];
  return (
    <Drawer variant="permanent" sx={{
        width: 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 250,
          boxSizing: 'border-box',
        },
      }}
      >
      <List>
        {itemsList.map((item, index) => {
          const { text, icon, onClick } = item;
          return (
            <ListItem button key={text} onClick={onClick}>
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default withRouter(SideDrawer);