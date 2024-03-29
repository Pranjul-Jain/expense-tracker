import React, { Children, Suspense, useEffect,cloneElement } from 'react'
import { Routes } from "../../config/Routes"
import { useNavigate } from 'react-router-dom'
import LoadingPage from '../../pages/LoadingPage/LoadingPage'


const ProtectedRoute = ({
    isAuth,setAuth,children
}) => {

    const navigate = useNavigate()

    useEffect(()=>{
        if(!isAuth)return navigate(Routes.login.path)
    },[isAuth])

    return (
       <Suspense fallback={<LoadingPage/>}>
            {children}
        </Suspense>
    )
}

export default ProtectedRoute