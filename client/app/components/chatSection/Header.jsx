import Image from 'next/image';
import { useSelector } from 'react-redux';
import React from 'react';
import avatar from "../../../public/avatar.png";
import {ImSearch} from "react-icons/im";
import {BsThreeDotsVertical} from "react-icons/bs";

const Header = () => {
  const  {receiverUser}  = useSelector( state => state.userSlice );
 
  return (
    <>
      <main className='flex h-16 w-full px-4 py-2 bg-[#202C33] items-center justify-between text-white'>

        <div className='flex gap-4'>
          <Image src={receiverUser?.photoURL} alt="profileImg" height={50} width={50} className='rounded-full'/>
          <div className='flex flex-col gap-1'>
            <h1 className='text-lg font-medium'> {receiverUser?.name} </h1>
            <h1 className='text-xs text-[#8696A0]'>Online/Offline</h1>
          </div>
        </div>

        <div className='flex gap-8 items-center'>
          <ImSearch className='text-xl cursor-pointer'/>
          <BsThreeDotsVertical className='text-xl cursor-pointer'/>

        </div>

      </main>
    </>
  )
}

export default Header