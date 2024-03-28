import React from 'react'
import { useState } from 'react'
import { TextField } from '@mui/material'
import { Routes } from '../../config/Routes'
import { Link } from 'react-router-dom'
import { useToast } from "../../hooks/useToast"
import { validatePassword,setAndCheckEmptyfield,isEmptyField } from "../../utils/Validation"
import Error from '../../components/oraganisms/Error'
import auth from "../../config/auth/auth.json"
import { PrivateApi } from "../../api/PrivateApi"

const LoginForm = () => {

  const [inputs,setInputs] = useState({})
  const [error,setError] = useState({
    username: {
      isError: false,
    },
    password: {
      isError: false
    }
  })
  
  const { showToast } = useToast();

  return (
    <form onSubmit={handleSubmit} className='flex flex-col mx-auto mt-12 px-12 justify-center align-center gap-6 sm:w-3/4 lg:w-1/2'>
        <h1 className='text-4xl self-start md:self-center md:text-6xl'> Login </h1>
        <div>
          <TextField value={inputs.username?inputs.username:""} sx={{marginTop:"20px"}} id="login-username" name="username" onChange={updateData} className='w-full' error={error.username.isError} label="Username" />
          <Error error={error.username.isError} message={error.username.message} className="errorField" />
        </div>
        <div>
          <TextField type="password" value={inputs.password?inputs.password:""} name="password" id="login-password"  className='w-full' onChange={updateAndValidatePassword} error={error.password.isError} label="Password" />
          <Error error={error.password.isError} message={error.password.message} className="errorField" />
        </div>
        <div className='flex justify-between align-center gap-6 md:gap-12 mt-4'>
            <button className='submit-button w-1/4 capitalize' >Submit</button>
            <Link className='self-center text-sm' to={Routes.signup.path}>Not Registered?</Link>
        </div>
    </form>
  )

  function updateData(event){
    const { name, value } = event.target
    setInputs(prev => ({...prev, [name]:value.trim()}))
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

  async function handleSubmit(e){
    e.preventDefault();

    let validationFlag = false;
    
    if(isEmptyField(inputs.username)){
      !error.username.isError && setError(prev=>{return {...prev,username:{isError:true}}})
      validationFlag = true;
    }else{
      error.username.isError && setError(prev=>{return {...prev,username:{isError:false}}})
    }

    if(isEmptyField(inputs.password)){
      setError(prev=>{return {...prev,password:{...prev.password,isError:true}}})
      validationFlag = true;
    }else{
      error.username.isError && setError(prev=>{return {...prev,password:{isError:false}}})
    }
    
    if(validationFlag){
      showToast("All fields are mandatory","error")
      
      return
    }

    if(error.password.isError){
      showToast("Enter valid password","error")
      return
    }

    try{
      const response = await PrivateApi.post("/user-login",{
        username: inputs.username,
        password: inputs.password
      })

      const data = await response.data;

      if(data.success){
        showToast("user logged in","success")
        // localStorage.setItem(auth.tokenname,data.accessToken)
        // localStorage.setItem(auth.refreshTokenName,data.refreshTokenName)
      }else{
        showToast("error while logging user","error")
      }

    }catch(err){
      if(err.response && err.response.status===401){
        showToast("incorrect username or password","error")
      }else{
        showToast("User not registered","error")
      }
    }
  }

}

export default LoginForm;