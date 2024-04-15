import React, { useContext, useEffect, useState } from 'react'
import Card from '../Card/Card.jsx'
import axios from 'axios'
import AuthContext from '../../AuthContext.jsx';
import { Link } from 'react-router-dom';
import './DashboardSection.css'
function DashboardSection({name,api}) {
  
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(true);

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
        Authorization: 'Bearer ' + localStorage.getItem('token')}}).then((res)=>{setData(res.data)})
    }
      
    }, [window.location.pathname])
  return (
    <>
    <div className='Section'>
      <h1 id='SectionTitle'>{name}</h1>
      {name !== 'Client requests' ? <Link to={window.location.pathname+'/create'} id='Create'>create new</Link> : <></>}
      
      {name !== 'Client requests' ?  <div className='container'>{data.map((element)=>{return <Card info={element}></Card>})}</div> :  <div className='container'><table><th>Name</th><th>Description</th><th>Email</th> <th>Delete</th>{data.map((element)=>{return <Card info={element}></Card>})}</table></div>}
     
  </div>

    </>
  
  )
}

export default DashboardSection