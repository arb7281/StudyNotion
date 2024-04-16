import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import Know_your_progress from "../../../assets/Images/Know_your_progress.png"
import Compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import { useSelector } from 'react-redux'

const LearningLanguageSection = ({handleEvent}) => {

    const {user} = useSelector((state) => state.profile) 

  return (
    <div className='flex flex-col items-center'>
        <div className='h-[120px]'></div>
        <div className='flex flex-col items-center gap-3'>
            <div className='text-4xl font-semibold text-center'>Your swiss knife for <HighlightText text={"learning any language"}/></div>
            <div className='text-richblack-600 w-[70%] text-center mx-auto text-base font-medium'>Using spin making learning multiple languages easy. 
                    with 20+ languages realistic voice-over, progress tracking, 
                    custom schedule and more.</div> 
        </div>
        

        <div className='flex items-center justify-center'>
            <img
                src={Know_your_progress}
                alt='Know your progress image'
                className='object-contain -mr-28 ml-10'
            />
            <img
                src={Compare_with_others}
                alt='CompareWithOthersImage'
                className='object-contain '
            />
            <img
                src={plan_your_lesson}
                alt='planYourLessonImage'
                className='object-contain -ml-32'
            />
        </div>
        <div className='w-fit mb-10'>
            <CTAButton active={true} linkto={user? "/dashboard/my-profile" : "/signup"} handleEvent={handleEvent}>
                <div>
                    Learn More
                </div>
            </CTAButton>
        </div>
    </div>
  )
}

export default LearningLanguageSection