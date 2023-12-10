import React from 'react'

const SingleMessage = ({currUser}) => {
  return (
    <>
      <main className = "text-white">
       {currUser?.message} 
      </main>
    </>
  )
}

export default SingleMessage