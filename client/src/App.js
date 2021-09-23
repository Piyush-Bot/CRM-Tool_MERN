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
import Search from "./components/search/Search";
import IRMreport from "./components/IRMreport";
import DashboardBd from "./components/DashboardBd";
import SideDrawer from "./components/SideDrawer";
import Logout from "./components/Logout";
import { initialState, reducer } from "./components/reducer/UseReducer";
import Footer from "./components/Footer";

// import Search1 from "./components/search/Search1";

// we create a contextAPI
export const UserContext = createContext();

const Routing = () => {
  return (
    <>
    <Switch>
      <Route exact path="/">
      <Navbar />
        <Home />
      </Route>

      {/* <Route path="/search1">
        <Search1 />
      </Route> */}

      <Route path="/login">
      <Navbar />
        <Login />
      </Route>

      <Route path="/signup">
        <Signup />
      </Route>

      <Route path="/dashboardbd">
        <DashboardBd />
      </Route>

      <Route path="/irmreport">
      <SideDrawer/>
        <IRMreport />
      </Route>

      <Route path="/dashboard">
      <SideDrawer/>
        <Dashboard />
      </Route>
      <Route path="/search">
      <SideDrawer/>
        <Search />
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
      <Footer />
    </UserContext.Provider>
  );
};

export default App;
