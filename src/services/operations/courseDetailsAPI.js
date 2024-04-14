import { apiConnector } from "../apiconnector";
import { categories, courseEndpoints } from "../api";
import toast from "react-hot-toast";


const {CATEGORIES_API, CATEGORY_PAGE_DETAILS_API } = categories

const {CREATE_COURSE_API, 
    UPDATE_COURSE_API, 
    CREATE_SECTION_API, 
    UPDATE_SECTION_API, 
    DELETE_SECTION_API, 
    DELETE_SUB_SECTION_API, 
    CREATE_SUB_SECTION_API, 
    UPDATE_SUB_SECTION_API,
    DELETE_COURSE_API,
    COURSE_DETAILS_API,
    INSTRUCTOR_COURSES_API,
    LECTURE_COMPLETION_API,
    CREATE_RATING_API} = courseEndpoints

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

export const categoryPageDetails = async (categoryId) => {

    let result = []
    console.log("printing categoryId inside categoryPageDetails", categoryId )
    try{
        console.log("printing path", CATEGORY_PAGE_DETAILS_API)
        const response = await apiConnector("POST", CATEGORY_PAGE_DETAILS_API, {categoryId: categoryId,})

        if(!response.data.success){
            throw new Error("Could Not fetch CATEGORY_PAGE_DETAILS")
        }
        result = response?.data?.data

    }catch(error){
        console.log("CATEGORY_PAGE_DETAILS_API error", error)
        toast.error(error.message)
    }
    
    return result
}

export const fetchCourseDetails = async (courseId) => {
    const toastId = toast.loading("Loading...")
    //   dispatch(setLoading(true));
    let result = null
    try {
      const response = await apiConnector("POST", COURSE_DETAILS_API, {
        courseId,
      })
      console.log("COURSE_DETAILS_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data[0]
      console.log("Printing result", result)
    } catch (error) {
      console.log("COURSE_DETAILS_API API ERROR............", error)
      result = error.response.data
      // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
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
        toast.success("Course Details Updated Successfully")
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

export const fetchInstructorCourses = async (token) => {

    let result = []

    try{
        const response = await apiConnector("GET", INSTRUCTOR_COURSES_API,null, {Authorization: `Bearer ${token}`})

        if(!response.data.success){
            throw new Error("Could fetch instructor courses")
        }
        result = response?.data.data
        console.log("printing instructor courses", result)

    }catch(error){
        console.log("instructor courses_API error", error)
        toast.error(error.message)
    }
    
    return result
}

export const deleteCourse = async (data,token) => {
    
    const toastId = toast.loading("Loading...")
    // console.log("printing create course api", CREATE_COURSE_API)
    try{
        const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
            
            Authorization: `Bearer ${token}`})

        if(!response.data.success){
            throw new Error("Could Not delete course successfully")
        }
        toast.success("Course Section deleted Successfully")

    }catch(error){
        console.log("DELETE_COURSE_API error", error)
        toast.error(error.message)
    }

    toast.dismiss(toastId)
}

// mark a lecture as complete
export const markLectureAsComplete = async (data, token) => {
    let result = null
    console.log("mark complete data", data)
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log(
        "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
        response
      )
  
      if (!response.data.message) {
        throw new Error(response.data.error)
      }
      toast.success("Lecture Completed")
      result = true
    } catch (error) {
      console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
      toast.error(error.message)
      result = false
    }
    toast.dismiss(toastId)
    return result
  }
  
  // create a rating for course
  export const createRating = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let success = false
    try {
      const response = await apiConnector("POST", CREATE_RATING_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE RATING API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Create Rating")
      }
      toast.success("Rating Created")
      success = true
    } catch (error) {
      success = false
      console.log("CREATE RATING API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return success
  }