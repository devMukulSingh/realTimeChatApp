import { HOST } from '@/utils/apiRoutes'
import React, { useState } from 'react';
import {useSelector} from "react-redux";
import Image from "next/image";
import { useEffect } from 'react';

const SingleImageMessage = ({ message}) => {

    const [type, setType] = useState('receive');
    const { currentUser, receiverUser } = useSelector( state => state.userSlice);

    const date = new Date(message.created);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    useEffect( () => {
        if(message?.senderId === receiverUser?.id){
            setType('sent');
        }
    },[message]);

  return (
    <>
        <main className={`flex w-full ${type==='sent' ? 'justify-end' : ''  } `}>
            <figure className={ `flex flex-col p-2 gap-2 rounded-md ${type === 'sent' ?  'bg-[#005C4B]' : 'bg-[#202C33]' }`}>
                 <Image src={`${HOST}/${message.message}`} alt="imageMessage" width={400} height={400}
                    className="rounded-md" />
                <footer className='text-[11px] flex font-light text-[#A6ABAD] whitespace-nowrap ml-auto'>
                    {hours}:{minutes}
                </footer>
            </figure>
        </main>
    </>
  )
}

export default SingleImageMessage