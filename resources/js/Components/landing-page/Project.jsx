import React from 'react'
import { FaExternalLinkAlt } from "react-icons/fa"
import HTMLReactParser from 'html-react-parser';

function Project({Project}) {
    let p = './../../../../images/';
  return (
    
    <div className='Project'>
<img src={p+Project.images[0].img}></img>
<div className='Info'>
    <h1>{Project.title}</h1>
    <div className='desc'>
    {HTMLReactParser(Project.desc)}

    </div>
</div>
<a href={Project.link}> <span>Go to website! </span><FaExternalLinkAlt size={20}/></a>

    </div>
  )
}

export default Project