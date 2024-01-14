import React from 'react';
import dynamic from "next/dynamic";
import {  useSelector } from "react-redux";
import { useEffect } from 'react';
const Container = dynamic( () => import("./Container"),{ssr:false});

const VoiceCall = () => {

    const { socket, currentUser } = useSelector( state => state.userSlice);
    // voiceCall -> receiver's data
    const { voiceCall, incomingVoiceCall } = useSelector( state => state.callSlice );

  console.log(incomingVoiceCall,voiceCall);
  
    //2nd step for voice call // 3rd step-> index.js
    //as the voiceCall state is changed(when the call icon is clicked),
    // emmitting outgoing-voice-call socket event with data of sender and receiver
    useEffect(() => {
      if(voiceCall.type==="out-going"){
        socket.current.emit("outgoing-voice-call", {
          to: voiceCall.id,  // voiceCall contains reciver's data
          from:{
            id:currentUser.id,
            name: currentUser.name,
            profilePicture: currentUser.photoURL
          },
          callType: voiceCall.callType,
          roomId: voiceCall.roomId
        })
      }
    },[voiceCall])


  return (
    <Container data={voiceCall}/>

  )
}

export default VoiceCall