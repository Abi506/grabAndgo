import { configureStore } from "@reduxjs/toolkit";

import userReducer from '../slices/login'

const store=configureStore({
    reducer:{
        loginInfo:userReducer
    }
})

export default store