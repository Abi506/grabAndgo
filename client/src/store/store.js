import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from "redux-persist/es/storage/session";
import loginReducer from "../slices/login";
import cartReducer from "../slices/cartSlice";

const loginPersistConfig = {
    key: "login_persist",
    storage: sessionStorage
};

const cartPersistConfig = {
    key: "cart_persist",
    storage: sessionStorage
};

const loginPersistReducer = persistReducer(loginPersistConfig, loginReducer);
const cartPersistReducer = persistReducer(cartPersistConfig, cartReducer);

const store = configureStore({
    reducer: {
        loginInfo: loginPersistReducer,
        cartInfo: cartPersistReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                ignoredPaths: ['register']
            },
        }),
});

export const persistor = persistStore(store);

export default store;
