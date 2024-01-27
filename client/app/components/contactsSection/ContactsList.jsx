import React, { useEffect, useState } from 'react';
import SingleContact from './SingleContact';
import { GET_USERS_ROUTE } from '@/utils/apiRoutes';
import axios from "axios";
import Spinner from '../commons/Spinner';
import { useQuery } from "@tanstack/react-query"

const getUsersApi = async() => {
  try {
      const{ data } = await axios.get(GET_USERS_ROUTE);
      return data;
  } catch (error) {
      console.log(`Error in getUsersApi ${error}`);
  }
}

const ContactsList = () => {
  
  useEffect( () => {
    getUsersApi();
  },[])
  
  const{ isLoading, error,isError, data:users } = useQuery({
    queryKey:'users', 
    queryFn:getUsersApi
  });
  
  if(isError){
    return <>{error}</>
  }
  if(isLoading){
    return <Spinner className="text-2xl"/>
  }
  return (
    <>
      {
          users.map( (contact,index) => {
            return(
              <SingleContact contact={contact} key={index} />
            )
          })
      }

    </>
  )
}

export default ContactsList