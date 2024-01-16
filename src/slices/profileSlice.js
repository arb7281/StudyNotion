import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null, /* iski madad se apn user kon he update krenege */
    wait:false,
    enrolledCourses: null
}

export const profileSlice = createSlice ({
    name:"profile",
    initialState,
    reducers:{
        setUser(state, value) {
            state.user = value.payload
        },
        setWait(state, value) {
            state.wait = value.payload
        },
        setEnrolledCourses(state, value) {
            state.enrolledCourses = value.payload
        }
    }
})

export const {setUser,setWait, setEnrolledCourses } = profileSlice.actions;

export default profileSlice.reducer