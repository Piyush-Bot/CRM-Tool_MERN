import React, { useReducer, createContext } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./components/css/App.css";
import Navbar from "./components/Navbar";
import Home from "./components/home/Home";
import LayoutBd from "./components/bd/LayoutBd";
import LayoutIrm from "./components/irm/LayoutIrm";
import LayoutHr from "./components/hr/LayoutHr";
import LayoutEmp from "./components/employee/LayoutEmp";
import ErrorPage from "./components/Errorpage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { initialState, reducer } from "./components/reducer/UseReducer";

// we create a contextAPI
export const UserContext = createContext();

const Routing = () => {
  // const routeSelector = {
  //   hr: <Route path="/layouthr/*" element={<LayoutHr />} />,
  //   emp: <Route path="/layoutemp/*" element={<LayoutEmp />} />,
  //   irm: <Route path="/layoutirm/*" element={<LayoutIrm />} />,
  //   bd: <Route path="/layoutbd/*" element={<LayoutBd />} />,
  // };
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Navbar />
        <Home />
      </Route>
      <Route path="/login/*" element={<Login />} />
      <Route path="/signup/*" element={<Signup />} />
      {/* {routeSelector[sessionStorage.getItem("role")]} */}
      <Route path="/layoutbd/*" element={<LayoutBd />} />
      <Route path="/layouthr/*" element={<LayoutHr />} />
      <Route path="/layoutemp/*" element={<LayoutEmp />} />
      <Route path="/layoutirm/*" element={<LayoutIrm />} />
      <Route path="/error/*" element={<ErrorPage />} />
      <Route path="*" element={<Navigate to="/" />} />
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
