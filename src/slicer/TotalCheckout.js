import { createSlice } from "@reduxjs/toolkit";

const initialState = 0;

const totalCheckoutSlicer = createSlice({
    name:'totalCheckout',
    initialState,
    reducers:{
        setTotalNumberOfProductCheckout(state,action) {
            return action.payload
        }
    }
})

const initialCheckoutState = []

const totalCheckoutProductSlicer = createSlice({
    name:'totalCheckoutProduct',
    initialState:initialCheckoutState,
    reducers:{
        setTotalProductCheckout(state,action) {
            return action.payload
        },
        removeFromProductCheckout(state,action) {
            return state.filter((product) => product._id !== action.payload._id);
        },
        AddProductToCheckout(state,action){
            return [...state, action.payload]
        }
    }
})

export const { setTotalNumberOfProductCheckout } = totalCheckoutSlicer.actions;
export const { setTotalProductCheckout, removeFromProductCheckout, AddProductToCheckout } = totalCheckoutProductSlicer.actions;

export const totalNumberOfCheckoutReducer =  totalCheckoutSlicer.reducer
export const totalCheckoutProductReducer = totalCheckoutProductSlicer.reducer