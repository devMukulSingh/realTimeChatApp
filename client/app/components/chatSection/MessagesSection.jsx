import { GET_MESSAGES_ROUTE } from '@/utils/apiRoutes';
import SingleMessage from './SingleMessage';
import  axios  from 'axios';
import React, { useEffect, useState} from 'react';
import { useSelector } from "react-redux";
///////////////////////////////////////////////////////////////

const MessagesSection = () => {

  const [userData, setUserData] = useState([]);
  const{ receiverUser, currentUser } = useSelector(state => state.userSlice);


  useEffect(() => {
    getMessages();
  }, [receiverUser]);
 
  const getMessages = async() => {
    const { data } = await axios.post(GET_MESSAGES_ROUTE, { to:receiverUser?.id , from : currentUser?.id });
    setUserData(data);
  };
  
  return (
    <>
      <main className='w-full h-full max-h-[85vh] overflow-auto bg-[#111b21]' >
          {
            userData.length != 0 ?
              userData?.map( (currUser,index) => {
                return (
                  <SingleMessage currUser = {currUser} key={index} />
                )
              })
            :
            <>
              No messages found
            </>
            
          }
      </main>
    </>
  )
}

export default MessagesSection