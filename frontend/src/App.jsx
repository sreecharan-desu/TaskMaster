import React, { Suspense, useEffect } from 'react';
import './App.css'
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import AdminProfile from './pages/admin/profile/profile';
import UserDashboard from './pages/user/Dashboard/userdashboard';
import UserProfile from './pages/user/Profile/userprofile';

const AdminSignup = React.lazy((()=>import('./pages/admin/signup/signup')));
const AdminSignin = React.lazy((()=>import('./pages/admin/signin/signin')));
const AdminDashboard = React.lazy(()=>import('./pages/admin/dashboard/admindashboard'));

const UserSignup = React.lazy((()=>import('./pages/user/signup/signup')));
const UserSignin = React.lazy((()=>import('./pages/user/signin/signin')));

//frontendurl(deployment): https://task-master-rose.vercel.app/
//backendurl (deployment): https://task-master-api-psi.vercel.app/

//backend endpoints : 
  //users
    // https://task-master-api-psi.vercel.app/user/signup (POST) Done.
    // https://task-master-api-psi.vercel.app/user/signin (POST) Done.
    // https://task-master-api-psi.vercel.app/user/getusername (GET) Done.
    // https://task-master-api-psi.vercel.app/user/gettodos (GET) Done.
    // https://task-master-api-psi.vercel.app/user/addtodo (POST) Done.
    // https://task-master-api-psi.vercel.app/user/update (PUT) Done.
    // https://task-master-api-psi.vercel.app/user/markasdone (POST) Done.
    // https://task-master-api-psi.vercel.app/user/updatetodo (PUT) Done.
    // https://task-master-api-psi.vercel.app/user/removetodo (DELETE) Done.


  //admin
    // https://task-master-api-psi.vercel.app/admin/signup (POST) Done.
    // https://task-master-api-psi.vercel.app/admin/signin (POST) Done.
    // https://task-master-api-psi.vercel.app/admin/details (GET) Done
    // https://task-master-api-psi.vercel.app/admin/getusers (GET) Done.
    // https://task-master-api-psi.vercel.app/admin/deleteuser (DELETE) Done.
    // https://task-master-api-psi.vercel.app/admin/update (PUT) Done.



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Suspense fallback={<Loader2/>}>{<Home/>}</Suspense>}/>
          <Route path = '/user/signin' element = {<Suspense fallback={<Loader2/>}>{<UserSignin/>}</Suspense>}/>
          <Route path = '/user/signup' element = {<Suspense fallback={<Loader2/>}><UserSignup/></Suspense>}/>
          <Route path = '/admin/signin' element = {<Suspense fallback={<Loader2/>}><AdminSignin/></Suspense>}/>        
          <Route path = '/admin/signup' element = {<Suspense fallback={<Loader2/>}><AdminSignup/></Suspense>}/> 
          <Route path = '/admin/profile' element = {<Suspense fallback={<Loader2/>}><AdminProfile/></Suspense>}/> 
          <Route path = '/admin/dashboard' element = {<Suspense fallback={<Loader2/>}><AdminDashboard/></Suspense>}/> 
          <Route path = '/user/dashboard' element = {<Suspense fallback={<Loader2/>}><UserDashboard/></Suspense>}/> 
          <Route path = '/user/profile' element = {<Suspense fallback={<Loader2/>}><UserProfile/></Suspense>}/> 
        </Routes>
      </BrowserRouter>
    </>
  )
}

function Home(){
  const navigate = useNavigate();
  useEffect(()=>{
    navigate('/user/signup')
  },[])

  return(<>
  
    Hello from frontend
    
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


//SreeCharan Desu