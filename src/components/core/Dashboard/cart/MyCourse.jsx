import React from 'react'
import {RiDeleteBin6Line} from "react-icons/ri"
import {GiNinjaStar} from "react-icons/gi"
import ReactStars from "react-rating-stars-component";
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../../../slices/cartSlice';

const MyCourse = ({course}) => {


    const dispatch = useDispatch();
  return (
    <div>
        <div>
            <img src={course?.thumbnail}/>
            <div>
                <p>{course?.courseName}</p>
                <p>{course?.category?.name}</p>
                <div>
                    <span>4.8 change dynamically</span>
                    <ReactStars
                        count={5}
                        size={20}
                        edit={false}
                        activeColor='#ffd700'
                        emptyIcon={<GiNinjaStar/>}
                        fullIcon={<GiNinjaStar/>}
                    />

                    <span>{course?.ratingAndReviews?.length} Ratings</span>
                </div>
            </div>
        </div>

        <div>
            <button
            onClick={() => dispatch(removeFromCart(course._id))}>
                <RiDeleteBin6Line/>
                <span>Remove</span>
            </button>
            <p>Rs {course?.price}</p>
        </div>
    </div>
  )
}

export default MyCourse