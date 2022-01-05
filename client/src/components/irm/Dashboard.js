import React, { useState, useEffect } from "react";
import FeaturedInfo from "./dashboard/Campinfo";
import Map from "./dashboard/Map";
import Chart from "./dashboard/chart";
import "./dashboard.css";
const Dashboard = () => {
  const [setUserName] = useState("");
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
      <div className="dashboard_wrapper">
        <div className="row">
          <h4>DASHBOARD</h4>
          <hr />
          <div className="hero_section">
            <div className="row">
              <div className="col-md-6">
                <h2>Campaign</h2>
                <FeaturedInfo />
              </div>
              <div className="col-md-6">
                <div className="Map-chart">
                  <Map />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-8">
              <div className="Campaign-chart">
                <Chart />
                <div className="Campaign-heading">Campaigns-Graph</div>
              </div>
            </div>
            <div className="col-md-4">
              <h2> Empty </h2>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
//{" "}  {show ? "Happy, to see you back" : "We Are The MERN Developer"}
