import React from 'react'
import Navbar from '../../components/navigation/Navbar'
import { MenuItem,Select,TextField,InputAdornment,OutlinedInput,Button} from '@mui/material'

const Home = () => {

  return (
    <div className='flex flex-col'>
        <Navbar home={"selected"} />
        <form className='flex flex-col mx-auto mt-12 justify-center align-center gap-6 sm:w-3/4 lg:w-1/2'>
          <h1 className='sm:self-start'> Expense Form </h1>
          <div className='flex mt-5 justify-center align-center gap-12'>
            <Select
                sx={{
                  width: "50%"
                }}
                value="pranjul"
                name="person"
            >
                <MenuItem value="">Person</MenuItem>
                <MenuItem value="pranjul">Pranjul</MenuItem>
                <MenuItem value="abhi">Abhi</MenuItem>
                <MenuItem value="yuvraj">Yuvraj</MenuItem>
            </Select>
            <OutlinedInput name="amount"  className='w-1/2' placeholder='Amount' startAdornment={<InputAdornment position='start'>₹</InputAdornment>} />
          </div>
          <div className='flex justify-center align-center gap-12'>
            <TextField name="location" className='w-1/2' label="Location" />
            <TextField name="comment" className='w-1/2' label="Comment" />
          </div>
          <button className='submit-button w-1/4 capitalize' >Submit</button>
        </form>
        <footer className='flex bg-black text-white justify-center align-center w-full p-5 absolute bottom-0 text-xl'>Copyright &copy; 2022 By Pranjul Jain</footer>
    </div>
  )
}

export default Home