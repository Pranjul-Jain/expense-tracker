import React, { Children, Suspense } from 'react'
import { Routes } from "../../config/Routes"
import {  Navigate } from 'react-router-dom'
import LoadingPage from '../../pages/LoadingPage/LoadingPage'


const ProtectedRoute = ({
    isAuth,children
}) => {


    if(!isAuth)return <Navigate to={Routes.login.path} />

    return (
       <Suspense fallback={<LoadingPage/>}>
            {children}
        </Suspense>
    )
}

export default ProtectedRoute