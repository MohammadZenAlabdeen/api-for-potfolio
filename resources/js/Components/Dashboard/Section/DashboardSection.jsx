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
     
    if(name!=='Client requests' && name !== 'Trash'){
    axios.get(api).then((res)=>{setData(res.data)})
    }else if(name=== 'Client requests' || name==='Trash'){
      axios.get(api,{headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')}}).then((res)=>{setData(res.data)})
    }
      
    }, [window.location.pathname])
    function Section(name){
      if(name !== 'Client requests' && name !== 'Trash'){
        return <div className='container'>{data.map((element)=>{return <Card info={element} trash={false} cr={false}></Card>})}</div>;
      }else if(name === 'Client requests'){
return <div className='container'><table><th>Name</th><th>Description</th><th>Email</th> <th>Delete</th>{data.map((element)=>{return <Card info={element} trash={false} cr={true}></Card>})}</table></div>
      }else if(name==='Trash'){
        return <div className='container'><table><th>Name</th><th>Description</th><th>Email</th> <th>Destroy</th> <th>Restore</th>{data.map((element)=>{return <Card info={element} trash={true} cr={false}></Card>})}</table></div>
      }
    }
  return (
    <>
    <div className='Section'>
      <h1 id='SectionTitle'>{name}</h1>
      {name !== 'Client requests'&& name!=='Trash' ? <Link to={window.location.pathname+'/create'} id='Create'>create new</Link> : <></>}
      {Section(name)}
     
  </div>

    </>
  
  )
}

export default DashboardSection