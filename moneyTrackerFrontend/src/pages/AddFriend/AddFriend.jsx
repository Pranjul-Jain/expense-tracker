import React,{ useState } from 'react'
import Navbar from "../../components/navigation/Navbar"
import { TextField } from "@mui/material"
import { PrivateApi } from '../../api/Http'
import { useToast } from '../../hooks/useToast'

const AddFriend = () => {

  const [inputs, setInputs] = useState({})
  const updateData = (event)=>setInputs(prev=>{return {...prev,[event.target.name]:event.target.value.trim()}}) 

  return (
    <div>
        <Navbar addfriend={"selected"} isAuth={true} />
        <form onSubmit={handleSubmit} className='flex flex-col mx-auto mt-12 px-12 justify-center align-center gap-6 sm:w-3/4 lg:w-1/2'>
            <h1 className="text-4xl self-start md:self-center md:text-6xl">Add Friend</h1>
            <div className='flex justify-center align-center gap-6 md:gap-12 mt-3'>
                <TextField value={inputs.firstname?inputs.firstname:""} onChange={updateData} name="firstname" className='w-1/2' label="Firstname" />
                <TextField value={inputs.lastname?inputs.lastname:""} onChange={updateData} name="lastname" className='w-1/2' label="Lastname" />
            </div>
            <button className='submit-button w-1/4 capitalize' >Submit</button>
        </form>
    </div>
  )

  async function handleSubmit(event){
    event.preventDefault()

    if(!inputs.firstname || !inputs.lastname){
      return
    }

    try{
      await PrivateApi.post("/addfriend",inputs)
      setInputs({})
    }catch(err){
      
    }
    
  }
}

export default AddFriend