import React from 'react'
import Navbar from '../../components/navigation/Navbar'
import LoginForm from './LoginForm'

const Login = () => {
  return (
    <div>
        <Navbar isAuth={false} />
        <LoginForm />
    </div>
  )
}

export default Login