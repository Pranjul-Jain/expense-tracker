import React from 'react'
import Navbar from "../../components/navigation/Navbar"
import { TextField } from "@mui/material"

const AddFriend = (isAuth) => {
  return (
    <div>
        <Navbar addfriend={"selected"} isAuth={true} />
        <form className='flex flex-col mx-auto mt-12 px-12 justify-center align-center gap-6 sm:w-3/4 lg:w-1/2'>
            <h1 className="text-4xl self-start md:self-center md:text-6xl">Add Friend</h1>
            <div className='flex justify-center align-center gap-6 md:gap-12 mt-3'>
                <TextField name="firstName" className='w-1/2' label="Firstname" />
                <TextField name="lastName" className='w-1/2' label="Lastname" />
            </div>
            <button className='submit-button w-1/4 capitalize' >Submit</button>
        </form>
    </div>
  )
}

export default AddFriend