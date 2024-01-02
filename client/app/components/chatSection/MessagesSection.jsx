import { GET_MESSAGES_ROUTE } from '@/utils/apiRoutes';
import SingleMessage from './SingleMessage';
import  axios  from 'axios';
import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {  setOpenSearchMessage, setMessages, setSearchMessages } from '@/redux/userSlice';
import SearchMessages from './SearchMessages';
import { useRef } from 'react';
import { useQueryClient, useQuery } from "@tanstack/react-query"
///////////////////////////////////////////////////////////////

const MessagesSection = () => {

  const dispatch = useDispatch();
  const{ receiverUser, currentUser, messages,
        openSearchMessage } = useSelector(state => state.userSlice);
  const componentRef = useRef();
  const queryClient = useQueryClient();

  useEffect( () => {
    getMessages();
    // queryClient.invalidateQueries(['getMessages', receiverUser]);
  },[receiverUser])

  useEffect(() => {
    dispatch(setOpenSearchMessage(false));
    dispatch(setSearchMessages([]));
  }, [receiverUser,messages]);
  
  useEffect( () => {
      const componentHeight = componentRef.current.scrollHeight;
      componentRef.current.scrollTo(0,componentHeight);
    },[messages,receiverUser])
    
    const getMessages = async() => {
      const { data }  = await axios.get(GET_MESSAGES_ROUTE, 
        { params :{to :receiverUser?.id , from : currentUser?.id} });
        // return data;
        dispatch(setMessages(data));
      };

      // const{ isLoading, data:queryMessages, isError,error} = useQuery( 
      //   { queryFn : getMessages, 
      //     queryKey: ['getMessages',receiverUser],    
      //     });    
      // if(isError) console.log(error.message);

      
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    
      <main className={` ${openSearchMessage ? 'grid grid-cols-2' : {} } 
        w-full gap-1 h-[calc(100vh-10.25rem)] overflow-x-scroll overflow-y-auto bg-[#111b21] text-white py-4 px-20 `} ref={componentRef} >
        
        <section className='flex flex-col gap-1'>
          {  
              // !isLoading && queryMessages?.length != 0 ?
              messages?.length != 0 ?
              <>
                {
                  messages && messages?.map( (currUser,index) => {

                    return (
                      <SingleMessage currUser = {currUser} key={index}/>
                      )
                    })
                  }
                </>
              :
              <div className='text-white'>
                No messages found
              </div>
          }
          </section>

          <section>
          {
            openSearchMessage && 
            <SearchMessages/>
          }
          </section>

      </main>
  
  )
}

export default MessagesSection