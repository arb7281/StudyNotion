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
import RequirementField from './RequirementField'
import TagsField from './TagsField'
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI'

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
                // console.log("printing categories", categories)
                setCourseCategories(categories)
            }

            setLoading(false)
        }

        if(editCourse) {
            console.log("edit course is enabled and printing course", course)
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("courseBenefits", course.whatYouWillLearn)
            console.log("printing value of courseCategory", course.category)
            // setValue("courseCategory", course.category)
            setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)

        }

        getCategories()
        
    },[editCourse, setValue])

    useEffect(() => {
        if (editCourse) {
            console.log("printing course", course)
          setValue("courseCategory", course.category); // Assuming 'courseCategory' is the field name
        }
      }, [editCourse, setValue])

    const isFormUpdated = () => {
        console.log("inside formUpdate")
        const currentValues = getValues();
        console.log(`printing values of categories current category ${currentValues.courseCategory} & received from database ${course.category}`)
        if(currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn || 
            currentValues.courseCategory !== course.category ||
            // currentValues.courseImage !== course.thumbnail ||
            currentValues.courseRequirements.toString() !== course.instructions.toString()
            ) {
                return true
            }

            return false
    }

    // here formdata will be passed through handleSubmit handler provided by useForm which we have stored using register object provided by useForm
    const onSubmitForm = async (data) => {

        //if you are editing existing course
        if(editCourse){
            //checking if form is updated or not
            if (isFormUpdated()) {
                console.log("inside if case fter checking formUpdate")
              //if course details are updated get those values using getValues
              const currentValues = getValues();

              const formData = new FormData();

              formData.append("courseId", course._id); //for updating coiurse we will need courseID
              //check if title is updated or not
              if (currentValues.courseTitle !== course.courseName) {
                formData.append("courseName", data.courseTitle);
              }

              if (currentValues.courseShortDesc !== course.courseDescription) {
                formData.append("courseDescription", data.courseShortDesc);
              }

              if (currentValues.coursePrice !== course.price) {
                formData.append("price", data.coursePrice);
              }

              if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                formData.append("whatYouWillLearn", data.courseBenefits);
              }

              if (currentValues.courseCategory !== course.category) {
                console.log("category is changed", currentValues.courseCategory)
                formData.append("category", data.courseCategory);
              }

              if(currentValues.courseTags.toString() !== course.tag.toString()){
                  formData.append("tag", JSON.stringify(data.courseTags))
              }

              //will need lot of efforts
              // if (currentValues.courseImage[0] !== course.thumbnail) {
              //     formData.append("thumbnailImage", data.courseImage[0]); // Assuming courseImage is an array containing File objects
              // }

              if (
                currentValues.courseRequirements.toString() !==
                course.instructions.toString()
              ) {
                formData.append(
                  "instructions",
                  JSON.stringify(data.courseRequirements)
                );
              }

              setLoading(true);

              const result = await editCourseDetails(formData, token);

              
              if (result) {
                console.log("printing received result", result)
                dispatch(setStep(2));
                dispatch(setCourse(result));
              } else {
                toast.error("No Changes Made So Far1");
              }
              setLoading(false);
              
            } else {
              toast.error("No Changes made so far2");
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
        // formData.append("instructions", data.courseRequirements)
        formData.append("tag", JSON.stringify(data.courseTags))
        formData.append("instructions", JSON.stringify(data.courseRequirements)) /* unlock this and comment above line if you find babbar have written different code */
        formData.append("status", COURSE_STATUS.DRAFT)
        // formData.append("thumbnailImage", data.thumbnail)

        setLoading(true)

        const result = await createCourse(formData, token)

        if(result){
            
            dispatch(setCourse(result))
            dispatch(setStep(2))
        }

        setLoading(false)
    }
    




  return (
    <form
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
        {/* here we are sending register method from useform to child component with the help of them we are updating our  */}
        <TagsField
            name="courseTags"
            label="Tags"
            register={register}
            setValue={setValue}
            getValues={getValues}
            errors={errors}
        />

        {/* thumbnail upload component */}

        <div>
            <label htmlFor='courseBenefits'>Benefits of the course<sup>*</sup></label>
            <textarea
                id='courseBenefits'
                placeholder='Enter The Benefits of The Course'
                {...register("courseBenefits", {required: true})}
                className='min-h-[130px] w-full'
            />
            {
                errors.courseBenefits && (
                    <span>
                        Benefits of the course are required**
                    </span>
                )
            }
        </div>
        
        {/* requirement and instructions  */}
        <RequirementField
            name="courseRequirements"
            label="Requirements/Instructions"
            register={register}
            setValue={setValue}
            getValues={getValues}
            errors={errors}
        />

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
            <CTAButton active={true} type="submit" handleEvent={handleSubmit(onSubmitForm)}>{!editCourse ? "Next" : "Save Changes"}</CTAButton>
        </div>

    </form>
  )
}

export default CourseInformationForm