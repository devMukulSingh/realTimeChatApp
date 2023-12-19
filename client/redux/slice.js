import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({

    name:'user',

    initialState:{
        receiverUser:{},
        currentUser:{},
        socket:{},
        socketMessage:"",
        openSearchMessage:false,
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

        getSocketMessage : ( state,action ) => {
            state.socketMessage = action.payload;
        },
        getOpenSearchMessage : (state, action ) => {
            state.openSearchMessage = action.payload;
        },
        getReceiverMessages : ( state,action ) => {
            action.payload.map( (data) => {
                state.messages.push(data.message)
            })
        }
    }
})

export const{ getReceiverUser, getCurrentUser, getSocket, getSocketMessage, getOpenSearchMessage, getReceiverMessages } =
 userSlice.actions;
export default userSlice.reducer;
