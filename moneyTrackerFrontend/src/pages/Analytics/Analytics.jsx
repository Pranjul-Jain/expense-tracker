import React from 'react'
import Navbar from '../../components/navigation/Navbar'
import { Select,MenuItem } from '@mui/material'
import { LocalizationProvider,DatePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"

const GroupPersonExpense = [
  {
    "id" : "1234",
    "Date" : "11/03/2024",
    "Expense" : 500,
    "GroupExpenses":[
      {"pranjul":250,comment:"chole kulche",location:"chitkara"},
      {"abhi":125,comment:"bhature",location:"chitkara"},
      {"yuvraj":125,comment:"Eaten momos at art of momos after chikara colony",location:"Art of Momos"},
    ],
  },
  {
    "id" : "1233",
    "Date" : "11/04/2024",
    "Expense" : 200,
    "GroupExpenses":[
      {"pranjul":100,comment:"chole kulche",location:"chitkara"},
      {"abhi":50,comment:"bhature",location:"chitkara"},
      {"yuvraj":50,comment:"Eaten momos at art of momos after chikara colony",location:"Art of Momos"},
    ],
  },
]

const SinglePersonExpense = [
  {
    "id" : "1233",
    "Date" : "11/03/2024",
    "Expense" : "500",
    "Location": "Gwalior Madhya Pradesh",
    "Comment": "Spended money in chetak puri momos",
  }
]

const Analytics = () => {

  const group = true;

  return (
    <div className='flex flex-col align-center h-full w-full sm:px-0'>
        <Navbar analytics={"selected"} isAuth={true} />
        <div className='flex flex-wrap justify-start sm:justify-center w-full gap-x-6 gap-y-6 sm:gap-x-10 px-5 sm:px-10 mt-6 sm:mt-10'>
          <Select
          name="person"
          value="pranjul"
          className='w-5/12 sm:w-1/4'
          >
            <MenuItem value="pranjul">Pranjul</MenuItem>
            <MenuItem value="yuvraj">Yuvraj</MenuItem>
            <MenuItem value="abhi">Abhi</MenuItem>
          </Select>
          <Select
          name="status"
          value="group"
          className='w-5/12 sm:w-1/4'
          >
            <MenuItem value="group">group</MenuItem>
            <MenuItem value="single">single</MenuItem>
          </Select>
          <Select
          name="duration"
          value="past 7"
          className='w-6/12 sm:w-1/4'
          >
            <MenuItem value="past 7">Past 7 days</MenuItem>
            <MenuItem value="past 15">Past 15 days</MenuItem>
            <MenuItem value="past 30">Past 30 days</MenuItem>
            <MenuItem value="custom">Custom</MenuItem>
          </Select>
          <div className='flex w-full align-center justfiy-center'>
            <label className='w-3/12 sm:w-1/4 self-center'>From - </label>
            <LocalizationProvider className="w-8/12 sm:3/4" dateAdapter={AdapterDayjs}>
              <DatePicker
              name="from"
              sx={{ marginTop:"auto",height:"100% !important" }}
              />
            </LocalizationProvider>
          </div>
          <div className='flex w-full align-center justfiy-center'>
            <label className='w-3/12 sm:w-1/4 self-center'>To - </label>
            <LocalizationProvider className="w-8/12 sm:3/4" dateAdapter={AdapterDayjs}>
              <DatePicker
              name="to"
              sx={{ marginTop:"auto",height:"100% !important" }}
              />
            </LocalizationProvider>
          </div>
        </div>

        <div className='flex align-center w-full px-4 sm:px-9 lg:px-16 gap-4 mt-8'>
          <span className='self-center selected bg-violet-500 text-white px-3 py-1 rounded'>Total</span>
          <span className='self-center selected bg-green-400 text-black px-3 py-1 rounded'>700₹</span>
        </div>
        
        <div className='flex flex-grow border-2 border-color-black mx-auto mt-5 flex-col mb-5 gap-4 w-full sm:w-11/12'>
            <div className='grid grid-cols-4 grid-analytics-col w-full px-2 py-3 rounded bg-black text-white'>
              <span>S.No</span>
              <span>Date</span>
              <span>Expense</span>
              <span>Info</span>
            </div>
            <div className='flex flex-col items-start overflow-y-scroll scroll-hide gap-5 w-full mt-2 mb-3 h-96'>
              {
                group ? GroupPersonExpense.length>0 && GroupPersonExpense.map((expense,index)=>{
                  const firstPersonLocation = expense.GroupExpenses[0].location 
                  return (
                    <>
                      <div className='grid grid-cols-4 grid-analytics-col w-full px-2'>
                        <span className='self-center'>{index+1}</span>
                        <span className='self-center'>{dayjs(expense.Date).format("DD-MMM-YY")}</span>
                        <span className='self-center self-justify-center'>{expense.Expense+"₹"}</span>
                        <button name={"person-info-"+index} onClick={toggleHandleInfo} className='self-center submit-button bg-black'>{firstPersonLocation.length>=10 ? firstPersonLocation.slice(0,10)+"..." : firstPersonLocation}</button>
                      </div>
                      {
                        expense.GroupExpenses.length>=1 && <div id={"person-info-"+index} className='grid w-full gap-3 px-3 py-3 mt-1 mb-1 bg-white hidden'>
                        {
                          expense.GroupExpenses.map(personData=>{
                          const personName = Object.keys(personData)[0]
                          return <div className='grid grid-cols-4 grid-analytics-subcol w-full'>
                            <span className='self-center text-black'>{personName.charAt(0).toUpperCase()+personName.slice(1)}</span>
                            <span className='self-center text-green-500'>{personData[personName]+"₹"}</span>
                            <span className='self-center self-justify-center text-red-500'>{personData.location}</span>
                            <span className='self-center self-justify-center text-sm text-start sm:text-base text-red-400'>{personData.comment}</span>
                          </div>
                          })
                        }
                      </div>
                      }
                    </>
                  )
                }) 
                : null
              }
            </div>
        </div>
        <footer className='flex bg-black text-white justify-center align-center w-full p-5 text-xl mt-auto'>Copyright &copy; 2022 By Pranjul Jain</footer>
    </div>
  )

  function toggleHandleInfo(e){
    const name = e.target.name
    document.querySelector("#"+name).classList.toggle("hidden")
  }
}

export default Analytics;