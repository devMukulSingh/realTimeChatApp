import React from 'react';
import { IoClose } from 'react-icons/io5';
import Image from "next/image"

const libraryImg = [
    '/1.png',
    '/2.png',
    '/3.png',
    '/4.png',
    '/5.png',
    '/6.png',  
    '/7.png',
    '/8.png',
    '/9.png',
]

const PhotoLibrary = ({ setProfileImage, setLibraryWindow }) => {
    const handleSetPhoto = (index) => {
        setProfileImage(libraryImg[index])
        setLibraryWindow(false);
    }
  return (
    <>
        <main className='absolute w-[34rem] max-h-[100vh] flex flex-col bg-[#636e72] shadow-2xl rounded-md p-4'>
                <IoClose className='text-3xl cursor-pointer flex justify-end items-end' onClick={ () => setLibraryWindow(false)} />
            <div className='grid grid-cols-3 gap-5 p-4'>
                {
                    libraryImg.map( (imgSrc,index) => {
                        return(
                            <figure key={index} className='w-32 h-32 cursor-pointer'>
                                <Image src={imgSrc} alt="libraryImg" width={300} height={300}
                                className='rounded-full hover:shadow-2xl transition-ease-in-out hover:scale-110 duration-200'
                                onDoubleClick={ () => handleSetPhoto(index)} />
                            </figure>
                            )
                        })
                    }
            </div>
        </main> 
    </>
  )
}

export default PhotoLibrary