import HTMLReactParser from 'html-react-parser'
import React, { useState , useEffect} from 'react'
import axios from 'axios';
import Project from './../Project/Project.jsx';
import './Portfolio.css'
function Portfolio({Portfolio}) {
    const [projects,setProjects]=useState(null)
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/api/projects');

           setProjects(response.data);
           console.log(projects)
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData(); // Call fetchData function
    
      }, []);
    if(projects!==null)  {
  return (
 
    <div className='Portfolio' id='Portfolio'>
        <div className='head'>
        <h1>{Portfolio.title}</h1>
            {HTMLReactParser(Portfolio.desc)}
        </div>
       <div className='Container'> 
            {projects.map((element)=>{return <Project Project={element}></Project>})}
       </div> 
    </div>
  )
}
}
export default Portfolio