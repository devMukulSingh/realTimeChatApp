import { GET_MESSAGES_ROUTE } from '@/utils/apiRoutes';
import SingleMessage from './SingleMessage';
import  axios  from 'axios';
import React, { useEffect, useState} from 'react';
import { useSelector } from "react-redux";
/////////////////////////////////////////////

const MessagesSection = () => {

  const [userData, setUserData] = useState(null);
  const{ user, currentUser } = useSelector(state => state.userSlice);
  useEffect(() => {
    getMessages();
  }, [user]);

  const getMessages = async() => {
    const { data } = await axios.post(GET_MESSAGES_ROUTE, { to:user?.id , from : currentUser[0]?.id });
    setUserData(data);
    console.log(userData);
  };
  

  return (
    <>
      <main className='w-full h-full max-h-[85vh] overflow-hidden bg-[#111b21]' >
          {
            userData && userData?.map( (user,index) => {
              return (
                <SingleMessage user = {user} key={index} />
              )
            })
          }
      </main>
    </>
  )
}

export default MessagesSection