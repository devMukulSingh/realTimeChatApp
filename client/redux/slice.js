import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({

    name:'user',

    initialState:{
        receiverUser:{},
        currentUser:{},
        socket:{},
        messages:[],
    },
    reducers:{
        getReceiverUser : ( state,action ) => {
            state.receiverUser = action.payload;
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

export const{ getReceiverUser, getCurrentUser, getSocket, getMessages } = userSlice.actions;
export default userSlice.reducer;
