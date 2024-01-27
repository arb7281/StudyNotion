import React from 'react'
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
// import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { setToken, setSignupData } from '../../../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp } from '../../../services/operations/authAPI';
import { setAccountType } from '../../../slices/authSlice';


function SignupForm() {

    const dispatch = useDispatch()
    // const [accountType, setAccountType] = useState("Student");
    const {accountType} = useSelector((state) => state.auth)

    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
        accountType,
    })

    const navigate = useNavigate();

    // console.log(formData.password,formData.confirmPassword);

    const [showPassword, setShowPassword] = useState(false)
    const [confPassword, setConfPassword] = useState(false)
    
    

    // console.log(confPassword)

    function changeHandler(event){

        setFormData((prev) => ({...prev, [event.target.name]: event.target.value})) 
    }

    function clickHandler(){
        setShowPassword((prev) => !prev)
    }

     function confirmHandler(){
        setConfPassword(prev => !prev)
    }

    function submitHandler(event) {
        event.preventDefault();
        console.log("printing formData -->", formData)
        if (formData.password !== formData.confirmPassword) {
          toast.error("Password not matched");
        } else {
          dispatch(setSignupData(formData))
          navigate("/verify-email")
          dispatch(sendOtp(formData.email, navigate)) 
        //   dispatch(setToken(true));
        //   toast.success("Account created successfully");
          
        }
      }


  return (
    <div className='bg-cover'>
    {/* student instructor tab  */}
        <div className='flex bg-richblack-800 p-1 gap-x-3 my-3 rounded-full max-w-max'>
            <button
            className={`${accountType === "Student" ? "bg-richblack-900 text-richblack-5 " : "bg-transparent text-richblack-200"} px-5 py-3 rounded-full transition-all duration-200`}
            onClick={() => dispatch(setAccountType("Student"))}>
                Student
            </button>
            <button
            className={`${accountType === "Instructor" ? "bg-richblack-900 text-richblack-5 " : "bg-transparent text-richblack-200"} px-5 py-2 rounded-full transition-all duration-200`}
            onClick={() => dispatch(setAccountType("Instructor"))}>
                Instructor
            </button>
        </div>

        <form onSubmit={submitHandler} className='flex flex-col w-full gap-y-4 mt-6'>
            <div className='flex gap-x-4'>
            <label className="w-full">
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    First Name <sup className='text-pink-200'>*</sup>
                </p>  
                <input
                    required
                    type='text'
                    name='firstName'
                    value={formData.firstName}
                    onChange={changeHandler}
                    placeholder='Enter First Name'
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-white '
                />              
            </label>

            <label className='w-full relative'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    Last Name <sup className='text-pink-200'>*</sup>
                </p>  
                <input
                    required
                    type='text'
                    name='lastName'
                    value={formData.lastName}
                    onChange={changeHandler}
                    placeholder='Enter Last Name'
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-white'
                />              
            </label>
            </div>

            <label className='w-full relative'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    Email <sup className='text-pink-200'>*</sup>
                </p>  
                <input
                    required
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={changeHandler}
                    placeholder='Enter Email'
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-white'
                />              
            </label>

            <div className='flex gap-x-4'>
                    <lable className='w-full relative'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                        Password <sup className='text-pink-200'>*</sup>
                    </p>
                    <input
                        required
                        type={showPassword ? ("text") : ("password")}
                        value={formData.password}
                        onChange={changeHandler}
                        placeholder='Enter Password'
                        name='password'
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-white'
                    />
                    <span onClick={clickHandler} className='absolute right-3 top-[38px] cursor-pointer'>
                        {showPassword ?  (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>) }
                    </span>

                    </lable>

                    <lable className='w-full relative'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                       Confirm Password <sup className='text-pink-200'>*</sup>
                    </p>
                    <input
                        required
                        type={confPassword ? ("text") : ("password")}
                        value={formData.confirmPassword}
                        onChange={changeHandler}
                        placeholder='Enter Password'
                        name='confirmPassword'
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-white'
                    />
                    <span onClick={confirmHandler} className='absolute right-3 top-[38px] cursor-pointer '>
                        {confPassword ?  (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>) }
                    </span>

                    </lable>
            </div>

            <button className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-4'>
                Create Account 
            </button>
            
        </form>
    
    </div>
  )
}

export default SignupForm