import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import {HiOutlineCurrencyRupee} from 'react-icons/hi'
import {fetchCourseCategories} from "../../../../../services/operations/courseDetailsAPI"
import { setEditCourse, setStep, setAddCourse } from '../../../../../slices/courseSlice'
import CTAButton from '../../../Homepage/CTAButton'
import { COURSE_STATUS } from '../../../../../utils/constants'
import { createCourse } from '../../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../slices/courseSlice'
import toast from 'react-hot-toast'
import RequirementField from './RequirementField'
import TagsField from './TagsField'
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI'
import Upload from '../Upload'

const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        setValue, //to setting the values
        getValues,
        setError,
        formState: {errors} //to store any errors
    } = useForm()

    const dispatch = useDispatch()

    const {course, editCourse, addCourse} = useSelector((state) => state.course)
    console.log("printing course, editCourse, addCourse", course, editCourse, addCourse)
    console.log("printing course after edit course", course)
    console.log("printing course after render", course)
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
            setValue("courseCategory", course.category)
            setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)

        }

        getCategories()
        
    },[])



    // useEffect(() => {
    //     if (editCourse) {
    //         console.log("printing course", course)
    //       setValue("courseCategory", course.category); // Assuming 'courseCategory' is the field name
    //     }
    //   }, [editCourse, setValue])

    const isFormUpdated = () => {
        console.log("inside formUpdate")
        const currentValues = getValues();
        console.log(`printing values of categories current category ${currentValues.courseCategory} & received from database ${course.category}`)
        if(currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag ||
            currentValues.courseBenefits !== course.whatYouWillLearn || 
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseImage !== course.thumbnail ||
            currentValues.courseRequirements.toString() !== course.instructions
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
                // console.log("title changed was", course.courseName, "and now ", currentValues.courseTitle)
                formData.append("courseName", data.courseTitle);
              }

              if (currentValues.courseShortDesc !== course.courseDescription) {
                console.log("desc changed")
                formData.append("courseDescription", data.courseShortDesc);
              }

              if (currentValues.coursePrice !== course.price) {
                console.log("price changed")
                formData.append("price", data.coursePrice);
              }

              if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                console.log("benefits changed")
                formData.append("whatYouWillLearn", data.courseBenefits);
              }

              if (currentValues.courseCategory._id !== course.category._id) {
                console.log("category is changed", currentValues.courseCategory)
                formData.append("category", data.courseCategory);
              }

              if(currentValues.courseTags.toString() !== course.tag){
                console.log("tags changed is", currentValues.courseTags, "and was ", course.tag)
                  formData.append("tag", JSON.stringify(data.courseTags))
              }

              //will need lot of efforts
              if (currentValues.courseImage[0] !== course.thumbnail) {
                console.log("thumb changed")
                  formData.append("thumbnailImage", data.courseImage[0]); // Assuming courseImage is an array containing File objects
              }

              if (
                currentValues.courseRequirements.toString() !==
                course.instructions.toString()
              ) {
                console.log("instruction changed")
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
        console.log("printing data.courseCategory", data.courseCategory)
        formData.append("tag", JSON.stringify(data.courseTags))
        formData.append("instructions", JSON.stringify(data.courseRequirements)) /* unlock this and comment above line if you find babbar have written different code */
        formData.append("status", COURSE_STATUS.DRAFT)
        formData.append("thumbnailImage", data.courseImage)

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
    className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
        <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor='courseTitle'>Course title<sup>*</sup></label>
            <input 
                id='courseTitle'
                placeholder='Enter Course Title'
                {...register("courseTitle", {required: true})}
                className="form-style w-full"
            />
            {
                errors.courseTitle && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">Course Title is required</span>
                )
            }
            
        </div>
        <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor='courseShortDesc'>Course Short Description<sup className="text-pink-200">*</sup></label>
            <input
                id='courseShortdesc'
                placeholder='Enter description'
                {...register("courseShortDesc", {required: true})}
                className="form-style resize-x-none min-h-[130px] w-full"
            />
            {
                errors.courseShortDesc && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">Course Title is Required**</span>
                )
            }
        </div>
        <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor='coursePrice'>Price<sup className="text-pink-200">*</sup></label>
            <div className="relative">
                <input
                    id='coursePrice'
                    placeholder='Enter Course Price'
                    {...register("coursePrice", {required: true, valueAsNumber: true})}
                    className="form-style w-full !pl-12"
                />
                <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400"/>
                {
                    errors.coursePrice && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">Course Price is Required**</span>
                    )
                }
            </div>
            
        </div>

        <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor=''>Course Category<sup>*</sup></label>
            <select
            id='courseCategory'
            defaultValue=""
            {...register("courseCategory", {required: true})}
            className="form-style w-full"
            >
                <option value="" disabled>Choose a Category</option>
                {
                    !loading && courseCategories?.map((category, index) => (
                        //value = category._id will actualy save id of category
                    
                        <option 
                        key={index} 
                        value={category?._id}
                        selected={editCourse && course.category === category?._id}
                        >
                            {category?.name}
                        </option>
                    ))
                }
            </select>
            {
                errors.courseCategory && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">Course Category is required</span>
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
        <Upload
            name="courseImage"
            label="Course Thumbnail"
            register={register}
            setValue={setValue}
            errors={errors}
            setError={setError}
            editData={editCourse ? course?.thumbnail : null}

        />

        <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor='courseBenefits'>Benefits of the course<sup className="text-pink-200">*</sup></label>
            <textarea
                id='courseBenefits'
                placeholder='Enter The Benefits of The Course'
                {...register("courseBenefits", {required: true})}
                className="form-style resize-x-none min-h-[130px] w-full"
            />
            {
                errors.courseBenefits && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
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

        <div className="flex justify-end gap-x-2">
            {
                editCourse && (
                    <button
                    onClick={() => dispatch(setStep(2))}
                    disabled={loading}
                    className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-medium text-richblack-900`}
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