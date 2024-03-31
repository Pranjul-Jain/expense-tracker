import React,{ useEffect, useState } from 'react'
import { InputAdornment, Select, TextField, MenuItem,OutlinedInput,Checkbox, containerClasses } from '@mui/material'
import { DatePicker,LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Error from "../../components/oraganisms/Error"
import dayjs from 'dayjs'
import { isEmptyField,updateFieldError } from '../../utils/Validation'
import { useToast } from '../../hooks/useToast'

const ExpenseForm = ({
    friends
}) => {
  
  const [ inputs,setInputs ] = useState({
    expenseDate : new Date(),
    person:"friend-0",// The initial value will always be friend-0 representing the main user
  })
  const { showToast } = useToast();

  const [error,setError] = useState({
    amount: {
      isError: false
    },
    description: {
      isError: false
    }
  })

  const [ isGroup,setIsGroup ] = useState(false)
  const [ groupMembersStatus,setGroupMembersStatus ] = useState(()=>new Array(friends.length).fill(false))
  const [ groupData,setGroupData ] = useState(()=>new Array(friends.length).fill(""))
  const [ skipped , setSkipped ] = useState(false) 

  const handleGroup = (event)=> setIsGroup(event.target.checked)
  const handleDateChange = (valueObj)=> setInputs(prev=>{return {...prev,expenseDate: new Date(valueObj.$d)}})
  const updateData = (event)=> setInputs(prev=>{return {...prev,[event.target.name]:event.target.value}})
  const handleNumber = (event)=> 
    !isEmptyField(event.target.value) && event.target.value.trim().search(/[^0-9]/)!==-1 
    ?setInputs(prev=>{return {...prev,[event.target.name]:event.target.value.slice(0,-1)}})
    :setInputs(prev=>{return {...prev,[event.target.name]:Number(event.target.value.trim())}})


  return (
    <form onSubmit={handleSubmit} className='flex flex-col mx-auto mt-12 px-12 justify-center align-center gap-6 sm:w-3/4 lg:w-1/2'>
        <h1 className='text-4xl self-start md:self-center md:text-6xl'> Expense Form </h1>
        <div className='flex mt-5 justify-center align-center gap-8 md:gap-10'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                name="expenseDate"
                value={dayjs(inputs.expenseDate)}
                onChange={handleDateChange}
                format="DD/MM/YYYY"
                sx={{ marginTop:"auto",height:"100% !important",width:"48%" }}
                />
                </LocalizationProvider>
            
            <div className='w-1/2'>
                <OutlinedInput value={inputs.amount?inputs.amount:""} autoComplete='off' name="amount" className='w-full' error={error.amount?error.amount.isError:false} onChange={handleNumber} placeholder='Amount' startAdornment={<InputAdornment position='start'>₹</InputAdornment>} />
                <Error error={error.amount?error.amount.isError:false} message={error.amount?error.amount.message:""} className="errorField" />
            </div>
        </div>
        <div className='flex justify-center align-center gap-6 md:gap-12'>
          <div className='w-1/2'>
            <TextField autoComplete='off' error={error.location?error.location.isError:false} value={inputs.location?inputs.location:""} name="location" className='w-full' onChange={updateData} label="Location" />
            <Error error={error.location?error.location.isError:false} message={error.location?error.location.message:""} className={"errorField"} />
          </div>
          <div className='w-1/2'>
            <TextField autoComplete='off' error={error.comment?error.comment.isError:false} value={inputs.comment?inputs.comment:""} name="comment" className='w-full' onChange={updateData} label="Comment" />
            <Error error={error.comment?error.comment.isError:false} message={error.comment?error.comment.message:""} className={"errorField"} />
          </div>
        </div>
        {/* if is group check box is selected then show the person/friends dropdown */
        isGroup && (friends.length>0 
        ? <div className='flex align-center gap-6 md:gap-12'>
            <Select
                sx={{
                    width: "45%"
                }}
                onChange={(event)=>setInputs(prev=>{return {...prev,person:event.target.value}})}
                value={inputs.person?inputs.person:"friend-0"}
                name="person"
            >
                {[  /* Main user is always first in the list */
                    <MenuItem key={-1} sx={{color:groupMembersStatus[0]?"green":"black"}} value={"friend-0"}>{friends[friends.length-1].firstname.charAt(0).toUpperCase()+friends[friends.length-1].firstname.slice(1)}</MenuItem> 
                    ,...friends.slice(0,-1).map((friend,index)=>{
                        if(index===friends.length-1)return <></>
                        return <MenuItem key={index} sx={{color:groupMembersStatus[index+1]?"green":"black"}} value={"friend-"+(index+1)}>{friend.firstname.charAt(0).toUpperCase()+friend.firstname.slice(1)}</MenuItem>
                    })
                ]}
            </Select>
        </div>
        : <div>{"You have no frinds :("}</div>
        )}
        {friends.length > 0 && <div className='flex align-center gap-6 md:gap-12'>
            <div>
                <Checkbox checked={isGroup} onChange={handleGroup} name="isGroup" />
                <label htmlFor="isGroup">Group</label>
            </div>
            {
                isGroup && <div>
                    <Checkbox checked={skipped} onClick={(event)=>setSkipped(event.target.checked)} name="skip" />
                    <label htmlFor="skip">skip for others</label>
                </div>
            }
        </div>
        }
        <button className='submit-button w-1/4 capitalize' >Submit</button>
    </form>
  )

  async function handleSubmit(event){
    event.preventDefault()

    const { checked } = event.target.isGroup
    let validationFlag = false
    let request = {}

    validationFlag = updateFieldError("amount",inputs.amount,error,setError)
    validationFlag = updateFieldError("location",inputs.location,error,setError) || validationFlag
    validationFlag = updateFieldError("comment",inputs.comment,error,setError) || validationFlag

    // if validation flag is set then there is error in any of the fields
    if(validationFlag){
        showToast("all fields are mandatory","error")
        return
    }

    // if isGroup is checked then we need to check if all the person are selected or not
    if(checked){

        const index = parseInt(inputs.person.split("-")[1])
        let newGroupMembersStatus = []
        let newGroupData = []
        let friendsIndex = index

        // the main user is last element in array but first in select dropdown
        friendsIndex = friendsIndex===0?friends.length-1:friendsIndex-1
        
        // if person data is already there then update it else add it
        if(groupMembersStatus[index]){  

            newGroupData = groupData.map((data)=>{
                if(data.name===friends[friendsIndex].firstname){
                    return {
                        name:friends[friendsIndex].firstname,
                        amount:Number(inputs.amount),
                        location:inputs.location,
                        comment:inputs.comment
                    }
                }

                return data
            })

        }else{
    
            newGroupMembersStatus = groupMembersStatus
            newGroupMembersStatus[index] = true
            newGroupData = groupData.map((data,groupMemberIndex)=>{
                if(index===groupMemberIndex){
                    return {
                        name:friends[friendsIndex].firstname,
                        amount:Number(inputs.amount),
                        location:inputs.location,
                        comment:inputs.comment
                    }
                }
    
                return data;
            })
            setGroupData(newGroupData)
            setGroupMembersStatus(newGroupMembersStatus)
        };

        // now getting the next person index whose data is still not set
        let nextIndex = null
        if(newGroupMembersStatus.length>1){
            nextIndex = newGroupMembersStatus.findIndex(status=>!status)
        }else{
            nextIndex = groupMembersStatus.findIndex(status=>!status)
        }

        // if there is no next person then submit the form otherwise setting the next person in dropdown
        if(nextIndex!==-1){

            // if skipped checkbox is checked then setting the current group member data and submit the form
            if(!skipped){
                setInputs(prev=>{return {...prev,person:"friend-"+nextIndex}})
                return
            }else{

                newGroupData = newGroupData.map((data,groupMemberIndex)=>{
                    if(!newGroupMembersStatus[groupMemberIndex]){
                        const friendsIndex = groupMemberIndex===0?friends.length-1:groupMemberIndex-1
                        return {
                            name:friends[friendsIndex].firstname,
                            amount:0,
                            location:"",
                            comment:""
                        }
                    }

                    return data
                })

            }
        }

        request = {
            date: inputs.expenseDate,
            expense : newGroupData.reduce((prev,curr)=>prev+curr.amount,0), // adding the total group amount
            groupExpenses: newGroupData,
            isGroup : true
        }
        }else{
            request = {
                date: inputs.expenseDate,
                expense : inputs.amount,
                location:inputs.location,
                comment:inputs.comment,
                isGroup: false
            }
        }

        try{
            const response = await PrivateApi.post("/addexpense",request)

            const data = response.data;

            if(data.success){
                showToast("Expense added successfully","success")
            }else{
                showToast("You have entered some wrong data","err")
            }
        }catch(err){
            showToast("some issue occured","error")
        }

        setInputs({
            expenseDate : new Date(),
            person:"friend-0"
        })

        setGroupData(new Array(friends.length).fill(""))
        setGroupMembersStatus(new Array(friends.length).fill(false))
        setSkipped(false)
        setIsGroup(false)
    }

}

export default ExpenseForm