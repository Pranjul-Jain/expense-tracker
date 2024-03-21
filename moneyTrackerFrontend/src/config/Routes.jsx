import React,{ lazy } from 'react'

const Home = lazy(()=>import("../pages/Home/Home"))
const Analytics = lazy(()=>import("../pages/Analytics/Analytics"))

export const Routes = {
    home : {
        path:'/',
        element:<Home/>
    },
    Analytics : {
        path:"/analytics",
        element:<Analytics/>
    }
}