import React from 'react'
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'

const Codeblocks = ({codeColor, codeblock, ctaBtn2, ctaBtn1, subheading, heading, position, handleEvent}) => {
  return (
    <div className={`flex ${position} justify-between items-center  bg-richblack-600 mx-24 gap-10`}>
    {/* text */}
    <div className='w-[50%] p-6 m-6 bg-yellow-300'>
    <div>{heading}</div>
    <div>{subheading}</div>
    <div className='flex gap-4'>
        <CTAButton active={ctaBtn1.active} linkto={ctaBtn1.linkto} handleEvent={handleEvent}><div className='flex gap-2 items-center'>{ctaBtn1.text}<FaArrowRight/></div></CTAButton>
        <CTAButton active={ctaBtn2.active} linkto={ctaBtn2.linkto} handleEvent={handleEvent}>{ctaBtn2.text}</CTAButton>
    </div>
    </div>
    {/* code */}
    <div className='h-fit flex flex-row  w-[100%] p-6 m-6 lg:w-[500px] bg-richblack-100'>
        <div className='text-center flex flex-col gap-0 w-[10%] text-richblack-400 font-inter font-bold'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
        </div>
    
    <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2 -mt-[2px]`}>
        <TypeAnimation
        //write the code in codeblock and repeate after2 seconds after completion of writing
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            cursor={true}

            style={
                {
                    whiteSpace:"pre-line",
                    display:"block"
                }
            }
            omitDeletionAnimation={true}
        />
    </div>
    </div>
    </div>
  )
}

export default Codeblocks