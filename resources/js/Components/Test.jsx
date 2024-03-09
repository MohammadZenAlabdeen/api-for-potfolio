import axios from 'axios';
import React, { useRef, useState } from 'react'
import  ReactDOM  from 'react-dom/client';
import './../../css/app.css'


export default function Test() {
    let e=useRef(null);
    let pass=useRef(null)
    function login(){

        console.log(e.current.value,pass)
        axios.post('http://127.0.0.1:8000/api/login',{email:`${e.current.value}`,password:`${pass.current.value}`},{headers: {
          'Content-Type': 'multipart/form-data'} }).then(res=>{localStorage.setItem('token',JSON.stringify(res.data.data.token))}).catch(err=>{console.error(err)});
    }
  return (
    <div className='login'>
          <form >
                <label htmlFor='email'>Enter Your Email</label>
                <input type='email' name='email' ref={e}></input>
                <label htmlFor='password'>Enter Your Password</label>
                <input type='password' name='password' ref={pass}></input>
                <button type='submit' onClick={(event)=>{event.preventDefault();login()}}>login</button>
          </form>
    </div>
  )
}

const container= document.getElementById('Test');
const root=ReactDOM.createRoot(container);
root.render(<Test />);


