import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({

    name:'user',

    initialState:{
        receiverUser:{},
        currentUser:{},
        socket:undefined,
        openSearchMessage:false,
        messages:[],
        searchMessages:[],
    },
    reducers:{
        setReceiverUser : ( state,action ) => {
            state.receiverUser = action.payload;
        },
        setCurrentUser : ( state,action ) => {
            state.currentUser = action.payload;
        },
    
        setSocket : ( state,action ) => {
            state.socket = action.payload;
        },

        setSocketMessage : ( state,action ) => {
            const{ senderId, message , created } = action.payload;
            state.messages = [ ...state.messages, { senderId, message, created} ];
            console.log(state.messages);
        },
        setOpenSearchMessage : (state, action ) => {
            state.openSearchMessage = action.payload;
        },
        setMessages : ( state,action ) => {
            state.messages = [];
            action.payload.map( (data) => {
                const { message, created, senderId } = data;
                state.messages.push( {message , created, senderId} );
            })
        },
        setSearchMessages : (state,action ) => {
            state.searchMessages = action.payload;
        },
 
    }
})

export const{ setReceiverUser, setCurrentUser, setSocket, setSocketMessage, 
      setOpenSearchMessage, setMessages,setSearchMessages,
       } = userSlice.actions;

export default userSlice.reducer;
