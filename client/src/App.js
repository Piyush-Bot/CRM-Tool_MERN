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
import Logout from "./components/Logout";
import { initialState, reducer } from "./components/reducer/UseReducer";
import Search from "./components/search/Search";
import Footer from "./components/Footer";
// import Login2 from "./components/Login2";
// import Search1 from "./components/search/Search1";

// we create a contextAPI
export const UserContext = createContext();

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      {/* <Route path="/search1">
        <Search1 />
      </Route> */}

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/signup">
        <Signup />
      </Route>

      <Route path="/dashboard">
        <Dashboard />
      </Route>

      <Route path="/logout">
        <Logout />
      </Route>

      <Route path="/search">
        <Search />
      </Route>

      <Route>
        <ErrorPage />
      </Route>
    </Switch>
  );
};

const App = () => {
  //* we use useReducer

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Navbar />
      <Routing />
      <Footer />
    </UserContext.Provider>
  );
};

export default App;
