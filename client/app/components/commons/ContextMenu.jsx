import React, { useRef } from 'react'
import { useEffect } from 'react';

export const ContextMenu = ( { options, coordinates, setOpenMenu , openMenu } ) => {
    const contextMenuRef = useRef(null);

    useEffect(( ) => {
        const handleOutsideClick = (e) => {
            setOpenMenu(false)
            if(e.target.id != "context-opener"){
            }
        }
        document.addEventListener("click",handleOutsideClick);
        return () => {
            document.removeEventListener("click",handleOutsideClick);
        }
    },[])
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
                    options?.map( ( { name,callback }, index ) => {
                        return(
                            <li className='text-black' onClick={ (e) => handleOptionClick(e,callback) } key={index}>
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
