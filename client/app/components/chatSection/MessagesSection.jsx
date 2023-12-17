import { GET_MESSAGES_ROUTE } from '@/utils/apiRoutes';
import SingleMessage from './SingleMessage';
import  axios  from 'axios';
import React, { useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import { useRef } from 'react';

///////////////////////////////////////////////////////////////

const MessagesSection = () => {

  const [userData, setUserData] = useState([]);
  const{ receiverUser, currentUser, socket, socketMessage } = useSelector(state => state.userSlice);
  const scrollToEnd = useRef(null);

  useEffect(() => {
    getMessages();
  }, [receiverUser]);
  
  useEffect( () => {
    Scroll();
  },[socket]);

  const getMessages = async() => {
    const { data } = await axios.post(GET_MESSAGES_ROUTE, { to:receiverUser?.id , from : currentUser?.id });
    setUserData(data);
  };

  const Scroll = () => {
    if (scrollToEnd.current) {
      scrollToEnd.current.scrollTo({
        top: scrollToEnd.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  
  return (
    
      <main ref={scrollToEnd} className='w-full flex flex-col gap-1 h-[calc(100vh-10.25rem)] overflow-x-scroll overflow-y-auto bg-[#111b21] text-white py-4 px-20' >
          {  
              userData.length != 0 ?
              <>
                {
                  userData?.map( (currUser,index) => {
                    return (
                      <SingleMessage currUser = {currUser} key={index}/>
                      )
                    })
                  }
                  { socketMessage && socketMessage }
                </>
              :
              <div className='text-white'>
                No messages found
              </div>
          }
      </main>
  
  )
}

export default MessagesSection