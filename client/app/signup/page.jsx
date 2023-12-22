'use client'
import Image from 'next/image';
import React, {useEffect, useState} from 'react';
import logo from "../../public/whatsapp.gif";
import avatar from "../../public/avatar.png";
import { ContextMenu } from '../commons/ContextMenu';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_USER_ROUTE } from '@/utils/apiRoutes';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '@/utils/firebase.config';
import { setUser } from '@/redux/userSlice';
import { useRouter } from 'next/navigation';

const page = () => {

  const userData = {
    userName:'',
    about:'',
  }
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = useState({ X :0, Y:0 });
  const [ openMenu , setOpenMenu ] = useState(false);
  const[ newUserData, setNewUserData ] = useState(userData); 
  const { user } = useSelector( state => state.userSlice);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const router = useRouter();
 
  // useEffect( () => {
  //   getDataFromRedux();
  // },[]);
  // const getDataFromRedux = () => {
  //   const{ user } = useSelector( state => state.userSlice );
  //   console.log(user);
  // }

  const contextMenuOptions = [
    { name:'Take Photo', callback : () => {} },
    { name: 'Choose Picture' , callback : () => {} },
    { name:'Remove Photo ' , callback : () => {} }
  ]
  
  onAuthStateChanged( firebaseAuth, async(currentUser) => {
    if( firebaseUser===null && currentUser){
      const { displayName:name, email, photoURL } = currentUser;
      console.log(currentUser);
      console.log( name,email,photoURL);
        setFirebaseUser({name,email,photoURL});
        console.log(firebaseUser);
      // dispatch(setUser({ name, email, photoURL}));
    }
})

  const handleClick = (e) => {
      e.preventDefault();
      setCoordinates( { X : e.pageX , Y: e.pageY });
      setOpenMenu(true);
    }
    const onValueChange = (e) => {
        setNewUserData({ ...newUserData, [e.target.name]:e.target.value })
 
    }
  const handleCreateProfile = async() => {
    const res = await axios.post(ADD_USER_ROUTE,{ ...firebaseUser,...newUserData});
    if(res?.status){
      router.push("/home");
    }
    console.log(res);
  }


  return (
    <>
      <main className='bg-[#1F2C33] h-screen w-screen flex justify-center items-center gap-10'>

        <div className='flex gap-5 flex-col'>   
          <div>
              <Image src={logo} alt='logo' width='300' height='200'/>
          </div>
          <div className='flex gap-4 flex-col'>
              <input type="text" placeholder='Profile name' className='p-2 rounded-sm' name='userName' onChange={ onValueChange }/>
              <input type="text" placeholder='About' className='p-2 rounded-sm' name='about' onChange={ onValueChange }/>
          </div>
          <div className='text-center text-sm font-medium'>
            <button onClick={ handleCreateProfile }
              className='bg-[#00A884] px-6 py-3 rounded-full hover:shadow-[0_0_32px_4px_rgba(0,0,0,0.6)]'>
              Create Profile
            </button>
          </div>
        </div>

        <div className='relative w-40 cursor-pointer' onClick={ (e) => handleClick(e) }>
          <div className={`bg-[#0D1117] rounded-full absolute opacity-70 h-full w-full ${hover ? "visible" : "" } `}
            onMouseEnter={ () => { setHover(true) } } onMouseLeave={ () => setHover(false) } >
                <span className='text-white text-center absolute top-12'>
                  Change Profile Photo
                </span>
          </div>
          <Image src={avatar} alt='avatar' className='rounded-full'  />
      
            {
              openMenu && 
              <div className='absolute'>
                <ContextMenu
                options={contextMenuOptions}
                setOpenMenu={setOpenMenu}
                openMenu={openMenu} 
                coordinates={coordinates}
                />
              </div>
          }
        </div>


      </main>
    
    </>
  )
}

export default page