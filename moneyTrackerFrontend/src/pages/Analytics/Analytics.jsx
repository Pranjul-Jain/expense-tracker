import React from 'react'
import Navbar from '../../components/navigation/Navbar'
import { Select,MenuItem } from '@mui/material'

const Analytics = () => {
  return (
    <div className='flex flex-col align-center h-full w-full sm:px-0'>
        <Navbar analytics={"selected"} isAuth={true} />
        <Select
         value={10}
         className='w-2/4 sm:w-1/4 ml-10 mt-10'
        >
          <MenuItem value={10}>Max Expense</MenuItem>
          <MenuItem value={11}>Min Expense</MenuItem>
        </Select>
        <div className='flex border-2 border-color-black mx-auto mt-10 flex-col gap-4 w-full px-15 sm:px-10'>
            <div className='flex w-full justify-between bg-green-200 text-white rounded py-4 px-6'>
              <span className='expense-data selected bg-blue-900 text-white py-2 px-3'>{"11/03/2002"}</span>
              <span className='expense-name selected py-2 px-3 bg-red-400'>{"Pranjul"}</span>
              <span className='expense-amount selected text-white bg-violet-700 px-3 py-2'>{"Rs. 100"}</span>
            </div>
            <div className='flex w-full justify-between bg-green-200 text-white rounded py-4 px-6'>
              <span className='expense-data selected bg-blue-900 text-white py-2 px-3'>{"13/03/2024"}</span>
              <span className='expense-name selected py-2 px-3 bg-red-400'>{"Pranjul"}</span>
              <span className='expense-amount selected text-white bg-violet-700 px-3 py-2'>{"Rs. 500"}</span>
            </div>
        </div>
    </div>
  )
}

export default Analytics;