import { apiConnector } from "../apiconnector";
import { categories, courseEndpoints } from "../api";
import toast from "react-hot-toast";


const {CATEGORIES_API } = categories

const {CREATE_COURSE_API} = courseEndpoints

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

export const editCourse = async (formData,token) => {
    let result = null
    const toastId = toast.loading("Loading...")

    try{
        const response = await apiConnector("POST", CREATE_COURSE_API, formData, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`})

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