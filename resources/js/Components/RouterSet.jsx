import axios from 'axios';
import React, { useState } from 'react'
import  ReactDOM  from 'react-dom/client';
import { Router,BrowserRouter,Routes,Route, Navigate} from 'react-router-dom';
import Login from './Dashboard/Login/Login.jsx';
import './../../css/app.css'
import AuthContext from './AuthContext.jsx';

import DashboardHome from './Dashboard/Home/DashboardHome.jsx';
import DashboardSection from './Dashboard/Section/DashboardSection.jsx';
import Create from './Dashboard/Create/Create.jsx';
import Update from './Dashboard/Update/Update.jsx';
import LandingPage from './landing-page/LandingPage.jsx';



const RouterSet=() => {

let [auth,setAuth]=useState(localStorage.getItem('token'));
return (
<>
<AuthContext.Provider value={{auth,setAuth}}>
<BrowserRouter>
   <Routes>
      <Route path='/' element={<LandingPage/>}></Route>
         <Route path='/home' element={<DashboardHome />}>
         <Route path='/home/Services' element={<DashboardSection name='Services'  api="http://mohammadzenalabdeen.site/api/dashboard/services"/>}/>
      <Route path='/home/Sections' element={<DashboardSection name='Sections'  api="http://mohammadzenalabdeen.site/api/dashboard/sections"/>}/>
      <Route path='/home/Projects' element={<DashboardSection name='Projects'  api="http://mohammadzenalabdeen.site/api/dashboard/projects"/>}/>
      <Route path='/home/Clientrequests' element={<DashboardSection name='Client requests'  api="http://mohammadzenalabdeen.site/api/dashboard/clientrequest"/>}/>
      <Route path='/home/Clientrequests/trash' element={<DashboardSection name='Trash'  api="http://mohammadzenalabdeen.site/api/dashboard/clientrequest/trash"/>}/>
      <Route path='/home/Services/create' element={<Create name='service' api='http://mohammadzenalabdeen.site/api/dashboard/service/store'></Create>}></Route>
      <Route path='/home/Sections/create' element={<Create name='section' api='http://mohammadzenalabdeen.site/api/dashboard/section/store'></Create>}></Route>
      <Route path='/home/Projects/create' element={<Create name='project' api='http://mohammadzenalabdeen.site/api/dashboard/project/store'></Create>}></Route>
      <Route path='/home/Services/update/:id' element={<Update name='service' old='http://mohammadzenalabdeen.site/api/dashboard/service/show/' api='http://mohammadzenalabdeen.site/api/dashboard/service/update/'></Update>}></Route>
      <Route path='/home/Sections/update/:id' element={<Update name='section' old='http://mohammadzenalabdeen.site/api/dashboard/section/show/' api='http://mohammadzenalabdeen.site/api/dashboard/section/update/'></Update>}></Route>
      <Route path='/home/Projects/update/:id' element={<Update name='project' old='http://mohammadzenalabdeen.site/api/dashboard/project/show/' api='http://mohammadzenalabdeen.site/api/dashboard/project/update/'></Update>}></Route>
            </Route>
      <Route path="/login" element={<Login/>} />  

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

