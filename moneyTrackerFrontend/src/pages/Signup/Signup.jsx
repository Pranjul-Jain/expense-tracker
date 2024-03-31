import React, { useState } from 'react'
import { TextField } from '@mui/material'
import Navbar from '../../components/navigation/Navbar'
import { Link } from 'react-router-dom'
import { Routes } from '../../config/Routes'
import { useToast } from '../../hooks/useToast'
import { PublicApi } from '../../api/Http'

import Error from '../../components/oraganisms/Error'
import { validateEmail,validatePassword,updateFieldError, isEmptyField } from '../../utils/Validation'

const Signup = () => {

  const [inputs,setInputs] = useState({})
  const [error,setError] = useState({})

  const { showToast } = useToast()

  const updateData = (e)=>setInputs(prev=>{return {...prev,[e.target.name]:e.target.value.trim()}})

  return (
    <div>
        <Navbar isAuth={false} />
        <form onSubmit={handleSubmit} className='flex flex-col mx-auto mt-12 px-12 justify-center align-center gap-6 sm:w-3/4 lg:w-1/2'>
            <h1 className='text-4xl self-start md:self-center md:text-6xl'> Signup </h1>
            <div>
              <TextField error={error.username?error.username.isError:false} autoComplete='off' sx={{marginTop:"20px"}} onChange={updateData} value={inputs.username?inputs.username:""} name="username" className='w-full' label="Username" />
              <Error error={error.username?error.username.isError:false} message={error.username?error.username.message:false} className="errorField" />
            </div>
            <div>
              <TextField error={error.email?error.email.isError:false} autoComplete='off' onChange={updateData} value={inputs.email?inputs.email:""} name="email" className='w-full' label="Email" />
              <Error error={error.email?error.email.isError:false} message={error.email?error.email.message:false} className="errorField" />
            </div>
            <div className='flex flex-col sm:flex-row justify-center align-center gap-6 md:gap-12'>
                <div className='w-full sm:w-1/2'>
                    <TextField error={error.password?error.password.isError:false} type="password" autoComplete='off' onChange={updateAndValidatePassword} name="password" value={inputs.password?inputs.password:""} className='w-full' label="Password" />
                    <Error error={error.password?error.password.isError:false} message={error.password?error.password.message:false} className="errorFieldSmall" />
                </div>
                <div className='w-full sm:w-1/2'>
                    <TextField error={error.confirmPassword?error.confirmPassword.isError:false} type="password" autoComplete='off' onChange={updateData} name="confirmPassword" value={inputs.confirmPassword?inputs.confirmPassword:""} className='w-full' label="Confirm Password" />
                    <Error error={error.confirmPassword?error.confirmPassword.isError:false} message={error.confirmPassword?error.confirmPassword.message:false} className="errorFieldSmall" />
                </div>
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
        let validationFlag = false

        validationFlag = updateFieldError("username",inputs.username,error,setError)
        validationFlag = updateFieldError("email",inputs.email,error,setError) || validationFlag
        
        if(validationFlag){
            showToast("Please fill all the fields","error")
            return
        }

        if(isEmptyField(inputs.password)){
            showToast("please fill all the fields","error")
            setError(prev=>{return {...prev,password:{isError:true,message:""}}})
            return
        }

        if(!validateEmail(inputs.email)){
            setError(prev=>{return {...prev,email:{isError:true,message:"please enter valid email"}}})
            showToast("please enter valid email","error")
            validationFlag = true;
        }else{
            console.log("entering")
            setError(prev=>{return {...prev,email:{isError:false,message:""}}})
        }

        if(error.password && error.password.isError){
            setError(prev=>{return {...prev,password:{isError:true,message:prev.password.message}}})
            showToast("please enter valid password","error")
            validationFlag = true;
        }else{
            setError(prev=>{return {...prev,password:{isError:false,message:""}}})
        }

        if(inputs.username.length < 8){
            setError(prev=>{return {...prev,username:{isError:true,message:"username should be atleast 8 characters"}}})
            showToast("username should be of atleast 8 characters","error")
            validationFlag = true
        }else{
            setError(prev=>{return {...prev,username:{isError:false,message:""}}})
        }

        if(inputs.password !== inputs.confirmPassword){
            (!error["confirmPassword"] || !error.confirmPassword.isError) && setError(prev=>{return {...prev,confirmPassword:{isError:true,message:"password doesn't match"}}})
            validationFlag = true;
        }else{
            (!error['confirmPassword'] || error.confirmPassword.isError) &&  setError(prev=>{return {...prev,confirmPassword:{isError:false,message:""}}})
        }

        if(validationFlag)return;

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

    function updateAndValidatePassword(event){

        const { value } = event.target;
    
        const status = validatePassword(value)
    
        if(!status.correct){
          setError(prev=>{return {...prev,password:{isError:true,message:status.message}}})
        }else{
          error.password.isError &&  setError(prev=>{return {...prev,password:{isError:false,message:""}}})
        }
    
        setInputs(prev=>{return {...prev,password:value.trim()}})
      }
}

export default Signup