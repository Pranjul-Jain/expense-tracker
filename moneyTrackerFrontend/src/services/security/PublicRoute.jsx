import React,{Suspense,useEffect} from 'react'
import LoadingPage from '../../pages/LoadingPage/LoadingPage'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../../config/Routes'

const PublicRoute = ({isAuth,children}) => {
  const navigate = useNavigate()
  useEffect(()=>{
    if(isAuth)return navigate(Routes.home.path)   
  },[isAuth])

  return (
    <Suspense fallback={<LoadingPage/>}>
        {children}
    </Suspense>
  )
}

export default PublicRoute