import React from 'react'

const Error = ({
    error,message,className
}) => {
  return (
    error 
    ? <div className={className}>{message?message:"this field is mandatory"}</div>
    : <></>
  )
}

export default Error