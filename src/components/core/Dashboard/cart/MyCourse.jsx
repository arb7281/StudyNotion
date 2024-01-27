import React, { useEffect, useState } from 'react'
import {RiDeleteBin6Line} from "react-icons/ri"
import {GiNinjaStar} from "react-icons/gi"
import ReactStars from "react-rating-stars-component";
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../../../slices/cartSlice';
// import { getAverageRating } from '../../../../services/operations/authAPI';
import { courseEndpoints } from '../../../../services/api';
import { apiConnector } from '../../../../services/apiconnector';

const {GET_COURSE_AVERAGE_RATING} = courseEndpoints

const MyCourse = ({course}) => {
    const [averageRating, setAverageRating] = useState(null);

    const dispatch = useDispatch();

    useEffect(()=> {
        //here we are taking help of .then and .cathc method since we cannot use await key word inside a useEffect 
        //since we need to use async function inside useEffect to reduce the space to erite a code we are opting simpler method
        //which is .then and .catch we dont need to save its response into a variable 
        //we get its response directly if we are using .then method
        //you could have gone for async function but it will will add more knowlege 
        const fetchAverageRating = () => {
            apiConnector("GET", GET_COURSE_AVERAGE_RATING, course._id)
            .then(response => {
                if(!response.data.success){
                    throw new Error(response.data.message);
                }
                setAverageRating(response.data.averageRating);
            })
            .catch(error => {
                console.error('Error fetching average rating:', error)
            })
        }

        fetchAverageRating();
    }, [course._id])

  return (
    <div>
        <div>
            <img src={course?.thumbnail}/>
            <div>
                <p>{course?.courseName}</p>
                <p>{course?.category?.name}</p>
                <div>
                {averageRating !== null ? (
                    <div>
                    <span>{averageRating}</span>
                    <ReactStars
                        count={5}
                        size={20}
                        value={averageRating}
                        edit={false}
                        activeColor='#ffd700'
                        emptyIcon={<GiNinjaStar/>}
                        fullIcon={<GiNinjaStar/>}
                    />

                    <span>{course?.ratingAndReviews?.length} Ratings here is total reviews given by all users</span>
                    </div>                    
                ) : ('No rating available')
                    
                }
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