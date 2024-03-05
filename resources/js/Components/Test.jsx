import React, { useState } from 'react'
import  ReactDOM  from 'react-dom/client';


export default function Test() {
    let [count, setcount] = useState(0)
  return (
    <div>
        <button onClick={()=>{setcount(count++)}}>
            <h1 >{count}</h1>
        </button>
    </div>
  )
}

const container= document.getElementById('Test');
const root=ReactDOM.createRoot(container);
root.render(<Test />);


