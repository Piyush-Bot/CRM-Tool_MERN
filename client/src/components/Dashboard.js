import React, { useState, useEffect } from "react";

import FeaturedInfo from "./dashboard/FeaturedInfo";
import WidgetLg from "./dashboard/WidgetLg";
import WidgetSm from "./dashboard/WidgetSm";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  // const [show, setShow] = useState(false);

  const userHomePage = async () => {
    try {
      const res = await fetch("/getData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setUserName(data.name);
      //setShow(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userHomePage();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-2">SideBar</div>

        <div className="col-md-10">
          <div className="row">
            <div className="col-md-9">
              <div className="home-page">
                <div className="home-div">
                  <p className="pt-5">
                    <h4>DASHBOARD</h4>
                    <hr />
                    WELCOME
                  </p>
                  <h1>{userName}</h1>
                  <h3>"Happy, to see you back"</h3>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <h2>INF_ right</h2>
              <p>
                Material UI is a component library for React teeming with
                powerful components that you should be using in your projects.
                If you're just looking to create a good looking app, Material UI
                can provide you with solid pre-styled components that will get
                the job done.
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <h2>Recent</h2>
              <WidgetSm />
            </div>

            <div className="col-md-8">
              <h2>Campaign</h2>
              <FeaturedInfo />
            </div>
          </div>
          <div className="row">
            <h5>end-of-list</h5>
            <WidgetLg />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
//{" "}  {show ? "Happy, to see you back" : "We Are The MERN Developer"}
