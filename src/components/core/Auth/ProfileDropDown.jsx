// import React from 'react'

// const ProfileDropDown = () => {
//   return (
//     <div>ProfileDropDown</div>
//   )
// }

// export default ProfileDropDown


import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setToken } from '../../../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { setUser } from '../../../slices/profileSlice';
import LogOut from '../../common/LogOut';
// import { Navigate } from 'react-router-dom';

const ProfileDropDown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.profile)
  const navigate = useNavigate()
  console.log("printing user only ", user);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      // Clicked outside the dropdown, close it
      setDropdownOpen(false);
    }
  };

  const toggleDropdown = (event) => {
    console.log("clicked on profile image")
    event.stopPropagation(); // Stop the event from propagating to document
    console.log("printing profile image", user.image)
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener('click', handleClickOutside);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  

  return (
    <div className="profile-dropdown cursor-pointer relative" >
      <div className="profile-picture" onClick={(event) => toggleDropdown(event)}>
        <img src={user.image} className="aspect-square w-[30px] rounded-full object-cover"/>
      </div>
      {dropdownOpen && (
        <div className="dropdown-content bg-white absolute z-20 top-[150%] right-[-100%] max-w-fit rounded-lg p-2" ref={dropdownRef}>
          {/* Dropdown content */}
          <div className='flex flex-col items-start '>
              <Link to={"/dashboard/my-profile"}>
                <div>Dashboard</div>
              </Link>
              <LogOut/>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown;
