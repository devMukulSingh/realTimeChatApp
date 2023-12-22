import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({

    name:'user',

    initialState:{
        receiverUser:{},
        currentUser:{},
        socket:undefined,
        socketMessage:"",
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
            state.socketMessage = action.payload;
        },
        setOpenSearchMessage : (state, action ) => {
            state.openSearchMessage = action.payload;
        },
        setReceiverMessages : ( state,action ) => {
            state.messages = [];
            action.payload.map( (data) => {
                const { message, created } = data;
                state.messages.push( {message , created} );
            })
        },
        setSearchMessages : (state,action ) => {
            state.searchMessages = action.payload;
        },
 
    }
})

export const{ setReceiverUser, setCurrentUser, setSocket, setSocketMessage, 
      setOpenSearchMessage, setReceiverMessages,setSearchMessages,
       } = userSlice.actions;

export default userSlice.reducer;
