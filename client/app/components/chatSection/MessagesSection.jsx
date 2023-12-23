import { GET_MESSAGES_ROUTE } from '@/utils/apiRoutes';
import SingleMessage from './SingleMessage';
import  axios  from 'axios';
import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {  setOpenSearchMessage, setMessages, setSearchMessages } from '@/redux/userSlice';
import SearchMessages from './SearchMessages';
///////////////////////////////////////////////////////////////

const MessagesSection = () => {

  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const{ receiverUser, currentUser, messages,
     openSearchMessage } = useSelector(state => state.userSlice);
    //  console.log(messages);

 

  useEffect(() => {
    getMessages();  
    dispatch(setOpenSearchMessage(false));
    dispatch(setSearchMessages([]));
  }, [receiverUser]);


  const getMessages = async() => {
    const { data } = await axios.post(GET_MESSAGES_ROUTE, { to:receiverUser?.id , from : currentUser?.id });
    // setUserData(data);
    dispatch(setMessages(data));
  };

  
  return (
    
      <main className={` ${openSearchMessage ? 'grid grid-cols-2' : {} } 
      w-full gap-1 h-[calc(100vh-10.25rem)] overflow-x-scroll overflow-y-auto bg-[#111b21] text-white py-4 px-20 `} >
        
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
                  {/* { socketMessage && socketMessage } */}
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