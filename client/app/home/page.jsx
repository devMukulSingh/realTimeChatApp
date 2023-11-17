"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import logo from "../../public/whatsapp.gif";
import Contacts from '../components/contactsSection/ContactsSection';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '@/utils/firebase.config';
import { CHECK_USER_ROUTE } from '@/utils/apiRoutes';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '@/redux/slice';
import axios from 'axios';
import ChatSection from '../components/chatSection/ChatSection';
///////////////////////////////////////////////

const page = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const [redirectLogin, setRedirectLogin] = useState(false);
    const { currentUser,user } = useSelector( state => state.userSlice );
 
    useEffect( () => {
      if(redirectLogin) router.push("/");
    },[redirectLogin]);

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