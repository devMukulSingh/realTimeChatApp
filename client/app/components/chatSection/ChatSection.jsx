import React from 'react';
import Header from "../chatSection/Header";
import MessagesSection from './MessagesSection';
import Footer from './Footer';

const ChatSection = () => {
  return (
    <>
      <main className='w-full relative'>
        <Header/>
         <MessagesSection/>
        <Footer/>
      </main>

    </>
  )
}

export default ChatSection