import React from 'react'
import ContactUsForm from '../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='flex flex-col items-center w-11/12'>
        <h1>Get in Touch</h1>
        <p>We’d love to here for you, Please fill out this form.</p>
        <ContactUsForm/>
    
    </div>
  )
}

export default ContactFormSection