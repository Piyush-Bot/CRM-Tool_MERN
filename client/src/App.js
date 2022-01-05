import React, { useReducer, createContext } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./components/css/App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import LayoutBd from "./components/LayoutBd";
import LayoutIrm from "./components/LayoutIrm";
import LayoutHr from "./components/hr/LayoutHr";
import ErrorPage from "./components/Errorpage";
import Login from "./components/Login";
import Signup from "./components/Signup";
// import Dashboard from "./components/irm/Dashboard";
// import Tool from "./components/irm/influencerList/Tool";
// import Report from "./components/irm/Report";
// import DashboardBd from "./components/bd/DashboardBd";
import Logout from "./components/Logout";

import { initialState, reducer } from "./components/reducer/UseReducer";

// we create a contextAPI
export const UserContext = createContext();

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Navbar />
        <Home />
      </Route>

      <Route path="/login/*" element={<Login />} />
      <Route path="/logout/*" element={<Logout />} />
      <Route path="/signup/*" element={<Signup />} />
      <Route path="/layoutbd/*" element={<LayoutBd />} />
      <Route path="/layoutirm/*" element={<LayoutIrm />} />
      <Route path="/layouthr/*" element={<LayoutHr />} />
      <Route path="*" element={<Navigate to="/layoutirm" />} />

      {/* <Route>
          <ErrorPage />
        </Route> */}
    </Routes>
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
