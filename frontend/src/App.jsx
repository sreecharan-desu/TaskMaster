import './App.css'


//frontendurl(deployment): https://task-master-rose.vercel.app/
//backendurl (deployment): https://task-master-kohl.vercel.app/

//backend endpoints : 
  //users
    // http://localhost:5000/api/v1/user/signup (POST)
    // http://localhost:5000/api/v1/user/signin (POST)
    // http://localhost:5000/api/v1/user/gettodos (GET)
    // http://localhost:5000/api/v1/user/getusername (GET)
    // http://localhost:5000/api/v1/user/addtodo (POST)
    // http://localhost:5000/api/v1/user/markasdone (POST)
    // http://localhost:5000/api/v1/user/update (PUT)
    // http://localhost:5000/api/v1/user/updatetodo (PUT)
    // http://localhost:5000/api/v1/user/removetodo (DELETE)


  //admin
    // http://localhost:5000/api/v1/admin/signup (POST)
    // http://localhost:5000/api/v1/admin/signin (POST)
    // http://localhost:5000/api/v1/admin/details (GET)
    // http://localhost:5000/api/v1/admin/getusers (GET)
    // http://localhost:5000/api/v1/admin/deleteuser (DELETE) 
    // http://localhost:5000/api/v1/admin/update (PUT) 



function App() {
  return (
    <>

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
      <div class="loader1"></div>
  </>)
}


function Loader2(){
  return(<>
  <div class="loader2"></div>
  </>)
}

export default App
