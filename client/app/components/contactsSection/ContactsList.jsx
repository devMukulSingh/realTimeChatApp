import React, { useEffect } from 'react';
import SingleContact from './SingleContact';
import { GET_USERS_ROUTE } from '@/utils/apiRoutes';
import axios from "axios";

const ContactsList = () => {
  
  useEffect( () => {
    getUsersApi();
  },[])
  const getUsersApi = async() => {
    const { data } = await axios.get(GET_USERS_ROUTE);
    console.log(data);
  }

  return (
    <>
      <SingleContact/>
      <SingleContact/>
      <SingleContact/>
      <SingleContact/>
      <SingleContact/>

    </>
  )
}

export default ContactsList