import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';

const UpdatePassword = () => {
    const {loading} = useSelector((state) => state.auth)
    const [showPassword, setShowPassword] = useState("")
    const [showConfirmPassword, setShowConfirmPassword] = useState("")
    const [formData, setFormData] = useState({password:"", confirmPassword:""})
    const location = useLocation()
    const dispatch = useDispatch()

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
        dispatch(resetPassword(password, confirmPassword, token))
    }
  return (
    <div className='text-white'>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div >
          <h1>Choose new password</h1>
          <p>Almost done. Enter your new password and youre all set.</p>

          <form onSubmit={handleOnSubmit}>
            <label>
              <p>New Password*</p>
              <input 
                    required 
                    type={showPassword ? "text" : "password"}
                    placeholder='Enter New password' 
                    onChange={handleOnChange}
                    value={password}
                    name='password'
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-white'
                    />
              <span
                onClick={clickHandler}
                className="absolute right-3 top-[38px] cursor-pointer"
              >
                {showPassword ? (
                  <FaEye fontSize={24} fill="#AFB2BF" />
                ) : (
                  <FaEyeSlash fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>


            <label className='relative'>
              <p>Confirm new Password*</p>
              <input 
                    required 
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder='Confirm password' 
                    onChange={handleOnChange}
                    value={confirmPassword}
                    name='confirmPassword'
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-white'
                    />
              <span
                onClick={clickHandler2}
                className="absolute right-3 top-[38px] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <FaEye fontSize={24} fill="#AFB2BF" />
                ) : (
                  <FaEyeSlash fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>
            <button type='submit'>Reset Password</button>
          </form>

          <div>
          <Link to="/login">
            <p>back to login</p>
          </Link>
            
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdatePassword