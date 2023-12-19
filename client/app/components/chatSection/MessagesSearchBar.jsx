import React from 'react';
import { useEffect } from 'react';
import {ImSearch} from "react-icons/im";
import { useSelector } from "react-redux";

const SearchBar = () => {

    const{ receiverUser, messages } = useSelector( state => state.userSlice );
    // console.log(messages);
    useEffect( () => {

    },[])
    const handleMessageSearch = (e) => {
        const filters = messages.filter( msg => msg.includes(e.target.value) );
        console.log(filters);
    }


  return (
    <>
      <main className='bg-[#202C33] w-5/6 h-10  rounded-xl ml-4 flex gap-8'>
        <ImSearch className='text-xl text-[#AEBAC1] my-2 mx-4 cursor-pointer' onClick={ handleMessageSearch }/>
        <input type="text" placeholder={ `Search for messages with ${receiverUser?.name}`} 
          className='w-full h-full rounded-xl bg-[#202C33] focus:outline-none text-white' onChange={ handleMessageSearch}/>
      </main>
    </>
  )
}

export default SearchBar