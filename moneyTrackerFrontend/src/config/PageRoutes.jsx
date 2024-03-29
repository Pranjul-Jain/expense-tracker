import { useRoutes } from 'react-router-dom'
import { Routes } from "./Routes"
import ProtectedRoute from '../services/security/ProtectedRoute'
import PublicRoute from "../services/security/ProtectedRoute"

const PageRoutes = ({
    isAuth,
    setAuth,
    friends
}) =>{
    return (useRoutes([
        {
            path: Routes.home.path,
            element:<ProtectedRoute isAuth={isAuth} setAuth={setAuth}>
                <Routes.home.element isAuth={isAuth} friends={friends} setAuth={setAuth}/>
            </ProtectedRoute>
               
        },{
            path: Routes.analytics.path,
            element:<ProtectedRoute isAuth={isAuth} setAuth={setAuth}>
                <Routes.analytics.element isAuth={isAuth} friends={friends} setAuth={setAuth}/>
            </ProtectedRoute>
        },{
            path: Routes.addfriend.path,
            element:<ProtectedRoute isAuth={isAuth} setAuth={setAuth}>
                <Routes.addfriend.element isAuth={isAuth} friends={friends} setAuth={setAuth}/>
            </ProtectedRoute>
        },{
            path: Routes.login.path,
            element:<PublicRoute isAuth={isAuth}>
                <Routes.login.element isAuth={isAuth} setAuth={setAuth}/>
            </PublicRoute>
        },{
            path: Routes.signup.path,
            element:<PublicRoute isAuth={isAuth}>
                <Routes.signup.element isAuth={isAuth} setAuth={setAuth}/>
            </PublicRoute>
        }
    ]))
}

export default PageRoutes;