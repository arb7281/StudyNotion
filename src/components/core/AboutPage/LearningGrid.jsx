import React from 'react'
import HighlightText from '../Homepage/HighlightText'
import CTAButton from '../Homepage/CTAButton'

const LearningGrid = () => {
  return (

         <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-2 mx-auto">
          {/* <!-- First row --> */}
          <div class="col-span-1 md:col-span-2 lg:col-span-2  flex flex-col gap-3  pr-5 pb-5 h-[280px]">
             <div className='text-4xl font-semibold '>World-Class Learning for <br/>
             <HighlightText text={" Anyone, Anywhere"}/></div>
             
             <p className="font-medium">Studynotion partners with more than 275+ leading universities 
             and companies to bring flexible, affordable, job-relevant online 
             learning to individuals and organizations worldwide.</p>
             <div className='w-fit'>
             <CTAButton linkto={"/signup"} active={true}>Learn More</CTAButton> 
             </div> 
                     
          </div>
          {/* <div class="bg-green-500 p-4">2</div> */}
          <div class="col-span-1 md:col-span-1 lg:col bg-richblack-700 p-5 h-[280px]">
            <div className='font-semibold mt-3'>Curriculum Based on Industry Needs</div>
            <p className='mt-5 opacity-50'>Save time and money! The Belajar curriculum is made to be easier 
            to understand and in line with industry needs.</p>
          </div>
          <div class="col-span-1 md:col-span-1 lg:col bg-richblack-800 p-5 h-[280px]">
            <div className='font-semibold mt-3'>Our Learning Methods</div>
            <p className='mt-5 opacity-50'>The learning process uses the namely online and offline.</p>          
          </div>

          {/* <!-- Second row --> */}
          <div class="hidden lg:block col-span-1 md:col-span-1 lg:col-span-1  p-5 h-[280px]">         
          </div>
          <div class="col-span-1 md:col-span-1 lg:col bg-richblack-700 p-5 h-[280px]">
              <div className='font-semibold mt-3'>Certification</div>
              <p className='mt-5 opacity-50'>You will get a certificate that can be used as a certification during job hunting.</p>
          </div>
          <div class="col-span-1 md:col-span-1 lg:col bg-richblack-800 p-5 h-[280px]">
              <div className='font-semibold mt-3'>Rating "Auto-grading"</div>
              <p className='mt-5 opacity-50'>You will immediately get feedback during the learning process without having 
                to wait for an answer or response from the mentor.</p>
          </div>
          <div class="col-span-1 md:col-span-1 lg:col bg-richblack-700 p-5 h-[280px]">
              <div className='font-semibold mt-3'>Ready to Work</div>
              <p className='mt-5 opacity-50'>Connected with over 150+ hiring partners, you will have the opportunity to find 
                a job after graduating from our program.</p>
          </div>
        </div>
    
  )
}

export default LearningGrid