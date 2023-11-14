import React from 'react';
import {ImSearch} from "react-icons/im";

const SearchBar = () => {
  return (
    <>
      <main className='bg-[#202C33] w-5/6 h-10  rounded-xl ml-4 flex gap-8'>
        <ImSearch className='text-xl text-[#AEBAC1] my-2 mx-4 cursor-pointer'/>
        <input type="text" placeholder='Search or start new chat' 
          className='w-full h-full rounded-xl bg-[#202C33] focus:outline-none text-white'/>
      </main>
    </>
  )
}

export default SearchBar