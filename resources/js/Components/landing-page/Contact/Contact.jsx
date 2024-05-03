import axios from 'axios'
import React, { useRef } from 'react'
import FormData from 'form-data'
import './Contact.css'

function Contact() {
    let n=useRef();
    let e=useRef();
    let d=useRef();
   function handleRequest(){
    
    let data=new FormData();
    data.append('name',n.current.value)
    data.append('email',e.current.value)
    data.append('desc',d.current.value)
    axios.post('http://mohammadzenalabdeen.site/api/clientrequest/store',data,{headers:{'Content-Type': 'multipart/form-data'}}).then(()=>{alert('send succesfully')})
    }
  return (
    <div className='Contact' id='Contact'>
        <div className='form'>
            <div className='Title'>
                <h1>
                    let's discuss your project!
                </h1>
            </div>
            <form>
                <label htmlFor='name'>Name:</label>
                    <input type='text'name='name' ref={n}></input>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' name='email' ref={e}></input>
                    <label htmlFor='description'>Description:</label>
                    <textarea typeof='text' name='description' ref={d}></textarea>
            </form>
        </div>
        <button onClick={(event)=>{event.preventDefault();handleRequest()}}>Send</button>
    </div>
  )
}

export default Contact