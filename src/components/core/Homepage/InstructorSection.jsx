import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'
import Instructor from "../../../assets/Images/Instructor.png"
import { setAccountType } from '../../../slices/authSlice'
import { useDispatch } from 'react-redux'


const InstructorSection = () => {

  const dispatch = useDispatch()


  return (
    <div className='mb-16'>
      <div className='flex gap-20 items-center'>
        <div className='w-[50%]'>
          <img 
            src={Instructor}
            alt='Instructor Image'
            className='shadow-white rounded-lg'
          />
        </div>
        <div className='flex flex-col gap-4 items-start w-[50%]'>
          <div className='text-4xl font-semibold w-[50]'>
          Become an 
          <HighlightText text={" Instructor"}/>
          </div>
          <p className='font-medium text-[16px] w-[80%] text-richblack-300'>Instructors from around the world teach millions of students on StudyNotion. 
              We provide the tools and skills to teach what you love.</p>
        <div className='w-fit mt-10'>
        <CTAButton active={true} linkto={"/signup"}>
          <div className='flex flex-row gap-2 items-center' onClick={() => dispatch(setAccountType("Instructor"))}>
              Start Teaching Today 
              <FaArrowRight />
          </div>
          </CTAButton>
        </div>
          
        </div>
      </div>
    </div>
  )
}

export default InstructorSection