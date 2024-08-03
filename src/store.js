import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./slicer/userSlicer"
import notificationReducer from "./slicer/notificationSlicer"
import loaderReducer from "./slicer/lodaerSlicer"
const store = configureStore({
    reducer: {
        user:userReducer,
        notification:notificationReducer,
        loader:loaderReducer
    }
})

export default store 