import React from 'react'
import Navbar from '../../components/navigation/Navbar'
import LoginForm from './LoginForm'

const Login = ({
  isAuth,
  setAuth
}) => {
  return (
    <div>
        <Navbar isAuth={false} />
        <LoginForm isAuth={isAuth} setAuth={setAuth} />
    </div>
  )
}

export default Login