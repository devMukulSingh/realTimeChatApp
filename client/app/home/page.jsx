"use client"
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import logo from "../../public/whatsapp.gif";
import Contacts from '../components/contactsSection/ContactsSection';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '@/utils/firebase.config';
import { CHECK_USER_ROUTE } from '@/utils/apiRoutes';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, getMessages, getSocket } from '@/redux/slice';
import axios from 'axios';
import ChatSection from '../components/chatSection/ChatSection';
import { io } from "socket.io-client";
import { HOST } from '@/utils/apiRoutes';

///////////////////////////////////////////////

const page = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const [redirectLogin, setRedirectLogin] = useState(false);
    const { currentUser,user } = useSelector( state => state.userSlice );
    const socket = useRef(null);
    const [socketEvent, setSocketEvent] = useState(false);
 
    useEffect( () => {
      if(redirectLogin) router.push("/");
    },[redirectLogin]);
    
    useEffect( () => {
      if(currentUser){
        socket.current = io(HOST);
        socket.current.emit("add-user", currentUser[0]?.id);
        console.log(socket);
        dispatch(getSocket(socket.current));
      }
    },[currentUser]);

    useEffect(() => {
      if(socket.current && !socketEvent){
        socket.current.on("msg-receive", (data) => {
          dispatch(getMessages(data.message));
        })
        setSocketEvent(false);
      }
    },[socket.current]);

    onAuthStateChanged( firebaseAuth, async(firebaseUser) => {

        if( !firebaseUser) setRedirectLogin(true);
        if( currentUser?.length === 0 && firebaseUser?.email ){
          const { data } = await axios.post( CHECK_USER_ROUTE, { email: firebaseUser?.email } );
  
          if(!data?.status){
            router.push("/");
          }
          const{ name, email, photoURL, id } = data?.data;
          dispatch(getCurrentUser({ name,email,photoURL,id }));
      }   

    })

  return (
      <>
        <main className='h-screen w-screen max-h-screen bg-[#0C1317] flex p-5'>
            <div className='basis-1/3'>
                <Contacts/>
            </div>

      <>
        {
          Object.keys(user)?.length===0 ?
              <div className='flex items-center justify-center bg-[#202C33] basis-3/4'>
                  <Image src={logo} alt="logo" width={400} />
              </div> 
              :
            <div className='flex bg-[#202C33] basis-3/4 w-full'>
                <ChatSection/>
              </div> 
            
          }
          </>
        </main> 
    </>
  )
}

export default page