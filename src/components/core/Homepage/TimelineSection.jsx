import React from 'react'

// import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description:"Fully Committed to the success of company"
    },
    {
        Logo: Logo2,
        heading:"Responsibility",
        Description:"Students will always be our top priority"
    },
    {
        Logo:Logo3,
        heading: "Flexibility",
        Description:"The ability to switch is an important skills"
    },
    {
        Logo:Logo4,
        heading:"Solve the problem",
        Description:"Code your way to a solution"
    }
]

const TimelineSection = () => {
  return (
    /* width vigera Home.jsx me parent element me add ki he */
    <div className='flex flex-row gap-15 items-center'>
    
    {/* left side */}
        <div className='w-[45%] flex flex-col gap-5'>
            {
                timeline.map((element, index) => {
                return (
                    <div className='flex flex-row gap-6 items-center' key={index}>
                        <div className='w-[50px] h-[50px] bg-white flex items-center justify-center'>
                            <img src={element.Logo}/>
                        </div>
                        <div>
                            <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                            <p className='text-base'>{element.Description}</p>
                        </div>
                    </div>
                )   
                })
            }
        </div>
    
    {/* right side */}
        <div className='relative shadow-blue-200'>
        {/* Image */}
        <img src={timelineImage}
            alt='timelineImage'
            className='shadow-white object-cover h-fit rounded-lg'
          />
        {/* green box */}
        <div className='absolute left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center uppercase rounded-md bg-caribbeangreen-700 text-white py-7'>
            <div className='flex gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                <p className='text-3xl font-bold'>10</p>
                <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
            </div>
            <div className='flex items-center gap-5 px-7'>
                <p className='text-3xl font-bold'>250</p>
                <p className='text-caribbeangreen-300 text-sm'>Type of courses</p>
            </div>
        </div>
          
            
        </div>
    </div>
  )
}

export default TimelineSection