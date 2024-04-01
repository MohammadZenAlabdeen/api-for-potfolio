import React, { useContext, useEffect, useState } from 'react'
import Card from './Card.jsx'
import axios from 'axios'
import AuthContext from './AuthContext.jsx';
import { Link } from 'react-router-dom';

function DashboardSection({name,api}) {
  
    const [data,setData]=useState([]);

    const Auth=useContext(AuthContext)
    useEffect(()=>{
      if(!localStorage.getItem('token')){
        navigate('/login')
      }
    },[Auth.auth])
    useEffect(() => {
    if(name!=='Client requests'){
    axios.get(api).then((res)=>{setData(res.data)})
    }else{
      axios.get(api,{headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')}}).then((res)=>{setData(res.data)}).then(console.log(data))
    }
    data.map(element=>{return console.log(element)})
      
    }, [])
    console.log(Auth)
  return (
    <div>
        <h1>{name}</h1>
        <Link to={window.location.pathname+'/create'}>create new</Link>
        <div className='container'>{data.map((element)=>{return <Card info={element}></Card>})}</div>
    </div>
  )
}

export default DashboardSection