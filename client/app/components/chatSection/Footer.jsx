import React from 'react';
import {BsEmojiLaughing} from "react-icons/bs";
import {AiOutlinePlus} from "react-icons/ai";
import {IoSendSharp } from "react-icons/io5";
 
const Footer = () => {
  return (
    <>
        <main className='flex w-full px-5 py-3 gap-4 items-center h-20 bg-[#202C33] absolute bottom-0'>
          <BsEmojiLaughing className="text-3xl cursor-pointer text-white"/>
          <AiOutlinePlus className="text-3xl cursor-pointer text-white"/>
          <div className='bg-[#2A3942] w-11/12 h-12  rounded-xl flex gap-8 p-2'>
            <input type="text" placeholder='Type a message' 
              className='w-full h-full rounded-xl bg-[#2A3942] focus:outline-none text-white text-lg'/>
          </div>
          <IoSendSharp className='text-white text-3xl cursor-pointer ml-auto'/>
        </main>
        
    </>
  )
}

export default Footer