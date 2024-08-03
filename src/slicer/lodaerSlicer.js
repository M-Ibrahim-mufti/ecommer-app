import {createSlice } from "@reduxjs/toolkit";

const initialState = { isLoading: false }

    const loaderSlicer = createSlice({
        name:'loader',
        initialState,
        reducers: {
            setLoader(state, action) {
                return action.payload
            },

            showLoader(state) {
                state.isLoading = true
            },

            hideLoader(state) {
                state.isLoading = false
            }
        }
    })

export const { setLoader, showLoader, hideLoader } = loaderSlicer.actions
export default loaderSlicer.reducer 