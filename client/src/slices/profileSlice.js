import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profileImage:""
};

export const profileSlice = createSlice({
    name: "profileImage",
    initialState,
    reducers: {
        addProfileImage:(state,action)=>{
            console.log(action.payload,'payload')
            state.profileImage=action.payload
        }
        }
});

export const { addProfileImage} = profileSlice.actions;

export default profileSlice.reducer;
