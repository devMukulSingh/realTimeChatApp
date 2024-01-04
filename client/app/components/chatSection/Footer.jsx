"use client"
import React, { useState } from 'react';
import axios from "axios";
import {BsEmojiLaughing} from "react-icons/bs";
import {AiOutlinePlus} from "react-icons/ai";
import {IoSendSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { ADD_IMAGE_MESSAGE_ROUTE, ADD_MESSAGE_ROUTE } from "../../../utils/apiRoutes";
import EmojiPicker  from "emoji-picker-react";
import { useEffect } from 'react';
import { useRef } from 'react';
import { setSocketMessage } from '@/redux/userSlice';
import PhotoPicker from '../commons/PhotoPicker';

  const Footer = () => {
  const dispatch = useDispatch();
  const{ currentUser, receiverUser, socket } = useSelector( state => state.userSlice );
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const [grabPhoto, setGrabPhoto] = useState(false);

  useEffect( () => {
    const handleOutsideEmojiClick = (e) => {
      if(e.target.id !== 'emoji-open'){
        if( emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)){
          setShowEmojiPicker(false);
        }
      }
    }
    document.addEventListener( 'click' , handleOutsideEmojiClick);
    return () => {
      document.removeEventListener('click', handleOutsideEmojiClick);
    }
  },[])

  useEffect( () => {
    if(grabPhoto){
      const photoPickerElement = document.getElementById("photo-picker");
      photoPickerElement.click();

      document.body.onfocus = function(){ // setting the grabPhoto state to false as the file is selected from the dialog box, after waiting for 1 second
        setTimeout( () => {
          setGrabPhoto(false);
        },1000);
      }
    }
  },[grabPhoto]);


  const handleMessageChange = (e) => {
      setMessage(e.target.value);
  }

  const handleMessageSend = async(e) => {
    try {
      const { data } = await axios.post(ADD_MESSAGE_ROUTE, { message:message, from:currentUser?.id, to:receiverUser?.id , type:'sent'}  );
      // console.log(socket);
      //socket.emit is used to emit or send an event and data from the client to the server side
      
          socket.current.emit("send-msg", {
            from:currentUser?.id,
            to:receiverUser?.id, 
            message:data?.data?.message,
            created: Date.now()
          }) 
          dispatch(setSocketMessage(data?.data));
          setMessage("");
        } catch (error) {
          console.log(`Error in handleMessageSend ${error}`);
        }      
    }
  const keyMessageSend = (e) => {
    if(e.key === 'Enter') handleMessageSend();
  }

  const handleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  }
  const handleEmojiClick = (emoji) => {
    setMessage( (prevMessage) => ( prevMessage += emoji.emoji));
  }

  const handlePhotoSelector = () => {
    // alert('clicked');
    setGrabPhoto(true);

  }
  const photoPickerChange = async(e) => {
    try {
  
     const formData = new FormData();
     const file = e.target.files[0];
     formData.append('image',file);
 
     const res = await axios.post(ADD_IMAGE_MESSAGE_ROUTE, formData , {
       headers:{
         'Content-Type' : 'multipart/form-data',
       },
       params:{
         to:currentUser.id,
         from : receiverUser.id
       }
     });
 
     if(res.status === 200){
 
      const { message } = res.data
       socket.current.emit("send-msg", {
         to:receiverUser.id,
         from:currentUser.id,
         message:message,
         created: Date.now()
       })
       dispatch( setSocketMessage(res.data));
     }
 } catch (error) {
    console.log(`Error in PhotoPickerChange ${error}`);
 }  

  };

  return (
    <>
        <main className='flex w-full px-5 py-3 gap-4 items-center h-20 bg-[#202C33] absolute bottom-0'>
          <BsEmojiLaughing className="text-3xl cursor-pointer text-white" onClick={ handleEmojiPicker } id='emoji-open'/>
          {
            showEmojiPicker && 
            <div className='absolute left-0 bottom-20' ref={ emojiPickerRef}>
                <EmojiPicker onEmojiClick={ handleEmojiClick } />
            </div>
          }
          <AiOutlinePlus className="text-3xl cursor-pointer text-white" onClick={ handlePhotoSelector }/>
          <div className='bg-[#2A3942] w-11/12 h-12  rounded-xl flex gap-8 p-2'>
            <input type="text" placeholder='Type a message' value = {message} onChange={ handleMessageChange }
              className='w-full h-full rounded-xl bg-[#2A3942] focus:outline-none text-white text-lg' 
              onKeyDown={ keyMessageSend } />
          </div>
          <IoSendSharp className='text-white text-3xl cursor-pointer ml-auto' onClick={ handleMessageSend }/>
        </main>

        { grabPhoto && <PhotoPicker onChange={ photoPickerChange }/> }
    </>
  )
}

export default Footer;  