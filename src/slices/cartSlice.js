import { createSlice } from "@reduxjs/toolkit";

import { toast } from "react-hot-toast";


const initialState = {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")): [], //get cart object or array from localstorage and parse taht json
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")): 0, //get total object or array from localstorage and parse taht json
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0, //get totalItems object or array from localstorage and parse taht json
}

const cartSlice = createSlice ({
    name:"cart",
    initialState,
    reducers:{
        // setTotalItems(state, value) {
        //     state.token = value.payload
        // },
        //add to cart
        //removeFromCart
        //resetCart
        addToCart: (state, action) => {
            const course = action.payload//send course as attribute inside addToCart function when you dispatch it
            console.log("printing courseID into addToCart slice", course._id)
            const index = state.cart.findIndex((item) => item._id === course._id)// find index of item if it present in cart
            // console.log("printing index", index)

            if(index >= 0){//if the index is present which means course is already present into the cart
                toast.error("course already in cart")
                return
            }
            //if index not present then push it into cart array
            state.cart.push(course)

            //update totalItems
            state.totalItems++

            //update total price of courses by adding course price which we just have added into cart
            state.total += course.price

            //now update the locastorage with new parameters of state
            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalitems", JSON.stringify(state.totalItems))

            //show toast
            toast.success("course added to cart")
        },

        removeFromCart: (state, action) => {
            //to remove a cart get id from payload
            const courseId = action.payload
            //find index using courseId
            const index = state.cart.findIndex((item) => item._id === courseId)

            if(index >= 0) {
                //if index is present 
                state.totalItems--
                //reduce price from total using course present in cart at the index
                state.total -= state.cart[index].price
                //remove course object from cart
                state.cart.splice(index, 1)
                //update localstorage
                localStorage.setItem("cart", JSON.stringify(state.cart))
                localStorage.setItem("total", JSON.stringify(state.total))
                localStorage.setItem("totalitems", JSON.stringify(state.totalItems))

                toast.success("course removed from cart")

            }
        },

        resetCart: (state) => {
            state.cart = []
            state.total = 0
            state.totalItems = 0
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalitems")
        }

    }
})

export const {addToCart, removeFromCart, resetCart} = cartSlice.actions;

export default cartSlice.reducer