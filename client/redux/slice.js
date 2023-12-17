import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({

    name:'user',

    initialState:{
        receiverUser:{},
        currentUser:{},
        socket:{},
        socketMessage:"",
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

        getSocketMessage : ( state,action ) => {
            state.socketMessage = action.payload;
        }
    }
})

export const{ getReceiverUser, getCurrentUser, getSocket, getSocketMessage } = userSlice.actions;
export default userSlice.reducer;
