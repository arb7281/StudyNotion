import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import {HiOutlineCurrencyRupee} from 'react-icons/hi'
import {fetchCourseCategories} from "../../../../../services/operations/courseDetailsAPI"
import { setStep } from '../../../../../slices/courseSlice'
import CTAButton from '../../../Homepage/CTAButton'
import { COURSE_STATUS } from '../../../../../utils/constants'
import { createCourse } from '../../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../slices/courseSlice'
import toast from 'react-hot-toast'

const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        setValue, //to setting the values
        getValues,
        formState: {errors} //to store any errors
    } = useForm()

    const dispatch = useDispatch()

    const {course, editCourse} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)
    const [courseCategories, setCourseCategories] = useState([])

    useEffect(() => {
        setLoading(true)
        const getCategories = async () => {
            const categories = await fetchCourseCategories();
            if(categories.length > 0){
                setCourseCategories(getCategories)
            }
        }
        setLoading(false)
        
    })

    const isFormUpdated = () => {
        const currentValues = getValues();
        if(currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            // currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn || 
            currentValues.courseCategory._id !== course.category._id ||
            // currentValues.courseImage !== course.thumbnail ||
            currentValues.courseRequirements.toString() !== course.instructions.toString()
            ) {
                return true
            }

            return false
    }

    // here formdata will be passed through handleSubmit handler provided by useForm which we have stored using register object provided by useForm
    const onSubmit = async (data) => {

        //if you are editing existing course
        if(editCourse){
            //checking if form is updated or not
            if(isFormUpdated()){
                //if course details are updated get those values using getValues
                const currentValues = getValues()

                const formData = new FormData()

                formData.append("courseId", course._id)//for updating coiurse we will need courseID
                //check if title is updated or not
                if(currentValues.courseTitle !== course.courseName){
                    formData.append("courseName", data.courseTitle)
                }

                if(currentValues.courseShortDesc !== course.courseDescription){
                    formData.append("courseDescription", data.courseShortDesc)
                }

                if(currentValues.coursePrice !== course.price){
                    formData.append("price", data.coursePrice)
                }

                if(currentValues.coursebenefits !== course.whatYouWillLearn){
                    formData.append("whatYouWillLearn", data.courseBenefits)
                }

                if(currentValues.courseCategory._id !== course.category._id){
                    formData.append("category", data.courseCategory)
                }

                if(currentValues.courseTags.toString() !== course.tag.toString()){
                    formData.append("tag", data.courseTags)
                }

                //will need lot of efforts
                if (currentValues.courseImage[0] !== course.thumbnail) {
                    formData.append("thumbnailImage", data.courseImage[0]); // Assuming courseImage is an array containing File objects
                }

                if(currentValues.courseRequirements.toString() !== course.instructions.toString()){
                    formData.append("instructions", JSON.stringyfy(data.courseRequirements))
                }
            }

            setLoading(true)

            const result = await editCourse(formData, token)

            setLoading(false)
            if(result){
                setStep(2);
                dispatch(setCourse(result))
            }else{
                toast.error("No Changes Made So Far")
            }

            //don't want to move forward after this
            return
        }

        //when we are making the course freshly
        const formData = new FormData();

        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc)
        formData.append("price", data.coursePrice)
        formData.append("whatYouWillLearn", data.courseBenefits)
        formData.append("category", data.courseCategory)//this is holding id of category
        formData.append("instructions", JSON.stringyfy(data.courseRequirements))
        formData.append("status", COURSE_STATUS.DRAFT)
        formData.append("thumbnailImage", data.thumbnail)

        setLoading(true)

        const result = await createCourse(formData, token)

        if(result){
            setStep(2)
            dispatch(setCourse(result))
        }

        setLoading(false)
    }
    




  return (
    <form
    onSubmit={handleSubmit(onSubmit)} 
    className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'>
        <div>
            <label htmlFor='courseTitle'>Course title<sup>*</sup></label>
            <input 
                id='courseTitle'
                placeholder='Enter Course Title'
                {...register("courseTitle", {required: true})}
                className='w-full'
            />
            {
                errors.courseTitle && (
                    <span>Course Title is required</span>
                )
            }
            
        </div>
        <div>
            <label htmlFor='courseShortDesc'>Course Short Description<sup>*</sup></label>
            <input
                id='courseShortdesc'
                placeholder='Enter description'
                {...register("courseShortDesc", {required: true})}
                className='w-full'
            />
            {
                errors.courseShortDesc && (
                    <span>Course Title is Required**</span>
                )
            }
        </div>
        <div className='relative'>
            <label htmlFor='coursePrice'>Price<sup>*</sup></label>
            <input
                id='coursePrice'
                placeholder='Enter Course Price'
                {...register("coursePrice", {required: true, valueAsNumber: true})}
                className='w-full'
            />
            <HiOutlineCurrencyRupee className='absolute top-1/2 text-richblack-400'/>
            {
                errors.coursePrice && (
                    <span>Course Price is Required**</span>
                )
            }
        </div>

        <div>
            <label htmlFor=''>Course Category<sup>*</sup></label>
            <select
            id='courseCategory'
            defaultValue=""
            {...register("courseCategory", {required: true})}
            >
                <option value="" disabled>Choose a Category</option>
                {
                    !loading && courseCategories.map((category, index) => (
                        //value = category._id will actualy save id of category
                        <option key={index} value={category?._id}>
                            {category?.name}
                        </option>
                    ))
                }
            </select>
            {
                errors.courseCategory && (
                    <span>Course Category is required</span>
                )
            }
        </div>

        {/* tags component */}

        {/* thumbnail upload component */}

        <div>
            <label htmlFor='coursebenefits'>Benefits of the course<sup>*</sup></label>
            <textarea
                id='coursebenefits'
                placeholder='Enter The Benefits of The Course'
                {...register("courseBenefits", {required: true})}
                className='min-h-[130px] w-full'
            />
            {
                errors.coursebenefits && (
                    <span>
                        Benefits of the course are required**
                    </span>
                )
            }
        </div>
        
        {/* requirement and instructions  */}
        {/* <RequirementField
            name="courseRequirements"
            label="Requirements/Instructions"
            register={register}
            setValues={setValue}
            getValues={getvalues}
        /> */}

        <div>
            {
                editCourse && (
                    <button
                    onClick={() => dispatch(setStep(2))}
                    className='flex item-center gap-x-2 bg-richblack-300'
                    >
                        Continue Without Saving
                    </button>
                )
            }
            <CTAButton>{!editCourse ? "Next" : "Save Changes"}</CTAButton>
        </div>

    </form>
  )
}

export default CourseInformationForm