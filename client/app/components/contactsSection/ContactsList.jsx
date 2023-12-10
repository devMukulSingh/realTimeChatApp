import React, { useEffect, useState } from 'react';
import SingleContact from './SingleContact';
import { GET_USERS_ROUTE } from '@/utils/apiRoutes';
import axios from "axios";

const ContactsList = () => {
  
  useEffect( () => {
    getUsersApi();
  },[])
  
  const [users, setUsers] = useState(null);
  const getUsersApi = async() => {
    const { data } = await axios.get(GET_USERS_ROUTE);
    // console.log(data);
    setUsers(data);
  }

  return (
    <>
      {
          users && users.map( (contact,index) => {
            return(
              <SingleContact contact={contact} key={index} />
            )
          })
      }

    </>
  )
}

export default ContactsList