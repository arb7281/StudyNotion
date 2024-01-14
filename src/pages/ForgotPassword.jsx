import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
import { FaArrowLeft } from 'react-icons/fa';

const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("")
    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        console.log("I am inside handleSubmit function")
        // e.prevenDefault();
        e.stopPropagation()
        dispatch(getPasswordResetToken(email, setEmailSent)) /* this will set sentEmail as true and will work as connection between backend as we are sending email in it */
    }

  return (
    <div className='text-white flex justify-center items-center '>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className='flex flex-col w-[700px] h-[448px] top-[288px] left-[466px] p-32 gap-6 '>
          <h1 className='text-[30px] font-semibold'>{!emailSent ? "Reset your password" : "Check your email"}</h1>{" "}
          {/* agr email sent nhi hua he to ... */}
          <p className='font-inter text-md font-normal leading-26 tracking-normal text-left opacity-50 -mt-4'>
            {!emailSent
              ? "Have no fear. We’ll email you instructions to reset your password.If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className='w-full'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address<sup className='text-pink-200'>*</sup></p>
                <input 
                    required 
                    type="email" 
                    name='email' 
                    value={email} 
                    placeholder="myemailaddress@email.com" 
                    onChange={(e) => {setEmail(e.target.value)}}
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-white'
                    />
              </label>
            )}
            <button type='submit' className='bg-yellow-50 w-full rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-8'>{!emailSent ? "Reset Password" : "Resend Email"}</button>
          </form>
          <div>
          <Link to="/login">
            <p className='flex items-center gap-2 font-inter text-md font-medium leading-24 tracking-normal text-left -mt-4'><FaArrowLeft size={15} color="white" />back to login</p>
          </Link>
            
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword