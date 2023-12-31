import React,{useState} from 'react'
import { ContextMenu } from '../commons/ContextMenu';
import Image from "next/image";
import avatarImg from "../../../public/1.png";
import PhotoPicker from './PhotoPicker';
import { useEffect } from 'react';
import PhotoLibrary from './PhotoLibrary';
import defaultAvatar from "../../../public/default_avatar.png"


const Avatar = ({ profileImage, setProfileImage, setNewUserData, newUserData}) => {

    const [hover, setHover] = useState(false);
    const [coordinates, setCoordinates] = useState({ X :0, Y:0 });
    const [ openMenu , setOpenMenu ] = useState(false);
    const [grabPhoto, setGrabPhoto] = useState(false);
    const [libraryWindow, setLibraryWindow] = useState(false);

    useEffect( () => {
        if(grabPhoto){
            const data = document.getElementById("photo-picker");
            data.click();
            document.body.onfocus = (e) => {
                    setTimeout( () => {
                    setGrabPhoto(false);
                },1000)
            };
        }
    },[grabPhoto])

    const contextMenuOptions = [
        { name:'Take Photo', callback : () => {} },
        { name: 'Choose from library', callback : () => {
            setLibraryWindow(true);
        }},
        { name: 'Choose Picture' , callback : () => {
            setGrabPhoto(true);
        }},
        { name:'Remove Photo ' , callback : () => {
            setProfileImage(defaultAvatar);
        }}
      ]

    const handleClick = (e) => {
        e.preventDefault();
        setCoordinates( { X : e.pageX , Y: e.pageY });
        setOpenMenu(true);
      }
    const photoPickerChange = async(e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        const userImage = document.createElement("img");
        reader.onload = function(e){
            userImage.src = e.target.result;
            userImage.setAttribute("userImage-src",e.target.result);
        };
        reader.readAsDataURL(file);
        setTimeout( () => {
            setProfileImage(userImage.src);
            setNewUserData({ ...newUserData, imageURL : userImage.src })
        },100);
    }   

  return (
    <>
        <main className='relative w-40 h-40 cursor-pointer rounded-full flex items-center justify-center ' 
                        onClick={ (e) => handleClick(e) }>

            <div className={`bg-[#0D1117] rounded-full absolute opacity-60 h-full w-full invisible ${hover ? 'visible' : '' } `}
                onMouseEnter={ () => setHover(true) }  onMouseLeave = { () => setHover(false) } >
                <span className='text-white text-center absolute top-12'>
                    Change Profile Photo
                </span>
            </div>

            <Image src={profileImage} alt='avatar' className='rounded-full object-cover w-full h-full' width={100} height={100} />

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
         </main>
            { grabPhoto && <PhotoPicker onChange={ photoPickerChange} />}
            { libraryWindow && <PhotoLibrary setProfileImage = {setProfileImage} setLibraryWindow={ setLibraryWindow } /> }
</>

  )
}

export default Avatar