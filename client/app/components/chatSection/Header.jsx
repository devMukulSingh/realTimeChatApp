import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import {ImSearch} from "react-icons/im";
import {BsThreeDotsVertical} from "react-icons/bs";
import { getOpenSearchMessage } from '@/redux/slice';
import { IoMdClose } from 'react-icons/io';

const Header = () => {
  const dispatch = useDispatch();
  const  { receiverUser, openSearchMessage }  = useSelector( state => state.userSlice );

  const handleSearchBtn = () => {
    dispatch(getOpenSearchMessage(true));
  }
  const handleCloseSearchBtn = () => {
    dispatch(getOpenSearchMessage(false));
  }
  
  return (
    <>
      <header className={`${openSearchMessage ? 'grid grid-cols-2 gap-1' : {} } h-16 w-full  bg-[#202C33]  text-white`} >

        <section className='flex px-4 py-2 items-center justify-between w-full '>

          <div className='flex gap-4'>
            <Image src={receiverUser?.photoURL} alt="profileImg" height={50} width={50} className='rounded-full'/>
            <div className='flex flex-col gap-1'>
              <h1 className='text-lg font-medium'> {receiverUser?.name} </h1>
              <h1 className='text-xs text-[#8696A0]'>Online/Offline</h1>
            </div>
          </div>

          <div className='flex gap-8 items-center'>
            <ImSearch className='text-xl cursor-pointer' onClick={ handleSearchBtn }/>
            <BsThreeDotsVertical className='text-xl cursor-pointer'/>

          </div>

        </section>

        {
            openSearchMessage && 
            <section className='flex items-center gap-4 px-10'>
              <IoMdClose className='text-2xl cursor-pointer' onClick={ handleCloseSearchBtn }/>
              <h4 className=''> Search Messages</h4>
            </section>
        }

      </header>
    </>
  )
}

export default Header