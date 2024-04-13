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
import  Error  from "./pages/Error";
import Settings from "./components/core/Dashboard/Settings";
import { getUserDetails } from "./services/operations/authAPI";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/cart/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/core/Dashboard/instructorDashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";




function App() {

  const {token} = useSelector((state) => state.auth)

  const {user} = useSelector((state) => state.profile)

  console.log("printing user from app.js", user)

  const dispatch = useDispatch()

  useEffect(() => {
    //for every refresh I should have updated data
    if (token) {
      dispatch(getUserDetails(token));
    }
  },[])

  
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="catalog/:categoryId" element={<Catalog/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="courses/:courseId" element={<CourseDetails/>} />
        <Route path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
        {/* if you are inside the nested route you don't need to use prefix of the parrent route */}
        <Route path="my-profile" element={<MyProfile/>} />
        <Route path="settings" element={<Settings/>} />

        { user?.accountType === ACCOUNT_TYPE.STUDENT &&
          (<>
            <Route path="enrolled-courses" element={<EnrolledCourses/>} />
            <Route path="cart" element={<Cart/>} />
          </>            
          )
        }

        { user?.accountType === ACCOUNT_TYPE.INSTRUCTOR &&
          (<>
            <Route path="add-course" element={<AddCourse/>} />
            <Route path="my-courses" element={<MyCourses/>} />
            <Route path="edit-course/:courseId" element={<EditCourse/>} />
          </>            
          )
        }
        
        
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
