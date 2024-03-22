import React,{ lazy } from 'react'

const Home = lazy(()=>import("../pages/Home/Home"))
const Analytics = lazy(()=>import("../pages/Analytics/Analytics"))
const LoadingPage = lazy(()=>import("../pages/LoadingPage/LoadingPage"))
const Login = lazy(()=>import("../pages/Login/Login"))
const Signup = lazy(()=>import("../pages/Signup/Signup"))

export const Routes = {
    home : {
        path:'/',
        element:<Home/>
    },
    analytics : {
        path:"/analytics",
        element:<Analytics/>
    },
    loading : {
        path:"/loading",
        element : <LoadingPage/>
    },
    login : {
        path:"/login",
        element : <Login/>
    },
    signup : {
        path:"/signup",
        element : <Signup/>
    }
}