import React, { useEffect, useState,Component, useContext} from 'react'
import { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import axios from 'axios';
import FormData from 'form-data';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../AuthContext';
import './Create.css'

function Create({name,api}) {
    const Auth=useContext(AuthContext)
    
    useEffect(()=>{
        if(!localStorage.getItem('token')){
          navigate('/login')
        }
      },[Auth.auth])

        const [edit, setEdit] = useState('');
      
        const handleChange = (content) => {
          setEdit(content);
        }
        let link=useRef(null);
        let title=useRef(null);
        const navigate=useNavigate();
        
        const [all,setAll]=useState([]);
        const [selectedFile, setSelectedFile] = useState(null);
        const links=()=>{
            setAll([...all,link.current.value])
            console.log(all)
            console.log(edit)
        };

        function create(){
            let data=new FormData();
            console.log(name)
            switch (name) {
                case 'project':
                    data.append('title',title.current.value);
                    data.append('link',link.current.value);
                    data.append('desc',edit);
                    if(selectedFile)
                    for (let i = 0 ; i < selectedFile.length ; i++) {
                        data.append("imgs["+i+"]", selectedFile[i]);
                    }
                    break;
                    case 'service':
                    data.append('title',title.current.value);
                    data.append('desc',edit);
                    if(selectedFile)
                    for (let i = 0 ; i < selectedFile.length ; i++) {
                        data.append("imgs["+i+"]", selectedFile[i]);
                    }
                    break;
                    case 'section':
                        data.append('title',title.current.value);
                        data.append('links[]',all);
                        data.append('desc',edit);
                        if(selectedFile)
                        for (let i = 0 ; i < selectedFile.length ; i++) {
                            data.append("imgs["+i+"]", selectedFile[i]);
                        }
                    break;
            
                default:
                    break;
            }
            console.log(data.get('title'))
            axios.post(api,data,{headers:{
                'Authorization':'Bearer '+localStorage.getItem('token'),'Content-Type': 'multipart/form-data'}}).then(()=>{navigate('/home')})
        }
        
        const formats = [
            'header',
            'font',
            'size',
            'bold',
            'italic',
            'underline',
            'strike',
            'blockquote',
            'list',
            'bullet',
            'indent',
            'link',
            'image',
            'color',
          ];
          const modules = {
            toolbar: [
              [{ 'header': '1' }, { 'header': '2' },],
              [{ size: ['small', false, 'large', 'huge'] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              ['link', 'image', 'clean'],
              [{ 'color': [] }], // text color option
            ],
          };
  return (
    <div className='Create'>
        <h1>{name}</h1>
        <div className='editor'>
      <ReactQuill
      theme="snow" // You can choose different themes like 'snow', 'bubble', 'core', or create your own
      value={edit}
      id='editor'
      onChange={handleChange}
      formats={formats}
      modules={modules}
    />      </div>

<div className='Input'>
<input name='title' ref={title} placeholder='title'></input>


      <div className='Add'>
      <div>{all.map((element, index) => <div key={index}>{element}</div>)}</div>
      <div className='Inner'>
      <input type='text' name='link' ref={link} placeholder='links'></input>
      <button onClick={(event) => { event.preventDefault(); links(); }}>add</button>
      </div>

      </div>

   
      <input type='file' multiple  name='images'  onChange={(e) => {setSelectedFile(e.target.files);console.log(selectedFile)}}></input>

      <button onClick={() => { create(); }} id='submit'>submit</button>
</div>
    </div>
  )
}

export default Create