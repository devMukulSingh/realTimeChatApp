import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from "react-redux";

const SingleMessage = ({currUser}) => {
  const [type, setType] = useState('receive');
  const{ currentUser } = useSelector(state => state.userSlice);
  const currentDate = new Date(currUser?.created);
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  useEffect(() => {
    if(currUser?.senderId === currentUser?.id){
      setType('sent');
    }
  },[currUser])

  return (
    <>
      <main className = { `flex text-white w-full break-all ${type==='sent' ? 'justify-end' : {} } `} >
        <div className={ `flex  w-fit px-2 py-1 min-h-[2.5rem] items-center rounded-lg min-w-[4rem] max-w-sm break-all gap-3 ${type==='sent' ? 'bg-[#005C4B]' :  'bg-[#202C33]'  } `}>
            {currUser?.message}
            <span className='text-[11px] flex font-light text-[#A6ABAD] whitespace-nowrap mt-auto' >
              {hours}:{ minutes }
            </span>
        </div>
      </main>
    </>
  )
}

export default SingleMessage