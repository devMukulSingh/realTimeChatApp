import React,{useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { setEndCall, setIncomingVoiceCall, setVoiceCall } from '@/redux/callSlice';
import { useEffect } from 'react';
import { GET_CALL_TOKEN } from '@/utils/apiRoutes';
import axios from "axios";

const IncomingVoiceCallComp = () => {

  const dispatch = useDispatch();
  const{ incomingVoiceCall } = useSelector( state => state.callSlice);
  const{ socket, currentUser } = useSelector( state => state.userSlice );
  const [callAccepted, setCallAccepted] = useState(false);
  const [token, setToken] = useState(null);
  const [zegVar, setZegVar] = useState(null);

  useEffect(() => {
    if(incomingVoiceCall.type==="out-going"){
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
            const { data: { token : returnedToken } } = await axios.get(`${GET_CALL_TOKEN}/${currentUser.id}`);
            setToken(returnedToken);
      }    
        catch (error) {
          console.log(error);
      }
    } 
  },[callAccepted]);

  useEffect( () => {
    const startCall = async() => {
     import("zego-express-engine-webrtc").then( async({ZegoExpressEngine}) => {
      const zg = new ZegoExpressEngine(process.env.NEXT_PUBLIC_ZEGO_APP_ID, process.env.NEXT_PUBLIC_SERVER_ID);
      setZegVar(zg);
     }) 
     zg.on("roomStreamUpdate", 
          async(roomId, updateType, streamList, extendedData) => {
            if(updateType==="ADD"){

            }
            else if(updateType==="DELETE" && zg && localStream && streamList[0].streamID){
              zg.destroyStream(localStream);
              zg.stopPubliishingStream(streamList[0].streamID);
              zg.logoutRoom(incomingVoiceCall.roomId.toString());
              dispatch(setEndCall());
            }
          })
    }
  },[token]);

  const handleRejectCall = () => {
      dispatch(setEndCall());
      socket.current.emit("reject-voice-call",{
        to:incomingVoiceCall.from.id,
      })
  }
  const handleAcceptCall = () => {
    dispatch(setVoiceCall({
      ...incomingVoiceCall, type:"in-coming"
    }));
    
    socket.current.emit("accept-incoming-call",{
      id:incomingVoiceCall.id
    });

    dispatch(setIncomingVoiceCall({
      incomingVoiceCall:undefined,
    }));
    
  }

  return (
    <main className='absolute bottom-5 right-80 flex p-4 gap-4 w-80 h-40 z-50 text-white bg-[#202C33] rounded-md border-[#005C4B] items-center'>
      
      <section>
          <Image src = {incomingVoiceCall.from.profilePicture} alt = "profile" width = {50} height={50} className='rounded-full'/>
      </section>

      <section className=''>
        <div className='flex flex-col gap-3 '>
          <h1 className='text-[22px] '>{incomingVoiceCall.from.name}</h1>
          <h1 className='text-xs'>{incomingVoiceCall.callType.toUpperCase()} CALL</h1>
          <span>
            <button className='p-3 bg-[red] rounded-md h-10 mr-3 text-sm' onClick={ handleRejectCall }>
              Reject
            </button>
            <button className='p-3 bg-[green] rounded-md h-10 text-sm' onClick={ handleAcceptCall }>
              Accept
            </button>
          </span>
        </div>
      </section>

    </main>
  )
}

export default IncomingVoiceCallComp;