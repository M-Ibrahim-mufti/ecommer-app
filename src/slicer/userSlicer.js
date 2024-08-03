import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("User")) || null;

const userSlicer =  createSlice({
    name:'user',
    initialState,
    reducers:{
        setCurrentUser(state, action){
            return action.payload
        },
    }
})              

export const { setCurrentUser } = userSlicer.actions
export default userSlicer.reducer