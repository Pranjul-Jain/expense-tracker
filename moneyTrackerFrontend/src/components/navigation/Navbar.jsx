import React from 'react'
import { Link } from 'react-router-dom';
import { Routes } from '../../config/Routes';
import logo from "../../assets/logo.png"

const Navbar = ({
    home,
    analytics
}) => {

  return (
    <nav className='flex justify-between align-center px-10 py-4 bg-black text-white text-xl'>
        <img src={logo} width={50} style={{borderRadius:"50%"}} />
        <ul className='flex transition-colors duration-500 ease-linear items-center p-0 m-0 gap-5'>
            <li className={'cursor-pointer '+(home?"selected":"")}><Link to={Routes.home.path}>Home</Link></li>
            <li className={'cursor-pointer '+(analytics?"selected":"")}><Link to={Routes.Analytics.path}>Analytics</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar;