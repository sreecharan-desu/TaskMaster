import React, { Suspense, useEffect } from 'react';
import './App.css'
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
const UserSignup = React.lazy((()=>import('./pages/user/signup/signup')));
const UserSignin = React.lazy((()=>import('./pages/user/signin/signin')));
const AdminSignup = React.lazy((()=>import('./pages/admin/signup/signup')));
const AdminSignin = React.lazy((()=>import('./pages/admin/signin/signin')));
const AdminDashboard = React.lazy((()=>import('./pages/admin/dashboard/admindashboard')));
const UserDashboard = React.lazy((()=>import('./pages/user/Dashboard/userdashboard')));

//frontendurl(deployment): https://task-master-rose.vercel.app/
//backendurl (deployment): https://task-master-kohl.vercel.app/

//backend endpoints : 
  //users
    // http://localhost:5000/api/v1/user/signup (POST) Done.
    // http://localhost:5000/api/v1/user/signin (POST) Done.
    // http://localhost:5000/api/v1/user/gettodos (GET)
    // http://localhost:5000/api/v1/user/getusername (GET)
    // http://localhost:5000/api/v1/user/addtodo (POST)
    // http://localhost:5000/api/v1/user/markasdone (POST)
    // http://localhost:5000/api/v1/user/update (PUT)
    // http://localhost:5000/api/v1/user/updatetodo (PUT)
    // http://localhost:5000/api/v1/user/removetodo (DELETE)


  //admin
    // http://localhost:5000/api/v1/admin/signup (POST) Done.
    // http://localhost:5000/api/v1/admin/signin (POST) Done.
    // http://localhost:5000/api/v1/admin/details (GET) Done
    // http://localhost:5000/api/v1/admin/getusers (GET) Done
    // http://localhost:5000/api/v1/admin/deleteuser (DELETE) 
    // http://localhost:5000/api/v1/admin/update (PUT) 



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = '/user/signin' element = {<Suspense fallback={<Loader2/>}>{<UserSignin/>}</Suspense>}/>
          <Route path = '/user/signup' element = {<Suspense fallback={<Loader2/>}><UserSignup/></Suspense>}/>
          <Route path = '/admin/signin' element = {<Suspense fallback={<Loader2/>}><AdminSignin/></Suspense>}/>        
          <Route path = '/admin/signup' element = {<Suspense fallback={<Loader2/>}><AdminSignup/></Suspense>}/> 
          <Route path = '/user/dashboard' element = {<Suspense fallback={<Loader2/>}><UserDashboard/></Suspense>}/>
          <Route path = '/admin/dashboard' element = {<Suspense fallback={<Loader2/>}><AdminDashboard/></Suspense>}/> 
        </Routes>
      </BrowserRouter>
    </>
  )
}


function Profile(){
  return(<>
    <div class="skeleton-profile-circle-shimmer"></div>
  </>)
}


function TodoSkeleton(){
  return(<>
    <div class="skeleton-panel">
      <div class="skeleton-panel-title"></div>
      <div class="skeleton-panel-content"></div>
    </div>
  </>)
}

function Skeletons(){
  return(<>
  <div className="skeleton-list-panel-wrapper">
      <div className="skeleton-list-panel"></div>
      <div className="skeleton-list-panel"></div>
      <div className="skeleton-list-panel"></div>
      <div className="skeleton-list-panel"></div>
      <div className="skeleton-list-panel"></div>
  </div>
  </>)
}

function Loader1(){
  return(<>
      <div className="loader1"></div>
  </>)
}


function Loader2(){
  return(<>
  <div className='flex justify-center place-content-center mt-72'>
    <div className="flex justify-center place-content-center loader2">
    </div>
  </div>
  </>)
}

export default App
