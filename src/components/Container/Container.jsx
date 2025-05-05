import React from 'react'

const Container = ({children}) => {
  // console.log("You Entered Container");
  return (
    <div className='w-full max-w-7xl mx-auto px-4'>
        {children}
    </div>
  )
}

export default Container