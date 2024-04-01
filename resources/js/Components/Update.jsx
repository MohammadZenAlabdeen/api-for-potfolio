import React, { useEffect, useState, useRef, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from './AuthContext';

function Update(props) {
  const id = useParams();

  const Auth = useContext(AuthContext);
  const navigate = useNavigate();
  const linkRef = useRef(null);
  const titleRef = useRef(null);
  const [edit, setEdit] = useState('');
      
  const handleChange = (content) => {
    setEdit(content);
  }
  const [selectedFile, setSelectedFile] = useState([]);
  const [all, setAll] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [Auth.auth]);

  const links = () => {
    setAll([...all, linkRef.current.value]);
    console.log(all);
    console.log(edit);
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEdit(data);
  };

  function update() {
    let data = new FormData();
    switch (props.name) {
      case 'project':
        data.append('title', titleRef.current.value);
        data.append('link', linkRef.current.value);
        data.append('desc', edit);
        for (let i = 0; i < selectedFile.length; i++) {
          data.append('imgs['+i+']', selectedFile[i]);
        }
        data.append('_method','PUT');
        break;
      case 'service':
        data.append('title', titleRef.current.value);
        data.append('desc', edit);
        for (let i = 0; i < selectedFile.length; i++) {
          data.append('imgs['+i+']', selectedFile[i]);
        }
        data.append('_method','PUT');
        break;
      case 'section':
        data.append('title', titleRef.current.value);
        data.append('links[]', all);
        data.append('desc', edit);
        data.append('_method','PUT');
         
        for (let i = 0; i < selectedFile.length; i++) {
            data.append('imgs['+i+']', selectedFile[i]);
          }
console.log(data._boundary)
        break;

      default:
        break;
    }

    axios.post(props.api+id.id,data,      {headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data',
    }}).then(navigate('/home'))
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
    <div>
      <h1>{props.name}</h1>
      <div className='editor'>
      <ReactQuill
      theme="snow" // You can choose different themes like 'snow', 'bubble', 'core', or create your own
      value={edit}
      onChange={handleChange}
      formats={formats}
      modules={modules}
    />      </div>

      <input name='title' ref={titleRef} placeholder='title'></input>
      <input type='file' multiple  name='images'  onChange={(e) => {setSelectedFile(e.target.files);console.log(selectedFile)}}></input>

      <div>{all.map((element, index) => <div key={index}>{element}</div>)}</div>
      <input type='text' name='link' ref={linkRef}></input>
      <button onClick={(event) => { event.preventDefault(); links(); }}>add</button>
      <br />
      <button onClick={() => { update(); }}>submit</button>
    </div>
  );
}

export default Update;