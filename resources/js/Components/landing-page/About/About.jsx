import React from 'react'
import HTMLReactParser from 'html-react-parser'
import './About.css'

function About({About}) {
  return (
    <div className='About' id='About'>
        <h1>{About.title}</h1>
        <p>
            {HTMLReactParser(About.desc)}
        </p>
    </div>
  )
}

export default About