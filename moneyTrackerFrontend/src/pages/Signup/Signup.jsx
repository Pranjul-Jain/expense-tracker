import React from 'react'
import { TextField } from '@mui/material'
import Navbar from '../../components/navigation/Navbar'
import { Link } from 'react-router-dom'
import { Routes } from '../../config/Routes'

const Signup = () => {
  return (
    <div>
        <Navbar isAuth={false} />
        <form className='flex flex-col mx-auto mt-12 px-12 justify-center align-center gap-6 sm:w-3/4 lg:w-1/2'>
            <h1 className='text-4xl self-start md:self-center md:text-6xl'> Signup </h1>
            <TextField sx={{marginTop:"20px"}} name="username" className='w-full' label="Username" />
            <TextField name="email" className='w-full' label="Email" />
            <div className='flex flex-col sm:flex-row justify-center align-center gap-6 md:gap-12'>
                <TextField name="password" className='w-full sm:w-1/2' label="Password" />
                <TextField name="Confirm Password" className='w-full sm:w-1/2' label="Confirm Password" />
            </div>
            <div className='flex justify-between align-center mt-2 gap-6 md:gap-12'>
                <button className='submit-button w-1/4 capitalize' >Submit</button>
                <Link className='self-center text-sm' to={Routes.login.path}>Already have an Account?</Link>
            </div>
           
        </form>
    </div>
    )
}

export default Signup