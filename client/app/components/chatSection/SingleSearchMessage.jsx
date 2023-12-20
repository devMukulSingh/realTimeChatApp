import React from 'react';

const SingleMessage = ({msg}) => {
  const currentDate = new Date(msg?.created);
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  return (
    <>
      <main className = { `flex text-white w-full break-all items-center justify-center gap-10 `} >
        <div className={ `flex bg-[#202C33] w-fit px-2 py-1 min-h-[2.5rem] items-center rounded-lg min-w-[4rem] max-w-sm break-all gap-3 `}>
            {msg?.message}
            <span className='text-[11px] flex font-light text-[#A6ABAD] whitespace-nowrap mt-auto' >
              {hours}:{ minutes }
            </span>
        </div>
      </main>
    </>
  )
}

export default SingleMessage