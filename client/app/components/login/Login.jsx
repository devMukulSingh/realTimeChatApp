'use client'
import React from 'react';
import axios from "axios";
import Image from 'next/image';
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "../../../utils/firebase.config";
import { CHECK_USER_ROUTE } from '@/utils/apiRoutes';
import {  useRouter } from 'next/navigation';
import { setCurrentUser } from '@/redux/userSlice';
import { useDispatch } from 'react-redux';
import logo from "../../../public/whatsapp.gif";

const page = () => {

  const router = useRouter();
  const dispatch = useDispatch();
  
  const handleLogin = async() => {
    try {
      const provider = new GoogleAuthProvider();
      const { user : { displayName:name,email, photoURL, id } } = await signInWithPopup( firebaseAuth, provider);
      
      if(email){
        const { data } = await axios.post(CHECK_USER_ROUTE, { email } );
        const { id } = data?.data;
        dispatch( setCurrentUser({ name,email, photoURL, id} ));
        console.log(name,email,photoURL, id);
          
          if(!data.status){
            router.push("/signup");
          }
          else{
            router.push("/home");
          }
      }
    } catch (error) {
      console.log(`Error in handle login ${error}`);
    }

  }
  return (
    <main className='h-screen w-screen flex flex-col bg-[#202C33] text-white items-center justify-center gap-10'>

      <div className=''>
        <Image src={logo} alt="logo" width={300} height={300}/>
      </div>

      <div className='bg-white flex text-4xl p-3 rounded cursor-pointer items-center gap-2'
        onClick={ () => handleLogin() } >
          <FcGoogle/>
          <p className='text-[#7f8c8d] text-xl font-medium'>
            Login With Google
          </p>
      </div>

    </main>
  )
}

export default page