import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({

    name:'user',

    initialState:{
        user:{},
        currentUser:{},
        socket:{},
        messages:[],
    },
    reducers:{
        getUser : ( state,action ) => {
            state.user = action.payload;
        },
        getCurrentUser : ( state,action ) => {
            state.currentUser = action.payload;
        },
    
        getSocket : ( state,action ) => {
            state.socket = action.payload;
        },

        getMessages : ( state,action ) => {
            state.messages = action.payload;
        }
    }
})

export const{ getUser, getCurrentUser, getSocket, getMessages } = userSlice.actions;
export default userSlice.reducer;
