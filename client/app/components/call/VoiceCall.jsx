import React from 'react';
import { setEndCall } from "@/redux/callSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdCallEnd } from 'react-icons/md';
import Image from "next/image";
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import { GET_CALL_TOKEN } from '@/utils/apiRoutes';

const voiceCall = () => {
    const dispatch = useDispatch();
    const { socket, currentUser, receiverUser } = useSelector( state => state.userSlice);
    const { voiceCall, incomingVoiceCall } = useSelector( state => state.callSlice );
    const [callAccepted, setCallAccepted] = useState(false);
    const [token, setToken] = useState(null);
    const [zegVar, setZegVar] = useState(null);
    const [localStream, setLocalStream] = useState(null);
    const [publishStream, setPublishStream] = useState(null);

    useEffect(() => {
      if(incomingVoiceCall?.type==="out-going"){
        socket.current.on("accept-call" , () =>  setCallAccepted(true));
      }
      else{
        setTimeout( () => {
          setCallAccepted(true);
        },1000)
      }
    },[incomingVoiceCall]);
  
    useEffect(( ) => {
      const getToken = async() => {
          try {
              const { data: { token : returnedToken } } = await axios.get(`${GET_CALL_TOKEN }/${currentUser.id}`);
              setToken(returnedToken);
        }    
          catch (error) {
            console.log(error);
        }
      } 
      getToken();
    },[callAccepted]);
  
    useEffect( () => {
      //for remote video, receivers video or caller's video
      const startCall = async() => {
       import("zego-express-engine-webrtc").then( async({ZegoExpressEngine}) => {
        const zg = new ZegoExpressEngine(process.env.NEXT_PUBLIC_ZEGO_APP_ID, process.env.NEXT_PUBLIC_SERVER_ID);
        setZegVar(zg);
       }) 
       zg.on("roomStreamUpdate", 
            async(roomId, updateType, streamList, extendedData) => {
              if(updateType==="ADD"){
                const rmVideo = document.getElementById("remote-video");
                const vd = document.createElement("audio");
                vd.id= streamList[0].streamID;
                vd.autoplay= true;
                vd.muted = false;
                vd.playsInline = true;
                if(rmVideo){
                  rmVideo.appendChild(vd);
                }
                zg.startPlayingStream( streamList[0].streamId, {
                  audio:true,
                  video:true
                }).then((stream) => vd.srcObject = stream )
              }
              else if(updateType==="DELETE" && zg && localStream && streamList[0].streamID){
                zg.destroyStream(localStream);
                zg.stopPubliishingStream(streamList[0].streamID);
                zg.logoutRoom(incomingVoiceCall.roomId.toString());
                dispatch(setEndCall());
              }
              await zg.loginRoom(incomingVoiceCall.roomId.toString(), token, 
                                { userID:currentUser.id.toString(), userName:currentUser.name, }, { userUpdate:true});

              //local video

              const localStream = await zg.createStream({
                camera:{
                  audio:true
                }
              })
              const localVideo = document.getElementById("local-video");
              const videoElement = document.createELement("audio");
              videoElement.id = "video-local-zego";
              videoElement.className = "h-28 w-32";
              videoElement.muted = false;
              videoElement.autoplay = true;
              videoElement.playsInline = true;

              localVideo.appendChild(videoElement);

              const td = document.getElementById("video-local-zego");
              td.srcObject = localStream;
              const streamId = "123" + Date.now();
              setPublishStream(streamId);
              setLocalStream(localStream);
              zg.startPublishingStream(streamId,localStream);

            })
        };
        if(token){
          startCall();
        }
    },[token]);

    const handleEndCall = () => {
      if(zegVar && localStream && publishStream){
        zegVar.destroyStream(localStream);
        zegVar.stopPubliishingStream(publishStream);
        zegVar.logoutRoom( incomingVoiceCall.roomId.toString());
      }
      dispatch(setEndCall("endcall"));
      socket.current.emit("reject-voice-call",{
          to:voiceCall.id
      })
    } 

    useEffect(() => {
      if(voiceCall.type==="out-going"){
        socket.current.emit("outgoing-voice-call", {
          to: voiceCall.id,
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
    <main className='h-screen w-screen flex flex-col items-center justify-center text-white gap-4'>
        <Image src = {receiverUser.photoURL} width={250} height={250} className='rounded-full' alt='profile'/>
        <h1 className='text-4xl'> {receiverUser.name} </h1>       
        <h1 className='text-xl'> Calling... </h1>

        <section className='' id="remote-video">
          <div className='' id="local-video">
          </div>
        </section>

        <MdCallEnd className='rounded-full text-5xl text-[red] cursor-pointer'
            onClick = { handleEndCall } /> 
        <h1 className='text-2xl'>End Call</h1>
    </main>
  )
}

export default voiceCall