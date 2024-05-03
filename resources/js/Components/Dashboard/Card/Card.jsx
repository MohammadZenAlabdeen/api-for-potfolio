import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../../AuthContext'
import HTMLReactParser from 'html-react-parser'
import './Card.css'
 


function Card({info,cr,trash}) {
  
   
   const Auth=useContext(AuthContext)
   const navigate=useNavigate();
   const path='./../../../../images/'
   console.log(window.location.pathname)
   let p='';
   switch (window.location.pathname) {
    case '/home/Sections':
      p='/section'
      break;
    case '/home/Services':
      p='/service'
      break;
    case '/home/Projects':
      p='/project'
      break;
    case '/home/Clientrequests':
      p='/clientrequest'
      break;
    case '/home/Clientrequests/trash':
      p='/clientrequest'  
   
    default:
      break;
   }
   const imgs=[]
   console.log(Auth.auth)
  
   
   
   useEffect(()=>{
    if(!localStorage.getItem('token')){
      navigate('/login')
    }
  },[Auth.auth])
  
  info.images !== undefined ? info.images.map(element=>{return imgs.push(element.img)}) : {};
if(info.images !== undefined){
  return(    
      <div className='card'>
       <img src={path+imgs[0]}></img> 
          <div className='info'>
          <h1 id='title'>{info.title}</h1>
        <p className='desc'> {HTMLReactParser(info.desc.substring(0,120))}</p>
          <div className='buttonContainer'>
          <button id='update' onClick={()=>{navigate(window.location.pathname+'/update/'+info.id)}}> update </button>
          <button id='delete' onClick={()=>{axios.delete('http://127.0.0.1:8000/api/dashboard'+p+'/delete/'+info.id,{headers:{
             'Authorization':'Bearer '+Auth.auth}}).then(window.location.reload())}}> delete </button>
          </div>
          </div>
  
      </div>
   )
    
}else if(trash===true){
  return (
  <tr>
  <td>
    {info.name}
  </td>
  <td>
  {info.desc}

  </td>
  <td>
  {info.email}
  </td>
  <td>
  <button id='delete' onClick={()=>{axios.delete('http://127.0.0.1:8000/api/dashboard'+p+'/destroy/'+info.id,{headers:{
       'Authorization':'Bearer '+Auth.auth}}).then(window.location.reload())}}> Destroy </button>
  </td>
  <td>
  <button id='restore' onClick={()=>{axios.get('http://127.0.0.1:8000/api/dashboard'+p+'/restore/'+info.id,{headers:{
       'Authorization':'Bearer '+Auth.auth}}).then(window.location.reload())}}> restore </button>
  </td>
</tr>
  )
}
else if(cr===true){
  return (

      <tr>
        <td>
          {info.name}
        </td>
        <td>
        {info.desc}
  
        </td>
        <td>
        {info.email}
        </td>
        <td>
        <button id='delete' onClick={()=>{axios.delete('http://127.0.0.1:8000/api/dashboard'+p+'/delete/'+info.id,{headers:{
             'Authorization':'Bearer '+Auth.auth}}).then(window.location.reload())}}> delete </button>
        </td>
      </tr>
  )
}
}

export default Card