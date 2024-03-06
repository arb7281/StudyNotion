import React, { useState } from 'react'
import Modal from 'react-modal';
import {VscSignOut} from "react-icons/vsc"


Modal.setAppElement('#root');

const ConfirmationModal = ({modalData}, setConfirmationModal) => {

        
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
        setConfirmationModal(false)
        // console.log("printing modalIsOpen", modalIsOpen)
      } 

  return (
    <Modal
          isOpen={modalData}
          onRequestClose={(event) => modalClose(event)}
          contentLabel={modalData.text1}
          style={modalStyle}
          className={`z-10`}
        >
          <h2>{modalData.text2}</h2>
          {/* You can add additional content or styling for your modal */}
          <div className="flex gap-2 items-center">
            <button style={buttonStyle} onClick={ () => modalData.btn2Handler()}>
              {modalData.btn2Text}
            </button>
            <button
              style={buttonStyle}
              onClick={() => {
                modalData.btn1Handler()
              }}
              className="flex gap-1"
            >
              <VscSignOut className="text-lg" />{modalData.btn1Text}
            </button>
          </div>
        </Modal>
  )
}

export default ConfirmationModal