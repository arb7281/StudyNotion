import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({active, children, linkto, handleEvent,type}) => {
  console.log("CTA button type is ", type)
  return (
    <Link to={linkto}>
      <button className={`${active ? "bg-yellow-50 text-black": "bg-richblack-800 text-white"} text-center text-[13px] px-3 py-3 rounded-md font-bold
                            hover:scale-95 transition-all duration-200 flex items-center gap-2`} onClick={handleEvent} type={`${type}`}>                    
        {children}
      </button>
    </Link>
  );
}

export default CTAButton