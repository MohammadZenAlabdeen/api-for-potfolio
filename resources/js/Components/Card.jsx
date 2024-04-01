import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from './AuthContext'

function Card(info,token) {
   info=info.info
   const Auth=useContext(AuthContext)
   const navigate=useNavigate();
   const path='./../../../images/'
   console.log(window.location.pathname)
   let p='';
   switch (window.location.pathname) {
    case '/Sections':
      p='/section'
      break;
    case '/Services':
      p='/service'
      break;
    case '/Projects':
      p='/project'
      break;
    case '/Clientrequest':
      p='/clientrequest'
      break;
   
    default:
      break;
   }
   const imgs=[]
   console.log(Auth.auth)
   if(window.location.pathname!=='/Clientrequest'){
   info.images.map(element=>{return imgs.push(element.img)})
   }
   useEffect(()=>{
    if(!localStorage.getItem('token')){
      navigate('/login')
    }
  },[Auth.auth])
  return (
    <div className='card'>
        <img src={path+imgs[0]}></img>
        <div className='info'>
        <h1>{info.title}</h1>
        <button onClick={()=>{navigate(window.location.pathname+'/update/'+info.id)}}> update </button>
        <button onClick={()=>{axios.delete('http://127.0.0.1:8000/api/dashboard'+p+'/delete/'+info.id,{headers:{
           'Authorization':'Bearer '+Auth.auth}}).then(window.location.reload())}}> delete </button>
        </div>

    </div>
  )
}

export default Card