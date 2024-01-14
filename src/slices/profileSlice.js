import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null, /* iski madad se apn user kon he update krenege */
    loading:false,
}

export const profileSlice = createSlice ({
    name:"profile",
    initialState,
    reducers:{
        setUser(state, value) {
            state.user = value.payload
        },
        setLoading(state, value) {
            state.user = value.payload
        }
    }
})

export const {setUser, setLoading} = profileSlice.actions;

export default profileSlice.reducer