import React from 'react'
import {useForm} from 'react-hook-form'
import { useState, useEffect } from 'react';
import countryccode from '../../../data/countrycode.json'
import { apiConnector } from '../../../services/apiconnector';
import { contactusEndpoint } from '../../../services/api';
import Modal from 'react-modal';

const {CONTACT_US_API} = contactusEndpoint;

const ContactUsForm = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const modalStyle = {
        content: {
          width: '200px',
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
          textAlign: 'center'
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
        backgroundColor: '#FFD60A',
        borderRadius: '5px',
        padding: '8px 16px',
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
        marginTop: '8px'
      };

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    const submitHandler = async(data) => {
        try{
            setLoading(true);
            
            const response = await apiConnector("POST",CONTACT_US_API ,data)

            setModalIsOpen(true);
            setLoading(false);

        }catch(error){
            setLoading(false);
            console.error('Error:', error);
        }

    }

    useEffect( () => {// agar handleSubmit successfull he to reset kr do par run hote rho on the basis of reset value and isSubmitSuccessful value
        if(isSubmitSuccessful) {
            reset({
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                phoneNumber:"",
            })
        }
    },[reset, isSubmitSuccessful] );




  return (
    <form 
    className="flex flex-col gap-7"
    onSubmit={handleSubmit(submitHandler)} >
        <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%]">
        <label htmlFor="firstName" className="lable-style">
                <p>First Name</p>   
            </label>
            <input 
                    type='text'
                    name='firstName'
                    id='firstName'
                    placeholder='Enter first name'
                    className="form-style"
                    {...register('firstName', {required:true})} //register karo matlab form ki state me firstName ki value save kro jo ki bad me handlesubmit krte time data ke sath jayegi
                />
                {errors.firstName && 
                    (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            PLease enter your first name.
                        </span>
                    )
                }
        </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="lastname" className="lable-style">
            <p>Last Name</p>
            </label>
            
                <input 
                    type='text'
                    name='lastName'
                    id="lastname"
                    placeholder='Enter last name'
                    className="form-style"
                    {...register('lastName')} 
                />
            </div>
            
        </div>

        {/* email */}
        <div className="flex flex-col gap-2">
            <label htmlFor="email" className="lable-style">
                <p>Email Address</p>
                
            </label>
            <input 
                    type='email'
                    name='email'
                    id="email"
                    placeholder='Enter your email'
                    className="form-style"
                    {...register('email', {required:true})} 
                />
                {
                    errors.email && 
                    (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            PLease enter your email.
                        </span>
                    )
                }
        </div>

        <div className="flex flex-col gap-2">
            
          <label htmlFor="dropdown" className="lable-style">
                <p>Phone Number</p>
                      
          </label> 
          <div className="flex gap-5">
            <div className="flex w-[81px] flex-col gap-2">

                <select 
                        name='dropdown'
                        id='dropdown'
                        placeholder="Enter first name"
                        className="form-style"
                        {...register("countrycode", {required:true})}
                    >
                        
                        {
                            countryccode.map((country, index) => {
                                return (
                                    <option key={index} value={country.code}>
                                        {country.code} - {country.country}
                                    </option>
                                )
                            })
                        }
                    
                    </select>
            </div>
                    <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                    <input 
                    type='phoneNumber'
                    name='phoneNumber'
                    id='phoneNumber'
                    placeholder='12345-67890'
                    className="form-style"
                    {...register('phoneNumber', 
                    {
                        required:{value:true, message:"please enter your Phone Number"}, //agr value present ni he to ye message save karo
                        maxLength: {value:10, message:"Invalid Phone Number"}, //agr entered value 10 se age he to ye message save do
                        minLength: {value:8, message: "Invalid Phone Number"} //agr entered value 8 se niche he to ye message save kar do
                    })}
                    />
                    {
                        errors.phoneNumber && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                {errors.phoneNumber.message}
                            </span>
                        )
                    }
                    </div>
                    
                </div>
          

          
            
        </div>

        {/* message */}
        <div className="flex flex-col gap-2">
            <label htmlFor="message" className="lable-style">
                <p>Message</p>
            </label>
                <textarea 
                    cols="30"
                    rows="7"
                    name='message'
                    id='message'
                    className="form-style"
                    placeholder='Enter your message'
                    {...register('message', {required:true})} 
                />
                {
                    errors.message && //agar message me value present ni he to niche diya gya message span tag me dikhado
                    (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            PLease enter your message.
                        </span>
                    )
                }
        </div>

        <button disabled={loading} type='submit' 
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}>
            {loading ? (
            <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 014.02 4.978l1.486 1.487A5.991 5.991 0 004 12h2v5.291zM12 20a8 8 0 01-8-8h-4c0 6.627 5.373 12 12 12v-4zm0-16a8 8 0 018 8h4c0-6.627-5.373-12-12-12v4z"></path>
                </svg>
                <span>Loading...</span>
            </div>
        ) : (
            <span>Send Message</span>
        )}
        </button>

        {/* Modal */}
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Mail Sent Successfully"
        style={modalStyle}
      >
        <h2>Mail has been sent successfully!</h2>
        {/* You can add additional content or styling for your modal */}
        <button style={buttonStyle} onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>
    </form>
  )
}

export default ContactUsForm