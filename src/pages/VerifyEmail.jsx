import React, { useState, useEffect } from 'react'
import OtpInput from 'react-otp-input';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUp } from '../services/operations/authAPI';
import { useSelector } from 'react-redux';
import { sendOtp } from '../services/operations/authAPI';


const VerifyEmail = () => {
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading, signupData} = useSelector((state) => state.auth);

    useEffect( () => {//agr signUp ka data ni pada he to signup ki page pr route kro
        if(!signupData) {
            navigate("/signup");
        }
    }, [])

    // console.log("I am inside verify email component printing signup data -->", signupData)




    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("I am inside verify email component printing signup data -->", signupData)
        console.log("printing OTP inside verify email component-->", otp)
        const {
            firstName, 
               lastName, 
               email, 
               password, 
               confirmPassword,
               accountType, 
        } = signupData;



        dispatch(signUp(firstName, 
            lastName, 
            email, 
            password, 
            confirmPassword,
            accountType, 
            otp,
            navigate
            ))
    }



  return (
    <div className="text-white">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1> Verify Email</h1>
          <p>A verification code has been sent to you. Enter the code below</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => <input {...props} />}
              containerStyle="mb-4" // Adjust margin-bottom as needed
              inputStyle="w-12 h-12 text-white bg-richblack-800 text-2xl border border-gray-300 rounded-md mx-1 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
            >
              Verify Email
            </button>
          </form>

          <div>
            <Link to="/login">
              <p>back to login</p>
            </Link>
          </div>
          <button onClick={() => dispatch(sendOtp(signupData.email, navigate))}>
            Resend it
          </button>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail