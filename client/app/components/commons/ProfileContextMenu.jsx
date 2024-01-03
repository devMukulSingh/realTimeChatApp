import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { CiLogout } from "react-icons/ci";
import { useRouter } from 'next/navigation';

const ProfileContextMenu = ({setOpenContextMenu}) => {

    const router = useRouter();
    const contextMenuRef = useRef();
    const auth = getAuth();

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if( !contextMenuRef.current.contains(e.target) ){
                setOpenContextMenu(false);
            }
        }
        document.addEventListener("click", handleOutsideClick );
        return () => {
            document.removeEventListener("click",handleOutsideClick);
        }
    },[])

    const handleLogout = async() => {
        signOut(auth).then( () => {
            router.push("/");
        }).catch((e) => console.log(e));
        setOpenContextMenu(false);
    }
  return (
    <>
        <main className='bg-[white] h-22 w-30 p-4 flex flex-col gap-3 absolute top-[85px] rounded-md' ref={contextMenuRef}>
            <ul>
                <li className=' flex gap-3 cursor-pointer' onClick={ handleLogout }>
                    <CiLogout className='text-2xl'/>
                    <h1 className='font-medium'> Logout </h1>
                </li>
            </ul>
        </main>  
    </>
  )
}

export default ProfileContextMenu