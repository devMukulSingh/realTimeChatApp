import { GET_MESSAGES_ROUTE } from '@/utils/apiRoutes';
import SingleMessage from './SingleMessage';
import  axios  from 'axios';
import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {  setOpenSearchMessage, setMessages, setSearchMessages } from '@/redux/userSlice';
import SearchMessages from './SearchMessages';
import { useRef } from 'react';
///////////////////////////////////////////////////////////////

const MessagesSection = () => {

  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const{ receiverUser, currentUser, messages,
     openSearchMessage } = useSelector(state => state.userSlice);
     const componentRef = useRef();
   

  useEffect(() => {
    getMessages();  
    dispatch(setOpenSearchMessage(false));
    dispatch(setSearchMessages([]));
  }, [receiverUser]);

  useEffect( () => {
      const componentHeight = componentRef.current.scrollHeight;
      componentRef.current.scrollTo(0,componentHeight);
  },[messages,receiverUser])

  const getMessages = async() => {
    const { data } = await axios.post(GET_MESSAGES_ROUTE, { to:receiverUser?.id , from : currentUser?.id });
    dispatch(setMessages(data));
  };
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    
      <main className={` ${openSearchMessage ? 'grid grid-cols-2' : {} } 
        w-full gap-1 h-[calc(100vh-10.25rem)] overflow-x-scroll overflow-y-auto bg-[#111b21] text-white py-4 px-20 `} ref={componentRef} >
        
        <section className='flex flex-col gap-1'>
          {  
              messages.length != 0 ?
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