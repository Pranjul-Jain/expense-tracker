import { useRoutes } from 'react-router-dom'
import { Routes } from "./Routes"
import { Suspense } from 'react'
import LoadingPage from '../pages/LoadingPage/LoadingPage'

const PageRoutes = () =>{
    return (useRoutes([
        {
            path: Routes.home.path,
            element:<Suspense fallback={<LoadingPage/>}>
                {Routes.home.element}
            </Suspense>
        },{
            path: Routes.Analytics.path,
            element:<Suspense fallback={<LoadingPage/>}>
                {Routes.Analytics.element}
            </Suspense>
        }
    ]))
}

export default PageRoutes;