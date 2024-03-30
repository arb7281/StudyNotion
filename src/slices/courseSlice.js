import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    step: 1,
    course: null,
    editCourse: false,
    paymentLoading: false,
    addCourse: false
}

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers:{
        setStep:(state, action) =>{
            state.step = action.payload
        },
        setCourse: (state, action) => {
            state.course = action.payload
        },
        setEditCourse: (state, action) =>{
            state.editCourse = action.payload
        },
        setAddCourse: (state, action) => {
            state.addCourse = action.payload
        },
        setPaymentLoading: (state, action) => {
            state.paymentLoading = action.payload
        },
        resetCourseState: (state) => {
            state.step = 1
            state.course = null
            state.editCourse = false
            state.addCourse = false
        }      
    } 
})

export const {
    setCourse,
    setEditCourse,
    setAddCourse,
    setPaymentLoading,
    resetCourseState,
    setStep
} = courseSlice.actions

export default courseSlice.reducer