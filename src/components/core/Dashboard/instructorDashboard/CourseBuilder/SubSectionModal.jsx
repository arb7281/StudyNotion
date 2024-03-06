import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse } from '../../../../../slices/courseSlice'
import toast from 'react-hot-toast'
import { RxCross1 } from 'react-icons/rx'

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
} = useForm()

const dispatch = useDispatch()
const [loading, setLoading] = usestate()
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

const onSubmit = async () => {
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
    formData.append("title", data.lecturetitle)
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
         
    </div>
  )
}

export default SubSectionModal