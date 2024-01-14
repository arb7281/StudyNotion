import React, { useState } from 'react'
// import CTAButton from '../Homepage/CTAButton'
import { useSelector } from 'react-redux'
import FileUpload from './fileUpload/UploadFile';
import CTAButton from '../Homepage/CTAButton';
import { useDispatch } from 'react-redux';
import { changePassword, updateProfile } from '../../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';

const Settings = () => {

    const {user} = useSelector((state)=> state.profile);
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [formData, setFormaData] = useState({
      firstName: '',
      lastName:'',
      dateOfBirth:'',
      gender:'',
      contactNumber:'',
      about:'',
    })

    const [passData, setPassData] = useState({
      oldPassword:"",
      newPassword:"",
      confirmPassword:""
    })
    const handleChange = (event) => {
      const {name, value} = event.target;
      setFormaData({
        ...formData, [name]:value
      })
    }

    const handleCancelClick = () => {
      setFormaData({
      firstName: '',
      lastName:'',
      dateOfBirth:'',
      gender:'',
      contactNumber:'',
      about:'',})
    }

    const dispatchFunction = (e) => {
      e.preventDefault();
      dispatch(updateProfile(formData, token))
    }

    const handlePassChange = (event) => {
      const {name, value} = event.target;
      setPassData({
        ...passData, [name]:value
      })
    }

    const cancelPass = () => {
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
    <div>
      {/* section 1 */}
      <div>
        <img src={user.image} 
          className='aspect-square w-[78px] rounded-full object-cover' 
        />
        <div>
          <p>Change Profile Picture</p>
          <div>
            {/* <button>Select</button>{" "} */}
            {/* this button will open window to select the photo */}
            {/* <button>Upload</button> this button will upload the photo */}
            <FileUpload/>
          </div>
        </div>
      </div>
      {/* section 2     */}
      <div>
        <p>Profile Information</p>
        <form>
          <div>
            <label>
              <p>First Name</p>
              <input type="text" name='firstName' value={formData.firstName} onChange={handleChange}
                className='text-black'
              />
            </label>
            <label>
              <p>Last Name</p>
              <input type="text" name='lastName' value={formData.lastName} onChange={handleChange}
                className='text-black'
              />
            </label>
            <label>
              <p>Date Of Birth</p>
              <input type="date" name='dateOfBirth' value={formData.dateOfBirth} onChange={handleChange}
                className='text-black'
              />
            </label>
            <label>
              <p>Gender</p>
              <select name='gender' value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              </select>
            </label>
            <label>
              <p>Contact Number</p>
              <input type="text" name='contactNumber' value={formData.contactNumber} onChange={handleChange}
                className='text-black'
              />
            </label>
            <label>
              <p>About</p>
              <input type="text" name='about' value={formData.about} onChange={handleChange}
                className='text-black'
              />
            </label>
          </div>

          <div>
            <button className='bg-richblack-800 text-white text-center text-[13px] px-3 py-3 rounded-md font-bold
                            hover:scale-95 transition-all duration-200' onClick={handleCancelClick}>Cancel</button>
            <CTAButton active={true} handleEvent={dispatchFunction}>Save</CTAButton>                
            {/* <button>Save</button> */}
          </div>
        </form>
      </div>

      {/* section 3 */}

      <div>
        Password
        <form>
          <div>
            <label>
              <p>Current Password</p>
              <input type="password" name='oldPassword' onChange={handlePassChange}/>
            </label>
            <label>
              <p>New Password</p>
              <input type="password" name='newPassword' onChange={handlePassChange}/>
            </label>
            <label>
              <p>Confirm New Password</p>
              <input type="password" name='confirmPassword' onChange={handlePassChange}/>
            </label>
          </div>
          <div>
          <button className='bg-richblack-800 text-white text-center text-[13px] px-3 py-3 rounded-md font-bold
                            hover:scale-95 transition-all duration-200'onClick={cancelPass}>Cancel</button>
          <CTAButton active={true} handleEvent={dispatchPass}>Update</CTAButton> 
          </div>
        </form>
      </div>


      {/* section 4 */}
      <div>
        Delete Account
        <button>Delete Account</button>
      </div>
    </div>
  );
}

export default Settings