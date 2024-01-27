"use client"
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import logo from "../../public/whatsapp.gif";
import Contacts from '../components/contactsSection/ContactsSection';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '@/utils/firebase.config';
import { CHECK_USER_ROUTE } from '@/utils/apiRoutes';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, setSocketMessage, setSocket } from '@/redux/userSlice';
import axios from 'axios';
import ChatSection from '../components/chatSection/ChatSection';
import { io } from "socket.io-client";
import { HOST } from '@/utils/apiRoutes';
import  VideoCall from "../components/call/VideoCall";
import VoiceCall  from "../components/call/VoiceCall";
import { setEndCall, setIncomingVideoCall, setIncomingVoiceCall } from '@/redux/callSlice';
import IncomingVideoCallComp from '../components/call/IncomingVideoCallComp';
import IncomingVoiceCallComp from '../components/call/IncomingVoiceCallComp';
import Spinner from '../components/commons/Spinner';

///////////////////////////////////////////////

const Page = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const [redirectLogin, setRedirectLogin] = useState(false);
    const socket = useRef(null);
    const [socketEvent, setSocketEvent] = useState(false);
    const { currentUser,receiverUser, } = useSelector( state => state.userSlice );
    const { voiceCall, videoCall, incomingVideoCall, incomingVoiceCall } = useSelector( state => state.callSlice);

    useEffect( () => {
      if(redirectLogin) router.push("/");
    },[redirectLogin]);
    
    //FOR MESSAGES
    // adding the socket user to the socket server, first time he logins
    // and storing the socketId, of the user in redux for communicating later
    useEffect( () => {
      if(currentUser){
        socket.current = io(HOST);
        socket.current.emit("add-user", currentUser?.id);
        dispatch(setSocket({...socket}));
      }
    },[currentUser, receiverUser, socket]);
    
    //"msg-receive" socket event handler
    //when the message is received from the sender
    useEffect(() => {
      if(socket.current){
        socket.current.on("msg-receive", (data) => {
          // console.log(data);
          // console.log(socket);
          dispatch(setSocketMessage(data));
        })
      }

      //FOR VOICE AND VIDEO CALL
      // 5th step for voice call(at receiver's side)  // 6th step-> incomingVoiceCallComp.jsx
      // dispatching sender's data at the receiver's end to establish a socket connection
      if(voiceCall){
        socket.current.on("incoming-voice-call",(data) => {
          console.log(data);
          dispatch(setIncomingVoiceCall(data));
          socket.current.on("voice-call-rejected",() => {
            dispatch(setEndCall());
          })
        })
      }
      
      // 5th step for video call(at receiver's side)  // 6th step-> incomingvideoCallComp.jsx
      // dispatching sender's data at the receiver's end to establish a socket connection
      if(videoCall){
        socket.current.on("incoming-video-call",(data) => {
          // console.log(data);
          dispatch(setIncomingVideoCall(data));
        })
        socket.current.on("video-call-rejected",() => {
          dispatch(setEndCall());
        })
      }

      socket.current.on("accept-call",() => {

      })


    },[socket.current]);

    //checking whether the user is authenticated when page is refreshed
    onAuthStateChanged( firebaseAuth, async(firebaseUser) => {
    try {

          if( !firebaseUser) setRedirectLogin(true);
          if( Object.keys(currentUser).length === 0 && firebaseUser?.email ){
            const { data } = await axios.post( CHECK_USER_ROUTE, { email: firebaseUser.email } );
            if(!data.status){
              router.push("/");
            }
            const{ name, email, photoURL, id } = data.data;
            dispatch(setCurrentUser({ name,email,photoURL,id }));
        }   
      } catch (error) {
        console.log(`Error in onAuthStateChanged Hook ${error}`);
      }

    })

  return (
    <>
      
        {
            (voiceCall||videoCall) ?
            <main className='h-screen w-screen max-h-screen bg-[#0C1317]'>
                {
                  voiceCall ? <VoiceCall/> :
                   <VideoCall/>
                }
            </main>
          
          :
          <>
              {incomingVoiceCall && <IncomingVoiceCallComp/>}
              {incomingVideoCall && <IncomingVideoCallComp/> }  
              
                <main className='h-screen w-screen max-h-screen bg-[#0C1317] flex p-5'>
                  <div className='basis-1/3'>
                    <Contacts/>
                  </div>
                {
                  Object.keys(receiverUser).length===0 ?
                    <div className='flex items-center justify-center bg-[#202C33] basis-3/4'>
                        <Image src={logo} alt="logo" width={400} />
                    </div> 
                      :
                      <div className='flex bg-[#202C33] basis-3/4 w-full'>
                        <ChatSection/>
                      </div>  
                  }

              </main> 
        </>
      }
  
    </>
  )
}

export default Page