import { setSearchMessages } from '@/redux/userSlice';
import React, { useState } from 'react';
import {ImSearch} from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";

const SearchBar = () => {

    const{ receiverUser, messages } = useSelector( state => state.userSlice );
    const dispatch = useDispatch();

    const handleMessageSearch = (e) => {
        if(e.target.value){
          const searchMessage = messages.filter( msg => msg.message.includes(e.target.value) );
          dispatch(setSearchMessages(searchMessage));
        }
        else{
          dispatch(setSearchMessages([]));
        }
      
      }

  return (
    <>
      <main className='bg-[#202C33] w-5/6 h-10  rounded-xl ml-4 flex gap-8'>
        <ImSearch className='text-xl text-[#AEBAC1] my-2 mx-4 cursor-pointer' onClick={ handleMessageSearch }/>
        <input type="text" placeholder={ `Search`} 
          className='w-full h-full rounded-xl bg-[#202C33] focus:outline-none text-white' onChange={ handleMessageSearch}/>
      </main>
    </>
  )
}

export default SearchBar