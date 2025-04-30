import { createSlice } from '@reduxjs/toolkit'
import Swal from "sweetalert2";

const initialState = {
    cartItem:[]
}

const cartSlice = createSlice ({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const existingItem = state.cartItem.find(item => item._id === action.payload._id);
            if(!existingItem){
                state.cartItem.push(action.payload)
                Swal.fire({
                    title: "Item Added to Cart!",
                    icon: "success",
                   confirmButtonText: "OK"
                  });
            } else{
                Swal.fire({
                    title: "Already in Cart",
                    icon: "warning",
                    confirmButtonText: "Got it!"
                });            }

        },
        removeFromCart:(state,action)=>{
            state.cartItem = state.cartItem.filter(item => item._id !== action.payload._id)
        },
        clearCart:(state) => {

            state.cartItem = []
        }
    }
})

export const {addToCart , removeFromCart, clearCart} = cartSlice.actions

export default cartSlice.reducer





