import React,{ lazy } from 'react'

const Home = lazy(()=>import("../pages/Home/Home"))
const Analytics = lazy(()=>import("../pages/Analytics/Analytics"))
const AddFriend = lazy(()=>import("../pages/AddFriend/AddFriend"))
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
        element:<Analytics />
    },
    loading : {
        path:"/loading",
        element : <LoadingPage />
    },
    login : {
        path:"/login",
        element : <Login />
    },
    addfriend : {
        path:"/addfriend",
        element: <AddFriend />  
    },
    signup : {
        path:"/signup",
        element : <Signup/>
    }
}