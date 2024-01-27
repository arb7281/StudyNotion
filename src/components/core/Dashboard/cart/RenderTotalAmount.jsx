import React from 'react'
import { useSelector } from 'react-redux'
import CTAButton from '../../Homepage/CTAButton'

const RenderTotalAmount = () => {

  const total = useSelector((state) => state.cart)
  return (
    <div>
        <p>Total:</p>
        <div>Rs. {total}</div>
        <CTAButton>Buy Now</CTAButton>
    </div>
  )
}

export default RenderTotalAmount