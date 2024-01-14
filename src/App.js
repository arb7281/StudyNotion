import "./App.css";
import { Routes, Route } from "react-router-dom";
// import {  } from "react-router-dom";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import PrivateRoute from "./components/core/Homepage/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import { useDispatch, useSelector } from "react-redux";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import MyProfile from "./components/core/Dashboard/MyProfile";
import { Error } from "./pages/Error";
import Settings from "./components/core/Dashboard/Settings";
import { getUserDetails } from "./services/operations/authAPI";




function App() {

  const {token} = useSelector((state) => state.auth)

  // const {user} = useSelector((state) => state.profile)

  const dispatch = useDispatch()

  useEffect(() => {

    if (token) {
      dispatch(getUserDetails(token));
    }
  },[])

  
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
        <Route path="/dashboard/my-profile" element={<MyProfile/>} />
        <Route path="/dashboard/settings" element={<Settings/>} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password/:id" element={<UpdatePassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
