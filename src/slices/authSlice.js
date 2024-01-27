import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    signupData:null,
    loading:false,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null, /* iski madad se apn login logout handle kr skte he badme isko apn reducers yane actions ki madad se change krenge*/
    accountType: 'Student'
}

export const authSlice = createSlice ({
    name:"auth",
    initialState,
    reducers:{
        setLoading(state, value){
            state.loading = value.payload
        },

        setToken(state, value) {
            state.token = value.payload
        },

        setSignupData(state, value) {
            state.signupData = value.payload
        },
        setAccountType: (state, action) => {
            state.accountType = action.payload;
          },
    }
})

export const {setToken, setLoading, setSignupData, setAccountType} = authSlice.actions;

export default authSlice.reducer