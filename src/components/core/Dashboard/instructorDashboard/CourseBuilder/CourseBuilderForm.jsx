import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import CTAButton from '../../../Homepage/CTAButton'
import {MdAddCircleOutline} from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux'
import { updateSection, createSection } from '../../../../../services/operations/courseDetailsAPI'
import { setCourse, setEditCourse } from '../../../../../slices/courseSlice'
import { setStep } from '../../../../../slices/courseSlice'
import {BiRightArrow} from "react-icons/bi"
import toast from 'react-hot-toast'
import NestedView from "../CourseBuilder/NestedView"


const CourseBuilderForm = () => {

  const [loading, setLoading] = useState(false);
  //this editSectionName also be used in NesteView component
  const [editSectionName, setEditSectionName] = useState(null)
  const {token} = useSelector((state) => state.auth)
  const {course} = useSelector((state) => state.course)
  const dispatch = useDispatch()
  

  const {
    register,
    handleSubmit,
    setValue,
    formState:{errors}
  } = useForm()


  const onSubmit = async (data) => {
    console.log("Iam inside onSubmit")

    setLoading(true)
    let result;

    if(editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id
        }, token
      )
    }else{
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id
      }, token)
    }

    if(result){
      console.log("yes result received")
      //if result successful found then set current course as course received in result
      dispatch(setCourse(result));
      //whether it is new section or update section set editsection name to null
      setEditSectionName(null);
      //set sectionName value to empty after updating
      setValue("sectionName", "")
    }

    setLoading(false)
  }

  //this is the andler for canceling the edit 
  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "")
  }

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
    console.log("printing course after clicking back", course)
  }

  const goToNext = () => {
    //check if section exists or not
    if(course?.courseContent?.length === 0){
      toast.error("Please add atleast one section");
      return;
    }

    //if section exists but subsection doesn't
    if(course?.courseContent.some((section) => section.subSection.length === 0)){
      toast.error("Please add atleast one lecture in each section")
      return
    }

    dispatch(setStep(3))
  }

//will be handled after crewating nested view component
  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if(editSectionName === sectionId){
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)

  }


  return (
    <div className='text-white'>
      <p>Course Builder</p>
      {/* need to complete onSubmit */}
      <form>
        <div>
          <label htmlFor='sectionName'>
            Section Name <sup>*</sup>
          </label>
          <input
            id='sectionName'
            placeholder='Add section name'
            {...register("sectionName", {required:true})}
            className='w-full text-black'
          />
          {
            errors.sectionName && (
              <span>Section name is required</span>
            )
          }
        </div>
        <div className='mt-10 flex w-full'>
          <CTAButton
          type="Submit"
          handleEvent={handleSubmit(onSubmit)}
          >
            {editSectionName ? "Edit Section Name" : "Create Section"}
            <MdAddCircleOutline className='text-yellow-50' size={20}/>
          </CTAButton>
          {editSectionName && (
            <button
            type='button'
            onClick={cancelEdit}
            className='text-sm text-richblack-300 underline ml-10'
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {
        course?.courseContent?.length > 0 && (
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
        )
      }

      <div className='flex justify-end gap-x-3 mt-10'>
      <CTAButton 
        handleEvent={goBack}
        active={false}
        >
          Back
          
        </CTAButton>
        <CTAButton 
        handleEvent={goToNext}
        active={true}
        >
          Next
          <BiRightArrow/>
        </CTAButton>
      </div>
    </div>
  )
}

export default CourseBuilderForm