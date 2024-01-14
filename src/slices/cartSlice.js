import { createSlice } from "@reduxjs/toolkit";

import { toast } from "react-hot-toast";


const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,/* iski madad se apn login logout handle kr skte he */
}

const cartSlice = createSlice ({
    name:"cart",
    initialState,
    reducers:{
        setTotalItems(state, value) {
            state.token = value.payload
        },
        //add to cart
        //removeFromCart
        //resetCart
    }
})

export const {setTotalItems} = cartSlice.actions;

export default cartSlice.reducer