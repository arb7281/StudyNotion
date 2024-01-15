import React, { useState } from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../slices/authSlice';
import { setUser } from '../../slices/profileSlice';
import { Link, useNavigate } from 'react-router-dom';
import {VscSignOut} from "react-icons/vsc"
import { FaTrash } from "react-icons/fa";
import toast from 'react-hot-toast';
import { deleteAccount } from '../../services/operations/authAPI';

Modal.setAppElement('#root');



const DeleteProfile = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const {token} = useSelector((state) => state.auth)
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const modalStyle = {
        content: {
          width: '300px',
          height: '150px',
          margin: 'auto',
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          border: '1px solid #ccc',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center horizontally
          justifyContent: 'center', // Center vertically
          fontWeight: '600',
          textAlign: 'center',
          // zIndex: '1000',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      };

      const buttonStyle = {
        color: 'black',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#FFD60A',
        borderRadius: '5px',
        padding: '8px 16px',
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
        marginTop: '8px'
        
      };

       function modalClose(event){
        console.log("I am inside modalClose function")
        event.stopPropagation()
        setModalIsOpen(false)
        console.log("printing modalIsOpen", modalIsOpen)
      } 

  return (
    <div onClick={()=> setModalIsOpen(true)} className='cursor-pointer'>
      
        <div className="flex items-center gap-1">
        <FaTrash className="text-lg"/>
          {/* <VscSignOut  /> */}
          <span>Delete Account</span>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={(event) => modalClose(event)}
          contentLabel="Are you sure you want to log out?"
          style={modalStyle}
          className={`z-10`}
        >
          <h2>Are you sure you want to Delete Account?</h2>
          {/* You can add additional content or styling for your modal */}
          <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
          <div className="flex gap-2 items-center">
            <button style={buttonStyle} onClick={ (event) => modalClose(event)}>
              No
            </button>
            <button
              style={buttonStyle}
              onClick={() => {
                dispatch(deleteAccount(token, password, navigate));
                setModalIsOpen(false);
              }}
              className="flex gap-1"
            >
              <VscSignOut className="text-lg" /> Delete Account
            </button>
          </div>
        </Modal>
     
    </div>
  );
}

export default DeleteProfile