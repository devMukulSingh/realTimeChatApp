import { createSlice } from "@reduxjs/toolkit";

const callSlice = createSlice({

    name:'call',

    initialState:{
        voiceCall:undefined,
        videoCall:undefined,
        incomingVoiceCall:undefined,
        incomingVideoCall:undefined,
        endCall:undefined,
    },
    reducers:{
        setVoiceCall : (state,action) => {
            state.voiceCall = action.payload;
        },
        setVideoCall : (state,action) => {
            state.videoCall = action.payload;
        },
        setIncomingVoiceCall : (state,action) => {
            state.incomingVoiceCall = action.payload;
        },
        setIncomingVideoCall : (state,action) => {
            state.incomingVideoCall = action.payload;
        },
        setEndCall : (state,action) => {
            state.endCall = action.payload;
                state.voiceCall = undefined;
                state.videoCall = undefined;
                state.incomingVideoCall = undefined;
                state.incomingVoiceCall = undefined;            
        }
    }
}); 

export const{ setVideoCall,setVoiceCall, setIncomingVideoCall, setIncomingVoiceCall, setEndCall } = callSlice.actions;

export default callSlice.reducer;