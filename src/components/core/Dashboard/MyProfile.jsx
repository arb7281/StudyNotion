import React from 'react'
import { useSelector } from 'react-redux'
import CTAButton from '../Homepage/CTAButton'
import { FiEdit } from "react-icons/fi";

const MyProfile = () => {

  const {user} = useSelector((state)=> state.profile)
  return (
    <div>
      {/* section one */}
        <div>
          <div><img src={user.image}
            className='aspect-square w-[78px] rounded-full object-cover' 
          /></div>
          <div>
            <p>{user.firstName + " " + user.lastName}</p>
            <p>{user.email}</p>
          </div>
          <CTAButton active={true} linkto={"/dashboard/settings"}><div className='flex items-center gap-1'><FiEdit /> Edit</div></CTAButton>
        </div>

          {/* section 2 */}
        <div>
          <div>
            <p>About</p>
            <CTAButton active={true} linkto={"/dashboard/settings"}><div className='flex items-center gap-1'><FiEdit /> Edit</div></CTAButton>
          </div>
          <div>{user.additionalDetails.about ?? "Write Something About Yourself"}</div>
        </div>





        {/* section 3 */}
        <div>
          <div>
            <p>Personal Details</p>
            <CTAButton active={true} linkto={"/dashboard/settings"}><div className='flex items-center gap-1'><FiEdit /> Edit</div></CTAButton>
          </div>
          <div>
            <div>
              <p>First Name</p>
              <p>{user.firstName}</p>
            </div>
            <div>
              <p>Last Name</p>
              <p>{user.lastName}</p>
            </div>
            <div>
              <p>Gender</p>
              <p>{user.additionalDetails.gender}</p>
            </div>
            <div>
              <p>Email</p>
              <p>{user.email}</p>
            </div>
            <div>
              <p>Phone Number</p>
              <p>{user.additionalDetails.contactNumber }</p>
            </div>
            <div>
              <p>Date Of Birth</p>
              <p>{user.additionalDetails.dateOfBirth}</p>
            </div>
          </div>
        </div>


    </div>
  )
}

export default MyProfile