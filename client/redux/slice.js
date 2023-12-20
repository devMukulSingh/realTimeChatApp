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
        searchMessages:[],
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
            state.messages = [];
            action.payload.map( (data) => {
                const { message, created } = data;
                state.messages.push( {message , created} );
            })
        },
        getSearchMessages : (state,action ) => {
            state.searchMessages = action.payload;
        }
    }
})

export const{ getReceiverUser, getCurrentUser, getSocket, getSocketMessage, 
      getOpenSearchMessage, getReceiverMessages,getSearchMessages } = userSlice.actions;

export default userSlice.reducer;
