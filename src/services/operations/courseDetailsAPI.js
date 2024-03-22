import { apiConnector } from "../apiconnector";
import { categories, courseEndpoints } from "../api";
import toast from "react-hot-toast";


const {CATEGORIES_API } = categories

const {CREATE_COURSE_API, 
    UPDATE_COURSE_API, 
    CREATE_SECTION_API, 
    UPDATE_SECTION_API, 
    DELETE_SECTION_API, 
    DELETE_SUB_SECTION_API, 
    CREATE_SUB_SECTION_API, 
    UPDATE_SUB_SECTION_API} = courseEndpoints

export const fetchCourseCategories = async () => {

    let result = []

    try{
        const response = await apiConnector("GET", CATEGORIES_API)

        if(!response.data.success){
            throw new Error("Could Not fetch course categories")
        }
        result = response?.data?.allCategory

    }catch(error){
        console.log("CATEGORIES_API error", error)
        toast.error(error.message)
    }
    
    return result
}

export const createCourse = async (formData,token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    console.log("printing create course api", CREATE_COURSE_API)
    try{
        const response = await apiConnector("POST", CREATE_COURSE_API, formData, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`}, null)

        if(!response.data.success){
            throw new Error("Could Not fetch course categories")
        }
        toast.success("Course Details Added Successfully")
        result = response?.data?.data

    }catch(error){
        console.log("CATEGORIES_API error", error)
        toast.error(error.message)
    }

    toast.dismiss(toastId)
    
    return result
}

export const editCourseDetails = async (formData,token) => {
    let result = null
    const toastId = toast.loading("Loading...")

    try{
        const response = await apiConnector("POST", UPDATE_COURSE_API, formData, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`})

        if(!response.data.success){
            throw new Error("Could Not fetch course details")
        }
        toast.success("Course Details Added Successfully")
        result = response?.data?.updatedCourseDetails
        console.log("printing updated course", result)

    }catch(error){
        console.log("editCourseDetails", error)
        toast.error(error.message)
    }

    toast.dismiss(toastId)
    
    return result
}

export const createSection = async (data,token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    // console.log("printing create course api", CREATE_COURSE_API)
    try{
        const response = await apiConnector("POST", CREATE_SECTION_API, data, {
            
            Authorization: `Bearer ${token}`}, null)

        if(!response.data.success){
            throw new Error("Could Not fetch course Section")
        }
        toast.success("Course Section Added Successfully")
        result = response?.data?.updatedCourseDetails

    }catch(error){
        console.log("CREATE_SECTION_API error", error)
        toast.error(error.message)
    }

    toast.dismiss(toastId)
    
    return result
}

export const updateSection = async (data,token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    // console.log("printing create course api", CREATE_COURSE_API)
    try{
        const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
            
            Authorization: `Bearer ${token}`}, null)

        if(!response.data.success){
            throw new Error("Could Not fetch course details")
        }
        toast.success("Course Section updated Successfully")
        result = response?.data?.updatedCourseDetails

    }catch(error){
        console.log("UPDATE_SECTION_API error", error)
        toast.error(error.message)
    }

    toast.dismiss(toastId)
    
    return result
}

export const deleteSection = async (data,token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    // console.log("printing create course api", CREATE_COURSE_API)
    try{
        const response = await apiConnector("POST", DELETE_SECTION_API, data, {
            
            Authorization: `Bearer ${token}`}, null)

        if(!response.data.success){
            throw new Error("Could Not fetch course details")
        }
        toast.success("Course Section deleted Successfully")
        result = response?.data?.updatedCourseDetails

    }catch(error){
        console.log("DELETE_SECTION_API error", error)
        toast.error(error.message)
    }

    toast.dismiss(toastId)
    
    return result
}


export const deleteSubSection = async (data,token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    // console.log("printing create course api", CREATE_COURSE_API)
    try{
        const response = await apiConnector("POST", DELETE_SUB_SECTION_API, data, {
            
            Authorization: `Bearer ${token}`}, null)

        if(!response.data.success){
            throw new Error("Could Not fetch course details")
        }
        toast.success("Course SubSection deleted Successfully")
        result = response?.data?.updatedCourseDetails

    }catch(error){
        console.log("DELETE_SUB_SECTION_API error", error)
        toast.error(error.message)
    }

    toast.dismiss(toastId)
    
    return result
}

export const createSubSection = async (data,token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    // console.log("printing create course api", CREATE_COURSE_API)
    try{
        const response = await apiConnector("POST", CREATE_SUB_SECTION_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`}, null)

        if(!response.data.success){
            throw new Error("Could Not fetch SubSection details")
        }
        toast.success("Course SubSection Added Successfully")
        result = response?.data?.updatedCourseDetails

    }catch(error){
        console.log("CREATE_SECTION_API error", error)
        toast.error(error.message)
    }

    toast.dismiss(toastId)
    
    return result
}

export const updateSubSection = async (data,token) => {
    let result = null
    const toastId = toast.loading("Loading...")

    try{
        const response = await apiConnector("POST", UPDATE_SUB_SECTION_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`})

        if(!response.data.success){
            throw new Error("Could Not fetch subsection details")
        }
        toast.success("Course subsection Added Successfully")
        result = response?.data?.updatedCourseDetails

    }catch(error){
        console.log("updateSubSection error", error)
        toast.error(error.message)
    }

    toast.dismiss(toastId)
    
    return result
}