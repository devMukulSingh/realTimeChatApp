import { GET_MESSAGES_ROUTE } from '@/utils/apiRoutes';
import SingleMessage from './SingleMessage';
import  axios  from 'axios';
import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRef } from 'react';
import { getReceiverUser, getOpenSearchMessage, getReceiverMessages, getSearchMessages } from '@/redux/slice';
import SearchMessages from './SearchMessages';
///////////////////////////////////////////////////////////////

const MessagesSection = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const{ receiverUser, currentUser, socket, socketMessage,
     openSearchMessage } = useSelector(state => state.userSlice);

  const scrollToEnd = useRef(null);

  useEffect( () => {
    scrollToEnd.current?.scrollIntoView( { behavior: 'smooth'});
  },[socket]);

  useEffect(() => {
    getMessages();  
    dispatch(getOpenSearchMessage(false));
    dispatch(getSearchMessages([]));
  }, [receiverUser]);


  const getMessages = async() => {
    const { data } = await axios.post(GET_MESSAGES_ROUTE, { to:receiverUser?.id , from : currentUser?.id });
    setUserData(data);
    dispatch(getReceiverMessages(data));
  };

  
  return (
    
      <main className={` ${openSearchMessage ? 'grid grid-cols-2' : {} } 
      w-full gap-1 h-[calc(100vh-10.25rem)] overflow-x-scroll overflow-y-auto bg-[#111b21] text-white py-4 px-20 `} >
        
        <section className='flex flex-col gap-1'>
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