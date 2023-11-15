'use client'
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import { CiMenuKebab } from "react-icons/ci";
import { RiChatNewFill } from "react-icons/ri";
import avatar from "../../../public/avatar.png";

const ContactsHeader = () => {
  const  {user}  = useSelector( state => state.userSlice );
  console.log(user[0]);
 
  const profileImage = '';
  return (
    <>
        <main className='bg-[#202C33] w-full h-16 p-4 text-white flex items-center justify-between'>
            <div className='flex'>
                <Image src={user[0]?.photoURL} width={50} height={50} alt='profile Image' className='cursor-pointer rounded-full'/>
            </div>
            <div className='flex gap-8'>
                <CiMenuKebab className='text-xl cursor-pointer'/>
                <RiChatNewFill className='text-xl cursor-pointer'/>
            </div>
        </main> 
    </>
  )
}

export default ContactsHeader