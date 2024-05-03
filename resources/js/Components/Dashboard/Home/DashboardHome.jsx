import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import AuthContext from '../../AuthContext';
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import './DashboardHome.css'
const DashboardHome = () => {
  const navigate=useNavigate();
  const Auth=useContext(AuthContext);
  const [open,setOpen]=useState(false)
  useEffect(()=>{
    if(!localStorage.getItem('token')){
      navigate('/login')
    }
  },[Auth.auth])
  return (
    <>
        <nav className='nav-dashboard'>

          <button id='closed' style={{/* display: open===false ? 'block' : 'none' , */ background:'none' , border:'none'}} onClick={event=>{setOpen(!open)}}><RxHamburgerMenu size={25}></RxHamburgerMenu></button>
          <div className={open===true ? 'menu open' : 'menu'}>
            <button id='opened' style={{/* display: open===true ? 'block' : 'none' , */ background:'none' , border:'none'}} onClick={event=>{setOpen(!open)}}><RxCross1 size={25} /></button>
            <Link style={{textDecoration:'none', marginTop:'30px'}} to={'/home/Sections'}> <span>Sections</span></Link>
            <Link style={{textDecoration:'none'}} to={'/home/Services'}> <span>Services</span></Link>
            <Link style={{textDecoration:'none'}} to={'/home/Projects'}> <span>Projects</span> </Link>
            <Link style={{textDecoration:'none'}} to={'/home/Clientrequests'}> <span>Clientrequests</span></Link>
            <Link style={{textDecoration:'none'}} to={'/home/Clientrequests/trash'}> <span>Clientrequests trash</span></Link>
          </div>
          <h1>Mohammad Zen Al-Abdeen</h1>
        </nav>
        <Outlet/>
    </>
  )
}

export default DashboardHome