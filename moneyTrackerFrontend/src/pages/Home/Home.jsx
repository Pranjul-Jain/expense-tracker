import React from 'react'
import Navbar from '../../components/navigation/Navbar'
import { MenuItem,Select,TextField,InputAdornment,OutlinedInput} from '@mui/material'
import HistPlot from '../../components/graphs/HistPlot'
// import UseResponsive from '../../hooks/UseResponsive'
import ExpenseForm from './ExpenseForm'

const Home = () => {

  return (
    <div className='flex flex-col h-full'>
        <Navbar isAuth={true} home={"selected"} />
        <ExpenseForm />
        <HistPlot className='flex w-full px-10 pt-10 align-center' dimensions={{width:window.innerWidth/3,height:window.innerHeight/3}} />
        <footer className='flex bg-black text-white justify-center align-center w-full p-5 text-xl mt-auto'>Copyright &copy; 2022 By Pranjul Jain</footer>
    </div>
  )
}

export default Home