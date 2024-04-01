import axios, { AxiosError } from 'axios';
import React, { useRef, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import './../../css/app.css'
import AuthContext from './AuthContext';



function Login() {
    let e=useRef(null);
    let pass=useRef(null)
 
    const navigate=useNavigate();
    const Auth=useContext(AuthContext);

    useEffect(()=>{
      Auth.setAuth(localStorage.getItem('token'))
    },[localStorage.getItem('token')])
    function login(){


        const resault = axios.post('http://127.0.0.1:8000/api/login',{email:`${e.current.value}`,password:`${pass.current.value}`},{headers: {
          'Content-Type': 'multipart/form-data'} }).then(res=>{localStorage.setItem('token',res.data.data.token)}).then(navigate('/home'));


    }

  return (
    <div className='login'>

<div className='bg'>
  <div className='pattern'>

  </div>
        </div>



          <form >
                <input type='email' name='email' ref={e} placeholder='email@email.com'></input>
                <input type='password' name='password' ref={pass} placeholder='password'></input>
                <button type='submit' onClick={(event)=>{event.preventDefault();login()}}>login</button>
          </form>

    </div>
  )
}



export default Login;

/* const container = document.getElementById("login");
const root = ReactDOM.createRoot(container);
root.render(<Login />); */