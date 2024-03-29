import './App.css'
import { useState,useEffect } from "react"
import PageRoutes from './config/PageRoutes'
import auth from "./config/auth/auth.json"
import { PublicApi,PrivateApi } from './api/Http'
import { useNavigate } from 'react-router-dom'
import { Routes } from './config/Routes'
import { useToast } from './hooks/useToast'
  
function App() {
  const navigate = useNavigate()
  const { showToast } = useToast()

  const [isAuth,setAuth] = useState(false)
  const [friends,setFriends] = useState([])
  const [ refreshtoken,setRefreshToken ] = useState(()=> JSON.parse( localStorage.getItem(auth.refreshTokenName) ) )
  
  useEffect(()=>{
    const controller = new AbortController()

    if(!isAuth && refreshtoken && refreshtoken.value && typeof refreshtoken.expiry === "number"){
      validateAndSetToken(controller.signal)
    }

    return ()=>{
      controller.abort("aborting previous request")
    }
  },[])

  useEffect(()=>{
    isAuth && friends.length < 1 && GetFriends()
  },isAuth)

  return (
    <PageRoutes isAuth={isAuth} friends={friends} setAuth={setAuth} />
  )

  async function validateAndSetToken(signal){
    try{
      const response = await PublicApi.get("/refreshtoken?refreshToken="+refreshtoken.value,{
        signal
      })

      const data = response.data;

      if(data.success){
        localStorage.setItem(auth.tokenname,data.accessToken)
        localStorage.setItem(auth.refreshTokenName,JSON.stringify({
          value: data.refreshToken,
          expiry: Math.floor((new Date().getTime() + 5.5*60*60*1000 + data.refreshExpiry))
        }))

        setRefreshToken({
          value: data.refreshToken,
          expiry : Math.floor((new Date().getTime() + 5.5*60*60*1000 + data.refreshExpiry))
        })

        setAuth(true)
        navigate(Routes.home.path)
      }

    }catch(err){
      if(err.response && err.response.status >= 400 && err.response.status < 500){
        localStorage.removeItem(auth.tokenname)
        localStorage.removeItem(auth.refreshTokenName)
        setAuth(false)
        navigate(Routes.login.path)
        showToast("you are logged out","error")
      }
    }
  }

  async function GetFriends(){
    try{
      const response = PrivateApi.get("/getfriends")
      const data = await response.data
      if(data.success){
        setFriends(data.data)
      }
    }catch(err){
      showToast("error while fetching friends","error")
    }
  }

}

export default App
