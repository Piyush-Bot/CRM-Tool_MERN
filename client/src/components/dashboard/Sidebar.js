import "./sidebar.css";
import React from "react";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

const sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">IRM Navigation</h3>
            <ul className="sidebarList">
              <Link to="/dashboard" className="link">
                <li className="sidebarListItem active">
                  <LineStyle className="sidebarIcon" />
                  Dashboard
                </li>
              </Link>

              <Link to="/search" className="link">
                <li className="sidebarListItem">
                  <Timeline className="sidebarIcon" />
                  IRM Tool
                </li>
              </Link>
              <Link to="/irmreport" className="link">
                <li className="sidebarListItem">
                  <BarChart className="sidebarIcon" />
                  Reports
                </li>
              </Link>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Demo Menu</h3>
            <ul className="sidebarList">
              <Link to="/users" className="link">
                <li className="sidebarListItem">
                  <PermIdentity className="sidebarIcon" />
                  Users
                </li>
              </Link>
              <Link to="/products" className="link">
                <li className="sidebarListItem">
                  <Storefront className="sidebarIcon" />
                  Products
                </li>
              </Link>
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Transactions
              </li>
              <li className="sidebarListItem">
                <TrendingUp className="sidebarIcon" />
                Sales
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default sidebar;
