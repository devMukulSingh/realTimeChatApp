import React from 'react'
import { ImSpinner8 } from "react-icons/im";

const Spinner = ({ className}) => {
  return (
    <main className='flex justify-center z-10'>
        <ImSpinner8 className={`text-6xl animate-spin flex text-white ${className}`}/>
 </main>
  )
}

export default Spinner