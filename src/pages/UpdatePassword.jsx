import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import {  useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';

const UpdatePassword = () => {
    const {loading} = useSelector((state) => state.auth)
    const [showPassword, setShowPassword] = useState("")
    const [showConfirmPassword, setShowConfirmPassword] = useState("")
    const [formData, setFormData] = useState({password:"", confirmPassword:""})
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const clickHandler = () => {
        setShowPassword((prev) => !prev);
    };

    const clickHandler2 = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    const handleOnChange = (event) => {
        setFormData((prev) => ({...prev, [event.target.name]: event.target.value})) /* jis bhi paticular field ki value tum dal rhe ho uski value tum update kr dena */
    }

    const {password, confirmPassword} = formData;

    const handleOnSubmit = (e) => {
        e.stopPropagation()
        const token = location.pathname.split('/').at(-1); /* url me se rightmost token hoga wo nikal lena */
        console.log("printing token", token)
        dispatch(resetPassword(password, confirmPassword, token)).then(()=> {
          navigate("/login")
        })
        
    }
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner">Loading...</div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Choose new password</h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">Almost done. Enter your new password and youre all set.</p>

          <form onSubmit={handleOnSubmit}>
            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">New Password*</p>
              <input 
                    required 
                    type={showPassword ? "text" : "password"}
                    placeholder='Enter New password' 
                    onChange={handleOnChange}
                    value={password}
                    name='password'
                    className="form-style w-full !pr-10"
                    />
              <span
                onClick={clickHandler}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <FaEye fontSize={24} fill="#AFB2BF" />
                ) : (
                  <FaEyeSlash fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>


            <label className="relative mt-3 block">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm new Password*</p>
              <input 
                    required 
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder='Confirm password' 
                    onChange={handleOnChange}
                    value={confirmPassword}
                    name='confirmPassword'
                    className="form-style w-full !pr-10"
                    />
              <span
                onClick={clickHandler2}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <FaEye fontSize={24} fill="#AFB2BF" />
                ) : (
                  <FaEyeSlash fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>
            <button type='submit'
            className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">Reset Password</button>
          </form>

          <div className="mt-6 flex items-center justify-between">
          <Link to="/login">
            <p className="flex items-center gap-x-2 text-richblack-5">back to login</p>
          </Link>
            
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdatePassword