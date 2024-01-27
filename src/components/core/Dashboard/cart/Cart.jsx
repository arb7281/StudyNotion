import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses'
import RenderTotalAmount from './RenderTotalAmount'

const Cart = () => {

    const {total, totalitems} = useSelector((state) => state.cart)
  return (
    <div>
        <h1>your Cart</h1>
        <p>{totalitems} Courses in cart</p>
        {
            total > 0 
            ? (<div>
                <RenderCartCourses/>
                <RenderTotalAmount/>
                </div>) 
            : (<div>Your cart is empty</div>)
        }
    </div>
  )
}

export default Cart