import {createSlice} from '@reduxjs/toolkit'

const initialState={
    isLogin:false
}

export const loginSlice=createSlice({
    name:"login",
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            console.log(action.payload,'action payload')
            state.isLogin=true
        },
        setLogout:(state,action)=>{
            state.isLogin=false
        }
    }
})

export const {setLogin,setLogout}=loginSlice.actions

export default loginSlice.reducer