import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { setEndCall, setIncomingVideoCall } from '@/redux/callSlice';

const IncomingVideoCallComp = () => {

  const dispatch = useDispatch();
  const{ incomingVideoCall } = useSelector( state => state.callSlice);
  const{ socket } = useSelector( state => state.userSlice );

  const handleRejectCall = () => {
      dispatch(setEndCall());
      socket.emit("reject-video-call",{
        to:incomingVideoCall.from.id,
      })
  }
  const handleAcceptCall = () => {
    dispatch(setVoiceCall({
      ...incomingVideoCall, type:"in-coming"
    }));
    
    socket.current.emit("accept-incoming-call",{
      id:incomingVideoCall.id
    });

    dispatch(setIncomingVideoCall({
      incomingVideoCall:undefined
    }));
    
  }

  return (
    <main className='absolute bottom-5 right-80 flex p-4 gap-4 w-80 h-40 z-50 text-white bg-[#202C33] rounded-md border-[#005C4B] items-center'>
      
      <section>
          <Image src = {incomingVideoCall.from.profilePicture} alt = "profile" width = {50} height={50} className='rounded-full'/>
      </section>

      <section className=''>
        <div className='flex flex-col gap-3 '>
          <h1 className='text-[22px] '>{incomingVideoCall.from.name}</h1>
          <h1 className='text-xs'>{incomingVideoCall.callType.toUpperCase()} CALL</h1>
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

export default IncomingVideoCallComp;