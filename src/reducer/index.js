import {combineReducers} from "@reduxjs/toolkit"
import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import cartReducer from "../slices/cartSlice"

const rootReducer = combineReducers({ /* ab taki ye combineReducer he apn multiple slices import krke is ek reducer me combine kr sakte he */
    auth: authReducer,
    profile:profileReducer,
    cart: cartReducer
})

export default rootReducer