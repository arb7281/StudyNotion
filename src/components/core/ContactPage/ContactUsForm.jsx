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
    <form onSubmit={handleSubmit(submitHandler)} >
        <div className='flex w-full justify-between'>
            <label>
                <p>First Name</p>
                <input 
                    type='text'
                    name='firstName'
                    placeholder='Enter first name'
                    className='text-black'
                    {...register('firstName', {required:true})} //register karo matlab form ki state me firstName ki value save kro jo ki bad me handlesubmit krte time data ke sath jayegi
                />
                {errors.firstName && 
                    (
                        <span>
                            PLease enter your first name.
                        </span>
                    )
                }
            </label>
            <label>
                <p>Last Name</p>
                <input 
                    type='text'
                    name='lastName'
                    className='text-black'
                    placeholder='Enter last name'
                    {...register('lastName')} 
                />
            </label>
        </div>

        {/* email */}
        <div >
            <label>
                <p>Email Address</p>
                <input 
                    type='email'
                    name='email'
                    className='w-full text-black'
                    placeholder='Enter your email'
                    {...register('email', {required:true})} 
                />
                {
                    errors.email && 
                    (
                        <span>
                            PLease enter your email.
                        </span>
                    )
                }
            </label>
        </div>

        <div>
            
          <label className=''>
                <p>Phone Number</p>
                <div className='flex gap-3'>
                    <select className='text-black w-[20%]'
                        name='dropdown'
                        id='dropdown'
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
                    <input 
                    type='number'
                    name='phoneNumber'
                    id='phoneNumber'
                    className='text-black w-[100%]'
                    placeholder='12345-67890'
                    {...register('phoneNumber', 
                    {
                        required:{value:true, message:"please enter your Phone Number"}, //agr value present ni he to ye message save karo
                        maxLength: {value:10, message:"Invalid Phone Number"}, //agr entered value 10 se age he to ye message save do
                        minLength: {value:8, message: "Invalid Phone Number"} //agr entered value 8 se niche he to ye message save kar do
                    })}
                    />
                    {
                        errors.phoneNumber && (
                            <span>
                                {errors.phoneNumber.message}
                            </span>
                        )
                    }
                </div>
                
          </label> 

          

          
            
        </div>

        {/* message */}
        <div>
            <label>
                <p>Message</p>
                <textarea 
                    cols="30"
                    rows="7"
                    name='message'
                    className='w-full text-black'
                    placeholder='Enter your message'
                    {...register('message', {required:true})} 
                />
                {
                    errors.message && //agar message me value present ni he to niche diya gya message span tag me dikhado
                    (
                        <span>
                            PLease enter your message.
                        </span>
                    )
                }
                </label>
        </div>

        <button type='submit' className='w-full bg-yellow-50 text-center text-[13px] px-3 py-3 rounded-md font-bold
                            hover:scale-95 transition-all duration-200 text-black'>
            Send Message
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