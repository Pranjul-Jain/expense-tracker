import React from 'react'
import { Link } from 'react-router-dom';
import { Routes } from '../../config/Routes';
import logo from "../../assets/logo.png"
import useResponsive from "../../hooks/UseResponsive"

const Navbar = ({
    home,
    analytics,
    addfriend,
    isAuth
}) => {

  const isMobile = useResponsive("down","sm","","")

  return (
    <nav className='flex justify-between align-center px-10 py-4 bg-black text-white text-xl'>
        <img className='cursor-pointer' src={logo} width={isMobile?40:50} style={{borderRadius:"50%"}} />
        <ul className='flex transition-colors duration-500 ease-linear items-center p-0 m-0 gap-5'>
            {isAuth && <>
              <li className={'cursor-pointer '+(home?"selected":"")}><Link to={Routes.home.path} className='text-base sm:text-lg'>Home</Link></li>
              <li className={'cursor-pointer '+(analytics?"selected":"")}><Link to={Routes.analytics.path} className='text-base sm:text-lg'>Analytics</Link></li>
              <li className={'cursor-pointer '+(addfriend?"selected":"")}><Link to={Routes.addfriend.path} className='text-base sm:text-lg'>Add Friend</Link></li>
              </>
            }
        </ul>
    </nav>
  )
}

export default Navbar;