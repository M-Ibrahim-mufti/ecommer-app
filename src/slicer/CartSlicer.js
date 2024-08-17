import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const cartSlicer = createSlice({
    name:'isCart',
    initialState,
    reducers: {
        setIsCart(state, action) {
            return action.payload
        }
    }
})



export const { setIsCart } = cartSlicer.actions;
export default cartSlicer.reducer