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
            path: Routes.analytics.path,
            element:<Suspense fallback={<LoadingPage/>}>
                {Routes.analytics.element}
            </Suspense>
        },{
            path: Routes.login.path,
            element:<Suspense fallback={<LoadingPage/>}>
                {Routes.login.element}
            </Suspense>
        },{
            path: Routes.signup.path,
            element:<Suspense fallback={<LoadingPage/>}>
                {Routes.signup.element}
            </Suspense>
        }
        ,{
            path: Routes.loading.path,
            element:<LoadingPage />
        }
    ]))
}

export default PageRoutes;