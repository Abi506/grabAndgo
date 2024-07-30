import { configureStore } from "@reduxjs/toolkit";
import {persistStore,persistReducer} from 'redux-persist'
import sessionStorage from "redux-persist/es/storage/session";
import loginReducer from "../slices/login";

const loginPersistConfig={
    key:"login_persist",
    storage:sessionStorage

}

const loginPersistReducer=persistReducer(loginPersistConfig,loginReducer)

const store=configureStore({
    reducer:{
        loginInfo:loginPersistReducer
    }
})

export const persistor=persistStore(store)

export default store