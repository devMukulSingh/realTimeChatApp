'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CiMenuKebab } from "react-icons/ci";
import { RiChatNewFill } from "react-icons/ri";
import avatar from "../../../public/1.png";
import ProfileContextMenu from '../commons/ProfileContextMenu';

const ContactsHeader = () => {

  const  { user, currentUser }  = useSelector( state => state.userSlice );
  const [openContextMenu, setOpenContextMenu] = useState(false);

  const handleProfileClick = () => {
    setOpenContextMenu(true);
  }
 
  return (
    <>
        <main className='bg-[#202C33] w-full h-16 p-4 text-white flex items-center justify-between'>
            <div className='flex'>
                <Image src={currentUser?.photoURL} width={50} height={50} alt='profile Image' 
                        className='cursor-pointer rounded-full' onClick={ handleProfileClick }/>
            </div>
            <div className='flex gap-8'>
                <CiMenuKebab className='text-xl cursor-pointer'/>
                <RiChatNewFill className='text-xl cursor-pointer'/>
            </div>
        </main> 
        { openContextMenu && <ProfileContextMenu setOpenContextMenu={setOpenContextMenu}/> }
    </>
  )
}

export default ContactsHeader