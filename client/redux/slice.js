import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({

    name:'user',

    initialState:{
        user:{},
        currentUser:[]
    },
    reducers:{
        getUser : ( state,action ) => {
            state.user = action.payload;
        },
        getCurrentUser : ( state,action ) => {
            state.currentUser.push(action.payload);
        }
    }
})

export const{ getUser, getCurrentUser } = userSlice.actions;
export default userSlice.reducer;
