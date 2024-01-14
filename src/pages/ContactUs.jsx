import React from 'react'
import ContactUsForm from '../components/core/ContactPage/ContactUsForm'
import { IoCall } from "react-icons/io5";
import { FaEarthAsia } from "react-icons/fa6";
import { HiChatBubbleLeftRight } from "react-icons/hi2";

const ContactUs = () => {
  return (
    <div className='flex mx-auto text-white gap-16 '>
        <div className='flex flex-col justify-between bg-richblack-800 p-5 w-[40%] h-[350px]'>
            <div>
                <h2 className='flex items-center gap-1 font-semibold'><HiChatBubbleLeftRight /> Chat on us</h2>
                <p>Our friendly team is here to help.@mail address</p>
            </div>
            <div>
                <h2 className='flex items-center gap-1 font-semibold'><FaEarthAsia /> Visit us</h2>
                <p>Come and say hello at our office HQ. Here is the location/ address</p>
            </div>
            <div>
                <h2 className='flex items-center gap-1 font-semibold'><IoCall /> Call us</h2>
                <p>Mon - Fri From 8am to 5pm +123 456 7890</p>
            </div>
        </div>

        <div>
            <h2>Got a Idea? We’ve got the skills. Let’s team up</h2>
            <p>Tall us more about yourself and what you’re got in mind.</p>
            <ContactUsForm/>
        </div>


    </div>
  )
}

export default ContactUs