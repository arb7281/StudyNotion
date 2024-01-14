import React, { useState } from 'react'
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import { Link } from 'react-router-dom';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { setToken } from '../../../slices/authSlice';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../services/operations/authAPI';


function LoginForm({setIsLoggedIn}) {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({email:"", password:""})

    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate();

    function changeHandler(event){

        setFormData((prev) => ({...prev, [event.target.name]: event.target.value})) 
    }

    function clickHandler(){
        setShowPassword((prev) => !prev)
    }

    function submitHnadler(event){
        event.preventDefault();
        dispatch(logIn(formData.email, formData.password, navigate))
        // dispatch(setToken(true));
        // toast.success("Logged In");
        // navigate("/dashboard")
    }

  return (
    <form onSubmit={submitHnadler}  className='flex flex-col w-full gap-y-4 mt-6'>
        <label className="w-full">
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Email Address <sup className='text-pink-200'>*</sup>
            </p>
            <input
                required
                type='email'
                value={formData.email}
                onChange={changeHandler}
                placeholder='Enter email id'
                name='email'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-white'
            />

        </label>

        <label className='w-full relative'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Password <sup className='text-pink-200'>*</sup>
            </p>
            <input
                required
                type={showPassword ? ("text") : ("password")}
                value={formData.password}
                onChange={changeHandler}
                placeholder='Enter password'
                name='password'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-white'
            />

            <span onClick={clickHandler} className='absolute right-3 top-[38px] cursor-pointer'>
                {showPassword ?  (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>) }
            </span> 

        </label>
        <Link to="/forgot-password">
            <p className='text-xs mt-1 text-blue-100 max-w-max ml-auto' >
                Forgot Password
            </p>
        </Link>

        <button type='submit' className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px]'>
            Sign In
        </button>
    </form>
  )
}

export default LoginForm