import React, { useState, useEffect } from "react";

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
      <div className="home-page">
        <div className="home-div">
          <p className="pt-5">WELCOME</p>
          <h1>{userName}</h1>
          <h3>"Happy, to see you back"</h3>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
//{" "}  {show ? "Happy, to see you back" : "We Are The MERN Developer"}
