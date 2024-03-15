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
},[])


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
    <div>
      <div>
        <div>
          <p>
            {view && "Viewing"}
            {add && "Adding"}
            {edit && "Editing"}
          </p>
          <button onClick={() => (!loading ? setModalData(null): {})}>
            <RxCross1/>
          </button>
        </div>
        <form>
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
            <div>
                <label htmlFor='lectureTitle'>Lecture Title</label>
                <input
                    id='lectureTitle'
                    type='text'
                    placeholder='Enter Lecture Title'
                    {...register("lectureTitle", {required: true})}
                    className='w-full'
                />
                {
                    errors.lectureTitle && (
                        <span>
                            Lecture Title is required
                        </span>
                    )
                }
            </div>
            <div>
                <label htmlFor='lectureDesc'>Lecture description</label>
                <textarea
                    id='lectureDesc'
                    placeholder='Enter Lecture Description'
                    {...register("lectureDesc", {required: true})}
                    className='w-full min-h-[130px]'
                />
                {
                    errors.lectureDesc && (
                        <span>
                            Lecture Description is required
                        </span>
                    )
                }
            </div>
            {
              !view && (
                <div>
                   <CTAButton
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