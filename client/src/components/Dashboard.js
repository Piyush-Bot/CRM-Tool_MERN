import React, { useState, useEffect } from "react";
import Sidebar from "./dashboard/Sidebar";

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
        {/* <div className="col-md-2">
          <Sidebar />
        </div> */}

        <div className="col-md-10">
          <div className="row">
            <div className="col-md-8">
              <h4>DASHBOARD</h4>
              <hr />
            </div>
            <div className="col-md-4">
              WELCOME
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
