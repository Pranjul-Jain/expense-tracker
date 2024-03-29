import React, { useState } from 'react'
import { TextField } from '@mui/material'
import Navbar from '../../components/navigation/Navbar'
import { Link } from 'react-router-dom'
import { Routes } from '../../config/Routes'
import { useToast } from '../../hooks/useToast'
import { PublicApi } from '../../api/Http'

const Signup = () => {

  const [inputs,setInputs] = useState({})
  const { showToast } = useToast()

  const updateData = (e)=>setInputs(prev=>{return {...prev,[e.target.name]:e.target.value.trim()}})

  return (
    <div>
        <Navbar isAuth={false} />
        <form onSubmit={handleSubmit} className='flex flex-col mx-auto mt-12 px-12 justify-center align-center gap-6 sm:w-3/4 lg:w-1/2'>
            <h1 className='text-4xl self-start md:self-center md:text-6xl'> Signup </h1>
            <TextField sx={{marginTop:"20px"}} onChange={updateData} value={inputs.username?inputs.username:""} name="username" className='w-full' label="Username" />
            <TextField name="email" onChange={updateData} value={inputs.email?inputs.email:""} className='w-full' label="Email" />
            <div className='flex flex-col sm:flex-row justify-center align-center gap-6 md:gap-12'>
                <TextField onChange={updateData} name="password" value={inputs.password?inputs.password:""} className='w-full sm:w-1/2' label="Password" />
                <TextField onChange={updateData} name="confirmPassword" value={inputs.confirmPassword?inputs.confirmPassword:""} className='w-full sm:w-1/2' label="Confirm Password" />
            </div>
            <div className='flex justify-between align-center mt-2 gap-6 md:gap-12'>
                <button className='submit-button w-1/4 capitalize' >Submit</button>
                <Link className='self-center text-sm' to={Routes.login.path}>Already have an Account?</Link>
            </div>
           
        </form>
    </div>
    )

    
    async function handleSubmit(e){
        e.preventDefault()

        if(!inputs.username || !inputs.email || !inputs.password || !inputs.confirmPassword ){
            showToast("all fields are mandatory","error")
            return
        }

        if(inputs.password !== inputs.confirmPassword){
            showToast("confirm password doesn't match with the password","error")
            return
        }

        try{
            await PublicApi.post("/create-account",{
                ...inputs
            })

            showToast("Account created successfully","success")
        }catch(err){
            if(err.response){
                showToast(err.response.data.message,"error")
            }else{
                showToast("some issue occured","error")
            }
        }
    }
}

export default Signup