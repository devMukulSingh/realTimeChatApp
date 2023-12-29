import React from 'react'
import { setEndCall } from "@/redux/callSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { MdCallEnd } from "react-icons/md";
import Image from "next/image";
import { useEffect } from 'react';

const videoCall = () => {
    const dispatch = useDispatch();
    const { currentUser,receiverUser, socket } = useSelector( state => state.userSlice);
    const { videoCall, incomingVideoCall } = useSelector( state => state.callSlice );

    const handleEndCall = () => {
      dispatch(setEndCall("endcall"));
      socket.current.emit("reject-voice-call",{
        to:videoCall.id
      });
    }

    useEffect(( ) => {
      if(videoCall.type==="out-going"){
        socket.current.emit("outgoing-video-call",{
          to:videoCall.id,
          from:{
            id:currentUser.id,
            name:currentUser.name,
            profilePicture: currentUser.photoURL
          },
          callType:videoCall.callType,
          roomId: videoCall.roomId
        })
      }
    },[videoCall])


  return (
    <main className='h-screen w-screen flex flex-col items-center justify-center text-white gap-4'>
        <Image src = {receiverUser.photoURL} width={250} height={250} className='rounded-full' alt='profile'/>
        <h1 className='text-4xl'> {receiverUser.name} </h1>
        { 
           <h1 className='text-xl'> Calling... </h1>
        }
        <MdCallEnd className='rounded-full text-5xl text-[red] cursor-pointer'
            onClick = { handleEndCall } /> 
        <h1 className='text-2xl'>End Call</h1>
    </main>
  )
}

export default videoCall