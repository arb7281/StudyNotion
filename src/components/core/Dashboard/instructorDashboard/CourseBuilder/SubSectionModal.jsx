import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse } from '../../../../../slices/courseSlice'
import toast from 'react-hot-toast'
import { RxCross1 } from 'react-icons/rx'
import Upload from '../Upload'
import CTAButton from '../../../Homepage/CTAButton'
import { createSubSection, deleteSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI'

const SubSectionModal = ({
    modalData,
    setModalData,
    add=false,
    view=false,
    edit=false
}) => {

const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState:{errors},
    setError,
} = useForm()

console.log("printing modalData", modalData)
console.log("printing value of view", view)
const dispatch = useDispatch()
const [loading, setLoading] = useState()
const {course} = useSelector((state) => state.course)
const {token} = useSelector((state) => state.auth)


//on first render cherck if view and edit are true
useEffect(()=>{
    if(view || edit){
        setValue("lectureTitle", modalData.title);
        setValue("lectureDesc", modalData.description);
        setValue("lectureVideo", modalData.videoUrl)
    }

    const current = getValues();
    console.log("printing cureent values received from modalData", current)
},[setValue, modalData])

const current = getValues();
    console.log("printing cureent values received from modalData", current)
//check if form updated or not

const formUpdated = () => {
    const currentvalues = getValues();

    if(currentvalues.lectureTitle !== modalData.title || 
        currentvalues.lectureDesc !== modalData.description ||
        currentvalues.video !== modalData.videoUrl){
            return true
        }else{
            return false
        }
}

const handleEditSubSection = async () => {
    const currentValues = getValues()

    const formData = new FormData()

    formData.append("sectionId", modalData.sectionId)
    formData.append("subSectionId", modalData._id)
    formData.append("courseId", course._id)

    if(currentValues.lectureTitle !== modalData.title){
        formData.append("title", currentValues.lectureTitle)
    }
    if(currentValues.lectureDesc !== modalData.description){
        formData.append("description", currentValues.description)
    }
    if(currentValues.lectureVideo !== modalData.videoUrl){
        formData.append("video", currentValues.lectureVideo)
    }

    setLoading(true)

    //API call
    const result = await updateSubSection(formData, token)

    if(result){
        dispatch(setCourse(result))
    }

    setModalData(null)
    setLoading(false)
}

const onSubmit = async (data) => {
    if(view) return

    if(edit){
        if(!formUpdated){
            toast.error("No changes made to the lecture")
        }else{
            handleEditSubSection()
        }
        return
    }

    const formData = new FormData()
    formData.append("sectionId", modalData)
    formData.append("courseId", course._id)
    formData.append("title", data.lectureTitle)
    formData.append("description", data.lectureDesc)
    formData.append("video", data.lectureVideo)
    setLoading(true)

    //making API call now
    const result = await createSubSection(formData, token)

    if(result) {
        dispatch(setCourse(result))
    }

    setModalData(null)
    setLoading(false) 
}




  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {view && "Viewing"}
            {add && "Adding"}
            {edit && "Editing"}
          </p>
          <button onClick={() => (!loading ? setModalData(null): {})}>
            <RxCross1 className="text-2xl text-richblack-5"/>
          </button>
        </div>
        <form
        className="space-y-8 px-8 py-10"
        >
            <Upload
                name="lectureVideo"
                lebel="Lecture Video"
                register={register}
                setValue={setValue}
                errors={errors}
                setError={setError}
                video={true}
                viewData={view ? modalData.videoUrl : null}
                editData={edit ? modalData.videoUrl : null}
            />
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor='lectureTitle'>Lecture Title</label>
                <input
                    id='lectureTitle'
                    type='text'
                    placeholder='Enter Lecture Title'
                    {...register("lectureTitle", {required: true})}
                    className="form-style w-full"
                    disabled={view}
                />
                {
                    errors.lectureTitle && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Lecture Title is required
                        </span>
                    )
                }
            </div>
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor='lectureDesc'>Lecture description</label>
                <textarea
                    id='lectureDesc'
                    placeholder='Enter Lecture Description'
                    {...register("lectureDesc", {required: true})}
                    className="form-style resize-x-none min-h-[130px] w-full"
                    disabled={view}
                />
                {
                    errors.lectureDesc && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Lecture Description is required
                        </span>
                    )
                }
            </div>
            {
              !view && (
                <div className="flex justify-end">
                   <CTAButton
                   active={true}
                   handleEvent={handleSubmit(onSubmit)}
                   >{loading ? "Loading..." : edit ? "Save Changes" : "Save"}</CTAButton>
                </div>)  
            }
        </form>
      </div>
    </div>
  );
}

export default SubSectionModal