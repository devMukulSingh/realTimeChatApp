import { HOST } from '@/utils/apiRoutes'
import React, { useState } from 'react';
import {useSelector} from "react-redux";
import Image from "next/image";
import { useEffect } from 'react';

const SingleImageMessage = ({ message}) => {

    const [type, setType] = useState('receive');
    const { currentUser, receiverUser } = useSelector( state => state.userSlice);

    useEffect( () => {
        if(message?.senderId === currentUser?.id){
            setType('sent');
        }
    },[message]);

  return (
    <>
        <main className={`flex w-full ${type=='sent' ? 'justify-end' : {} } `}>
            <Image src={`${HOST}/${message.message}`} alt="imageMessage" width={400} height={300}
                className="rounded-md" />
        </main>
    </>
  )
}

export default SingleImageMessage