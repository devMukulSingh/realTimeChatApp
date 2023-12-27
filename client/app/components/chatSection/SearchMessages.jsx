import React from 'react';
import { useSelector } from "react-redux";
import MessagesSearchBar from "./MessagesSearchBar";
import SingleSearchMessage from './SingleSearchMessage';

const SearchMessages = () => {

  const { searchMessages,receiverUser } = useSelector( state => state.userSlice);

  return (
    <>
        <main className=' flex flex-col gap-5 fixed'>
                <MessagesSearchBar/>
                <div className='flex flex-col gap-2'>
                    {
                        searchMessages.length == 0 ?
                        <div className='text-center'> 
                          Search messages with {receiverUser?.name}
                        </div>
                        :
                        searchMessages.map( (msg,index) => {
                          return(
                            <SingleSearchMessage msg={msg} key={index}/>

                          )
                            // {msg.message}
                        })
                    }
                </div>  
        </main>
    </>
  )
}

export default SearchMessages
