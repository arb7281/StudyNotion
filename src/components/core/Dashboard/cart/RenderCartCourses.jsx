import React from 'react'
import { useSelector } from 'react-redux'
import MyCourse from './MyCourse';

const RenderCartCourses = () => {

  const {cart} = useSelector((state) => state.cart);
  // const dispatch = useDispatch();

  return (
    <div>
      {
        cart.map((course, index) => (
          <MyCourse index={index} course={course}/>
        ))
      }
    </div>
  )
}

export default RenderCartCourses