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
import LayoutBd from "./components/LayoutBd";
import DashboardBd from "./components/DashboardBd";
import LayoutIrm from "./components/LayoutIrm";
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

        <Route path="/dashboardbd">
          <LayoutBd />
          <DashboardBd />
        </Route>

        <Route path="/dashboard">
          <LayoutIrm />
          <Dashboard />
        </Route>

        <Route path="/irmtool">
          <LayoutIrm />
          <Tool />
        </Route>

        <Route path="/irmreport">
          <LayoutIrm />
          <Report />
        </Route>

        <Route path="/logout">
          <Logout />
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
