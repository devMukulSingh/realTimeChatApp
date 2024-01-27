import { GET_MESSAGES_ROUTE } from '../../../utils/apiRoutes';
import SingleMessage from './SingleMessage';
import  axios  from 'axios';
import React, { useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {  setOpenSearchMessage, setMessages, setSearchMessages } from '../../../redux/userSlice';
import SearchMessages from './SearchMessages';
import { useRef } from 'react';
import Spinner from '../commons/Spinner';
import { useState } from 'react';
///////////////////////////////////////////////////////////////

const MessagesSection = () => {
  
  const{ receiverUser, currentUser,messages,
    openSearchMessage } = useSelector(state => state.userSlice);
    const dispatch = useDispatch();
    const componentRef = useRef();
    const [loading, setLoading] = useState(false);
    
    const getMessages = async() => {
      try{
          setLoading(true);
          const { data }  = await axios.get(GET_MESSAGES_ROUTE,{ params :{to :receiverUser?.id , from : currentUser?.id} });
          dispatch(setMessages(data));
        }
        catch(e){
          console.log(`Error in get Messages ${e}`);
        }
        finally{
          setLoading(false);
        }
      };
  
    useEffect( () => {
        const componentHeight = componentRef.current?.scrollHeight;
        componentRef?.current?.scrollTo(0,componentHeight);
      },[receiverUser,messages]);

    useEffect(() => {
      getMessages();
      if(setOpenSearchMessage){
        dispatch(setOpenSearchMessage(false));
        dispatch(setSearchMessages([]));
      }
    }, [receiverUser]);
    
    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    
      <main className={` ${openSearchMessage ? 'grid grid-cols-2' : {} } 
        w-full gap-1 h-[calc(100vh-10.25rem)] overflow-x-scroll overflow-y-auto bg-[#111b21] text-white py-4 px-20 `} 
        ref={componentRef} >
        
        <section className='flex flex-col gap-1'>
            {
              loading ? <Spinner/> : 
                messages.length !== 0 ?
                  messages?.map( (currUser,index) => {
                      return (
                        <SingleMessage currUser = {currUser} key={index}/>
                        )
                      })
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