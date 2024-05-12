import React, { useState } from 'react'
// import CTAButton from '../Homepage/CTAButton'
import { useSelector } from 'react-redux'
import FileUpload from './fileUpload/UploadFile';
import CTAButton from '../Homepage/CTAButton';
import { useDispatch } from 'react-redux';
import { changePassword, updateProfile } from '../../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import DeleteProfile from "../../common/DeleteProfile"
import toast from 'react-hot-toast';


const Settings = () => {

    const {user} = useSelector((state)=> state.profile);
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate()
    const dispatch = useDispatch();


    const forrmData = new FormData()

    const [passData, setPassData] = useState({
      oldPassword:"",
      newPassword:"",
      confirmPassword:""
    })
    const handleChange = (event) => {
      const {name, value} = event.target;
      
      const parsedValue = name === 'contactNumber' && value !== '' ? parseInt(value) : value;
      forrmData.set(name, parsedValue);
      console.log("printing forrmData", forrmData)
      
    }

    const handleCancelClick = (e) => {
      e.preventDefault()
      e.stopPropagation()

      for (let key of forrmData.keys()) {
        forrmData.delete(key);
      }
    }

    const dispatchFunction = (e) => {
      e.preventDefault();
      
      dispatch(updateProfile(forrmData, token))
      
      
    }

    const handlePassChange = (event) => {
      const {name, value} = event.target;
      setPassData({
        ...passData, [name]:value
      })
    }

    const cancelPass = (e) => {
      e.preventDefault()
      e.stopPropagation()
      setPassData({
        oldPassword:"",
        newPassword:"",
        confirmPassword:""})
    }

    const dispatchPass = (e) => {
      e.preventDefault();
      dispatch(changePassword(passData, token, navigate))
      
    }

  return (
    <div className='text-white'>
      {/* section 1 */}
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>
      <div className="flex items-center gap-x-4">
        <img src={user.image} 
          className='aspect-square w-[78px] rounded-full object-cover' 
        />
        <div className="space-y-2">
          <p>Change Profile Picture</p>
          <div className="flex flex-row gap-3">
            {/* <button>Select</button>{" "} */}
            {/* this button will open window to select the photo */}
            {/* <button>Upload</button> this button will upload the photo */}
            <FileUpload/>
          </div>
        </div>
      </div>
      {/* section 2     */}
      <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <p className="text-lg font-semibold text-richblack-5">Profile Information</p>
        <form>
          <div className="flex flex-col gap-5 lg:flex-row mb-2">
          <div className="flex flex-col gap-2 lg:w-[48%]">
          <label className="lable-style">
              First Name
              </label>
              <input type="text" name='firstName' value={forrmData.firstName} onChange={handleChange}
                className="form-style"
              />
          </div>
            
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label className="lable-style">
                Last Name
              </label>
                <input className="form-style" type="text" name='lastName' value={forrmData.lastName} onChange={handleChange}
                  
                />
            </div>
            </div>

            <div className="flex flex-col gap-5 lg:flex-row mb-2">
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label className="lable-style">
                  Date Of Birth
                </label>
                  <input type="date" name='dateOfBirth' value={forrmData.dateOfBirth} onChange={handleChange}
                    className="form-style"
                  />
              </div>
              
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label className="lable-style">
                  Gender
                </label>
                  <select className="form-style" name='gender' value={forrmData.gender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
              </div>
              
              
            </div>
            
            <div className="flex flex-col gap-5 lg:flex-row mb-2">
              <div className="flex flex-col gap-2 lg:w-[48%]">
              <label className="lable-style">
                  Contact Number
              </label> 
                  <input type="text" name='contactNumber' value={forrmData.contactNumber} onChange={handleChange}
                    className="form-style"
                  />
                
              </div>
              
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label className="lable-style">
                  About
                </label>
                <textarea 
                  name='about' 
                  value={forrmData.about} 
                  onChange={handleChange} 
                  className="form-style"
                />
                
              </div>
              
            </div>
            
          

          <div className="flex justify-end gap-2 mt-3 mr-[17px]">
            <button className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50" onClick={handleCancelClick}>Cancel</button>
            <CTAButton active={true} handleEvent={dispatchFunction}>Save</CTAButton>                
            {/* <button>Save</button> */}
          </div>
        </form>
      </div>

      {/* section 3 */}

      <div>
        
        <form>
          <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
            <div className="flex flex-col gap-5 lg:flex-row">
                <div className="relative flex flex-col gap-2 lg:w-[48%]">
                  <label className="lable-style">
                    Current Password
                    </label>
                    <input className="form-style" type="password" name='oldPassword' onChange={handlePassChange}/>
                </div>
              
              <div className="relative flex flex-col gap-2 lg:w-[48%]">
                <div className="relative flex flex-col gap-2 ">
                  <label className="lable-style">
                      New Password
                      </label>
                      <input className="form-style" type="password" name='newPassword' onChange={handlePassChange}/>
                  </div>
                  
                  <div className="relative flex flex-col gap-2 ">
                  <label className="lable-style">
                      Confirm New Password
                      </label>
                      <input className="form-style" type="password" name='confirmPassword' onChange={handlePassChange}/>
                  </div> 
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <button className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50" onClick={cancelPass}>Cancel</button>
              <CTAButton active={true} handleEvent={dispatchPass}>Update</CTAButton> 
          </div>
          </div>
          
        </form>
      </div>


      {/* section 4 */}
      <div className="flex flex-col space-y-2">
      <h2 className="text-lg font-semibold text-richblack-5">
            Delete Account
      </h2>
      <div className="w-3/5 text-pink-25">
            <p>Would you like to delete account?</p>
            <p>
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the contain associated with it.
            </p>
      </div>
        <DeleteProfile/>
      </div>
    </div>
  );
}

export default Settings