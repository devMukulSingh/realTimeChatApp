import React from 'react'

const SingleMessage = ({user}) => {
  return (
    <>
       {user?.message} 
    </>
  )
}

export default SingleMessage