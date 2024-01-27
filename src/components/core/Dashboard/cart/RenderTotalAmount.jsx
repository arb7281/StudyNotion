import React from 'react'
import { useSelector } from 'react-redux'
import CTAButton from '../../Homepage/CTAButton'

const RenderTotalAmount = () => {

  const total = useSelector((state) => state.cart)

  const handleBuyCourse = () => {
    //this function will help to buy your course
    console.log("I am inside handle buy course")
  }

  return (
    <div>
        <p>Total:</p>
        <div>Rs. {total}</div>
        <CTAButton handleEvent={handleBuyCourse}>Buy Now</CTAButton>
    </div>
  )
}

export default RenderTotalAmount