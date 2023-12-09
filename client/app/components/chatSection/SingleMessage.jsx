import React from 'react'

const SingleMessage = ({user}) => {
  return (
    <>
      <main className = "text-white">
       {user?.message} 
      </main>
    </>
  )
}

export default SingleMessage