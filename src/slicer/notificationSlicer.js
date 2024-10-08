import { createSlice } from "@reduxjs/toolkit";

const initialState = { type:'', message: ''};

const notificationSlicer = createSlice({
    name:'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload
        }
    }
})

export const { setNotification } = notificationSlicer.actions;
export default notificationSlicer.reducer;