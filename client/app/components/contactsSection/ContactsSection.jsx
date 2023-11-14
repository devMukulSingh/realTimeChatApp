import React from 'react';
import ContactsHeader from './ContactsHeader';
import ContactsList from './ContactsList';
import { useSelector } from 'react-redux';
import SearchBar from "./SearchBar"


const Contacts = () => {
    // const { user } = useSelector( state => state.userSlice );
    // console.log(user);
  return (
    <>
        <main className='bg-[#111B21] h-full flex flex-col gap-3'>
            <ContactsHeader/>
            <SearchBar/>
            <ContactsList/>
        </main>

    </>
  )
}

export default Contacts