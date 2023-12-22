import React from 'react';
import Image from 'next/image';
import { setReceiverUser } from '@/redux/userSlice';
import { useDispatch } from 'react-redux';
///////////////////////////////////////

const SingleContact = ({ contact }) => {
  const dispatch = useDispatch();
  const handleOpenChat = () => {
      dispatch(setReceiverUser({...contact}));
    }
  return (
    <>
      <main className='flex p-4 gap-4 items-center text-white w-full cursor-pointer hover:bg-[#2A3942] active:bg-[#2A3942] '
            onClick={ handleOpenChat }>

          <div>
              <Image src={contact?.photoURL} alt='avatar' height={60} width={60} className='rounded-full'/>
          </div>
          <div className='flex flex-col gap-1 w-full'>
            
            <div className='flex items-center justify-between'>
              <h1 className='text-lg font-medium'>{contact?.name}</h1>
              <p className='text-[#8696A0] text-sm'>13:12</p>
            </div>

            <div>
               <p className='text-[#8696A0]'>hey there, are you free?</p>
            </div>

          </div>
      </main> 
    </>
  )
}

export default SingleContact