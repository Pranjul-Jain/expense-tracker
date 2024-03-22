import React from 'react'
import Navbar from '../../components/navigation/Navbar'
import { TextField } from '@mui/material'
import { Routes } from '../../config/Routes'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
        <Navbar isAuth={false} />
        <form className='flex flex-col mx-auto mt-12 px-12 justify-center align-center gap-6 sm:w-3/4 lg:w-1/2'>
            <h1 className='text-4xl self-start md:self-center md:text-6xl'> Login </h1>
            <TextField sx={{marginTop:"20px"}} name="username" className='w-full' label="Username" />
            <TextField type="password" name="password" className='w-full' label="Password" />
            <div className='flex justify-between align-center gap-6 md:gap-12 mt-4'>
                <button className='submit-button w-1/4 capitalize' >Submit</button>
                <Link className='self-center text-sm' to={Routes.signup.path}>Not Registered?</Link>
            </div>
        </form>
    </div>
  )
}

export default Login