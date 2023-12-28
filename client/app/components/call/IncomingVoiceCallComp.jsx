import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { setEndCall } from '@/redux/callSlice';

const IncomingVoiceCallComp = () => {

  const dispatch = useDispatch();
  const{ incomingVoiceCall } = useSelector( state => state.callSlice);
  const{ socket } = useSelector( state => state.userSlice );

  const handleRejectCall = () => {
      dispatch(setEndCall());
      socket.emit("reject-voice-call",{
        to:incomingVoiceCall.from.id,
      })
  }
  const handleAcceptCall = () => {

  }

  return (
    <main className='absolute bottom-5 right-80 flex p-4 gap-4 w-80 h-40 z-50 text-white bg-[#202C33] rounded-md border-[#005C4B] items-center'>
      
      <section>
          <Image src = {incomingVoiceCall?.from?.profilePicture} alt = "profile" width = {50} height={50} className='rounded-full'/>
      </section>

      <section className=''>
        <div className='flex flex-col gap-3 '>
          <h1 className='text-[22px] '>{incomingVoiceCall?.from?.name}</h1>
          <h1 className='text-xs'>{incomingVoiceCall?.callType.toUpperCase()} CALL</h1>
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