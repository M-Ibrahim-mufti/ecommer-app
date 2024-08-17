import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./slicer/userSlicer"
import notificationReducer from "./slicer/notificationSlicer"
import loaderReducer from "./slicer/lodaerSlicer"
import cartReducer from './slicer/CartSlicer'
import {totalCheckoutProductReducer, totalNumberOfCheckoutReducer } from './slicer/TotalCheckout'

const store = configureStore({
    reducer: {
        user:userReducer,
        notification:notificationReducer,
        loader:loaderReducer,
        cart:cartReducer,
        totalNumberOfCheckout:totalNumberOfCheckoutReducer,
        totalCheckoutProducts: totalCheckoutProductReducer
    }
})

export default store 