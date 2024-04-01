import axios from 'axios';
import React, { useState } from 'react'
import  ReactDOM  from 'react-dom/client';
import { Router,BrowserRouter,Routes,Route, Navigate} from 'react-router-dom';
import Login from './Login.jsx';
import './../../css/app.css'
import AuthContext from './AuthContext.jsx';

import DashboardHome from './DashboardHome.jsx';
import DashboardSection from './DashboardSection.jsx';
import Create from './Create.jsx';
import Update from './Update.jsx';
import LandingPage from './landing-page/LandingPage.jsx';



const RouterSet=() => {

let [auth,setAuth]=useState(localStorage.getItem('token'));
return (
<>
<AuthContext.Provider value={{auth,setAuth}}>
<BrowserRouter>
   <Routes>
      <Route path='/' element={<LandingPage/>}></Route>
         <Route path='/home' element={<DashboardHome />}/>
      <Route path="/login" element={<Login/>} />  
      <Route path='/Services' element={<DashboardSection name='Services'  api="http://127.0.0.1:8000/api/dashboard/services"/>}/>
      <Route path='/Sections' element={<DashboardSection name='Sections'  api="http://127.0.0.1:8000/api/dashboard/sections"/>}/>
      <Route path='/Projects' element={<DashboardSection name='Projects'  api="http://127.0.0.1:8000/api/dashboard/projects"/>}/>
      <Route path='/Clientrequests' element={<DashboardSection name='Client requests'  api="http://127.0.0.1:8000/api/dashboard/clientrequest"/>}/>
      <Route path='/Services/create' element={<Create name='service' api='http://127.0.0.1:8000/api/dashboard/service/store'></Create>}></Route>
      <Route path='/Sections/create' element={<Create name='section' api='http://127.0.0.1:8000/api/dashboard/section/store'></Create>}></Route>
      <Route path='/Projects/create' element={<Create name='project' api='http://127.0.0.1:8000/api/dashboard/project/store'></Create>}></Route>
      <Route path='/Services/update/:id' element={<Update name='service' old='http://127.0.0.1:8000/api/dashboard/service/show/' api='http://127.0.0.1:8000/api/dashboard/service/update/'></Update>}></Route>
      <Route path='/Sections/update/:id' element={<Update name='section' old='http://127.0.0.1:8000/api/dashboard/section/show/' api='http://127.0.0.1:8000/api/dashboard/section/update/'></Update>}></Route>
      <Route path='/Projects/update/:id' element={<Update name='project' old='http://127.0.0.1:8000/api/dashboard/project/show/' api='http://127.0.0.1:8000/api/dashboard/project/update/'></Update>}></Route>
   </Routes>
</BrowserRouter>
</AuthContext.Provider>

</>
)

}
export default RouterSet;
const container= document.getElementById('RouterSet');
const root=ReactDOM.createRoot(container);
root.render(<RouterSet />);

