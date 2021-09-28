import React, { useReducer, createContext } from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./components/css/App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ErrorPage from "./components/Errorpage";
import Dashboard from "./components/Dashboard";
import Tool from "./components/irmtool/Tool";
import Report from "./components/Report";
// import DashboardBd from "./components/DashboardBd";
import SideDrawer from "./components/SideDrawer";
import Logout from "./components/Logout";
import { initialState, reducer } from "./components/reducer/UseReducer";
import Footer from "./components/Footer";

// we create a contextAPI
export const UserContext = createContext();

const Routing = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Navbar />
          <Home />
          <Footer />
        </Route>

        <Route path="/login">
          <Navbar />
          <Login />
          <Footer />
        </Route>

        <Route path="/signup">
          <Navbar />
          <Signup />
          <Footer />
        </Route>

        {/* <Route path="/dashboardbd">
          <DashboardBd />
        </Route> */}

        <Route path="/irmreport">
          <SideDrawer />
          <Report />
        </Route>

        <Route path="/dashboard">
          <SideDrawer />
          <Dashboard />
        </Route>
        <Route path="/irmtool">
          <SideDrawer />
          <Tool />
        </Route>

        <Route path="/logout">
          <Logout />
        </Route>

        <Route path="/register">
          <Signup />
        </Route>

        <Route>
          <ErrorPage />
        </Route>
      </Switch>
    </>
  );
};

const App = () => {
  //* we use useReducer

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Routing />
    </UserContext.Provider>
  );
};

export default App;
