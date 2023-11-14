import React, { useRef } from 'react'

export const ContextMenu = ( { options, coordinates, setOpenMenu , openMenu } ) => {
    const contextMenuRef = useRef(null);
    const handleOptionClick = (e,callback) => {
        e.stopPropagation();
        setOpenMenu(false);
        callback();
    }
  return (
    <>
        <div className="w-40 h-auto bg-white rounded-sm px-2  py-5" 
            style={ { top:coordinates.Y, left: coordinates.X }} >
            <ul className='flex gap-1 flex-col'>
                {
                    options?.map( ( { name,callback }) => {
                        return(
                            <li className='text-black' onClick={ (callback) => handleOptionClick(callback) }>
                                {name}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    </>
  )
}
