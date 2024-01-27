"use client"
import { ImagePlus } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { BsPlus } from 'react-icons/bs';

const ImageUpload = ({
    onChange
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const onUpload = (result) => {
        onChange(result.info.secure_url);
        // console.log(result.info.secure_url);
    }
    useEffect( () => {
        setIsMounted(true);
    },[]);
    if(!isMounted) return false;
  return (
    <main>
        <CldUploadWidget onUpload={ onUpload } uploadPreset='uymoffmb'>
            { 
                ({open}) => {
                const onClick = () => {
                    open();
                }
                return(
                   <BsPlus 
                    className='text-4xl text-white cursor-pointer'
                    onClick={onClick}/>
                )
            }}
            
        </CldUploadWidget>
    </main>
  )
}

export default ImageUpload