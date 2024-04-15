import React from 'react'
import HTMLReactParser from 'html-react-parser'
import './About.css'
import Plx from 'react-plx';

function About({About}) {
  const scale = [
    {
      start: 300,
      end: 900,
      properties: [
        {
          startValue: 0,
          endValue: 1,
          property: "scale",
        },
      ],
    },
  ];
  return (
    <Plx parallaxData={scale}>
          <div className='About' id='About'>
        <h1>{About.title}</h1>
        <p>
            {HTMLReactParser(About.desc)}
        </p>
    </div>
    </Plx>

  )
}

export default About