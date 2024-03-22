import React from 'react'
import logo from "../../assets/logo.png"

const LoadingPage = () => {
  return (
    <div className='grid justify-center w-full h-full!important'>
      <div className='relative self-center loading-image-frame'>
        <img className='rounded-full' src={logo} width={"100%"} />
        <div className='absolute rounded-full loader'></div>
      </div>
    </div>
  )
}

export default LoadingPage